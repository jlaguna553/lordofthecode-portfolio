import {
  hasKey,
  LEGACY_KEY,
  loadRaw,
  removeKey,
  saveProgress,
  type Progress,
} from "@/lib/game/progress";
import { adventureOfChapter } from "./adventures";

/**
 * Migra la partida antigua —una sola, que mezclaba PHP (caps 1-14) y Python
 * (15-16)— a progresos separados por aventura. Se ejecuta una vez: reparte cada
 * capítulo completado a la aventura que lo contiene y borra la clave antigua.
 * Si no hay partida antigua, no hace nada.
 */
export function migrateLegacyProgress(): void {
  if (!hasKey(LEGACY_KEY)) return;
  const legacy = loadRaw(LEGACY_KEY);

  const buckets: Record<string, Progress> = {};
  const bucket = (id: string): Progress =>
    (buckets[id] ??= {
      version: 1,
      completed: {},
      lastChapter: 1,
      code: {},
      stats: {},
    });

  // Nodos completados: keyed por número de capítulo.
  for (const [chapStr, nodes] of Object.entries(legacy.completed)) {
    const adv = adventureOfChapter(Number(chapStr));
    if (adv) bucket(adv.id).completed[chapStr] = nodes;
  }

  // Código y estadísticas: keyed por "capítulo:nodeId".
  for (const [k, v] of Object.entries(legacy.code ?? {})) {
    const adv = adventureOfChapter(Number(k.split(":")[0]));
    if (adv) (bucket(adv.id).code ??= {})[k] = v;
  }
  for (const [k, v] of Object.entries(legacy.stats ?? {})) {
    const adv = adventureOfChapter(Number(k.split(":")[0]));
    if (adv) (bucket(adv.id).stats ??= {})[k] = v;
  }

  // El héroe elegido pertenece a la Comunidad (PHP); Python lo comparte pero no
  // desbloquea héroes propios.
  if (legacy.hero && buckets["php"]) buckets["php"].hero = legacy.hero;

  for (const [id, p] of Object.entries(buckets)) saveProgress(id, p);
  removeKey(LEGACY_KEY);
}
