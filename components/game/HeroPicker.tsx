"use client";

import type { Reward } from "@/lib/game/types";
import { useLang } from "@/lib/i18n/context";

interface Props {
  heroes: Reward[];
  current: string;
  /** Sprites compuestos por id de héroe, para la miniatura. */
  sheets: Record<string, { url: string; cols: number; frameSize: number }>;
  onSelect: (hero: string) => void;
  onClose: () => void;
}

/** Elige con qué personaje desbloqueado se recorre el mapa. */
export default function HeroPicker({
  heroes,
  current,
  sheets,
  onSelect,
  onClose,
}: Props) {
  const { tc } = useLang();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              La Comunidad
            </p>
            <h2 className="text-xl font-bold text-slate-100">Elige tu héroe</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
          >
            ✕ Cerrar
          </button>
        </div>

        <ul className="flex-1 space-y-2 overflow-auto p-5">
          {heroes.map((h) => {
            const sheet = sheets[h.hero];
            const activo = h.hero === current;
            return (
              <li key={h.hero}>
                <button
                  type="button"
                  onClick={() => onSelect(h.hero)}
                  className={
                    "flex w-full items-center gap-3 rounded-xl p-3 text-left transition ring-1 " +
                    (activo
                      ? "bg-emerald-500/15 ring-emerald-500/40"
                      : "bg-slate-800/60 ring-white/10 hover:bg-slate-800")
                  }
                >
                  <span
                    className="block shrink-0 rounded-lg bg-slate-950/50"
                    style={
                      sheet
                        ? {
                            width: sheet.frameSize,
                            height: sheet.frameSize,
                            backgroundImage: `url(${sheet.url})`,
                            backgroundPosition: `0 -${10 * sheet.frameSize}px`,
                            imageRendering: "pixelated",
                          }
                        : { width: 64, height: 64 }
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-100">{tc(h.name)}</p>
                    <p className="truncate text-xs text-slate-400">{tc(h.blurb)}</p>
                  </div>
                  {activo && (
                    <span className="shrink-0 text-xs font-bold text-emerald-400">
                      ✓ En juego
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="border-t border-white/10 p-4 text-center text-xs text-slate-500">
          Derrota a los jefes de cada capítulo para sumar aliados a esta lista.
        </p>
      </div>
    </div>
  );
}
