import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de JavaScript. A diferencia de PHP (php-wasm) y Python (Pyodide),
 * JS se ejecuta de forma nativa: no hay runtime que descargar. El código del
 * jugador corre dentro de una función aislada (`new Function`), que devuelve los
 * resultados de cada test ya serializados con `JSON.stringify` — el mismo
 * formato con el que se compara el valor esperado.
 *
 * Nota: como los evaluadores de PHP y Python, corre en el hilo principal; un
 * bucle infinito en el código del jugador colgaría la pestaña. Es un riesgo
 * asumido, consistente con los demás lenguajes.
 */

interface HarnessOut {
  results: { ok: boolean; v: string }[];
  sutErr: string | null;
}

export function jsSupported(): boolean {
  return true;
}

/** No hay nada que precargar en JS. */
export function warmupJs(): void {
  /* nativo: sin runtime */
}

/** Quita un posible bloque markdown ```js ... ``` envolvente. */
function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/**
 * Construye el cuerpo de la función que ejecuta el código del jugador y recoge
 * los resultados. Devuelve un objeto `{ results, sutErr }`.
 */
export function buildJsHarness(playerCode: string, c: PooChallenge): string {
  const lines: string[] = [
    '"use strict";',
    "const __out = { results: [], sutErr: null };",
    "const __ser = (v) => (v === undefined ? \"null\" : JSON.stringify(v));",
    c.support_code ?? "",
    stripFences(playerCode),
  ];

  if (c.sut) {
    lines.push(
      "let __sut;",
      `try { __sut = ${c.sut}; } catch (e) { __out.sutErr = String((e && e.message) || e); __sut = null; }`,
    );
  }

  c.test_cases.forEach((t, i) => {
    const expr = t.raw || !c.sut ? t.input : `__sut.${t.input}`;
    lines.push(
      `try { __out.results[${i}] = { ok: true, v: __ser(${expr}) }; }` +
        ` catch (e) { __out.results[${i}] = { ok: false, v: String((e && e.message) || e) }; }`,
    );
  });

  lines.push("return __out;");
  return lines.join("\n");
}

function parseOutput(out: HarnessOut, challenge: PooChallenge): EvalResult {
  const results: TestResult[] = [];

  challenge.test_cases.forEach((t, i) => {
    const r = out.results[i];
    const expected = JSON.stringify(t.expected);
    const isErr = r ? !r.ok : false;
    const got =
      !r || r.v == null
        ? "<sin salida>"
        : isErr
          ? "⚠ " + r.v
          : r.v;
    results.push({
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: Boolean(r) && r.ok && r.v === expected,
    });
  });

  const phpError = out.sutErr
    ? `Al construir el objeto: ${out.sutErr}`
    : undefined;
  const ok = results.length > 0 && results.every((r) => r.pass);
  return { ok, results, phpError };
}

/** Ejecuta el código JavaScript del jugador contra los test_cases del reto. */
export async function runJsChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function(buildJsHarness(playerCode, challenge));
    const out = fn() as HarnessOut;
    return parseOutput(out, challenge);
  } catch (e) {
    // Error de sintaxis o de nivel superior (no atrapado por los try por test).
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }
}
