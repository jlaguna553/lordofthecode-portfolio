"use client";

import type { Chapter } from "@/lib/game/types";
import type { AdventureVariant } from "@/lib/game/adventure";
import { useLang } from "@/lib/i18n/context";

interface Props {
  chapter: Chapter;
  /** Variantes de lenguaje de la aventura (arquitectura), si las hay. */
  variants?: AdventureVariant[];
  variantLang?: string;
  onVariant?: (lang: string | undefined) => void;
  onStart: () => void;
}

/** Tarjeta narrativa que abre cada capítulo. */
export default function ChapterIntro({
  chapter,
  variants = [],
  variantLang,
  onVariant,
  onStart,
}: Props) {
  const { t, tc } = useLang();
  const activeLang = variantLang ?? variants[0]?.lang;

  const topics = [
    ...new Set(
      chapter.nodes.map((n) =>
        n.kind === "scroll"
          ? tc(n.scroll.topic)
          : n.kind === "quiz"
            ? tc(n.quiz.topic)
            : n.kind === "battle"
              ? tc(n.enemy.name)
              : n.kind === "archive"
                ? "Archivo"
                : tc(n.poo_challenge.topic),
      ),
    ),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-amber-500/20">
        <div className="border-b border-white/10 bg-gradient-to-br from-amber-500/10 to-transparent p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            {t("header.chapter")} {chapter.chapter}
          </p>
          <h2 className="mt-1 bg-gradient-to-r from-amber-200 to-emerald-300 bg-clip-text text-2xl font-black text-transparent">
            {tc(chapter.title)}
          </h2>
        </div>

        <div className="space-y-4 p-6">
          {variants.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-950/50 px-3 py-2">
              <span className="text-[11px] text-slate-400">
                {t("chapters.language")}
              </span>
              {variants.map((v) => {
                const active = v.lang === activeLang;
                return (
                  <button
                    key={v.lang}
                    onClick={() => onVariant?.(v.lang)}
                    className={
                      "rounded-md px-2.5 py-1 text-xs font-semibold ring-1 transition " +
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
          <p className="text-sm leading-relaxed text-slate-300">
            {tc(chapter.lore)}
          </p>

          <div>
            <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("intro.willLearn")}
            </p>
            <ul className="space-y-1">
              {topics.map((topic) => (
                <li key={topic} className="text-sm text-indigo-300">
                  ◆ {topic}
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-lg bg-slate-950/60 px-3 py-2 text-xs text-slate-400">
            {t("intro.moveWith")} <kbd className="text-slate-200">WASD</kbd>{" "}
            {t("intro.approach")}{" "}
            <kbd className="rounded bg-amber-500 px-1 font-bold text-slate-900">
              E
            </kbd>{" "}
            {t("intro.toFace")} {t("intro.runesLead")} {chapter.nodes.length}{" "}
            {t("intro.runesTail")}
          </p>

          <button
            onClick={onStart}
            className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-400"
          >
            {t("intro.start")}
          </button>
        </div>
      </div>
    </div>
  );
}
