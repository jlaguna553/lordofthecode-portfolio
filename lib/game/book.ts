import type { Localized } from "@/lib/i18n/core";

/**
 * Los LIBROS (películas) de la Tierra Media. Son el esqueleto narrativo
 * COMPARTIDO por todas las aventuras: da igual el lenguaje que elijas, recorres
 * los mismos tres libros. Cada aventura los reviste con su propio temario
 * técnico (los retos y pergaminos en ese lenguaje).
 */
export interface Book {
  /** Identificador estable del libro. */
  id: string;
  /** Orden narrativo (1..3); 0 para material de práctica fuera de la trilogía. */
  film: number;
  /** Título del libro. */
  title: Localized<string>;
  /** Subtítulo breve, para la cabecera de la sección en el selector. */
  subtitle: Localized<string>;
}

export const BOOK_FELLOWSHIP = "fellowship";
export const BOOK_TWO_TOWERS = "two_towers";
export const BOOK_RETURN = "return_king";
export const BOOK_APPENDICES = "appendices";

export const BOOKS: Book[] = [
  {
    id: BOOK_FELLOWSHIP,
    film: 1,
    title: {
      es: "La Comunidad del Anillo",
      en: "The Fellowship of the Ring",
    },
    subtitle: {
      es: "Los fundamentos del viaje",
      en: "The foundations of the journey",
    },
  },
  {
    id: BOOK_TWO_TOWERS,
    film: 2,
    title: { es: "Las Dos Torres", en: "The Two Towers" },
    subtitle: {
      es: "El camino se complica",
      en: "The road grows harder",
    },
  },
  {
    id: BOOK_RETURN,
    film: 3,
    title: { es: "El Retorno del Rey", en: "The Return of the King" },
    subtitle: {
      es: "La maestría y el final",
      en: "Mastery and the ending",
    },
  },
  {
    id: BOOK_APPENDICES,
    film: 0,
    title: { es: "Los Apéndices", en: "The Appendices" },
    subtitle: {
      es: "Práctica y material extra",
      en: "Practice and extra material",
    },
  },
];

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}
