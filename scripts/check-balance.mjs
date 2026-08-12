#!/usr/bin/env node
/**
 * check-balance.mjs — comprueba que la campaña es superable.
 *
 * La puerta de experiencia de un capítulo (`xpParaRetos`) tiene que poder
 * alcanzarse venciendo SÓLO a sus enemigos normales: el jefe está detrás de los
 * retos de código, así que su experiencia no cuenta para abrirlos. Si la puerta
 * pide más de lo que dan los enemigos, el capítulo queda encallado — y eso no
 * lo detecta ni TypeScript ni el build.
 *
 * IMPORTANTE: valida la NARRATIVA COMPARTIDA (data/narrative/community.ts), que
 * es lo que juegan de verdad TODAS las aventuras (PHP, JS, TS, Go, React…) al
 * fundirse con su temario. Los CHAPTER_* de data/chapters.ts son formato antiguo.
 *
 * Uso:  pnpm check:balance
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(
  join(raiz, "data", "narrative", "community.ts"),
  "utf8",
);

// Cada NARR_COMMUNITY_N es un capítulo jugable.
const capitulos = [
  ...src.matchAll(
    /export const NARR_COMMUNITY_(\d+)[\s\S]*?\n\};/g,
  ),
].map((m) => ({ num: +m[1], bloque: m[0] }));

let fallos = 0;
for (const { num, bloque } of capitulos.sort((a, b) => a.num - b.num)) {
  const puerta = +(bloque.match(/xpParaRetos:\s*(\d+)/)?.[1] ?? 0);

  // Cada enemigo va dentro de un `enemy: { ... }`. Sacamos su xp y si es jefe.
  const enemigos = [...bloque.matchAll(/enemy:\s*\{([\s\S]*?)\n {6}\},/g)].map(
    (m) => {
      const cuerpo = m[1];
      return {
        xp: +(cuerpo.match(/xp:\s*(\d+)/)?.[1] ?? 0),
        jefe: /boss:\s*true/.test(cuerpo),
      };
    },
  );

  const normales = enemigos.filter((e) => !e.jefe);
  const disponible = normales.reduce((a, e) => a + e.xp, 0);
  const jefe = enemigos.find((e) => e.jefe);

  if (!puerta) {
    console.error(`✗ Capítulo ${num}: sin xpParaRetos (¿narrativa incompleta?).`);
    fallos++;
    continue;
  }
  if (disponible < puerta) {
    fallos++;
    console.error(
      `✗ Capítulo ${num}: la puerta pide ${puerta} XP pero sus enemigos normales sólo dan ${disponible}. ` +
        `Faltan ${puerta - disponible}.`,
    );
    continue;
  }
  if (!jefe) {
    fallos++;
    console.error(
      `✗ Capítulo ${num}: exige experiencia pero no tiene jefe que desbloquee el siguiente.`,
    );
    continue;
  }
  console.log(
    `✓ Capítulo ${String(num).padStart(2)} · puerta ${String(puerta).padStart(3)} XP · ` +
      `enemigos ${normales.map((e) => e.xp).join("+")} = ${disponible}` +
      (disponible === puerta ? " (justo)" : ` (margen ${disponible - puerta})`),
  );
}

// Todo capítulo con `unlockedBy` debe apuntar a uno que tenga jefe.
for (const { num, bloque } of capitulos) {
  const previo = +(bloque.match(/unlockedBy:\s*(\d+)/)?.[1] ?? 0);
  if (!previo) continue;
  const anterior = capitulos.find((c) => c.num === previo);
  if (!anterior || !/boss:\s*true/.test(anterior.bloque)) {
    fallos++;
    console.error(
      `✗ Capítulo ${num} depende del ${previo}, que no tiene jefe: quedaría inalcanzable.`,
    );
  }
}

if (fallos) {
  console.error(`\n${fallos} problema(s) de equilibrio.`);
  process.exit(1);
}
console.log("\nCampaña superable (narrativa compartida).");
