import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de Go en el navegador. Go no se ejecuta nativamente en JS, así que
 * llevamos un INTÉRPRETE de Go (Yaegi) compilado a WebAssembly — el mismo
 * enfoque que Pyodide (CPython → WASM) o php-wasm.
 *
 * - `wasm_exec.js` es el runtime oficial de Go para js/wasm; define `Go`.
 * - `go-interp.wasm` es Yaegi + stdlib compilado con GOOS=js GOARCH=wasm.
 *   Al arrancar, expone `window.__goEval(source, testsJSON)`.
 * - Se cargan de forma diferida la primera vez que se abre un reto de Go
 *   (≈38 MB, ≈8 MB gzip). Sólo la aventura de Go los necesita.
 *
 * `__goEval` crea un intérprete NUEVO por llamada, así que cada intento parte
 * de cero (se pueden redeclarar funciones sin arrastrar el intento anterior).
 */

interface GoEvalFn {
  (source: string, testsJSON: string): string;
}
interface GoOut {
  srcErr?: string;
  results?: { ok: boolean; v: string }[];
}

let goPromise: Promise<GoEvalFn> | null = null;

export function goSupported(): boolean {
  return typeof window !== "undefined" && typeof WebAssembly !== "undefined";
}

/** Inyecta wasm_exec.js una sola vez (define el global `Go`). */
function loadWasmExec(): Promise<void> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { Go?: unknown };
    if (w.Go) return resolve();
    const s = document.createElement("script");
    s.src = "/go/wasm_exec.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar el runtime de Go"));
    document.head.appendChild(s);
  });
}

async function getGoEval(): Promise<GoEvalFn> {
  if (goPromise) return goPromise;
  goPromise = (async () => {
    await loadWasmExec();
    const GoCtor = (window as unknown as { Go: new () => GoRuntime }).Go;
    const go = new GoCtor();
    const resp = await fetch("/go/go-interp.wasm");
    const { instance } = await WebAssembly.instantiateStreaming(
      resp,
      go.importObject,
    );
    // El programa Go hace select{}: nunca termina. No hay que await'ar run().
    void go.run(instance);
    // Esperar a que el módulo exponga __goEval.
    const w = window as unknown as { __goEval?: GoEvalFn };
    for (let i = 0; i < 200 && !w.__goEval; i++) {
      await new Promise((r) => setTimeout(r, 25));
    }
    if (!w.__goEval) throw new Error("El intérprete de Go no arrancó");
    // Llamada de calentamiento desechable: la PRIMERA evaluación en un
    // intérprete recién arrancado puede fallar con "call of nil function"
    // (la maquinaria de Yaegi aún no está del todo lista). Con esto, la
    // primera evaluación REAL del jugador ya parte en caliente.
    try {
      w.__goEval(
        "package main\n\nfunc _calentar() int { return crear()() }\nfunc crear() func() int { return func() int { return 1 } }",
        '["_calentar()"]',
      );
    } catch {
      /* si el calentamiento falla, seguimos: no es crítico */
    }
    return w.__goEval;
  })();
  return goPromise;
}

interface GoRuntime {
  importObject: WebAssembly.Imports;
  run(instance: WebAssembly.Instance): Promise<void>;
}

/** Precarga el intérprete mientras el jugador lee el lore. */
export function warmupGo(): void {
  if (goSupported()) void getGoEval();
}

/** Quita un posible bloque markdown ```go ... ``` envolvente. */
function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/** Ejecuta el código Go del jugador contra los test_cases del reto. */
export async function runGoChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  let goEval: GoEvalFn;
  try {
    goEval = await getGoEval();
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }

  // El código del soporte (si lo hay) se antepone al del jugador; juntos forman
  // un único programa Go.
  const source =
    (challenge.support_code ? challenge.support_code + "\n\n" : "") +
    stripFences(playerCode);
  const inputs = challenge.test_cases.map((t) => t.input);

  let out: GoOut;
  try {
    out = JSON.parse(goEval(source, JSON.stringify(inputs))) as GoOut;
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }

  if (out.srcErr) {
    return { ok: false, results: [], phpError: out.srcErr };
  }

  const results: TestResult[] = challenge.test_cases.map((t, i) => {
    const r = out.results?.[i];
    const expected = JSON.stringify(t.expected);
    const isErr = r ? !r.ok : false;
    const got =
      !r || r.v == null ? "<sin salida>" : isErr ? "⚠ " + r.v : r.v;
    return {
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: r != null && r.ok && r.v === expected,
    };
  });

  const ok = results.length > 0 && results.every((r) => r.pass);
  return { ok, results };
}
