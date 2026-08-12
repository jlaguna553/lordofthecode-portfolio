import type { EvalResult, PooChallenge } from "./types";
import { runJsChallenge } from "./js-evaluator";

/**
 * Evaluador de TypeScript. TS no se ejecuta directo en el navegador: hay que
 * TRANSPILARLO a JavaScript (quitar los tipos) y luego correr el JS resultante.
 *
 * Usamos el compilador oficial `typescript` (ya es dependencia del proyecto)
 * vía `ts.transpileModule`, que hace transpile-only: rápido, sin type-check
 * completo, exactamente lo que necesita el puzzle. Se carga de forma diferida
 * con import() dinámico (Next.js lo separa en su propio chunk), igual que
 * Pyodide o php-wasm sólo cargan cuando abres un reto de su lenguaje.
 *
 * Una vez transpilado, delegamos en el evaluador de JavaScript: mismo arnés,
 * mismo protocolo de test_cases. El jugador escribe tipos; el test corre el JS.
 */

type TsModule = typeof import("typescript");

let tsPromise: Promise<TsModule> | null = null;

function getTs(): Promise<TsModule> {
  if (!tsPromise) tsPromise = import("typescript");
  return tsPromise;
}

export function tsSupported(): boolean {
  return true;
}

/** Precarga el compilador mientras el jugador lee el lore. */
export function warmupTs(): void {
  void getTs();
}

/** Quita un posible bloque markdown ```ts ... ``` envolvente. */
function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/** Transpila TS a JS quitando los tipos. Devuelve el JS y errores de sintaxis. */
function transpile(
  ts: TsModule,
  code: string,
): { js: string; error: string | null } {
  const out = ts.transpileModule(stripFences(code), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      // Sin comprobación de tipos: sólo borrar anotaciones y emitir JS.
    },
    reportDiagnostics: true,
  });
  // transpileModule sólo detecta errores SINTÁCTICOS (no de tipos); si el
  // código no parsea, lo señalamos para que el jugador lo vea.
  const diag = (out.diagnostics ?? []).find(
    (d) => d.category === ts.DiagnosticCategory.Error,
  );
  const error = diag
    ? ts.flattenDiagnosticMessageText(diag.messageText, "\n")
    : null;
  return { js: out.outputText, error };
}

/** Ejecuta el código TypeScript del jugador contra los test_cases del reto. */
export async function runTsChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  let ts: TsModule;
  try {
    ts = await getTs();
  } catch {
    return {
      ok: false,
      results: [],
      phpError: "No se pudo cargar el compilador de TypeScript.",
    };
  }

  const player = transpile(ts, playerCode);
  if (player.error) {
    return { ok: false, results: [], phpError: player.error };
  }

  // El support_code también puede llevar tipos: hay que transpilarlo.
  let support = challenge.support_code;
  if (support) {
    const sup = transpile(ts, support);
    if (sup.error) {
      return {
        ok: false,
        results: [],
        phpError: `Error en el código de soporte: ${sup.error}`,
      };
    }
    support = sup.js;
  }

  // Delegamos en el evaluador de JS con el código ya transpilado.
  return runJsChallenge(player.js, { ...challenge, support_code: support });
}
