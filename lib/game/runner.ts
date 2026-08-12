import type { EvalResult, PooChallenge } from "./types";
import { runChallenge as runPhp, warmupPhp } from "./evaluator";
import { runPyChallenge, warmupPython } from "./py-evaluator";
import { runJsChallenge, warmupJs } from "./js-evaluator";
import { runTsChallenge, warmupTs } from "./ts-evaluator";
import { runGoChallenge, warmupGo } from "./go-evaluator";
import { runReactChallenge, warmupReact } from "./react-evaluator";
import { runSqlChallenge, warmupSql } from "./sql-evaluator";
import { runVueChallenge, warmupVue } from "./vue-evaluator";
import { runAwsChallenge, warmupAws } from "./aws-evaluator";
import { runDockerChallenge, warmupDocker } from "./docker-evaluator";

/**
 * Punto único de ejecución de retos: despacha al evaluador según `challenge.lang`
 * (php-wasm, Pyodide, JavaScript nativo, TypeScript transpilado, Go interpretado
 * en WASM, React con JSX renderizado a HTML o SQL con SQLite en WASM). Cada
 * aventura usa el suyo.
 */

export type Lang =
  | "php"
  | "python"
  | "javascript"
  | "typescript"
  | "go"
  | "react"
  | "sql"
  | "vue"
  | "aws"
  | "docker";

export function langOf(c: PooChallenge): Lang {
  return c.lang ?? "php";
}

/** Precarga el runtime del lenguaje del reto mientras el jugador lee el lore. */
export function warmup(c: PooChallenge): void {
  const lang = langOf(c);
  if (lang === "python") warmupPython(c.packages);
  else if (lang === "javascript") warmupJs();
  else if (lang === "typescript") warmupTs();
  else if (lang === "go") warmupGo();
  else if (lang === "react") warmupReact();
  else if (lang === "sql") warmupSql();
  else if (lang === "vue") warmupVue();
  else if (lang === "aws") warmupAws();
  else if (lang === "docker") warmupDocker();
  else warmupPhp();
}

export function runChallenge(
  code: string,
  c: PooChallenge,
): Promise<EvalResult> {
  const lang = langOf(c);
  if (lang === "python") return runPyChallenge(code, c);
  if (lang === "javascript") return runJsChallenge(code, c);
  if (lang === "typescript") return runTsChallenge(code, c);
  if (lang === "go") return runGoChallenge(code, c);
  if (lang === "react") return runReactChallenge(code, c);
  if (lang === "sql") return runSqlChallenge(code, c);
  if (lang === "vue") return runVueChallenge(code, c);
  if (lang === "aws") return runAwsChallenge(code, c);
  if (lang === "docker") return runDockerChallenge(code, c);
  return runPhp(code, c);
}
