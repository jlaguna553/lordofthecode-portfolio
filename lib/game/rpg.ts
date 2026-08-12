/**
 * Progresión RPG: experiencia, niveles y qué está desbloqueado.
 *
 * La experiencia NO se guarda: se deriva de los nodos de combate que constan
 * como completados. Así el dato no puede desincronizarse del progreso real, no
 * se puede farmear repitiendo un enemigo ya vencido, y las partidas guardadas
 * de antes de existir el combate siguen siendo válidas sin migración.
 */

import type {
  BattleNode,
  ChallengeNode,
  Chapter,
  MapNode,
  Reward,
} from "./types";
import { completedOf, type Progress } from "./progress";

/**
 * Experiencia total necesaria para alcanzar cada nivel (el índice ES el nivel).
 * Tabla explícita y no fórmula: se toca a mano al equilibrar los capítulos.
 */
const UMBRALES = [
  0, // (nivel 0 no existe)
  0, // 1 — recién salido de Bolsón Cerrado
  60, // 2
  160, // 3
  300, // 4
  480, // 5
  700, // 6
  960, // 7
  1260, // 8
  1600, // 9
  1980, // 10
  2400, // 11
  2860, // 12
  3360, // 13
  3900, // 14
  4480, // 15
  5100, // 16
];

export const NIVEL_MAXIMO = UMBRALES.length - 1;

export interface NivelInfo {
  nivel: number;
  /** Experiencia acumulada dentro del nivel actual. */
  enNivel: number;
  /** Experiencia que pide el nivel actual para completarse (0 si es el máximo). */
  paraSubir: number;
}

/** Nivel y avance dentro de él a partir de la experiencia total. */
export function nivelDe(xp: number): NivelInfo {
  let nivel = 1;
  while (nivel < NIVEL_MAXIMO && xp >= UMBRALES[nivel + 1]) nivel++;
  const base = UMBRALES[nivel];
  const techo = nivel < NIVEL_MAXIMO ? UMBRALES[nivel + 1] : base;
  return { nivel, enNivel: xp - base, paraSubir: techo - base };
}

/** Vida con la que entras a un combate: subir de nivel te da margen de error. */
export function vidaMaxima(nivel: number): number {
  return 3 + nivel;
}

export function esBatalla(n: MapNode): n is BattleNode {
  return n.kind === "battle";
}

/** Enemigos de un capítulo, en orden de aparición. */
export function batallasDe(chapter: Chapter): BattleNode[] {
  return chapter.nodes.filter(esBatalla);
}

/** El jefe de COMBATE del capítulo, si lo tiene (undefined si el jefe es reto). */
export function jefeDe(chapter: Chapter): BattleNode | undefined {
  return batallasDe(chapter).find((b) => b.enemy.boss);
}

/** ¿Es este nodo un reto-JEFE (capstone orientado al lenguaje)? */
export function esRetoJefe(n: MapNode): n is ChallengeNode {
  return (n.kind ?? "challenge") === "challenge" && Boolean((n as ChallengeNode).boss);
}

/** El nodo-jefe del capítulo, sea combate (enemy.boss) o reto (challenge.boss). */
export function nodoJefe(chapter: Chapter): MapNode | undefined {
  return chapter.nodes.find(
    (n) => (n.kind === "battle" && n.enemy.boss) || esRetoJefe(n),
  );
}

/** La recompensa del jefe del capítulo, venga de combate o de reto-jefe. */
export function recompensaJefe(chapter: Chapter): Reward | undefined {
  const j = nodoJefe(chapter);
  if (!j) return undefined;
  return j.kind === "battle" ? j.enemy.reward : (j as ChallengeNode).reward;
}

/** Retos de código NO-jefe de un capítulo (los que abren al reto-jefe). */
function retosNormales(chapter: Chapter): MapNode[] {
  return chapter.nodes.filter(
    (n) => (n.kind ?? "challenge") === "challenge" && !esRetoJefe(n),
  );
}

/** Experiencia ganada en un capítulo concreto. */
export function xpDeCapitulo(chapter: Chapter, completados: Set<string>): number {
  return batallasDe(chapter)
    .filter((b) => completados.has(b.node_id))
    .reduce((suma, b) => suma + b.enemy.xp, 0);
}

/** Experiencia total de la partida, sumando todos los capítulos. */
export function xpTotal(progress: Progress, capitulos: Chapter[]): number {
  return capitulos.reduce(
    (suma, c) => suma + xpDeCapitulo(c, completedOf(progress, c.chapter)),
    0,
  );
}

