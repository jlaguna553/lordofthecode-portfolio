import type { EvalResult, PooChallenge, TestResult } from "./types";

/**
 * Evaluador de SQL con SQLite compilado a WebAssembly (sql.js). El runtime se
 * carga desde `/sql/sql-wasm.js` (copiado por `scripts/copy-sql-wasm.mjs`), como
 * php-wasm y Pyodide, para no pasarlo por el bundler.
 *
 * Modelo del reto:
 * - `support_code` contiene el ESQUEMA y los datos sembrados (CREATE TABLE +
 *   INSERT). Se ejecuta primero, sobre una base de datos nueva por intento.
 * - El código del jugador es UNA consulta `SELECT`. Se ejecuta y el conjunto de
 *   filas resultante (array de arrays) se serializa con JSON y se compara con el
 *   `expected` del test_case (que también es un array de filas).
 *
 * Los retos de SQL tienen UN único test_case cuyo `expected` es el resultado
 * esperado de la consulta.
 */

interface SqlDb {
  run(sql: string): void;
  exec(sql: string): { columns: string[]; values: unknown[][] }[];
  close(): void;
}
interface SqlJsStatic {
  Database: new () => SqlDb;
}
type InitSqlJs = (cfg: {
  locateFile: (f: string) => string;
}) => Promise<SqlJsStatic>;

let sqlPromise: Promise<SqlJsStatic> | null = null;

export function sqlSupported(): boolean {
  return typeof window !== "undefined";
}

/** Inyecta el loader UMD de sql.js, que expone `window.initSqlJs`. */
function loadSqlScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { initSqlJs?: InitSqlJs };
    if (w.initSqlJs) return resolve();
    const s = document.createElement("script");
    s.src = "/sql/sql-wasm.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar el runtime de SQLite"));
    document.head.appendChild(s);
  });
}

function getSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      await loadSqlScript();
      const initSqlJs = (window as unknown as { initSqlJs: InitSqlJs }).initSqlJs;
      return initSqlJs({ locateFile: (f: string) => `/sql/${f}` });
    })();
  }
  return sqlPromise;
}

/** Precarga SQLite mientras el jugador lee el lore. */
export function warmupSql(): void {
  if (sqlSupported()) void getSql();
}

function stripFences(code: string): string {
  return code.replace(/^\s*```\w*\n?/, "").replace(/```\s*$/, "");
}

/** Ejecuta la consulta SQL del jugador contra el esquema sembrado del reto. */
export async function runSqlChallenge(
  playerCode: string,
  challenge: PooChallenge,
): Promise<EvalResult> {
  let SQL: SqlJsStatic;
  try {
    SQL = await getSql();
  } catch (e) {
    return {
      ok: false,
      results: [],
      phpError: e instanceof Error ? e.message : String(e),
    };
  }

  const db = new SQL.Database();
  let rows: unknown[][] | null = null;
  let queryErr: string | undefined;
  let schemaErr: string | undefined;
  try {
    if (challenge.support_code) db.run(challenge.support_code);
  } catch (e) {
    schemaErr = e instanceof Error ? e.message : String(e);
  }
  if (!schemaErr) {
    try {
      const res = db.exec(stripFences(playerCode));
      // La última sentencia con filas es el resultado de la consulta.
      const last = res.length > 0 ? res[res.length - 1] : null;
      rows = last ? last.values : [];
    } catch (e) {
      queryErr = e instanceof Error ? e.message : String(e);
    }
  }
  db.close();

  if (schemaErr) {
    return {
      ok: false,
      results: [],
      phpError: `Al preparar la base de datos: ${schemaErr}`,
    };
  }

  const results: TestResult[] = challenge.test_cases.map((t) => {
    const expected = JSON.stringify(t.expected);
    const got = queryErr
      ? "⚠ " + queryErr
      : rows == null
        ? "<sin salida>"
        : JSON.stringify(rows);
    return {
      input: t.input,
      description: t.description,
      expected,
      got,
      pass: !queryErr && rows != null && JSON.stringify(rows) === expected,
    };
  });

  const ok = results.length > 0 && results.every((r) => r.pass);
  return { ok, results };
}
