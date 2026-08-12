import type { Chapter } from "./types";
import type { Localized } from "@/lib/i18n/core";

/** Los capítulos de una aventura dentro de uno de los libros compartidos. */
export interface AdventureBook {
  /** id de un Book compartido (ver lib/game/book.ts). */
  book: string;
  /** Capítulos de ese libro EN ESTA aventura, en orden. */
  chapters: Chapter[];
}

/**
 * Una AVENTURA es una campaña completa que enseña una tecnología de 0 a 100
 * (PHP, Python, JavaScript…). Recorre los mismos tres libros de la Tierra Media
 * (narrativa compartida), cada uno con su temario en el lenguaje de la aventura.
 * Tiene su propio evaluador (por el `lang` de sus retos) y su progreso propio.
 */
export interface Adventure {
  /** Identificador estable; también es la clave del progreso guardado. */
  id: string;
  /** Nombre corto de la tecnología, p. ej. "PHP". */
  tech: string;
  /** Sección del selector a la que pertenece (lenguajes, nube, …). */
  category: Category;
  /** Título de la aventura. */
  name: Localized<string>;
  /** Descripción breve para la pantalla de selección. */
  blurb: Localized<string>;
  /** Emoji representativo. */
  icon: string;
  /** Color base del tema (clases Tailwind estáticas por acento). */
  accent: Accent;
  /** `available`: jugable. `soon`: aparece en el selector pero bloqueada. */
  status: "available" | "soon";
  /** Contenido agrupado por libro. Un libro sin capítulos simplemente no está. */
  books: AdventureBook[];
  /**
   * Variantes por lenguaje del MISMO contenido (mismos node_id y narrativa, sólo
   * cambia el lenguaje de los retos). Para aventuras de arquitectura donde el
   * jugador elige en qué lenguaje repasar los patrones. La primera es la de por
   * defecto (debe coincidir con `books`).
   */
  variants?: AdventureVariant[];
}

/** Una variante por lenguaje de una aventura. */
export interface AdventureVariant {
  /** Identificador de lenguaje (p. ej. "typescript", "php"). */
  lang: string;
  /** Etiqueta corta para el selector (p. ej. "TypeScript"). */
  label: string;
  /** Emoji del lenguaje. */
  icon?: string;
  books: AdventureBook[];
}

/** Secciones del selector de aventuras. */
export type Category =
  | "languages"
  | "data"
  | "frameworks"
  | "cloud"
  | "devops"
  | "architecture";

export interface CategoryInfo {
  id: Category;
  /** Título de la sección, bilingüe. */
  name: Localized<string>;
  /** Emoji de la sección. */
  icon: string;
}

/** Secciones en el orden en que se muestran en el selector. */
export const CATEGORIES: CategoryInfo[] = [
  { id: "languages", icon: "📜", name: { es: "Lenguajes", en: "Languages" } },
  { id: "data", icon: "📊", name: { es: "Datos", en: "Data" } },
  { id: "frameworks", icon: "🧩", name: { es: "Frameworks", en: "Frameworks" } },
  { id: "cloud", icon: "☁️", name: { es: "Nube", en: "Cloud" } },
  { id: "devops", icon: "⚙️", name: { es: "DevOps", en: "DevOps" } },
  {
    id: "architecture",
    icon: "🏛️",
    name: { es: "Arquitectura", en: "Architecture" },
  },
];

/** Todos los capítulos de una aventura, aplanados en orden de libro. */
export function allChapters(a: Adventure): Chapter[] {
  return a.books.flatMap((b) => b.chapters);
}

/**
 * Capítulos de una aventura para la variante de lenguaje elegida. Si la aventura
 * no tiene variantes, devuelve sus capítulos normales. Si `variantLang` no casa,
 * usa la primera variante (la de por defecto).
 */
export function chaptersFor(a: Adventure, variantLang?: string): Chapter[] {
  if (a.variants && a.variants.length > 0) {
    const v = a.variants.find((x) => x.lang === variantLang) ?? a.variants[0];
    return v.books.flatMap((b) => b.chapters);
  }
  return allChapters(a);
}

/** Cuántos capítulos jugables tiene una aventura. */
export function chapterCount(a: Adventure): number {
  return a.books.reduce((n, b) => n + b.chapters.length, 0);
}

export type Accent =
  | "violet"
  | "sky"
  | "amber"
  | "emerald"
  | "rose"
  | "orange"
  | "indigo"
  | "cyan"
  | "slate";

/** Clases de anillo/fondo por acento (Tailwind no admite clases dinámicas). */
export const ACCENT_RING: Record<Accent, string> = {
  violet: "ring-violet-500/40",
  sky: "ring-sky-500/40",
  amber: "ring-amber-500/40",
  emerald: "ring-emerald-500/40",
  rose: "ring-rose-500/40",
  orange: "ring-orange-500/40",
  indigo: "ring-indigo-500/40",
  cyan: "ring-cyan-500/40",
  slate: "ring-slate-500/40",
};

export const ACCENT_TEXT: Record<Accent, string> = {
  violet: "text-violet-300",
  sky: "text-sky-300",
  amber: "text-amber-300",
  emerald: "text-emerald-300",
  rose: "text-rose-300",
  orange: "text-orange-300",
  indigo: "text-indigo-300",
  cyan: "text-cyan-300",
  slate: "text-slate-300",
};
