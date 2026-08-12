/**
 * Tipos del ecosistema LPC (Liberated Pixel Cup) para nuestra herramienta.
 *
 * El `manifest.json` lo genera `scripts/fetch-lpc.mjs` leyendo los
 * `sheet_definitions/*.json` del repositorio Universal-LPC. Así el orden de
 * capas (zPos) y las rutas de assets son la fuente de verdad del propio LPC,
 * no valores inventados por nosotros (regla #1 y #2 del proyecto).
 */

/**
 * Una parte física (un PNG) de una opción, con su propio zPos.
 * La mayoría de opciones tienen una sola parte, pero algunas (báculos, espadas)
 * tienen varias: p. ej. `foreground` (zPos 140, delante) y `background`
 * (zPos 9, detrás del cuerpo). Cada parte se compone en su propio nivel Z.
 */
export interface LpcLayerPart {
  /** Ruta pública del PNG bajo /public, p. ej. "/lpc/body/bodies/male/olive.png". */
  url: string;
  /** Orden Z de esta parte concreta (leído del sheet_definition LPC). */
  zPos: number;
}

/** Una opción concreta y descargable de una categoría (p. ej. cuerpo "olive"). */
export interface LpcOption {
  /** id estable: `${categoryId}:${srcKey}:${bodyType}:${variant}` */
  id: string;
  /** Etiqueta legible para la UI. */
  label: string;
  /** Variante LPC (color/material), p. ej. "steel", "olive". */
  variant: string;
  /** Tipo de cuerpo requerido, o `null` si la capa es independiente del cuerpo. */
  bodyType: string | null;
  /** Una o más partes (PNG + zPos) que componen esta opción. */
  layers: LpcLayerPart[];
}

/** Una categoría/slot de capa (cuerpo, torso, casco, arma...). */
export interface LpcCategory {
  /** id de slot, único, p. ej. "body", "torso", "weapon". */
  id: string;
  /** Nombre legible, p. ej. "Cuerpo". */
  name: string;
  /**
   * Orden de superposición Z leído de LPC. Menor = más al fondo.
   * cuerpo(10) < piernas(20) < torso(35..60) < ojos(105) < escudo(110) <
   * pelo(120) < casco(125..130) < arma(140).
   */
  zPos: number;
  /** Si el usuario puede dejar el slot vacío (p. ej. sin casco). */
  optional: boolean;
  /** Opciones disponibles en esta categoría. */
  options: LpcOption[];
}

/** El manifest completo consumido por la app en runtime. */
export interface LpcManifest {
  generatedAt: string;
  source: string;
  /** Tamaño de cada frame en px (LPC estándar = 64). */
  frameSize: number;
  categories: LpcCategory[];
}

/** Selección actual del usuario: categoryId -> optionId (o null si vacío). */
export type Selection = Record<string, string | null>;

/** Una capa lista para componer en el canvas. */
export interface ResolvedLayer {
  categoryId: string;
  zPos: number;
  option: LpcOption;
  image: HTMLImageElement;
}
