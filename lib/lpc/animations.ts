/**
 * Layout de la spritesheet "universal" de LPC.
 *
 * Cada animación ocupa un bloque de filas contiguas, con 4 filas por dirección
 * (arriba, izquierda, abajo, derecha) salvo `hurt`, que es una sola fila.
 * El origen (0,0) está arriba-izquierda y el orden es SIEMPRE el mismo, por eso
 * apilar capas de distinta altura en (0,0) es correcto: una hoja más corta
 * (p. ej. la clásica de 21 filas) simplemente cubre solo las primeras filas.
 */

export type Direction = "up" | "left" | "down" | "right";

export const DIRECTION_ROW: Record<Direction, number> = {
  up: 0,
  left: 1,
  down: 2,
  right: 3,
};

export interface AnimationDef {
  id: string;
  label: string;
  /** Primera fila del bloque (dirección "up"). */
  startRow: number;
  /** Nº de frames (columnas) de la animación. */
  frames: number;
  /** Si sólo tiene una fila (sin direcciones), como `hurt`. */
  singleRow?: boolean;
  /** Frames por segundo sugeridos para la previsualización. */
  fps: number;
}

/**
 * Bloque base "universal" (21 filas / 1344px). Presente en TODAS las hojas LPC,
 * por lo que la previsualización funciona aunque la capa no incluya animaciones
 * extendidas (idle/run/jump/…) que sólo traen algunas hojas de 2944px.
 */
export const ANIMATIONS: AnimationDef[] = [
  { id: "walk", label: "Caminar", startRow: 8, frames: 9, fps: 8 },
  { id: "spellcast", label: "Conjurar", startRow: 0, frames: 7, fps: 7 },
  { id: "thrust", label: "Estocada", startRow: 4, frames: 8, fps: 8 },
  { id: "slash", label: "Tajo", startRow: 12, frames: 6, fps: 8 },
  { id: "shoot", label: "Disparar", startRow: 16, frames: 13, fps: 8 },
  { id: "hurt", label: "Herido", startRow: 20, frames: 6, singleRow: true, fps: 6 },
];

export function getAnimation(id: string): AnimationDef {
  return ANIMATIONS.find((a) => a.id === id) ?? ANIMATIONS[0];
}

/** Devuelve la fila absoluta de una animación en una dirección dada. */
export function rowFor(anim: AnimationDef, dir: Direction): number {
  return anim.singleRow ? anim.startRow : anim.startRow + DIRECTION_ROW[dir];
}
