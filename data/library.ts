import type { Chapter } from "@/lib/game/types";

/**
 * La Biblioteca de Rivendel: un escenario recorrible, fuera de la campaña, al
 * que el jugador entra cuando quiere para consultar lo aprendido. Sus nodos son
 * "estanterías" (kind: "archive") que abren el archivo filtrado por pestaña.
 *
 * No va en CHAPTERS ni en CAMPAIGN: no cuenta para el progreso ni las
 * estadísticas. El `chapter: 0` es sólo un identificador interno.
 */
export const CHAPTER_LIBRARY: Chapter = {
  chapter: 0,
  title: "La Biblioteca de Rivendel",
  lore:
    "En la Última Casa Hospitalaria, Elrond guarda copia de todo saber. Aquí puedes releer los pergaminos que estudiaste y revisar las runas que ya descifraste, en la lengua que quieras.",
  mapSize: { cols: 20, rows: 13 },
  spawn: { x: 10, y: 10 },
  scenery: {
    ground: "stone",
    pathRows: [10],
    pathGround: "darkstone",
    npcs: [{ spriteId: "gandalf", x: 3, y: 9, label: "El Archivero" }],
    decor: [
      // "estanterías": columnas de roca alineadas como anaqueles
      { type: "rock", x: 2, y: 3 },
      { type: "rock", x: 4, y: 3 },
      { type: "rock", x: 6, y: 3 },
      { type: "rock", x: 9, y: 3 },
      { type: "rock", x: 11, y: 3 },
      { type: "rock", x: 13, y: 3 },
      { type: "rock", x: 16, y: 3 },
      { type: "rock", x: 18, y: 3 },
      { type: "rock", x: 2, y: 6 },
      { type: "rock", x: 18, y: 6 },
      { type: "house", x: 9, y: 2, label: "El Salón del Fuego" },
    ],
  },
  nodes: [
    {
      node_id: "lib_scrolls",
      kind: "archive",
      tab: "scrolls",
      title: "Pergaminos",
      lore_intro: "La teoría que has estudiado, capítulo a capítulo.",
      position: { x: 3, y: 6 },
    },
    {
      node_id: "lib_php",
      kind: "archive",
      tab: "php",
      title: "Runas PHP",
      lore_intro: "Los acertijos de PHP que ya descifraste.",
      position: { x: 10, y: 6 },
    },
    {
      node_id: "lib_python",
      kind: "archive",
      tab: "python",
      title: "Runas Python",
      lore_intro: "Los acertijos de Python que ya descifraste.",
      position: { x: 17, y: 6 },
    },
  ],
};
