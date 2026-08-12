/**
 * Barajado de opciones de las preguntas (quizzes y combates).
 *
 * Todas las preguntas se escriben con la respuesta correcta en la posición 0
 * (correct: 0), lo cual es cómodo de redactar pero trivial de resolver si
 * siempre saliera primera. Aquí se mezclan las opciones y se recalcula el
 * índice correcto, de modo que cada vez salgan en orden distinto.
 */

export interface Question {
  question: import("@/lib/i18n/core").Localized<string>;
  options: import("@/lib/i18n/core").Localized<string>[];
  correct: number;
  explanation: import("@/lib/i18n/core").Localized<string>;
}

/** Devuelve la pregunta con las opciones mezcladas y `correct` reajustado. */
export function shuffleQuestion(q: Question): Question {
  const idx = q.options.map((_, i) => i);
  // Fisher-Yates.
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return {
    question: q.question,
    options: idx.map((i) => q.options[i]),
    correct: idx.indexOf(q.correct),
    explanation: q.explanation,
  };
}
