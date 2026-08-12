#!/usr/bin/env node
/**
 * fetch-lpc.mjs — Descarga un SUBSET CURADO medieval/fantasía del repositorio
 * Universal-LPC-Spritesheet-Character-Generator y genera `public/lpc/manifest.json`.
 *
 * Filosofía (reglas #1 y #2 del proyecto):
 *   - No inventamos rutas ni el orden de capas: leemos `sheet_definitions/*.json`
 *     del propio LPC y de ahí sacamos el `zPos` (orden Z) y las rutas de assets.
 *   - Sólo descargamos lo que el WHITELIST de abajo selecciona -> resultado ligero.
 *   - Sólo apilamos hojas "universales" de 832px de ancho. Las hojas OVERSIZE
 *     (cimitarra, arco, oversize de thrust… 1536/1664px) usan otra grilla y no se
 *     pueden componer con drawImage(0,0), así que se descartan automáticamente.
 *
 * Uso:  pnpm fetch:lpc
 *
 * Licencias: los assets LPC son CC-BY-SA 3.0 / GPL 3.0. Ver CREDITS.csv del repo
 * y respeta la atribución al usarlos en tu juego.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "lpc");

const REPO =
  "sanderfrenken/Universal-LPC-Spritesheet-Character-Generator";
const BRANCH = "master";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`;

const FRAME_SIZE = 64;
/** Ancho de la hoja "universal" LPC (13 columnas × 64). Sólo apilamos estas. */
const STD_WIDTH = 832;

/**
 * WHITELIST curado para el Episodio 1 (Moria / La Comunidad del Anillo).
 *   scoped=true  -> capa ajustada al cuerpo (1 opción por bodyType; la UI filtra).
 *   scoped=false -> capa independiente del cuerpo (usa la ruta de `bodyKey`).
 * Cada `source` puede sobreescribir `bodyTypes` (p. ej. cabezas humanas ♂/♀/niño).
 */
