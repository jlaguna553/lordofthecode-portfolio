#!/usr/bin/env node
/**
 * fetch-tiles.mjs — Descarga tiles de terreno LPC (Sharm / Lanea Zimmerman) del
 * repo oficial OpenGameArt/LiberatedPixelCup y recorta/compone piezas limpias
 * de 32px para el escenario del juego (Comarca).
 *
 * Uso:  pnpm fetch:tiles
 *
 * Licencia: CC-BY-SA 3.0 / GPL 3.0. Autor: Lanea Zimmerman (Sharm) et al.
 * Ver LICENSE del repo y conserva la atribución.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "tiles");
const RAW_BASE =
  "https://raw.githubusercontent.com/OpenGameArt/LiberatedPixelCup/master/tileset/original/";
const RAW = RAW_BASE + "Sharm/";
const T = 32;

async function get(path, base = RAW) {
  const res = await fetch(base + path);
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Recorta una celda (col,row) de una hoja de 32px. */
function cell(buf, col, row, cols = 1, rows = 1) {
  return sharp(buf).extract({
    left: col * T,
    top: row * T,
    width: cols * T,
    height: rows * T,
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const grass = await get("outdoor/PNG/grass.png");
  const dirt = await get("outdoor/PNG/dirt.png");
  const water = await get("outdoor/PNG/water.png");
  const rock = await get("outdoor/PNG/rock.png");
  const treetop = await get("outdoor/PNG/treetop.png");
  const trunk = await get("outdoor/PNG/trunk.png");
  const house = await get("building-exterior/house.png");

  // La celda central del bloque Wang (col1, fila3) es un relleno LISO: al
  // repetirla por todo el mapa el suelo queda como un color plano. La fila 5
  // guarda las variantes con detalle (mota de hierba, oleaje), opacas y
  // teselables: son las que dan textura al escenario.
  await cell(grass, 0, 5).toFile(join(OUT, "grass.png"));
  await cell(dirt, 0, 5).toFile(join(OUT, "path.png"));
  await cell(water, 0, 5).toFile(join(OUT, "water.png"));
  await cell(rock, 0, 0).toFile(join(OUT, "rock.png"));

  // Árbol frondoso = copa redonda (3x3) + tronco (col1, 2 filas) compuesto.
  const canopy = await cell(treetop, 0, 0, 3, 3).png().toBuffer(); // 96x96
  const trunkPart = await cell(trunk, 1, 0, 1, 2).png().toBuffer(); // 32x64
  await sharp({
    create: { width: 96, height: 148, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: trunkPart, left: 32, top: 84 }, // tronco abajo-centro
      { input: canopy, left: 0, top: 0 }, // copa encima
    ])
    .png()
    .toFile(join(OUT, "tree.png"));

  // --- Suelos y decoración por BIOMA (cada capítulo elige el suyo) ---
  const dirt2 = await get("outdoor/PNG/dirt2.png");
  const lava = await get("lava/lava.png");
  const lavarock = await get("lava/lavarock.png");
  const castle = await get("HughSpectrum/castlefloors.png", RAW_BASE);

  await cell(dirt2, 0, 5).toFile(join(OUT, "ground_dry.png")); // Bree, caminos secos
  await cell(lava, 1, 3).toFile(join(OUT, "lava.png")); // Moria profunda
  await cell(lavarock, 1, 3).toFile(join(OUT, "darkstone.png")); // cavernas
  await cell(castle, 7, 6).toFile(join(OUT, "stone.png")); // salas de Khazad-dûm

  // Nieve y hielo para Caradhras: LPC no trae tiles nevados, así que los
  // derivamos de los propios tiles (tierra pedregosa y piedra) aclarándolos.
  await sharp(await cell(dirt2, 0, 5).png().toBuffer())
    .modulate({ brightness: 1.5, saturation: 0.1 })
    .tint({ r: 236, g: 243, b: 255 })
    .toFile(join(OUT, "snow.png"));
  await sharp(await cell(castle, 7, 6).png().toBuffer())
    .modulate({ brightness: 1.55, saturation: 0.3 })
    .tint({ r: 225, g: 238, b: 255 })
    .toFile(join(OUT, "ice.png"));

  // Lothlórien: suelo dorado y mallorn. El giro de tono se aplica SÓLO a la
  // copa; el tronco conserva su marrón original (rotarlo lo volvía morado).
  await sharp(await cell(grass, 0, 5).png().toBuffer())
    .modulate({ hue: -62, brightness: 1.18, saturation: 1.1 })
    .toFile(join(OUT, "grass_gold.png"));
  const canopyGold = await sharp(canopy)
    .modulate({ hue: -62, brightness: 1.15, saturation: 1.15 })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 96, height: 148, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: trunkPart, left: 32, top: 84 },
      { input: canopyGold, left: 0, top: 0 },
    ])
    .png()
    .toFile(join(OUT, "tree_gold.png"));

  // Césped oscurecido para el Bosque Viejo (derivado del propio tile LPC).
  await sharp(await cell(grass, 0, 5).png().toBuffer())
    .modulate({ brightness: 0.68, saturation: 0.85 })
    .toFile(join(OUT, "grass_dark.png"));

  // Conífera autocontenida (copa + tronco en una pieza) para el bosque denso.
  await sharp(treetop)
    .extract({ left: 0, top: 96, width: 96, height: 128 })
    .toFile(join(OUT, "pine.png"));

  // Casa de la Comarca ensamblada del atlas de construcción:
  // tejado de pizarra (3 filas) + fachada de ladrillo + puerta de madera.
  const facade = await cell(house, 0, 0, 3, 3).png().toBuffer(); // 96x96
  const roof = await cell(house, 0, 3, 3, 3).png().toBuffer(); //  96x96
  const door = await cell(house, 3, 0, 1, 2).png().toBuffer(); //  32x64
  await sharp({
    create: { width: 96, height: 192, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: roof, left: 0, top: 0 },
      { input: facade, left: 0, top: 96 },
      { input: door, left: 32, top: 128 },
    ])
    .png()
    .toFile(join(OUT, "house.png"));

  // Pequeño manifest de tamaños para la escena.
  const meta = {};
  for (const name of [
    "grass", "path", "water", "rock", "tree", "house",
    "grass_dark", "ground_dry", "stone", "darkstone", "lava", "pine", "snow", "ice", "grass_gold", "tree_gold",
  ]) {
    const m = await sharp(join(OUT, `${name}.png`)).metadata();
    meta[name] = { w: m.width, h: m.height };
  }
  await writeFile(join(OUT, "tiles.json"), JSON.stringify(meta, null, 2));

  console.log("✔ Tiles LPC en public/tiles:", Object.keys(meta).join(", "));
}

main().catch((e) => {
  console.error("✖ fetch-tiles:", e.message);
  process.exit(1);
});
