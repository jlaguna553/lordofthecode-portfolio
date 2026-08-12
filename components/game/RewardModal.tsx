"use client";

import type { Reward } from "@/lib/game/types";
import { useLang } from "@/lib/i18n/context";

interface Props {
  reward: Reward;
  /** Sprite del héroe desbloqueado, si el capítulo lo tiene cargado. */
  heroSheet?: { url: string; cols: number; frameSize: number };
  /** Capítulo al que se pasa al continuar (undefined si no hay siguiente). */
  nextChapterTitle?: string;
  /** Frase de cierre cuando el jefe termina un libro (no hay salto encadenado). */
  bookEnd?: string;
  onContinue: () => void;
}

/**
 * Pantalla de recompensa tras derrotar a un jefe: presenta al personaje que se
 * une a la Comunidad y encadena hacia el capítulo siguiente.
 */
export default function RewardModal({
  reward,
  heroSheet,
  nextChapterTitle,
  bookEnd,
  onContinue,
}: Props) {
  const { tc } = useLang();
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 text-center shadow-2xl ring-1 ring-amber-400/40">
        <div className="bg-gradient-to-b from-amber-500/20 to-transparent px-6 pt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            Victoria
          </p>
          <p className="mt-4 text-5xl">🏆</p>
          <h2 className="mt-3 text-lg font-black text-slate-100">
            Un nuevo aliado se une a la Comunidad
          </h2>
        </div>

        <div className="flex flex-col items-center gap-3 px-6 py-6">
          {heroSheet && (
            <span
              className="block rounded-xl bg-slate-800/60 ring-1 ring-white/10"
              style={{
                width: heroSheet.frameSize * 1.6,
                height: heroSheet.frameSize * 1.6,
                backgroundImage: `url(${heroSheet.url})`,
                // Fila 10 = mirando al frente; primer fotograma, ampliado.
                backgroundPosition: `0 -${10 * heroSheet.frameSize * 1.6}px`,
                backgroundSize: `${heroSheet.cols * heroSheet.frameSize * 1.6}px auto`,
                imageRendering: "pixelated",
              }}
            />
          )}
          <h3 className="text-xl font-bold text-amber-200">{tc(reward.name)}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{tc(reward.blurb)}</p>
          <p className="mt-1 rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs text-emerald-300 ring-1 ring-emerald-500/30">
            ✓ Desbloqueado como personaje jugable · elígelo en 🦸 Héroe
          </p>
        </div>

        {bookEnd && (
          <p className="mx-6 mb-1 rounded-lg bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-200 ring-1 ring-amber-500/30">
            {bookEnd}
          </p>
        )}

        <div className="border-t border-white/10 p-4">
          <button
            onClick={onContinue}
            className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
          >
            {nextChapterTitle
              ? `Continuar a ${nextChapterTitle} →`
              : bookEnd
                ? "Cerrar"
                : "Continuar →"}
          </button>
        </div>
      </div>
    </div>
  );
}
