import type { LpcOption, ResolvedLayer, Selection, LpcCategory } from "./types";

/**
 * Carga imágenes de forma asíncrona sin bloquear el hilo de UI (regla #3).
 * Mantiene una caché por URL para no re-descargar/decodificar entre renders.
 */
const cache = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(url: string): Promise<HTMLImageElement> {
  const cached = cache.get(url);
  if (cached) return cached;

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    // Necesario para poder exportar el canvas con toDataURL sin "taint".
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar el sprite: ${url}`));
    img.src = url;
  });

  cache.set(url, promise);
  return promise;
}

/**
 * Resuelve la selección del usuario a capas ordenadas por zPos (fondo -> frente),
 * cargando en paralelo todas las imágenes implicadas.
 */
export async function resolveLayers(
  categories: LpcCategory[],
  selection: Selection,
): Promise<ResolvedLayer[]> {
  const pending: Promise<ResolvedLayer | null>[] = [];

  for (const category of categories) {
    const optionId = selection[category.id];
    if (!optionId) continue;
    const option = category.options.find((o) => o.id === optionId);
    if (!option) continue;

    // Una opción puede tener varias partes (p. ej. báculo: fondo + frente),
    // cada una con su propio zPos.
    for (const part of option.layers) {
      pending.push(
        loadImage(part.url)
          .then((image) => ({
            categoryId: category.id,
            zPos: part.zPos,
            option,
            image,
          }))
          .catch((err) => {
            // Una capa que falla no debe tumbar todo el personaje.
            console.warn(err);
            return null;
          }),
      );
    }
  }

  const resolved = (await Promise.all(pending)).filter(
    (l): l is ResolvedLayer => l !== null,
  );

  // Orden estricto de superposición LPC (regla #2).
  resolved.sort((a, b) => a.zPos - b.zPos);
  return resolved;
}

/** Etiqueta corta para mostrar en la UI a partir de una opción. */
export function optionLabel(option: LpcOption): string {
  return option.label;
}
