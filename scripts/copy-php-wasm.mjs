#!/usr/bin/env node
/**
 * copy-php-wasm.mjs — Copia el runtime web de php-wasm a `public/php-wasm/` para
 * poder cargarlo en el navegador sin que el bundler de Next intente empaquetar
 * el .wasm. La app hace `import('/php-wasm/PhpWeb.mjs')` y el runtime resuelve
 * su .wasm de forma relativa a esa URL.
 *
 * Uso:  pnpm setup:php   (o automáticamente en postinstall)
 */
import { mkdir, copyFile, readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "node_modules", "php-wasm");
const DEST = join(__dirname, "..", "public", "php-wasm");
const RUNTIME = "php8.5-web.mjs";

async function main() {
  await mkdir(DEST, { recursive: true });

  // 1) Todos los módulos loader (.mjs) — son pequeños.
  const files = await readdir(SRC);
  for (const f of files.filter((f) => f.endsWith(".mjs"))) {
    await copyFile(join(SRC, f), join(DEST, f));
  }

  // 2) El .wasm/.data que referencia el runtime elegido.
  const runtime = await readFile(join(SRC, RUNTIME), "utf8");
  const assets = [...runtime.matchAll(/[0-9a-f]{40}\.(?:wasm|data)/g)].map(
    (m) => m[0],
  );
  for (const a of new Set(assets)) {
    await copyFile(join(SRC, a), join(DEST, a));
  }

  console.log(
    `✔ php-wasm copiado a public/php-wasm (${new Set(assets).size} asset(s) binarios).`,
  );
}

main().catch((e) => {
  console.error("✖ copy-php-wasm:", e.message);
  process.exit(1);
});
