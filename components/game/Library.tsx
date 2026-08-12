"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CHAPTER_LIBRARY } from "@/data/library";

import { buildPresetSheet, type PresetSheet } from "@/lib/game/sheet";
import type { LpcManifest } from "@/lib/lpc/types";
import type { Progress } from "@/lib/game/progress";
import type { ArchiveNode, Chapter } from "@/lib/game/types";
import { heroActivo } from "@/lib/game/rpg";
import { useLang } from "@/lib/i18n/context";

const GameCanvas = dynamic(() => import("./GameCanvas"), { ssr: false });
const ArchiveModal = dynamic(() => import("./ArchiveModal"), { ssr: false });

interface Props {
  /** Capítulos de la aventura activa (para el archivo). */
  chapters: Chapter[];
  progress: Progress;
  onClose: () => void;
}

/**
 * La Biblioteca de Rivendel: un escenario recorrible, aislado de la campaña.
 * Compone sus propios sprites (el héroe activo + el Archivero) y trata sus
 * nodos "archive" abriendo el ArchiveModal con la pestaña correspondiente.
 */
export default function Library({ chapters, progress, onClose }: Props) {
  const { tc, lang } = useLang();
  const [hero, setHero] = useState<PresetSheet | null>(null);
  const [sheets, setSheets] = useState<Record<string, PresetSheet>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const m: LpcManifest = await (await fetch("/lpc/manifest.json")).json();
        const heroId = heroActivo(progress, chapters);
        const h = await buildPresetSheet(m, heroId).catch(() =>
          buildPresetSheet(m, "frodo"),
        );
        const s: Record<string, PresetSheet> = {};
        for (const npc of CHAPTER_LIBRARY.scenery?.npcs ?? []) {
          try {
            s[npc.spriteId] = await buildPresetSheet(m, npc.spriteId);
          } catch {
            /* sin sprite: queda su marcador */
          }
        }
        if (cancelled) return;
        setSheets(s);
        setHero(h);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [progress, chapters]);

  const activeNode = useMemo(
    () =>
      (CHAPTER_LIBRARY.nodes.find((n) => n.node_id === activeId) ?? null) as
        | ArchiveNode
        | null,
    [activeId],
  );

  return (
    <div className="fixed inset-0 z-40 overflow-auto bg-slate-950">
      <div className="mx-auto max-w-5xl px-3 py-3 sm:px-4 sm:py-6">
        <header className="mb-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-400 sm:text-xs">
              La Última Casa Hospitalaria
            </p>
            <h1 className="truncate bg-gradient-to-r from-sky-200 to-emerald-300 bg-clip-text text-lg font-black text-transparent sm:text-2xl">
              La Biblioteca de Rivendel
            </h1>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            ← Volver a la aventura
          </button>
        </header>

        <p className="mb-4 hidden max-w-3xl text-sm leading-relaxed text-slate-400 sm:block">
          {tc(CHAPTER_LIBRARY.lore)} Acércate a una estantería y pulsa{" "}
          <kbd className="rounded bg-amber-500 px-1 font-bold text-slate-900">
            E
          </kbd>{" "}
          para consultarla.
        </p>

        {error ? (
          <p className="text-rose-300">No se pudo cargar la biblioteca.</p>
        ) : !hero ? (
          <p className="text-slate-400">Encendiendo las velas del Salón…</p>
        ) : (
          <GameCanvas
            chapter={CHAPTER_LIBRARY}
            frodoUrl={hero.url}
            cols={hero.cols}
            frameSize={hero.frameSize}
            nodeSheets={sheets}
            completed={new Set()}
            lang={lang}
            locked={activeId !== null}
            onEnterNode={setActiveId}
          />
        )}
      </div>

      {activeNode && (
        <ArchiveModal
          chapters={chapters}
          tab={activeNode.tab}
          progress={progress}
          onClose={() => setActiveId(null)}
        />
      )}
    </div>
  );
}
