import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador PHP en el navegador vía php-wasm (WebAssembly, sin backend).
 *
 * - Carga el runtime vendorizado en /public/php-wasm (ver scripts/copy-php-wasm.mjs),
 *   con `webpackIgnore`/`turbopackIgnore` para que el bundler no lo empaquete.
 * - Reutiliza UNA instancia y llama `refresh()` antes de cada intento para poder
 *   redeclarar las clases del jugador (si no, PHP lanza "Cannot redeclare class").
 */

// Instancia única y buffers de salida (los listeners se registran una sola vez).
let phpPromise: Promise<PhpLike> | null = null;
const buffer = { out: "", err: "" };

interface PhpLike {
  binary: Promise<unknown>;
  refresh: () => Promise<unknown>;
  run: (code: string) => Promise<unknown>;
  addEventListener: (t: string, cb: (e: { detail: unknown[] }) => void) => void;
}

async function getPhp(): Promise<PhpLike> {
  if (phpPromise) return phpPromise;
  phpPromise = (async () => {
    const mod = await import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */
      "/php-wasm/PhpWeb.mjs" as string
    );
    // Fijamos la versión 8.5 (la que vendoriza scripts/copy-php-wasm.mjs).
    const php = new (
      mod as { PhpWeb: new (args?: { version?: string }) => PhpLike }
    ).PhpWeb({ version: "8.5" });
    php.addEventListener("output", (e) => (buffer.out += e.detail.join("")));
    php.addEventListener("error", (e) => (buffer.err += e.detail.join("")));
    await php.binary; // espera a que el wasm esté listo
    return php;
  })();
  return phpPromise;
}

/** ¿Está soportado (navegador con WebAssembly)? */
export function phpSupported(): boolean {
  return typeof window !== "undefined" && typeof WebAssembly !== "undefined";
}

/** Precarga el runtime (para lanzarlo mientras el jugador lee el lore). */
export function warmupPhp(): void {
  if (phpSupported()) void getPhp();
}

/** Quita el `<?php ... ?>` envolvente para poder incrustar el código. */
function stripTags(code: string): string {
  return code.replace(/^\s*<\?php/i, "").replace(/\?>\s*$/, "");
}

/** Construye el script PHP: soporte + código del jugador + arnés de tests. */
export function buildHarness(playerCode: string, c: PooChallenge): string {
  const lines: string[] = [
    "<?php",
    // Emitimos todo MENOS deprecations, pero en vez de dejar que PHP los
    // imprima, un manejador los acumula en $__warnings para poder mostrarlos
    // junto al test que los provocó (p. ej. "Undefined property": un método
    // llamado sin paréntesis). Sin esto, el aviso clave se perdía y el jugador
    // sólo veía "esperado X · obtuvo Y".
    "error_reporting(E_ALL & ~E_DEPRECATED);",
    "$__warnings = [];",
    "set_error_handler(function ($no, $str) { global $__warnings;" +
      " $__warnings[] = $str; return true; });",
    c.support_code ?? "",
    stripTags(playerCode),
  ];
  // Los retos de FUNCIÓN no declaran `sut`: se prueban llamando directamente.
  if (c.sut) {
    lines.push(
      `try { $__sut = ${c.sut}; } catch (\\Throwable $__e) {` +
        ` $__sut = null; echo "@@SUTERR@@" . $__e->getMessage() . "@@SUTERR@@"; }`,
      // Alias legible para los test_cases con expresión libre (`raw`).
      "$sut = $__sut;",
    );
  }
  c.test_cases.forEach((t, i) => {
    // `raw` evalúa la expresión tal cual (útil para comprobar __destruct).
    // Sin `sut`, la expresión es una llamada a función del jugador.
    const expr = t.raw || !c.sut ? t.input : `$__sut->${t.input}`;
    // Las flags hacen que json_encode produzca lo mismo que JSON.stringify:
    // sin escapar tildes (í) ni barras (\/), o fallarían las comparaciones.
    const enc = `json_encode(${expr}, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)`;
    lines.push(
      // Vaciamos los avisos antes del test para atribuir sólo los suyos.
      "$__warnings = [];",
      `try { echo "@@T${i}S@@" . ${enc} . "@@T${i}E@@"; }` +
        ` catch (\\Throwable $__e) {` +
        ` echo "@@T${i}S@@__ERR__" . $__e->getMessage() . "@@T${i}E@@"; }`,
      // Avisos acumulados durante este test (deduplicados).
      `echo "@@W${i}S@@" . implode(" · ", array_unique($__warnings)) . "@@W${i}E@@";`,
    );
  });
  return lines.join("\n");
}

function parseOutput(
  out: string,
  err: string,
  challenge: PooChallenge,
): EvalResult {
  const results: TestResult[] = [];
  let anyMissing = false;

  challenge.test_cases.forEach((t, i) => {
    const m = out.match(new RegExp(`@@T${i}S@@([\\s\\S]*?)@@T${i}E@@`));
    const raw = m ? m[1] : null;
    if (raw === null) anyMissing = true;
    const expected = JSON.stringify(t.expected);
    const isErr = raw?.startsWith("__ERR__") ?? false;
    const got =
      raw === null
        ? "<sin salida>"
        : isErr
          ? "⚠ " + raw.replace("__ERR__", "")
          : raw;
    const w = out.match(new RegExp(`@@W${i}S@@([\\s\\S]*?)@@W${i}E@@`))?.[1];
    results.push({
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: !isErr && raw !== null && raw === expected,
      warning: w ? w.trim() : undefined,
    });
  });

  // Salida "libre" del jugador (echo/print) sin los marcadores del arnés.
  const stdout = out
    .replace(/@@T\d+S@@[\s\S]*?@@T\d+E@@/g, "")
    .replace(/@@W\d+S@@[\s\S]*?@@W\d+E@@/g, "")
    .replace(/@@SUTERR@@[\s\S]*?@@SUTERR@@/g, "")
    .trim();

  const sutErr = out.match(/@@SUTERR@@([\s\S]*?)@@SUTERR@@/)?.[1];
  const errText = [err, stdout].filter(Boolean).join("\n").trim();
  let phpError: string | undefined;
  if (sutErr) phpError = `Al construir el objeto: ${sutErr}`;
  else if (anyMissing && /error|exception|warning|fatal/i.test(errText))
    phpError = errText.slice(0, 600);

  const ok = results.length > 0 && results.every((r) => r.pass);
  return { ok, results, phpError, stdout: stdout || undefined };
}

/** Ejecuta el código del jugador contra los test_cases del reto. */
export async function runChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  const php = await getPhp();
  await php.refresh(); // reset: permite redeclarar clases entre intentos
  buffer.out = "";
  buffer.err = "";
  await php.run(buildHarness(playerCode, challenge));
  return parseOutput(buffer.out, buffer.err, challenge);
}
