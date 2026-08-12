/**
 * Persistencia del progreso en localStorage.
 *
 * El progreso es POR AVENTURA: cada campaña (php, python, javascript…) guarda el
 * suyo bajo `lotc:progress:v1:<adventureId>`. Así los números de capítulo de dos
 * aventuras distintas no colisionan. Todo el acceso es SSR-safe.
 */

const PREFIX = "lotc:progress:v1";
/** Clave de la partida antigua (una sola, sin aventura): se migra al arrancar. */
export const LEGACY_KEY = PREFIX;

const keyFor = (adventureId: string) => `${PREFIX}:${adventureId}`;

export interface Progress {
  version: 1;
  /** chapter (nº) -> ids de nodos resueltos */
  completed: Record<string, string[]>;
  /** último capítulo abierto */
  lastChapter: number;
  /**
   * Código escrito por el jugador, por reto: "<capítulo>:<nodeId>" -> código.
   * Campo añadido después; las partidas antiguas simplemente no lo traen.
   */
  code?: Record<string, string>;
  /** Métricas al resolver cada nodo, para la pantalla de estadísticas. */
  stats?: Record<string, NodeStats>;
  /**
   * Personaje con el que se juega. Los desbloqueados se derivan de los jefes
   * vencidos; esto sólo guarda CUÁL está elegido. Campo opcional: las partidas
   * anteriores simplemente juegan con Frodo.
   */
  hero?: string;
}

/** Cómo te fue en un nodo concreto. */
export interface NodeStats {
  /** Segundos desde que se abrió hasta resolverlo. */
  timeSec: number;
  /** Ejecuciones (o intentos del quiz) hasta acertar. */
  attempts: number;
  /** Pistas pedidas. */
  hints: number;
}

const EMPTY: Progress = { version: 1, completed: {}, lastChapter: 1, code: {}, stats: {} };

const codeKey = (chapter: number, nodeId: string) => `${chapter}:${nodeId}`;

/** Lee el progreso guardado bajo una clave concreta (o EMPTY si no hay). */
function readKey(key: string): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    if (parsed?.version !== 1 || typeof parsed.completed !== "object") {
      return EMPTY; // esquema desconocido: empezamos limpio
    }
    return {
      version: 1,
      completed: parsed.completed ?? {},
      lastChapter: parsed.lastChapter ?? 1,
      code: parsed.code ?? {}, // partidas anteriores no traían estos campos
      stats: parsed.stats ?? {},
      hero: parsed.hero,
    };
  } catch {
    return EMPTY; // localStorage bloqueado o JSON corrupto
  }
}

export function loadProgress(adventureId: string): Progress {
  return readKey(keyFor(adventureId));
}

/** Lee una clave cualquiera (para migrar la partida antigua). */
export function loadRaw(key: string): Progress {
  return readKey(key);
}

/** ¿Existe algo guardado bajo esa clave? */
export function hasKey(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

/** Borra una clave (para eliminar la partida antigua tras migrarla). */
export function removeKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignorar */
  }
}

export function saveProgress(adventureId: string, progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(keyFor(adventureId), JSON.stringify(progress));
  } catch {
    /* cuota llena o modo privado: el juego sigue funcionando en memoria */
  }
}

/** Nodos resueltos de un capítulo. */
export function completedOf(progress: Progress, chapter: number): Set<string> {
  return new Set(progress.completed[String(chapter)] ?? []);
}

/** Devuelve un progreso nuevo con `nodeId` marcado como resuelto. */
export function withNodeCompleted(
  progress: Progress,
  chapter: number,
  nodeId: string,
): Progress {
  const key = String(chapter);
  const prev = progress.completed[key] ?? [];
  if (prev.includes(nodeId)) return progress;
  return {
    ...progress,
    completed: { ...progress.completed, [key]: [...prev, nodeId] },
  };
}

/** Devuelve un progreso nuevo con otro personaje elegido. */
export function withHero(progress: Progress, hero: string): Progress {
  return { ...progress, hero };
}

/** Devuelve un progreso nuevo con el capítulo actual actualizado. */
export function withLastChapter(progress: Progress, chapter: number): Progress {
  return { ...progress, lastChapter: chapter };
}

/** Código guardado de un reto, o undefined si nunca lo escribió. */
export function codeFor(
  progress: Progress,
  chapter: number,
  nodeId: string,
): string | undefined {
  return progress.code?.[codeKey(chapter, nodeId)];
}

/** Devuelve un progreso nuevo con el código de ese reto guardado. */
export function withCode(
  progress: Progress,
  chapter: number,
  nodeId: string,
  code: string,
): Progress {
  return {
    ...progress,
    code: { ...(progress.code ?? {}), [codeKey(chapter, nodeId)]: code },
  };
}

/** Métricas guardadas de un nodo, si las hay. */
export function statsFor(
  progress: Progress,
  chapter: number,
  nodeId: string,
): NodeStats | undefined {
  return progress.stats?.[codeKey(chapter, nodeId)];
}

/**
 * Guarda las métricas de un nodo. Sólo escribe la PRIMERA vez que se resuelve:
 * así las estadísticas reflejan cómo te fue de verdad, no el repaso posterior.
 */
export function withStats(
  progress: Progress,
  chapter: number,
  nodeId: string,
  stats: NodeStats,
): Progress {
  const key = codeKey(chapter, nodeId);
  if (progress.stats?.[key]) return progress;
  return { ...progress, stats: { ...(progress.stats ?? {}), [key]: stats } };
}

export function emptyProgress(): Progress {
  return { version: 1, completed: {}, lastChapter: 1, code: {}, stats: {} };
}
