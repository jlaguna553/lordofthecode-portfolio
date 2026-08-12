import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de Docker. No hay Docker real: el jugador escribe un Dockerfile y un
 * SIMULADOR de build lo parsea y produce una "imagen" (objeto con FROM, WORKDIR,
 * ENV, capas, COPY, CMD, EXPOSE, etapas multi-stage…). Los tests inspeccionan esa
 * imagen a través de `img`. Todo es JS puro: funciona en el navegador y en Node.
 *
 * En los tests, el jugador dispone del objeto `img` (la imagen construida):
 *   img.from · img.workdir · img.env · img.args · img.runs · img.copies ·
 *   img.cmd · img.entrypoint · img.expose · img.user · img.labels · img.volumes ·
 *   img.stages · img.capas (nº de capas RUN/COPY/ADD) · img.instrucciones
 */

export interface DockerStage {
  from: string;
  name: string | null;
  workdir: string;
  env: Record<string, string>;
  args: Record<string, string>;
  runs: string[];
  copies: { from: string | null; src: string; dest: string }[];
  adds: { from: string | null; src: string; dest: string }[];
  cmd: string[] | string | null;
  entrypoint: string[] | string | null;
  expose: number[];
  user: string | null;
  labels: Record<string, string>;
  volumes: string[];
  instrucciones: string[];
  stages?: string[];
  capas?: number;
}

export function dockerSupported(): boolean {
  return true;
}
export function warmupDocker(): void {
  /* sin runtime externo */
}

function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