const SLOTS = [
  {
    id: "body",
    name: "Cuerpo",
    optional: false,
    scoped: true,
    bodyTypes: ["male", "female", "muscular", "teen", "child"],
    sources: [
      {
        def: "body.json",
        variants: [
          "light", "olive", "bronze", "brown", "black",
          "zombie_green", "green", "dark_green",
        ],
      },
    ],
  },
  {
    id: "head",
    name: "Cabeza",
    optional: false,
    scoped: true,
    bodyTypes: ["male", "female", "muscular", "teen", "child"],
    sources: [
      {
        def: "heads_human_male.json",
        bodyTypes: ["male", "muscular", "teen"],
        variants: ["light", "olive", "bronze", "brown", "black"],
        label: "Humano",
      },
      {
        def: "heads_human_female.json",
        bodyTypes: ["female"],
        variants: ["light", "olive", "bronze", "brown"],
        label: "Humana",
      },
      {
        def: "heads_human_child.json",
        bodyTypes: ["child"],
        variants: ["light", "olive", "bronze", "brown"],
        label: "Niño",
      },
      {
        def: "heads_human_male_gaunt.json",
        bodyTypes: ["male", "teen"],
        variants: ["light", "olive", "black"],
        label: "Demacrado",
      },
      {
        def: "heads_orc_male.json",
        bodyTypes: ["male", "muscular", "teen"],
        variants: ["dark_green", "green", "black"],
        label: "Orco",
      },
      {
        def: "heads_goblin.json",
        bodyTypes: ["male", "teen"],
        variants: ["green", "dark_green", "olive"],
        label: "Trasgo",
      },
      {
        def: "heads_troll.json",
        bodyTypes: ["muscular", "male"],
        variants: ["green", "dark_green"],
        label: "Troll",
      },
      {
        def: "heads_skeleton.json",
        bodyTypes: ["male", "female"],
        variants: ["skeleton"],
        label: "Esqueleto",
      },
      {
        def: "heads_zombie.json",
        bodyTypes: ["male", "female"],
        variants: ["zombie_green"],
        label: "Zombie",
      },
    ],
  },
  {
    id: "eyes",
    name: "Ojos",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      {
        def: "eyes.json",
        variants: ["blue", "brown", "green", "gray", "red", "yellow"],
      },
    ],
  },
  {
    id: "ears",
    name: "Orejas",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      {
        def: "head_ears_elven.json",
        variants: ["light", "olive", "bronze"],
        label: "Élficas",
      },
    ],
  },
  {
    id: "beard",
    name: "Barba",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      { def: "beards_winter.json", variants: ["white", "gray"], label: "Larga" },
      {
        def: "beards_medium.json",
        variants: ["redhead", "chestnut", "black"],
        label: "Media",
      },
      { def: "beards_beard.json", variants: ["black", "chestnut"], label: "Básica" },
    ],
  },
  {
    id: "horns",
    name: "Cuernos",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      {
        def: "head_horns_curled.json",
        variants: ["horns", "black", "metallic_iron"],
        label: "Cuernos",
      },
    ],
  },
  {
    id: "legs",
    name: "Pantalón",
    optional: true,
    scoped: true,
    bodyTypes: ["male", "female", "muscular", "teen"],
    sources: [
      {
        def: "legs_pants.json",
        variants: ["black", "brown", "forest", "charcoal"],
      },
      {
        def: "legs_childpants.json",
        bodyTypes: ["child"],
        variants: ["brown", "green", "darkblue"],
        label: "Niño",
      },
    ],
  },
  {
    id: "feet",
    name: "Botas",
    optional: true,
    scoped: true,
    bodyTypes: ["male", "female", "muscular", "teen"],
    sources: [{ def: "feet_boots.json", variants: ["black", "brown", "charcoal"] }],
  },
  {
    id: "cape",
    name: "Capa",
    optional: true,
    scoped: true,
    bodyTypes: ["male", "female", "muscular"],
    sources: [
      {
        def: "cape_solid.json",
        variants: ["gray", "charcoal", "forest", "red", "white", "black"],
        label: "Capa",
      },
    ],
  },
  {
    id: "torso",
    name: "Torso / Armadura",
    optional: true,
    scoped: true,
    bodyTypes: ["male", "female", "teen"],
    sources: [
      { def: "torso_chainmail.json", variants: ["gray"], label: "Cota de malla" },
      {
        def: "torso_armour_plate.json",
        variants: ["steel", "iron", "bronze"],
        label: "Placas",
      },
      {
        def: "torso_armour_leather.json",
        variants: ["brown", "black"],
        label: "Cuero",
      },
      {
        def: "torso_clothes_longsleeve.json",
        variants: ["purple", "forest", "navy", "maroon", "gray", "white", "black"],
        label: "Túnica",
      },
      {
        def: "torso_clothes_child_shirt.json",
        bodyTypes: ["child"],
        variants: ["brown", "green", "blue"],
        label: "Camisa",
      },
    ],
  },
  {
    id: "shield",
    name: "Escudo",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      { def: "shield.json", variants: ["crusader", "spartan"], label: "Escudo" },
    ],
  },
  {
    id: "hair",
    name: "Pelo",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      {
        def: "hair_long.json",
        variants: ["blonde", "black", "redhead", "white"],
        label: "Largo",
      },
      {
        def: "hair_plain.json",
        variants: ["blonde", "black", "chestnut"],
        label: "Corto",
      },
    ],
  },
  {
    id: "helmet",
    name: "Casco",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      {
        def: "hat_helmet_greathelm.json",
        variants: ["steel", "iron", "bronze"],
        label: "Yelmo",
      },
      { def: "hat_helmet_mail.json", variants: ["steel", "iron"], label: "Capucha" },
      {
        def: "hat_magic_wizard.json",
        variants: ["base_black", "base_gray", "base_red"],
        label: "Sombrero mago",
      },
    ],
  },
  {
    id: "weapon",
    name: "Arma",
    optional: true,
    scoped: false,
    bodyKey: "male",
    sources: [
      { def: "weapon_sword_longsword.json", variants: ["longsword"], label: "Espada" },
      { def: "weapon_sword_arming.json", variants: ["steel", "gold"], label: "Espada corta" },
      { def: "weapon_sword_glowsword.json", variants: ["blue", "red"], label: "Espada mágica" },
      { def: "weapon_sword_dagger.json", variants: ["dagger"], label: "Daga" },
      { def: "weapon_blunt_waraxe.json", variants: ["waraxe"], label: "Hacha" },
      { def: "weapon_blunt_mace.json", variants: ["mace"], label: "Maza" },
      { def: "weapon_polearm_spear.json", variants: ["steel"], label: "Lanza" },
      { def: "weapon_ranged_bow_normal.json", variants: ["steel"], label: "Arco" },
      { def: "weapon_magic_gnarled.json", variants: ["steel", "gold", "dark"], label: "Báculo nudoso" },
      { def: "weapon_magic_crystal.json", variants: ["blue", "purple", "red"], label: "Báculo cristal" },
    ],
  },
];

// ---------------------------------------------------------------------------

const defCache = new Map();

