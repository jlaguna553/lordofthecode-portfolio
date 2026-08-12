import type { Lang } from "./core";

/**
 * Diccionario de textos de la INTERFAZ (no del contenido educativo, que se
 * localiza aparte con `Localized`). Cada clave trae su versión en cada idioma.
 *
 * Se migra por fases: aquí están la cabecera y los botones comunes; los modales
 * se irán trasladando a claves `t(...)` en fases siguientes.
 */
export const MESSAGES = {
  // Cabecera
  "app.subtitle": { es: "La Sintaxis Ancestral", en: "The Ancestral Syntax" },
  "header.chapter": { es: "Capítulo", en: "Chapter" },
  "header.chapters": { es: "Capítulos", en: "Chapters" },
  "header.stats": { es: "Estadísticas", en: "Stats" },
  "header.library": { es: "Biblioteca", en: "Library" },
  "header.hero": { es: "Héroe", en: "Hero" },
  "header.soundOn": { es: "Activar sonido", en: "Turn sound on" },
  "header.soundOff": { es: "Silenciar", en: "Mute" },
  "header.runes": { es: "Runas", en: "Runes" },
  "header.level": { es: "Nv", en: "Lv" },
  "header.spriteStudio": {
    es: "→ Estudio de sprites LPC",
    en: "→ LPC sprite studio",
  },
  "header.maxLevel": { es: "Nivel máximo", en: "Max level" },
  "header.forLevel": {
    es: "para el nivel",
    en: "to reach level",
  },
  "header.totalXp": {
    es: "puntos de experiencia en total",
    en: "total experience points",
  },

  // Instrucciones de control (bajo el lore)
  "controls.hint": {
    es: "Muévete con",
    en: "Move with",
  },
  "controls.orArrows": {
    es: "o las flechas, acércate a un marcador dorado y pulsa",
    en: "or the arrow keys, approach a golden marker and press",
  },
  "controls.toFace": {
    es: "para enfrentar el acertijo.",
    en: "to face the challenge.",
  },

  // Barra de entrenamiento (XP del capítulo)
  "training.ready": { es: "✓ Listo", en: "✓ Ready" },
  "training.training": { es: "⚔ Entrena", en: "⚔ Train" },

  // Botones comunes (modales)
  "common.close": { es: "✕ Cerrar", en: "✕ Close" },
  "common.continue": { es: "Continuar", en: "Continue" },
  "common.retry": { es: "Reintentar", en: "Retry" },
  "common.reset": { es: "Reiniciar", en: "Reset" },
  "common.understood": { es: "Entendido", en: "Got it" },
  "common.back": { es: "← Volver a la aventura", en: "← Back to the adventure" },

  // Aviso de nodo bloqueado
  "locked.title": { es: "🔒", en: "🔒" },

  // Selector de idioma
  "lang.label": { es: "Idioma", en: "Language" },

  // Selección de aventura
  "adventure.title": { es: "Elige tu aventura", en: "Choose your adventure" },
  "adventure.subtitle": {
    es: "Aprende una tecnología de 0 a 100 resolviendo acertijos.",
    en: "Learn a technology from 0 to 100 by solving puzzles.",
  },
  "adventure.chapters": { es: "capítulos", en: "chapters" },
  "adventure.soon": { es: "Próximamente", en: "Coming soon" },
  "adventure.play": { es: "Jugar", en: "Play" },
  "adventure.continue": { es: "Continuar", en: "Continue" },
  "adventure.current": { es: "En curso", en: "In progress" },
  "adventure.change": { es: "🧭 Aventura", en: "🧭 Adventure" },
  "adventure.empty": {
    es: "Sin contenido todavía",
    en: "No content yet",
  },

  // Selector de capítulos
  "chapters.locked": { es: "🔒 Bloqueado", en: "🔒 Locked" },
  "chapters.completed": { es: "✦ Completado", en: "✦ Completed" },
  "chapters.runes": { es: "runas", en: "runes" },
  "chapters.language": { es: "Lenguaje:", en: "Language:" },
  "chapters.savedHere": {
    es: "El progreso se guarda en este navegador.",
    en: "Progress is saved in this browser.",
  },
  "chapters.reset": { es: "Reiniciar progreso", en: "Reset progress" },
  "chapters.resetConfirm": {
    es: "¿Borrar todo el progreso guardado? Esta acción no se puede deshacer.",
    en: "Delete all saved progress? This cannot be undone.",
  },

  // Tarjeta de entrada al capítulo
  "intro.willLearn": { es: "Aprenderás", en: "You'll learn" },
  "intro.start": { es: "Comenzar el viaje →", en: "Begin the journey →" },
  "intro.runesLead": { es: "Hay", en: "There are" },
  "intro.runesTail": {
    es: "runas por descifrar.",
    en: "runes to decipher.",
  },
  "intro.moveWith": { es: "Muévete con", en: "Move with" },
  "intro.approach": {
    es: "o las flechas. Acércate a un marcador dorado y pulsa",
    en: "or the arrows. Approach a golden marker and press",
  },
  "intro.toFace": {
    es: "para enfrentar el acertijo.",
    en: "to face the challenge.",
  },

  // Pergamino
  "scroll.tag": { es: "📜 Pergamino", en: "📜 Scroll" },
  "scroll.remember": { es: "Para recordar", en: "Key takeaway" },
  "scroll.studied": {
    es: "He estudiado el pergamino ✦",
    en: "I've studied the scroll ✦",
  },
  "scroll.closeShort": { es: "Cerrar", en: "Close" },

  // Libros
  "book.label": { es: "Libro", en: "Book" },
} as const;

export type MessageKey = keyof typeof MESSAGES;

/** Devuelve el texto de una clave de UI en el idioma pedido. */
export function message(key: MessageKey, lang: Lang): string {
  return MESSAGES[key][lang];
}
