#!/usr/bin/env node
/**
 * copy-sql-wasm.mjs — Copia el runtime de sql.js (SQLite en WASM) a `public/sql/`
 * para cargarlo en el navegador sin que el bundler de Next empaquete el .wasm.
 * El evaluador inyecta `<script src="/sql/sql-wasm.js">` y el runtime resuelve
 * `sql-wasm.wasm` de forma relativa con `locateFile`.
 *
 * Uso:  pnpm setup:sql   (o dentro de `build`)
 */
import { mkdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "node_modules", "sql.js", "dist");
const DEST = join(__dirname, "..", "public", "sql");
const FILES = ["sql-wasm.js", "sql-wasm.wasm"];

async function main() {
  await mkdir(DEST, { recursive: true });
  for (const f of FILES) {
    await copyFile(join(SRC, f), join(DEST, f));
  }
  console.log(`✔ sql.js copiado a public/sql (${FILES.length} archivos).`);
}

main().catch((e) => {
  console.error("Error copiando sql.js:", e.message);
  process.exit(1);
});
