"use client";

import { ADVENTURES } from "@/data/adventures";
import {
  ACCENT_RING,
  ACCENT_TEXT,
  CATEGORIES,
  chapterCount,
} from "@/lib/game/adventure";
import { useLang } from "@/lib/i18n/context";

interface Props {
  /** Aventura actual (para marcarla), si ya hay una elegida. */
  current?: string;
  onSelect: (adventureId: string) => void;
  /** Si se puede cerrar sin elegir (cuando ya hay una aventura en curso). */
  onClose?: () => void;
}

/**
 * Pantalla de selección de aventura: una tarjeta por tecnología. Las
 * disponibles son jugables; las que aún no tienen contenido salen bloqueadas
 * como "próximamente".
 */
export default function AdventureSelect({ current, onSelect, onClose }: Props) {
  const { t, tc } = useLang();

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <h2 className="bg-gradient-to-r from-amber-200 to-emerald-300 bg-clip-text text-2xl font-black text-transparent">
              {t("adventure.title")}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {t("adventure.subtitle")}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
            >
              {t("common.close")}
            </button>
          )}
        </div>

        <div className="flex-1 space-y-6 overflow-auto p-5">
          {CATEGORIES.map((cat) => {
            const items = ADVENTURES.filter((a) => a.category === cat.id);
            if (items.length === 0) return null;
            return (
              <section key={cat.id}>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="text-base">{cat.icon}</span>
                  {tc(cat.name)}
                  <span className="h-px flex-1 bg-white/10" />
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {items.map((a) => {
                    const available =
                      a.status === "available" && chapterCount(a) > 0;
                    const isCurrent = a.id === current;
                    return (
                      <li key={a.id}>
                        <button
                          type="button"
                          disabled={!available}
                          onClick={() => available && onSelect(a.id)}
                          className={
                            "flex w-full items-start gap-3 rounded-xl p-4 text-left ring-1 transition " +
                            (!available
                              ? "cursor-not-allowed bg-slate-950/60 text-slate-600 ring-white/5"
                              : isCurrent
                                ? "bg-slate-800 text-slate-100 " +
                                  ACCENT_RING[a.accent]
                                : "bg-slate-800/60 text-slate-200 ring-white/10 hover:bg-slate-800")
                          }
                        >
                          <span
                            className="shrink-0 text-3xl"
                            style={{
                              filter: available ? "none" : "grayscale(1)",
                            }}
                          >
                            {a.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate font-bold">
                                {tc(a.name)}
                              </span>
                              <span
                                className={
                                  "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ring-1 " +
                                  (available
                                    ? "bg-slate-950/60 ring-white/10 " +
                                      ACCENT_TEXT[a.accent]
                                    : "text-slate-600 ring-white/5")
                                }
                              >
                                {a.tech}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed opacity-80">
                              {tc(a.blurb)}
                            </p>
                            <p className="mt-2 text-[11px] font-semibold">
                              {available ? (
                                isCurrent ? (
                                  <span className={ACCENT_TEXT[a.accent]}>
                                    ✦ {t("adventure.current")} ·{" "}
                                    {chapterCount(a)} {t("adventure.chapters")}
                                  </span>
                                ) : (
                                  <span className="text-emerald-400">
                                    ▶ {t("adventure.play")} · {chapterCount(a)}{" "}
                                    {t("adventure.chapters")}
                                  </span>
                                )
                              ) : (
                                <span className="text-slate-500">
                                  🔒 {t("adventure.soon")}
                                </span>
                              )}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
