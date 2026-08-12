import type { LpcManifest } from "@/lib/lpc/types";
import { resolveLayers } from "@/lib/lpc/loader";
import { composeSheet } from "@/lib/lpc/compositor";
import { PRESETS, resolvePresetSelection } from "@/data/presets";

export interface PresetSheet {
  /** data:image/png de la spritesheet completa compuesta. */
  url: string;
  /** Columnas por fila (ancho / frameSize). Necesario para indexar frames. */
  cols: number;
  rows: number;
  frameSize: number;
}

/**
 * Compone la spritesheet completa de un preset (reusando el pipeline LPC) y la
 * devuelve como data URL lista para cargar como textura en Phaser.
 */
export async function buildPresetSheet(
  manifest: LpcManifest,
  presetId: string,
): Promise<PresetSheet> {
  const preset = PRESETS.find((p) => p.id === presetId);
  if (!preset) throw new Error(`Preset no encontrado: ${presetId}`);

  const selection = resolvePresetSelection(manifest, preset);
  const layers = await resolveLayers(manifest.categories, selection);

  const canvas = document.createElement("canvas");
  const { width, height } = composeSheet(canvas, layers);

  return {
    url: canvas.toDataURL("image/png"),
    cols: Math.floor(width / manifest.frameSize),
    rows: Math.floor(height / manifest.frameSize),
    frameSize: manifest.frameSize,
  };
}
