/**
 * Núcleo de internacionalización (i18n).
 *
 * El juego será bilingüe (español / inglés) tanto en la interfaz como en el
 * contenido. Este módulo define el idioma, el tipo de texto localizable y el
 * ayudante para resolverlo — sin dependencias de React, para poder usarse tanto
 * en componentes como en lógica pura.
 */

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

/**
 * Texto que puede estar traducido.
 *
 * Es una UNIÓN a propósito: un `string` plano (el contenido escrito hasta ahora,
 * en español) o un objeto `{ es, en }`. Así el contenido existente sigue
 * compilando sin cambios y se puede traducir texto a texto, convirtiéndolo en
 * `{ es, en }` cuando esté listo — sin una migración masiva de golpe.
 */
export type Localized<T = string> = T | { es: T; en: T };

/** Resuelve un texto localizable al idioma pedido, con reserva sensata. */
export function loc<T>(value: Localized<T>, lang: Lang): T {
  if (value && typeof value === "object" && "es" in value && "en" in value) {
    const o = value as { es: T; en: T };
    return o[lang] ?? o.es ?? o.en;
  }
  return value as T;
}

/** ¿El texto ya está traducido a ambos idiomas? (útil para auditar cobertura). */
export function isTranslated(value: Localized<unknown>): boolean {
  return (
    !!value &&
    typeof value === "object" &&
    "es" in value &&
    "en" in value
  );
}