async function fetchDef(def) {
  if (defCache.has(def)) return defCache.get(def);
  const url = `${RAW}sheet_definitions/${def}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo leer sheet_definition ${def} (${res.status})`);
  const json = await res.json();
  defCache.set(def, json);
  return json;
}

/**
 * Descarga un PNG y devuelve su ancho en px. Sólo escribe a disco si es una
 * hoja estándar de 832px (apilable). Devuelve 0 si falta o no es PNG.
 */
async function downloadPng(relPath) {
  const url = `${RAW}spritesheets/${relPath.split("/").map(encodeURIComponent).join("/")}`;
  const res = await fetch(url);
  if (!res.ok) return 0;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return 0; // no es PNG
  const width = buf.readUInt32BE(16);
  // Descartamos sólo las OVERSIZE (>832: cimitarra/arco-walk/thrust 1536-1664).
  // Las hojas ≤832 (incl. las 'child' de 768/12-col) sí alinean en walk.
  if (width > STD_WIDTH) return width;
  const dest = join(OUT_DIR, relPath);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return width;
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function build() {
  console.log("→ Generando subset LPC en public/lpc …\n");
  const categories = [];
  let downloaded = 0;
  let skipped = 0;
  let oversize = 0;

  for (const slot of SLOTS) {
    const options = [];
    let zPos = 0;

    for (const source of slot.sources) {
      let def;
      try {
        def = await fetchDef(source.def);
      } catch (e) {
        console.warn(`  ⚠ ${e.message}`);
        continue;
      }
      const layer1 = def.layer_1 ?? {};
      if (typeof layer1.zPos === "number") zPos = Math.max(zPos, layer1.zPos);

      // Todas las capas del sheet_definition con orden Z real (layer_1, layer_2…).
      const defLayers = Object.keys(def)
        .filter((k) => /^layer_\d+$/.test(k))
        .map((k) => def[k]);

      const bodyKeys = slot.scoped
        ? source.bodyTypes ?? slot.bodyTypes
        : [slot.bodyKey ?? "male"];
      const srcKey = source.def.replace(/\.json$/, "");

      for (const bt of bodyKeys) {
        // Sólo generamos la opción si al menos la capa principal existe para bt.
        if (!layer1[bt]) continue;

        for (const variant of source.variants) {
          const parts = [];
          for (const layer of defLayers) {
            // Saltar capas ocultas (zPos -1) o sin orden Z.
            if (typeof layer.zPos !== "number" || layer.zPos < 0) continue;
            const prefix = layer[bt];
            // Rutas reales terminan en "/"; tokens como "thrust_oversize" no.
            if (typeof prefix !== "string" || !prefix.endsWith("/")) continue;

            const relPath = `${prefix}${variant}.png`;
            const width = await downloadPng(relPath);
            if (width === 0) continue; // ausente / no-PNG
            if (width > STD_WIDTH) {
              oversize++; // hoja oversize (>832): no apilable, se descarta
              continue;
            }
            downloaded++;
            parts.push({ url: `/lpc/${relPath}`, zPos: layer.zPos });
          }

          if (parts.length === 0) {
            skipped++;
            continue;
          }
          // Ordenar partes por zPos (fondo -> frente).
          parts.sort((a, b) => a.zPos - b.zPos);

          const base = source.label ?? slot.name;
          const label = slot.sources.length > 1 || source.label
            ? `${base} · ${cap(variant)}`
            : cap(variant);

          options.push({
            id: `${slot.id}:${srcKey}:${bt}:${variant}`,
            label,
            variant,
            bodyType: slot.scoped ? bt : null,
            layers: parts,
          });
        }
      }
    }

    if (options.length === 0) {
      console.warn(`  ⚠ Slot "${slot.id}" quedó sin opciones.`);
      continue;
    }

    categories.push({
      id: slot.id,
      name: slot.name,
      zPos,
      optional: slot.optional,
      options,
    });
    console.log(`  ✓ ${slot.name.padEnd(18)} z=${String(zPos).padStart(3)}  (${options.length} opciones)`);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: `${REPO}@${BRANCH}`,
    frameSize: FRAME_SIZE,
    categories: categories.sort((a, b) => a.zPos - b.zPos),
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(
    `\n✔ Listo. ${downloaded} PNG descargados` +
      ` · ${oversize} oversize descartadas · ${skipped} opciones vacías.` +
      `\n  manifest.json -> public/lpc/manifest.json`,
  );
}

build().catch((e) => {
  console.error("✖ Error:", e);
  process.exit(1);
});
