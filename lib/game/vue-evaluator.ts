import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de Vue 3. Carga el build GLOBAL de Vue (con compilador de plantillas)
 * desde `/vue/vue.global.prod.js` (copiado por `scripts/copy-vue.mjs`), como
 * sql.js o Pyodide, para no pasarlo por el bundler.
 *
 * El jugador escribe uno o varios componentes de Vue (objetos con `template`,
 * `props`, `setup`/`data`, `computed`…). En los tests dispone de:
 * - `render(comp, props)` → HTML del componente montado (síncrono).
 * - `texto(comp, props, sel)` → textContent de `sel` (o de todo si falta).
 * - `trasClick(comp, props, sel)` / `trasClicks(comp, props, sel, n)` → HTML tras
 *   pulsar (async: espera al `nextTick` de Vue). Los tests se evalúan con `await`.
 */

interface VueGlobal {
  createApp: (comp: unknown, props?: unknown) => { mount: (el: Element) => unknown; unmount: () => void };
  ref: unknown;
  reactive: unknown;
  computed: unknown;
  nextTick: () => Promise<void>;
  watch: unknown;
}

let vuePromise: Promise<VueGlobal> | null = null;

export function vueSupported(): boolean {
  return typeof window !== "undefined";
}

function loadVueScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { Vue?: VueGlobal };
    if (w.Vue) return resolve();
    const s = document.createElement("script");
    s.src = "/vue/vue.global.prod.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar el runtime de Vue"));
    document.head.appendChild(s);
  });
}

function getVue(): Promise<VueGlobal> {
  if (!vuePromise) {
    vuePromise = (async () => {
      await loadVueScript();
      return (window as unknown as { Vue: VueGlobal }).Vue;
    })();
  }
  return vuePromise;
}

export function warmupVue(): void {
  if (vueSupported()) void getVue();
}

function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/** Helpers de montaje inyectados antes del código del jugador. */
const HARNESS_PRELUDE = `
const { createApp, ref, reactive, computed, nextTick, watch, watchEffect, onMounted } = __Vue;
function __mk(comp, props) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  const app = createApp(comp, props || {});
  app.mount(el);
  return { app, el };
}
function render(comp, props) {
  const { app, el } = __mk(comp, props);
  const html = el.innerHTML;
  app.unmount(); el.remove();
  return html;
}
function texto(comp, props, sel) {
  const { app, el } = __mk(comp, props);
  const n = sel ? el.querySelector(sel) : el;
  const t = n ? n.textContent : null;
  app.unmount(); el.remove();
  return t;
}
async function trasClick(comp, props, sel) {
  const { app, el } = __mk(comp, props);
  const n = sel ? el.querySelector(sel) : el.querySelector('button');
  if (n) n.click();
  await nextTick();
  const html = el.innerHTML;
  app.unmount(); el.remove();
  return html;
}
async function trasClicks(comp, props, sel, veces) {
  const { app, el } = __mk(comp, props);
  for (let i = 0; i < veces; i++) {
    const n = sel ? el.querySelector(sel) : el.querySelector('button');
    if (n) n.click();
    await nextTick();
  }
  const html = el.innerHTML;
  app.unmount(); el.remove();
  return html;
}
async function trasInput(comp, props, sel, valor) {
  const { app, el } = __mk(comp, props);
  const n = el.querySelector(sel);
  if (n) { n.value = valor; n.dispatchEvent(new Event('input')); }
  await nextTick();
  const html = el.innerHTML;
  app.unmount(); el.remove();
  return html;
}
`;

function buildVueBody(playerCode: string, c: PooChallenge): string {
  const lines: string[] = [
    HARNESS_PRELUDE,
    "const __out = { results: [] };",
    'const __ser = (v) => (v === undefined ? "null" : JSON.stringify(v));',
    c.support_code ?? "",
    stripFences(playerCode),
  ];
  c.test_cases.forEach((t, i) => {
    lines.push(
      `try { __out.results[${i}] = { ok: true, v: __ser(await (${t.input})) }; }` +
        ` catch (e) { __out.results[${i}] = { ok: false, v: String((e && e.message) || e) }; }`,
    );
  });
  lines.push("return __out;");
  return lines.join("\n");
}

interface HarnessOut {
  results: { ok: boolean; v: string }[];
}

function parseOutput(out: HarnessOut, challenge: PooChallenge): EvalResult {
  const results: TestResult[] = challenge.test_cases.map((t, i) => {
    const r = out.results[i];
    const expected = JSON.stringify(t.expected);
    const isErr = r ? !r.ok : false;
    const got = !r || r.v == null ? "<sin salida>" : isErr ? "⚠ " + r.v : r.v;
    return {
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: Boolean(r) && r.ok && r.v === expected,
    };
  });
  const ok = results.length > 0 && results.every((r) => r.pass);
  return { ok, results };
}

const AsyncFunction = Object.getPrototypeOf(async function () {})
  .constructor as new (...args: string[]) => (...a: unknown[]) => Promise<unknown>;

/** Ejecuta el/los componente(s) Vue del jugador contra los test_cases del reto. */
export async function runVueChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  let Vue: VueGlobal;
  try {
    Vue = await getVue();
  } catch (e) {
    return { ok: false, results: [], phpError: e instanceof Error ? e.message : String(e) };
  }
  try {
    const fn = new AsyncFunction("__Vue", buildVueBody(playerCode, challenge));
    const out = (await fn(Vue)) as HarnessOut;
    return parseOutput(out, challenge);
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }
}
