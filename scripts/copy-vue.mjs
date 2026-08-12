#!/usr/bin/env node
/**
 * copy-vue.mjs — Copia el build global de Vue (con el compilador de plantillas)
 * a `public/vue/` para cargarlo en el navegador con un <script>. El evaluador de
 * Vue lo usa vía `window.Vue` (createApp + reactividad + compilador), como
 * sql.js o Pyodide, sin pasarlo por el bundler.
 */
import { mkdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "node_modules", "vue", "dist", "vue.global.prod.js");
const DEST_DIR = join(__dirname, "..", "public", "vue");

async function main() {
  await mkdir(DEST_DIR, { recursive: true });
  await copyFile(SRC, join(DEST_DIR, "vue.global.prod.js"));
  console.log("✔ Vue copiado a public/vue/vue.global.prod.js");
}

main().catch((e) => {
  console.error("Error copiando Vue:", e.message);
  process.exit(1);
});
