import type { LpcManifest, Selection } from "@/lib/lpc/types";

/**
 * Presets de personaje para el Episodio 1 (Moria / La Comunidad del Anillo).
 * Se definen por (categoría, variante[, labelIncludes]) y se resuelven contra el
 * manifest en runtime, así siguen funcionando aunque se regenere `manifest.json`.
 */
export interface PresetLayer {
  category: string;
  variant: string;
  /** Desambigua cuando varias fuentes comparten variante (torso, arma, pelo…). */
  labelIncludes?: string;
}

export interface Preset {
  id: string;
  name: string;
  emoji: string;
  faction: "comunidad" | "sombra";
  challengeId: string;
  characterId: string;
  /** Tipo de cuerpo base; las capas ajustadas al cuerpo lo usan al resolver. */
  bodyType: string;
  layers: PresetLayer[];
}

const L = (
  category: string,
  variant: string,
  labelIncludes?: string,
): PresetLayer => ({ category, variant, labelIncludes });

export const PRESETS: Preset[] = [
  // ============ LA COMUNIDAD ============
  {
    id: "aragorn",
    name: "Aragorn",
    emoji: "👑",
    faction: "comunidad",
    challengeId: "aragorn_herencia",
    characterId: "aragorn_montaraz",
    bodyType: "male",
    layers: [
      L("body", "bronze"),
      L("head", "bronze", "humano"),
      L("eyes", "gray"),
      L("hair", "black", "largo"),
      L("torso", "brown", "cuero"),
      L("legs", "brown"),
      L("feet", "brown"),
      L("cape", "gray", "capa"),
      L("weapon", "steel", "corta"),
    ],
  },
  {
    id: "gandalf",
    name: "Gandalf el Gris",
    emoji: "🧙",
    faction: "comunidad",
    challengeId: "gandalf_abstract",
    characterId: "gandalf_el_gris",
    bodyType: "male",
    layers: [
      L("body", "light"),
      L("head", "light", "humano"),
      L("eyes", "blue"),
      L("hair", "white", "largo"),
      L("beard", "white", "larga"),
      L("torso", "gray", "túnica"),
      L("legs", "charcoal"),
      L("feet", "black"),
      L("cape", "gray", "capa"),
      L("helmet", "base_gray", "sombrero"),
      L("weapon", "steel", "nudoso"),
    ],
  },
  {
    id: "frodo",
    name: "Frodo",
    emoji: "💍",
    faction: "comunidad",
    challengeId: "frodo_encapsulamiento",
    characterId: "frodo_bolson",
    bodyType: "child",
    layers: [
      L("body", "light"),
      L("head", "light", "niño"),
      L("hair", "chestnut", "corto"),
      L("torso", "green", "camisa"),
      L("legs", "brown", "niño"),
      L("weapon", "dagger", "daga"),
    ],
  },
  {
    id: "sam",
    name: "Samwise",
    emoji: "🌱",
    faction: "comunidad",
    challengeId: "sam_composicion",
    characterId: "samwise_gamgee",
    bodyType: "child",
    layers: [
      L("body", "bronze"),
      L("head", "bronze", "niño"),
      L("hair", "blonde", "corto"),
      L("torso", "brown", "camisa"),
      L("legs", "brown", "niño"),
      L("weapon", "dagger", "daga"),
    ],
  },
  {
    id: "merry",
    name: "Merry",
    emoji: "🍺",
    faction: "comunidad",
    challengeId: "merry_parametros",
    characterId: "meriadoc_brandigamo",
    bodyType: "child",
    layers: [
      L("body", "light"),
      L("head", "light", "niño"),
      L("hair", "chestnut", "corto"),
      L("torso", "blue", "camisa"),
      L("legs", "darkblue", "niño"),
      L("weapon", "dagger", "daga"),
    ],
  },
  {
    id: "pippin",
    name: "Pippin",
    emoji: "🔔",
    faction: "comunidad",
    challengeId: "pippin_constructor",
    characterId: "peregrin_tuk",
    bodyType: "child",
    layers: [
      L("body", "light"),
      L("head", "light", "niño"),
      L("hair", "blonde", "corto"),
      L("torso", "green", "camisa"),
      L("legs", "green", "niño"),
      L("weapon", "dagger", "daga"),
    ],
  },
  {
    id: "gimli",
    name: "Gimli",
    emoji: "🪓",
    faction: "comunidad",
    challengeId: "gimli_static",
    characterId: "gimli_hijo_de_gloin",
    bodyType: "male",
    layers: [
      L("body", "bronze"),
      L("head", "bronze", "humano"),
      L("eyes", "brown"),
      L("hair", "redhead", "largo"),
      L("beard", "redhead", "media"),
      L("torso", "gray", "cota"),
      L("legs", "charcoal"),
      L("feet", "black"),
      L("weapon", "waraxe", "hacha"),
    ],
  },
  {
    id: "legolas",
    name: "Legolas",
    emoji: "🏹",
    faction: "comunidad",
    challengeId: "legolas_interface",
    characterId: "legolas_hojaverde",
    bodyType: "male",
    layers: [
      L("body", "light"),
      L("head", "light", "humano"),
      L("eyes", "green"),
      L("ears", "light", "élficas"),
      L("hair", "blonde", "largo"),
      L("torso", "forest", "túnica"),
      L("legs", "forest"),
      L("feet", "brown"),
      L("weapon", "steel", "arco"),
    ],
  },
  {
    id: "boromir",
    name: "Boromir",
    emoji: "📯",
    faction: "comunidad",
    challengeId: "boromir_excepciones",
    characterId: "boromir_de_gondor",
    bodyType: "male",
    layers: [
      L("body", "bronze"),
      L("head", "bronze", "humano"),
      L("eyes", "gray"),
      L("hair", "black", "largo"),
      L("beard", "chestnut", "media"),
      L("torso", "gray", "cota"),
      L("legs", "charcoal"),
      L("feet", "black"),
      L("cape", "red", "capa"),
      L("shield", "crusader"),
      L("weapon", "steel", "corta"),
    ],
  },

  {
    id: "bombadil",
    name: "Tom Bombadil",
    emoji: "🎶",
    faction: "comunidad",
    challengeId: "bombadil_destructor",
    characterId: "tom_bombadil",
    bodyType: "male",
    layers: [
      L("body", "light"),
      L("head", "light", "humano"),
      L("eyes", "blue"),
      L("beard", "chestnut", "media"),
      L("torso", "navy", "túnica"),
      L("legs", "brown"),
      L("feet", "brown"),
      L("helmet", "base_red", "sombrero"),
    ],
  },

  // ---- Figurantes: dan vida a los mapas, no son jugables ----
  {
    id: "aldeano",
    name: "Aldeano",
    emoji: "🧑‍🌾",
    faction: "comunidad",
    challengeId: "aragorn_herencia",
    characterId: "aldeano_de_bree",
    bodyType: "male",
    layers: [
      L("body", "olive"),
      L("head", "olive", "humano"),
      L("eyes", "brown"),
      L("hair", "chestnut", "corto"),
      L("torso", "forest", "túnica"),
      L("legs", "brown"),
      L("feet", "brown"),
    ],
  },
  {
    id: "aldeana",
    name: "Aldeana",
    emoji: "🧑‍🍳",
    faction: "comunidad",
    challengeId: "aragorn_herencia",
    characterId: "aldeana_de_bree",
    bodyType: "female",
    layers: [
      L("body", "light"),
      L("head", "light", "humana"),
      L("hair", "blonde", "largo"),
      L("torso", "maroon", "túnica"),
      L("legs", "brown"),
      L("feet", "brown"),
    ],
  },

  // ============ LA SOMBRA ============
  {
    id: "esqueleto",
    name: "Enano caído",
    emoji: "☠️",
    faction: "sombra",
    challengeId: "tumulario_metodos",
    characterId: "enano_caido_de_moria",
    bodyType: "male",
    layers: [
      L("body", "light"),
      L("head", "skeleton", "esqueleto"),
      L("torso", "gray", "cota"),
      L("legs", "charcoal"),
      L("feet", "black"),
    ],
  },
  {
    id: "tumulario",
    name: "Tumulario",
    emoji: "💀",
    faction: "sombra",
    challengeId: "tumulario_metodos",
    characterId: "tumulario_de_los_tumulos",
    bodyType: "male",
    layers: [
      L("body", "black"),
      L("head", "skeleton", "esqueleto"),
      L("torso", "black", "túnica"),
      L("legs", "black"),
      L("feet", "black"),
      L("cape", "charcoal", "capa"),
      L("weapon", "steel", "corta"),
    ],
  },
  {
    id: "nazgul",
    name: "Jinete Negro",
    emoji: "🐎",
    faction: "sombra",
    challengeId: "nazgul_visibilidad",
    characterId: "nazgul_jinete_negro",
    bodyType: "male",
    layers: [
      L("body", "black"),
      L("head", "black", "humano"),
      L("eyes", "red"),
      L("torso", "black", "túnica"),
      L("legs", "black"),
      L("feet", "black"),
      L("cape", "black", "capa"),
      L("helmet", "iron", "capucha"),
      L("weapon", "longsword", "espada"),
    ],
  },
  {
    id: "orco",
    name: "Orco",
    emoji: "👹",
    faction: "sombra",
    challengeId: "orco_herencia",
    characterId: "orco_de_moria",
    bodyType: "male",
    layers: [
      L("body", "dark_green"),
      L("head", "dark_green", "orco"),
      L("eyes", "red"),
      L("torso", "black", "cuero"),
      L("legs", "black"),
      L("feet", "black"),
      L("weapon", "waraxe", "hacha"),
    ],
  },
  {
    id: "trasgo",
    name: "Trasgo",
    emoji: "🗡️",
    faction: "sombra",
    challengeId: "trasgo_arrays",
    characterId: "trasgo_de_moria",
    bodyType: "teen",
    layers: [
      L("body", "green"),
      L("head", "green", "trasgo"),
      L("eyes", "yellow"),
      L("torso", "brown", "cuero"),
      L("legs", "brown"),
      L("feet", "brown"),
      L("weapon", "steel", "lanza"),
    ],
  },
  {
    id: "uruk",
    name: "Uruk-hai",
    emoji: "⚔️",
    faction: "sombra",
    challengeId: "uruk_polimorfismo",
    characterId: "uruk_hai",
    bodyType: "male",
    layers: [
      L("body", "black"),
      L("head", "black", "orco"),
      L("eyes", "red"),
      L("torso", "iron", "placas"),
      L("legs", "black"),
      L("feet", "black"),
      L("helmet", "iron", "capucha"),
      L("weapon", "longsword", "espada"),
    ],
  },
  {
    id: "gollum",
    name: "Gollum",
    emoji: "🐟",
    faction: "sombra",
    challengeId: "gollum_estado",
    characterId: "gollum_smeagol",
    bodyType: "teen",
    layers: [
      L("body", "light"),
      L("head", "light", "demacrado"),
      L("eyes", "green"),
    ],
  },
  {
    id: "troll",
    name: "Troll de Moria",
    emoji: "🗿",
    faction: "sombra",
    challengeId: "troll_abstract",
    characterId: "troll_de_las_cavernas",
    bodyType: "muscular",
    layers: [
      L("body", "green"),
      L("head", "green", "troll"),
      L("eyes", "yellow"),
      L("legs", "brown"),
      L("weapon", "mace", "maza"),
    ],
  },
  {
    id: "balrog",
    name: "Balrog (aprox.)",
    emoji: "🔥",
    faction: "sombra",
    challengeId: "balrog_singleton",
    characterId: "balrog_dano_de_durin",
    bodyType: "muscular",
    layers: [
      L("body", "black"),
      L("head", "black", "humano"),
      L("eyes", "red"),
      L("horns", "horns", "cuernos"),
      L("legs", "black"),
      L("weapon", "red", "mágica"),
    ],
  },
];

/** Resuelve un preset a una Selection concreta contra el manifest cargado. */
export function resolvePresetSelection(
  manifest: LpcManifest,
  preset: Preset,
): Selection {
  const selection: Selection = {};
  for (const layer of preset.layers) {
    const category = manifest.categories.find((c) => c.id === layer.category);
    if (!category) continue;
    const option = category.options.find(
      (o) =>
        o.variant === layer.variant &&
        (o.bodyType === null || o.bodyType === preset.bodyType) &&
        (!layer.labelIncludes ||
          o.label.toLowerCase().includes(layer.labelIncludes.toLowerCase())),
    );
    if (option) selection[layer.category] = option.id;
  }
  return selection;
}