function normalizePath(p: string): string {
  const abs = p.startsWith("/");
  const parts: string[] = [];
  for (const seg of p.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return (abs ? "/" : "") + parts.join("/");
}
function joinPath(base: string, p: string): string {
  if (p.startsWith("/")) return normalizePath(p);
  return normalizePath((base.endsWith("/") ? base : base + "/") + p);
}

/** Divide respetando comillas simples/dobles. */
function tokenize(s: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

function parseEnvOrLabel(rest: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (rest.includes("=")) {
    const re = /(\w[\w.]*)=("[^"]*"|'[^']*'|\S+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(rest))) {
      out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } else {
    const i = rest.indexOf(" ");
    if (i > 0) out[rest.slice(0, i)] = rest.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

function parseCopy(rest: string): { from: string | null; src: string; dest: string } {
  const toks = tokenize(rest);
  let from: string | null = null;
  const rem: string[] = [];
  for (const t of toks) {
    if (t.startsWith("--from=")) from = t.slice("--from=".length);
    else if (t.startsWith("--")) continue; // otros flags (--chown, etc.)
    else rem.push(t);
  }
  const dest = rem.length > 1 ? rem[rem.length - 1] : rem[0] ?? "";
  const src = rem.length > 1 ? rem.slice(0, -1).join(" ") : rem[0] ?? "";
  return { from, src, dest };
}

function parseExecOrShell(rest: string): string[] | string {
  const t = rest.trim();
  if (t.startsWith("[")) {
    try {
      const arr = JSON.parse(t);
      if (Array.isArray(arr)) return arr.map(String);
    } catch {
      /* cae a forma shell */
    }
  }
  return t;
}

/** Parsea un Dockerfile y devuelve la imagen final (última etapa). */
export function parseDockerfile(text: string): DockerStage {
  const joined = text.replace(/\\\r?\n/g, " ");
  const lines = joined.split(/\r?\n/);
  const stages: DockerStage[] = [];
  let cur: DockerStage | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const sp = line.indexOf(" ");
    const instr = (sp < 0 ? line : line.slice(0, sp)).toUpperCase();
    const rest = (sp < 0 ? "" : line.slice(sp + 1)).trim();

    if (instr === "FROM") {
      const toks = tokenize(rest);
      const asIdx = toks.findIndex((t) => t.toLowerCase() === "as");
      const name = asIdx >= 0 ? toks[asIdx + 1] : null;
      cur = {
        from: toks[0] ?? "",
        name: name ?? null,
        workdir: "/",
        env: {},
        args: {},
        runs: [],
        copies: [],
        adds: [],
        cmd: null,
        entrypoint: null,
        expose: [],
        user: null,
        labels: {},
        volumes: [],
        instrucciones: ["FROM"],
      };
      stages.push(cur);
      continue;
    }
    if (!cur) throw new Error("El Dockerfile debe empezar por FROM");
    cur.instrucciones.push(instr);
    switch (instr) {
      case "WORKDIR":
        cur.workdir = joinPath(cur.workdir, rest);
        break;
      case "ENV":
        Object.assign(cur.env, parseEnvOrLabel(rest));
        break;
      case "ARG": {
        const eq = rest.indexOf("=");
        if (eq >= 0) cur.args[rest.slice(0, eq).trim()] = rest.slice(eq + 1).trim();
        else cur.args[rest.trim()] = "";
        break;
      }
      case "RUN":
        cur.runs.push(rest.replace(/\s+/g, " "));
        break;
      case "COPY":
        cur.copies.push(parseCopy(rest));
        break;
      case "ADD":
        cur.adds.push(parseCopy(rest));
        break;
      case "CMD":
        cur.cmd = parseExecOrShell(rest);
        break;
      case "ENTRYPOINT":
        cur.entrypoint = parseExecOrShell(rest);
        break;
      case "EXPOSE":
        for (const p of tokenize(rest)) {
          const n = parseInt(p, 10);
          if (!Number.isNaN(n)) cur.expose.push(n);
        }
        break;
      case "USER":
        cur.user = rest;
        break;
      case "LABEL":
        Object.assign(cur.labels, parseEnvOrLabel(rest));
        break;
      case "VOLUME": {
        const t = rest.trim();
        if (t.startsWith("[")) {
          try {
            for (const v of JSON.parse(t)) cur.volumes.push(String(v));
          } catch {
            cur.volumes.push(...tokenize(t));
          }
        } else {
          cur.volumes.push(...tokenize(t));
        }
        break;
      }
      default:
        break; // instrucción desconocida: se ignora
    }
  }

  if (stages.length === 0) throw new Error("Dockerfile vacío o sin FROM");
  const final = stages[stages.length - 1];
  final.stages = stages.map((s) => s.name).filter((n): n is string => Boolean(n));
  final.capas = final.runs.length + final.copies.length + final.adds.length;
  return final;
}

function stableStringify(v: unknown): string {
  if (v === undefined) return "null";
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v as Record<string, unknown>).sort();
  return (
    "{" +
    keys
      .map((k) => JSON.stringify(k) + ":" + stableStringify((v as Record<string, unknown>)[k]))
      .join(",") +
    "}"
  );
}

interface RawResult {
  ok: boolean;
  value?: unknown;
  error?: string;
}

function buildBody(challenge: PooChallenge): string {
  const lines: string[] = [
    "const __out = { results: [] };",
    challenge.support_code ?? "",
  ];
  challenge.test_cases.forEach((t, i) => {
    lines.push(
      `try { __out.results[${i}] = { ok: true, value: (${t.input}) }; }` +
        ` catch (e) { __out.results[${i}] = { ok: false, error: String((e && e.message) || e) }; }`,
    );
  });
  lines.push("return __out;");
  return lines.join("\n");
}

function parseOutput(results: RawResult[], challenge: PooChallenge): EvalResult {
  const rs: TestResult[] = challenge.test_cases.map((t, i) => {
    const r = results[i];
    const expected = stableStringify(t.expected);
    const got = !r
      ? "<sin salida>"
      : r.ok
        ? stableStringify(r.value)
        : "⚠ " + r.error;
    return {
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: Boolean(r) && r.ok === true && stableStringify(r.value) === expected,
    };
  });
  const ok = rs.length > 0 && rs.every((r) => r.pass);
  return { ok, results: rs };
}

/** Construye la imagen del Dockerfile del jugador y evalúa los tests contra `img`. */
export async function runDockerChallenge(
  dockerfile: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  let img: DockerStage;
  try {
    img = parseDockerfile(stripFences(dockerfile));
  } catch (e) {
    return {
      ok: false,
      results: challenge.test_cases.map((t) => ({
        input: t.input,
        description: t.description,
        expected: stableStringify(t.expected),
        got: "⚠ " + (e instanceof Error ? e.message : String(e)),
        pass: false,
      })),
    };
  }
  try {
    const fn = new Function("img", buildBody(challenge)) as (
      img: DockerStage,
    ) => { results: RawResult[] };
    const out = fn(img);
    return parseOutput(out.results, challenge);
  } catch (e) {
    return { ok: false, results: [], phpError: e instanceof Error ? e.message : String(e) };
  }
}