/** ¿Se puede abrir ya un nodo? Y si no, por qué. */
export interface Bloqueo {
  abierto: boolean;
  /** Explicación para la interfaz cuando está cerrado. */
  motivo?: string;
}

/**
 * Reglas de acceso a un nodo:
 * - Los retos de código piden experiencia ganada en el propio capítulo.
 * - El jefe pide tener resueltos todos los retos de código del capítulo.
 * - Pergaminos, enigmas y enemigos normales están siempre abiertos: son
 *   justamente la forma de conseguir lo que piden los otros dos.
 */
export function estadoNodo(
  node: MapNode,
  chapter: Chapter,
  completados: Set<string>,
): Bloqueo {
  const kind = node.kind ?? "challenge";
  const retoJefe = esRetoJefe(node);

  // Retos NORMALES: piden experiencia del capítulo. El reto-jefe NO (se abre por
  // haber resuelto los demás retos, más abajo).
  if (kind === "challenge" && !retoJefe && chapter.xpParaRetos) {
    const xp = xpDeCapitulo(chapter, completados);
    if (xp < chapter.xpParaRetos) {
      return {
        abierto: false,
        motivo:
          `Te faltan ${chapter.xpParaRetos - xp} puntos de experiencia para ` +
          `enfrentar este acertijo. Vence a los enemigos del capítulo.`,
      };
    }
  }

  // El JEFE (de combate o el reto-jefe) sólo se abre con todos los retos
  // normales resueltos: es el capstone del capítulo.
  if ((kind === "battle" && (node as BattleNode).enemy.boss) || retoJefe) {
    const pendientes = retosNormales(chapter).filter(
      (r) => !completados.has(r.node_id),
    );
    if (pendientes.length) {
      return {
        abierto: false,
        motivo:
          `No estás listo. Resuelve los ${pendientes.length} reto(s) de código ` +
          `del capítulo antes del desafío final.`,
      };
    }
  }

  return { abierto: true };
}

/**
 * ¿Está desbloqueado el capítulo? Requiere haber derrotado al jefe del capítulo
 * que lo precede.
 *
 * La segunda condición existe por compatibilidad: quien ya se había terminado un
 * capítulo antes de que existieran los jefes no debe encontrárselo bloqueado.
 */
export function capituloDesbloqueado(
  chapter: Chapter,
  progress: Progress,
  capitulos: Chapter[],
): Bloqueo {
  if (!chapter.unlockedBy) return { abierto: true };

  const previo = capitulos.find((c) => c.chapter === chapter.unlockedBy);
  if (!previo) return { abierto: true };

  const hechos = completedOf(progress, previo.chapter);
  const jefe = nodoJefe(previo);
  if (jefe && hechos.has(jefe.node_id)) return { abierto: true };

  // Partidas anteriores al combate: valió con resolver todo lo que había.
  const sinCombate = previo.nodes.filter((n) => !esBatalla(n));
  if (sinCombate.length && sinCombate.every((n) => hechos.has(n.node_id))) {
    return { abierto: true };
  }

  return {
    abierto: false,
    motivo: `Supera el desafío final del capítulo ${previo.chapter} para abrir este camino.`,
  };
}

/**
 * Personajes jugables desbloqueados. Como la experiencia, se derivan de los
 * jefes vencidos en vez de guardarse: no hay nada que migrar ni que pueda
 * quedar desincronizado. Frodo va siempre el primero.
 */
export function heroesDesbloqueados(
  progress: Progress,
  capitulos: Chapter[],
): Reward[] {
  const base: Reward = {
    hero: "frodo",
    name: "Frodo",
    blurb: "El Portador del Anillo. Con quien empieza todo.",
  };
  const ganados: Reward[] = [];
  for (const c of capitulos) {
    const hechos = completedOf(progress, c.chapter);
    // La recompensa del jefe, sea combate (enemy.reward) o reto-jefe (.reward).
    const jefe = nodoJefe(c);
    if (jefe && hechos.has(jefe.node_id)) {
      const r = recompensaJefe(c);
      if (r) ganados.push(r);
    }
  }
  // Sin repetidos, por si dos jefes premiaran al mismo personaje.
  const vistos = new Set<string>();
  return [base, ...ganados].filter((r) =>
    vistos.has(r.hero) ? false : (vistos.add(r.hero), true),
  );
}

/** El personaje elegido, si sigue desbloqueado; si no, Frodo. */
export function heroActivo(progress: Progress, capitulos: Chapter[]): string {
  const abiertos = heroesDesbloqueados(progress, capitulos);
  return abiertos.some((h) => h.hero === progress.hero)
    ? (progress.hero as string)
    : "frodo";
}
