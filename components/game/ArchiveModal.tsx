"use client";

import { useMemo, useState } from "react";

import type { ChallengeNode, ScrollNode } from "@/lib/game/types";
import { codeFor, completedOf, type Progress } from "@/lib/game/progress";
import { useLang } from "@/lib/i18n/context";
import type { Localized } from "@/lib/i18n/core";

interface Props {
  /** Capítulos de la aventura activa. */
  chapters: import("@/lib/game/types").Chapter[];
  tab: "scrolls" | "php" | "python";
  progress: Progress;
  onClose: () => void;
}

interface Entry {
  chapter: number;
  chapterTitle: Localized<string>;
  node: ScrollNode | ChallengeNode;
}

const TITLES = {
  scrolls: "📜 Pergaminos estudiados",
  php: "🐘 Runas de PHP descifradas",
  python: "🐍 Runas de Python descifradas",
} as const;

/**
 * El archivo de la Biblioteca: lista lo que el jugador ya completó en la
 * categoría pedida y, al elegir una entrada, muestra su contenido — la teoría
 * del pergamino, o el enunciado del reto junto al código que el jugador guardó.
 */
export default function ArchiveModal({ chapters, tab, progress, onClose }: Props) {
  const { tc } = useLang();
  const entries = useMemo<Entry[]>(() => {
    const out: Entry[] = [];
    for (const ch of chapters) {
      const done = completedOf(progress, ch.chapter);
      for (const node of ch.nodes) {
        if (!done.has(node.node_id)) continue;
        if (tab === "scrolls" && node.kind === "scroll") {
          out.push({ chapter: ch.chapter, chapterTitle: ch.title, node });
        } else if (tab !== "scrolls" && (node.kind ?? "challenge") === "challenge") {
          const lang = (node as ChallengeNode).poo_challenge.lang ?? "php";
          if (lang === tab) {
            out.push({
              chapter: ch.chapter,
              chapterTitle: ch.title,
              node: node as ChallengeNode,
            });
          }
        }
      }
    }
    return out;
  }, [tab, progress]);

  const [selected, setSelected] = useState<Entry | null>(entries[0] ?? null);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-sky-500/25">
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-sky-500/10 to-transparent p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              Biblioteca de Rivendel
            </p>
            <h2 className="text-lg font-bold text-slate-100">{TITLES[tab]}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
          >
            ✕ Cerrar
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-slate-400">
            Este anaquel está vacío todavía. Vuelve cuando hayas{" "}
            {tab === "scrolls" ? "leído algún pergamino" : "resuelto algún reto"}.
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_1.6fr]">
            {/* Índice */}
            <ul className="overflow-auto border-r border-white/10 p-2">
              {entries.map((e) => {
                const active = selected?.node.node_id === e.node.node_id;
                return (
                  <li key={e.node.node_id}>
                    <button
                      onClick={() => setSelected(e)}
                      className={
                        "w-full rounded-lg px-3 py-2 text-left text-sm transition " +
                        (active
                          ? "bg-sky-500/15 text-sky-100 ring-1 ring-sky-500/40"
                          : "text-slate-300 hover:bg-slate-800")
                      }
                    >
                      <span className="block truncate font-medium">
                        {tc(e.node.title)}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        Cap. {e.chapter} · {tc(e.chapterTitle)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Detalle */}
            <div className="overflow-auto p-5">
              {selected && <Detail entry={selected} progress={progress} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ entry, progress }: { entry: Entry; progress: Progress }) {
  const { tc } = useLang();
  const { node } = entry;

  if (node.kind === "scroll") {
    const sc = node.scroll;
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
          {tc(sc.topic)}
        </p>
        <h3 className="mb-4 text-xl font-bold text-slate-100">{tc(node.title)}</h3>
        {sc.sections.map((s, i) => (
          <section key={i} className="mb-4">
            {s.heading && (
              <h4 className="mb-1 font-semibold text-amber-200">{tc(s.heading)}</h4>
            )}
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
              {tc(s.body)}
            </p>
            {s.code && (
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950/70 p-3 text-[12px] leading-relaxed text-slate-200">
                <code>{s.code}</code>
              </pre>
            )}
          </section>
        ))}
        {sc.keyTakeaway && (
          <p className="mt-3 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-100 ring-1 ring-amber-500/30">
            🗝 {tc(sc.keyTakeaway)}
          </p>
        )}
      </div>
    );
  }

  // Reto resuelto: enunciado + el código que guardó el jugador.
  const c = node.poo_challenge;
  const lang = c.lang ?? "php";
  const code = codeFor(progress, entry.chapter, node.node_id) ?? c.starter_code;
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
        <span
          className={
            "rounded px-1.5 py-0.5 text-[10px] font-bold ring-1 " +
            (lang === "python"
              ? "bg-sky-500/15 text-sky-300 ring-sky-500/40"
              : "bg-violet-500/15 text-violet-300 ring-violet-500/40")
          }
        >
          {lang === "python" ? "🐍 Python" : lang === "javascript" ? "🟨 JavaScript" : "🐘 PHP"}
        </span>
        {tc(c.topic)}
      </p>
      <h3 className="mb-1 text-xl font-bold text-slate-100">{tc(node.title)}</h3>
      <p className="mb-3 text-xs text-emerald-300">✓ Resuelto</p>
      <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-300">
        {tc(c.instructions)}
      </p>
      <h4 className="mb-1 text-sm font-semibold text-slate-200">
        Tu solución
      </h4>
      <pre className="overflow-x-auto rounded-lg bg-slate-950/70 p-3 text-[12px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
