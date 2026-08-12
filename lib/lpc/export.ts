import type { LpcCategory, ResolvedLayer, Selection } from "./types";
import { composeSheet } from "./compositor";

/** Estructura del reto POO ligado a un sprite (ver brief, sección 4). */
export interface PooChallenge {
  topic: string;
  prompt: string;
  code_template: string;
}

/** Metadatos exportados que alimentan al motor del videojuego EdTech. */
export interface CharacterExport {
  id: string;
  sprite_url: string; // data:image/png;base64,...
  layer_config: Record<string, string>; // slot -> variante elegida
  poo_challenge?: PooChallenge;
}

/**
 * Construye el `layer_config` legible (slot -> variante) a partir de la selección.
 * Ej: { body: "male_olive", armor: "chainmail_gray", weapon: "longsword" }.
 */
export function buildLayerConfig(
  categories: LpcCategory[],
  selection: Selection,
): Record<string, string> {
  const config: Record<string, string> = {};
  for (const category of categories) {
    const optionId = selection[category.id];
    if (!optionId) continue;
    const option = category.options.find((o) => o.id === optionId);
    if (!option) continue;
    const bt = option.bodyType ? `${option.bodyType}_` : "";
    config[category.id] = `${bt}${option.variant}`;
  }
  return config;
}

/**
 * Genera el PNG (spritesheet completa compuesta) como data URL.
 * Usa un canvas fuera de pantalla para no depender del canvas de previsualización.
 */
export function renderSpriteDataUrl(layers: ResolvedLayer[]): string {
  const canvas = document.createElement("canvas");
  composeSheet(canvas, layers);
  return canvas.toDataURL("image/png");
}

/** Ensambla el objeto de exportación completo con la estructura del brief. */
export function buildCharacterExport(params: {
  id: string;
  categories: LpcCategory[];
  selection: Selection;
  layers: ResolvedLayer[];
  challenge?: PooChallenge;
}): CharacterExport {
  const { id, categories, selection, layers, challenge } = params;
  return {
    id,
    sprite_url: renderSpriteDataUrl(layers),
    layer_config: buildLayerConfig(categories, selection),
    ...(challenge ? { poo_challenge: challenge } : {}),
  };
}

/** Dispara la descarga de un blob con el nombre dado (client-side). */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Descarga el PNG de la spritesheet compuesta. */
export function downloadPng(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Descarga los metadatos JSON. */
export function downloadJson(data: CharacterExport, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, filename);
}
