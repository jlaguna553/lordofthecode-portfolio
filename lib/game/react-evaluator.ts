import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de React. Como TypeScript, React no se ejecuta directo: hay que
 * TRANSPILAR el JSX a llamadas `React.createElement` y luego correr el JS.
 *
 * - Transpilamos con el compilador oficial `typescript` (`jsx: React`), ya que
 *   es dependencia del proyecto.
 * - Ejecutamos el componente del jugador y RENDERIZAMOS a HTML con
 *   `renderToStaticMarkup` de `react-dom/server` (build de navegador). El test
 *   compara ese HTML (o cualquier valor que devuelva la expresión) con lo
 *   esperado — mismo protocolo de test_cases que los demás evaluadores.
 * - En el arnés, el jugador dispone de `React`, de `render(el)` (que devuelve el
 *   HTML estático) y de sus propios componentes. Las expresiones de test usan
 *   JSX: `render(<Saludo nombre="Frodo" />)`.
 *
 * Todo se carga de forma diferida la primera vez que se abre un reto de React.
 */

type TsModule = typeof import("typescript");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactModule = any;
type RenderFn = (el: unknown) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CreateRoot = (container: Element) => any;
type FlushSync = (fn: () => void) => void;

interface ReactBundle {
  React: ReactModule;
  render: RenderFn;
  createRoot: CreateRoot;
  flushSync: FlushSync;
}

let tsPromise: Promise<TsModule> | null = null;
let reactPromise: Promise<ReactBundle> | null = null;

function getTs(): Promise<TsModule> {
  if (!tsPromise) tsPromise = import("typescript");
  return tsPromise;
}

function getReact(): Promise<ReactBundle> {
  if (!reactPromise) {
    reactPromise = (async () => {
      const [React, server, client, dom] = await Promise.all([
        import("react").then((m) => m.default ?? m),
        // Build de navegador de react-dom/server: trae renderToStaticMarkup.
        import("react-dom/server.browser"),
        // Cliente: createRoot para montar en un DOM y poder simular eventos.
        import("react-dom/client"),
        // flushSync para forzar el render inicial de forma síncrona.
        import("react-dom"),
      ]);
      const render = (el: unknown) =>
        (server as { renderToStaticMarkup: (e: unknown) => string })
          .renderToStaticMarkup(el);
      const createRoot = (client as { createRoot: CreateRoot }).createRoot;
      const flushSync = (dom as { flushSync: FlushSync }).flushSync;
      return { React, render, createRoot, flushSync };
    })();
  }
  return reactPromise;
}

export function reactSupported(): boolean {
  return typeof window !== "undefined";
}

/** Precarga el compilador y React mientras el jugador lee el lore. */
export function warmupReact(): void {
  void getTs();
  void getReact();
}

/** Quita un posible bloque markdown ```jsx ... ``` envolvente. */
function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/** Transpila JSX/TSX a JS (`React.createElement`). Devuelve el JS y errores. */
function transpile(
  ts: TsModule,
  code: string,
): { js: string; error: string | null } {
  const out = ts.transpileModule(stripFences(code), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.React, // JSX -> React.createElement(...)
    },
    reportDiagnostics: true,
  });
  const diag = (out.diagnostics ?? []).find(
    (d) => d.category === ts.DiagnosticCategory.Error,
  );
  const error = diag
    ? ts.flattenDiagnosticMessageText(diag.messageText, "\n")
    : null;
  return { js: out.outputText, error };
}

/** Transpila una expresión de test (con JSX) y la deja lista para incrustar. */
function transpileExpr(ts: TsModule, expr: string): string {
  // transpileModule la trata como sentencia-expresión; quitamos el `;` final.
  const { js } = transpile(ts, expr);
  return js.trim().replace(/;+\s*$/, "");
}

interface HarnessOut {
  results: { ok: boolean; v: string }[];
}

export async function runReactChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  let ts: TsModule;
  let React: ReactModule;
  let render: RenderFn;
  let createRoot: CreateRoot;
  let flushSync: FlushSync;
  try {
    [ts, { React, render, createRoot, flushSync }] = await Promise.all([
      getTs(),
      getReact(),
    ]);
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }

  // Transpilar apoyo + código del jugador. Un error de sintaxis se muestra.
  const support = challenge.support_code
    ? transpile(ts, challenge.support_code)
    : { js: "", error: null };
  const player = transpile(ts, playerCode);
  const synErr = support.error ?? player.error;
  if (synErr) {
    return { ok: false, results: [], phpError: synErr };
  }

  const exprs = challenge.test_cases.map((t) => transpileExpr(ts, t.input));

  const lines: string[] = [
    '"use strict";',
    "const __out = { results: [] };",
    'const __ser = (v) => (v === undefined ? "null" : JSON.stringify(v));',
    // Hooks al alcance del jugador (normalmente vendrían de `import`).
    "const { useState, useReducer, useMemo, useCallback } = React;",
    // Render estático a HTML (caps 1-2): render(el) -> string.
    "const render = (el) => __render(el);",
    // Montaje interactivo (useState y eventos): mount(el) renderiza en un DOM
    // real y permite simular clicks. Los eventos "discretos" (click) los vacía
    // React de forma síncrona, así que tras .click() el DOM ya está actualizado.
    "const mount = (el) => {",
    "  const __c = document.createElement('div');",
    "  document.body.appendChild(__c);",
    "  const __root = __createRoot(__c);",
    "  __flushSync(() => __root.render(el));",
    "  const __find = (sel) => (sel ? __c.querySelector(sel) : __c);",
    "  const api = {",
    "    html: () => __c.innerHTML,",
    "    text: (sel) => { const n = __find(sel); return n ? n.textContent : null; },",
    // El click dispara el handler de React (setState); flushSync fuerza el
    // re-render de forma síncrona, así el DOM ya refleja el cambio al leerlo.
    "    click: (sel) => { const n = sel ? __c.querySelector(sel) : __c.querySelector('button'); if (n) __flushSync(() => n.click()); return api; },",
    // Escribe en un input controlado: usa el setter NATIVO de value y dispara el
    // evento 'input' (que React escucha como onChange), todo dentro de flushSync.
    "    fill: (sel, value) => { const n = sel ? __c.querySelector(sel) : __c.querySelector('input'); if (n) { const d = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(n), 'value'); __flushSync(() => { d.set.call(n, value); n.dispatchEvent(new Event('input', { bubbles: true })); }); } return api; },",
    "  };",
    "  return api;",
    "};",
    support.js,
    player.js,
  ];
  exprs.forEach((expr, i) => {
    lines.push(
      `try { __out.results[${i}] = { ok: true, v: __ser(${expr}) }; }` +
        ` catch (e) { __out.results[${i}] = { ok: false, v: String((e && e.message) || e) }; }`,
    );
  });
  lines.push("return __out;");

  let out: HarnessOut;
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function(
      "React",
      "__render",
      "__createRoot",
      "__flushSync",
      lines.join("\n"),
    );
    out = fn(React, render, createRoot, flushSync) as HarnessOut;
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }

  const results: TestResult[] = challenge.test_cases.map((t, i) => {
    const r = out.results[i];
    const expected = JSON.stringify(t.expected);
    const isErr = r ? !r.ok : false;
    const got =
      !r || r.v == null ? "<sin salida>" : isErr ? "⚠ " + r.v : r.v;
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
