"use client";

import type { Adventure } from "@/lib/game/adventure";
import { getBook } from "@/lib/game/book";
import type { Progress } from "@/lib/game/progress";
import { completedOf } from "@/lib/game/progress";
import { capituloDesbloqueado } from "@/lib/game/rpg";
import { chaptersFor } from "@/lib/game/adventure";
import { useLang } from "@/lib/i18n/context";

interface Props {
  adventure: Adventure;
  progress: Progress;
  current: number;
  /** Variante de lenguaje elegida (aventuras con `variants`, p. ej. Patrones). */
  variantLang?: string;
  onVariant?: (lang: string | undefined) => void;
  onSelect: (chapter: number) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function ChapterSelect({
  adventure,
  progress,
  current,
  variantLang,
  onVariant,
  onSelect,
  onReset,
  onClose,
}: Props) {
  const { t, tc } = useLang();
  const chapters = chaptersFor(adventure, variantLang);
  const variants = adventure.variants ?? [];
  const activeLang = variantLang ?? variants[0]?.lang;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {adventure.icon} {tc(adventure.name)}
            </p>
            <h2 className="text-xl font-bold text-slate-100">
              {t("header.chapters")}
            </h2>
            {variants.length > 1 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500">
                  {t("chapters.language")}
                </span>
                {variants.map((v) => {
                  const active = v.lang === activeLang;
                  return (
                    <button
                      key={v.lang}
                      onClick={() => onVariant?.(v.lang)}
                      className={
                        "rounded-md px-2 py-0.5 text-xs font-semibold ring-1 transition " +
                        (active
                          ? "bg-rose-500/20 text-rose-200 ring-rose-500/50"
                          : "bg-slate-800 text-slate-300 ring-white/10 hover:bg-slate-700")
                      }
                    >
                      {v.icon ? `${v.icon} ` : ""}
                      {v.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
          >
            {t("common.close")}
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-auto p-5">
          {/* Los capítulos van agrupados por libro (película). */}
          {adventure.books.map((ab, bi) => {
            const book = getBook(ab.book);
            if (!book || ab.chapters.length === 0) return null;
            const chs = [...ab.chapters].sort((a, b) => a.chapter - b.chapter);
            return (
              <section key={ab.book}>
                <div className="mb-2 flex items-baseline gap-2">
                  {book.film > 0 && (
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-200 ring-1 ring-amber-500/40">
                      {t("book.label")} {book.film}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-slate-200">
                    {tc(book.title)}
                  </h3>
                  <span className="text-xs text-slate-500">
                    · {tc(book.subtitle)}
                  </span>
                </div>

                <ul className="space-y-2">
                  {chs.map((chapter) => {
                    const cierre = capituloDesbloqueado(
                      chapter,
                      progress,
                      chapters,
                    );
                    const playable = cierre.abierto;
                    const total = chapter.nodes.length;
                    const done = [
                      ...completedOf(progress, chapter.chapter),
                    ].filter((id) =>
                      chapter.nodes.some((n) => n.node_id === id),
                    ).length;
                    const isCurrent = chapter.chapter === current;
                    const finished = playable && total > 0 && done === total;
                    // Numeración por libro (1., 2., …) en vez del número global.
                    const numEnLibro = chs.indexOf(chapter) + 1;

                    return (
                      <li key={chapter.chapter}>
                        <button
                          type="button"
                          disabled={!playable}
                          onClick={() =>
                            playable && onSelect(chapter.chapter)
                          }
                          className={
                            "w-full rounded-xl p-4 text-left transition ring-1 " +
                            (!playable
                              ? "cursor-not-allowed bg-slate-950/60 text-slate-600 ring-white/5"
                              : isCurrent
                                ? "bg-emerald-500/15 text-slate-100 ring-emerald-500/40"
                                : "bg-slate-800/60 text-slate-200 ring-white/10 hover:bg-slate-800")
                          }
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-bold">
                              {numEnLibro}. {tc(chapter.title)}
                            </span>
                            <span className="shrink-0 text-xs">
                              {!playable ? (
                                <span className="rounded bg-slate-800 px-2 py-0.5 text-orange-400/80">
                                  {t("chapters.locked")}
                                </span>
                              ) : finished ? (
                                <span className="text-emerald-400">
                                  {t("chapters.completed")}
                                </span>
                              ) : (
                                <span className="text-amber-300">
                                  {done}/{total} {t("chapters.runes")}
                                </span>
                              )}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed opacity-80">
                            {!playable && cierre.motivo
                              ? cierre.motivo
                              : tc(chapter.lore)}
                          </p>
                          {playable && total > 0 && (
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-950">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-all"
                                style={{ width: `${(done / total) * 100}%` }}
                              />
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {bi < adventure.books.length - 1 && <div className="h-1" />}
              </section>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 p-4">
          <p className="text-xs text-slate-500">{t("chapters.savedHere")}</p>
          <button
            onClick={() => {
              if (window.confirm(t("chapters.resetConfirm"))) onReset();
            }}
            className="rounded-lg bg-rose-600/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600"
          >
            {t("chapters.reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
