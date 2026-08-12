import type { ResolvedLayer } from "./types";
import { rowFor, type AnimationDef, type Direction } from "./animations";

/**
 * Compositor de capas LPC sobre HTML5 Canvas.
 *
 * Como cada capa LPC ya es una spritesheet completa y todas comparten el mismo
 * origen (0,0) y el mismo orden de filas, componer = dibujar cada capa en (0,0)
 * en orden de zPos ascendente. El canvas se dimensiona al máximo ancho/alto
 * encontrado, de modo que hojas más cortas (21 filas) conviven con hojas
 * extendidas (46 filas) sin desalinearse.
 */

export interface SheetSize {
  width: number;
  height: number;
}

export function measureSheet(layers: ResolvedLayer[]): SheetSize {
  let width = 0;
  let height = 0;
  for (const { image } of layers) {
    width = Math.max(width, image.naturalWidth);
    height = Math.max(height, image.naturalHeight);
  }
  return { width, height };
}

/** Dibuja la spritesheet completa compuesta en el canvas destino. */
export function composeSheet(
  canvas: HTMLCanvasElement,
  layers: ResolvedLayer[],
): SheetSize {
  const { width, height } = measureSheet(layers);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return { width, height };

  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false; // pixel art: sin interpolar
  for (const { image } of layers) {
    ctx.drawImage(image, 0, 0);
  }
  return { width, height };
}

/**
 * Dibuja UN frame de una animación/dirección en un canvas de destino,
 * escalando por `scale` (pixel-perfect). Se usa para la previsualización animada.
 */
export function composeFrame(
  canvas: HTMLCanvasElement,
  layers: ResolvedLayer[],
  anim: AnimationDef,
  dir: Direction,
  frame: number,
  frameSize: number,
  scale: number,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const size = frameSize * scale;
  canvas.width = size;
  canvas.height = size;

  ctx.clearRect(0, 0, size, size);
  ctx.imageSmoothingEnabled = false;

  const sx = frame * frameSize;
  const sy = rowFor(anim, dir) * frameSize;

  for (const { image } of layers) {
    // Sólo dibuja si la hoja realmente contiene esa fila (hojas cortas).
    if (sy + frameSize > image.naturalHeight) continue;
    ctx.drawImage(
      image,
      sx,
      sy,
      frameSize,
      frameSize,
      0,
      0,
      size,
      size,
    );
  }
}
