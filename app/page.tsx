"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { LpcManifest } from "@/lib/lpc/types";
import { buildPresetSheet, type PresetSheet } from "@/lib/game/sheet";
import { CHAPTER_1 } from "@/data/chapters";
import { DEFAULT_ADVENTURE, getAdventure } from "@/data/adventures";
import { allChapters, chaptersFor } from "@/lib/game/adventure";
import { migrateLegacyProgress } from "@/data/migrate";
import {
  capituloDesbloqueado,
  estadoNodo,
  heroActivo,
  heroesDesbloqueados,
  nodoJefe,
  recompensaJefe,
  nivelDe,
  xpDeCapitulo,
  xpTotal,
} from "@/lib/game/rpg";
import type { Reward } from "@/lib/game/types";
import { isMuted, playSfx, setMuted } from "@/lib/game/audio";
import { useLang } from "@/lib/i18n/context";
import {
  codeFor,
  completedOf,
  emptyProgress,
  loadProgress,
  saveProgress,
  withCode,
  withHero,
  withLastChapter,
  withStats,
  withNodeCompleted,
  type Progress,
} from "@/lib/game/progress";

// Phaser y Monaco sólo en cliente.
const GameCanvas = dynamic(() => import("@/components/game/GameCanvas"), {
  ssr: false,
});
const ChallengeModal = dynamic(
  () => import("@/components/game/ChallengeModal"),
  { ssr: false },
);
const ChapterSelect = dynamic(
  () => import("@/components/game/ChapterSelect"),
  { ssr: false },
);
const ChapterIntro = dynamic(() => import("@/components/game/ChapterIntro"), {
  ssr: false,
});
const ScrollModal = dynamic(() => import("@/components/game/ScrollModal"), {
  ssr: false,
});
const QuizModal = dynamic(() => import("@/components/game/QuizModal"), {
  ssr: false,
});
const StatsPanel = dynamic(() => import("@/components/game/StatsPanel"), {
  ssr: false,
});
const Library = dynamic(() => import("@/components/game/Library"), {
  ssr: false,
});
const BattleModal = dynamic(() => import("@/components/game/BattleModal"), {
  ssr: false,
});
const RewardModal = dynamic(() => import("@/components/game/RewardModal"), {
  ssr: false,
});
const HeroPicker = dynamic(() => import("@/components/game/HeroPicker"), {
  ssr: false,
});
const AdventureSelect = dynamic(
  () => import("@/components/game/AdventureSelect"),
  { ssr: false },
);

const ADVENTURE_KEY = "lotc:adventure";

export default function GamePage() {
  const { t, tc, lang, setLang } = useLang();
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [adventureId, setAdventureId] = useState(DEFAULT_ADVENTURE);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [showAdventures, setShowAdventures] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showHeroes, setShowHeroes] = useState(false);
  /** Recompensa a mostrar tras vencer a un jefe (con el capítulo destino). */
  const [reward, setReward] = useState<{ data: Reward; next?: number } | null>(
    null,
  );
  const [mute, setMute] = useState(true); // se sincroniza tras hidratar

  const [frodo, setFrodo] = useState<PresetSheet | null>(null);
  const [nodeSheets, setNodeSheets] = useState<Record<string, PresetSheet>>({});
  const [error, setError] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Aventura activa y sus capítulos (la campaña de la tecnología elegida).
  const adventure =
    getAdventure(adventureId) ?? getAdventure(DEFAULT_ADVENTURE)!;
  // Lenguaje elegido en aventuras con variantes (p. ej. Patrones de Diseño).
  const [variantLang, setVariantLang] = useState<string | undefined>(undefined);
  const chapters = useMemo(
    () => chaptersFor(adventure, variantLang),
    [adventure, variantLang],
  );
  const chapter =
    chapters.find((c) => c.chapter === currentChapter) ??
    chapters[0] ??
    CHAPTER_1;
  const adventureIdRef = useRef(adventureId);
  adventureIdRef.current = adventureId;

  const heroes = useMemo(
    () => heroesDesbloqueados(progress, chapters),
    [progress, chapters],
  );
  const heroId = useMemo(
    () => heroActivo(progress, chapters),
    [progress, chapters],
  );
  /**
   * Clave estable del conjunto de héroes desbloqueados. `heroes` es un array
   * nuevo en cada cambio de progreso (p. ej. al guardar código con debounce),
   * pero su CONTENIDO sólo cambia al desbloquear un aliado. Usamos esta cadena
   * como dependencia para no recomponer los sprites —y con ellos reiniciar la
   * escena Phaser, devolviendo a los personajes al spawn— con cada tecla.
   */
  const heroKey = useMemo(() => heroes.map((h) => h.hero).join(","), [heroes]);
  const heroesRef = useRef(heroes);
  heroesRef.current = heroes;
  // Ref para que el guardado de código no dependa del capítulo en su clausura.
  const currentChapterRef = useRef(currentChapter);
  currentChapterRef.current = currentChapter;
  const bloqueadosRef = useRef<Record<string, string>>({});

  // Restaurar progreso y aventura (sólo en cliente, tras hidratar).
  useEffect(() => {
    setMute(isMuted());
    // Reparte la partida antigua (PHP+Python juntos) en progresos por aventura.
    migrateLegacyProgress();

    let advId = DEFAULT_ADVENTURE;
    try {
      const saved = window.localStorage.getItem(ADVENTURE_KEY);
      if (saved && getAdventure(saved)?.status === "available") {
        advId = saved;
      } else {
        // Sin aventura elegida: si hay progreso migrado usamos PHP; si el
        // jugador es totalmente nuevo, le ofrecemos elegir.
        const phpProg = loadProgress(DEFAULT_ADVENTURE);
        if (Object.keys(phpProg.completed).length === 0) setShowAdventures(true);
      }
    } catch {
      /* localStorage bloqueado: aventura por defecto */
    }

    setAdventureId(advId);
    setVariantLang(undefined); // vuelve a la variante por defecto al cambiar de aventura
    const saved = loadProgress(advId);
    setProgress(saved);
    const adv = getAdventure(advId)!;
    const advChs = allChapters(adv);
    const start = advChs.some((c) => c.chapter === saved.lastChapter)
      ? saved.lastChapter
      : (advChs[0]?.chapter ?? 1);
    setCurrentChapter(start);
  }, []);

  // Componer los sprites del capítulo actual.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/lpc/manifest.json");
        if (!r.ok) throw new Error("manifest");
        const m: LpcManifest = await r.json();

        // Sprites necesarios: PNJ de nodos + ambientales + la Comunidad.
        const ids = [
          ...new Set([
            "frodo", // el protagonista por defecto: puede ir de acompañante
            ...chapter.nodes
              .map((n) => n.spriteId)
              .filter((id): id is string => Boolean(id)),
            ...(chapter.scenery?.npcs ?? []).map((n) => n.spriteId),
            ...(chapter.companions ?? []),
            ...heroesRef.current.map((h) => h.hero),
          ]),
        ];
        const sheets: Record<string, PresetSheet> = {};
        for (const id of ids) {
          try {
            sheets[id] = await buildPresetSheet(m, id);
          } catch {
            /* preset inexistente: el nodo se queda con su marcador */
          }
        }
        const f = await buildPresetSheet(m, heroId).catch(() =>
          buildPresetSheet(m, "frodo"),
        );
        if (cancelled) return;
        setNodeSheets(sheets);
        setFrodo(f);
      } catch {
        if (!cancelled)
          setError(
            "No se encontró public/lpc/manifest.json. Ejecuta: pnpm fetch:lpc",
          );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chapter, heroId, heroKey]);

  // Cada capítulo se abre con su tarjeta narrativa.
  useEffect(() => {
    setShowIntro(true);
  }, [currentChapter]);

  const completed = useMemo(
    () => completedOf(progress, currentChapter),
    [progress, currentChapter],
  );

  const activeNode = useMemo(
    () => chapter.nodes.find((n) => n.node_id === activeNodeId) ?? null,
    [chapter, activeNodeId],
  );

  // --- Progresión RPG (todo derivado del progreso: nada extra que guardar) ---
  const xp = useMemo(
    () => xpTotal(progress, chapters),
    [progress, chapters],
  );
  const nivel = useMemo(() => nivelDe(xp), [xp]);
  const xpCapitulo = useMemo(
    () => xpDeCapitulo(chapter, completed),
    [chapter, completed],
  );
  /** Nodos cerrados y el motivo, para pintarlos con candado en el mapa. */
  const bloqueados = useMemo(() => {
    const m: Record<string, string> = {};
    for (const n of chapter.nodes) {
      const e = estadoNodo(n, chapter, completed);
      if (!e.abierto && e.motivo) m[n.node_id] = e.motivo;
    }
    return m;
  }, [chapter, completed]);
  const [aviso, setAviso] = useState<string | null>(null);
  bloqueadosRef.current = bloqueados;

  /** Un nodo cerrado no abre su modal: avisa de qué falta. */
  const handleEnterNode = useCallback(
    (nodeId: string) => {
      const motivo = bloqueadosRef.current[nodeId];
      if (motivo) {
        setAviso(motivo);
        return;
      }
      setActiveNodeId(nodeId);
    },
    [],
  );

  function handleSolved(
    nodeId: string,
    stats?: { timeSec: number; attempts: number; hints: number },
  ) {
    setProgress((prev) => {
      let next = withNodeCompleted(prev, currentChapter, nodeId);
      if (stats) next = withStats(next, currentChapter, nodeId, stats);
      saveProgress(adventureIdRef.current, next);
      return next;
    });

    // ¿Se ha superado al jefe (de combate o reto-jefe)? Recompensa y salto.
    const jefe = nodoJefe(chapter);
    const premio = recompensaJefe(chapter);
    if (jefe && jefe.node_id === nodeId && premio) {
      const siguiente = chapters.find(
        (c) => c.unlockedBy === chapter.chapter,
      )?.chapter;
      setReward({ data: premio, next: siguiente });
    }
  }

  /** Cerrar la recompensa: elegir al aliado y saltar al capítulo siguiente. */
  function handleRewardContinue() {
    const r = reward;
    setReward(null);
    setActiveNodeId(null);
    if (!r) return;
    // Estrena al recién desbloqueado como héroe activo.
    setProgress((prev) => {
      const next = withHero(prev, r.data.hero);
      saveProgress(adventureIdRef.current, next);
      return next;
    });
    if (r.next) handleSelectChapter(r.next);
  }

  function handleSelectHero(hero: string) {
    setShowHeroes(false);
    setProgress((prev) => {
      const next = withHero(prev, hero);
      saveProgress(adventureIdRef.current, next);
      return next;
    });
  }

  const handleCodeChange = useCallback((nodeId: string, code: string) => {
    setProgress((prev) => {
      const next = withCode(prev, currentChapterRef.current, nodeId, code);
      saveProgress(adventureIdRef.current, next);
      return next;
    });
  }, []);

  function handleSelectChapter(n: number) {
    setActiveNodeId(null);
    setCurrentChapter(n);
    setShowChapters(false);
    setProgress((prev) => {
      const next = withLastChapter(prev, n);
      saveProgress(adventureIdRef.current, next);
      return next;
    });
  }

  /** Cambiar de aventura: carga su progreso y arranca por donde iba. */
  function handleSelectAdventure(id: string) {
    setShowAdventures(false);
    if (id === adventureId) return;
    setAdventureId(id);
    setVariantLang(undefined); // vuelve a la variante por defecto (la 1ª) al cambiar de aventura
    try {
      window.localStorage.setItem(ADVENTURE_KEY, id);
    } catch {
      /* no persiste, pero cambia en memoria */
    }
    const p = loadProgress(id);
    setProgress(p);
    setActiveNodeId(null);
    const adv = getAdventure(id)!;
    const advChs = allChapters(adv);
    const start = advChs.some((c) => c.chapter === p.lastChapter)
      ? p.lastChapter
      : (advChs[0]?.chapter ?? 1);
    setCurrentChapter(start);
    setShowIntro(true);
  }

  function handleReset() {
    const fresh = emptyProgress();
    saveProgress(adventureIdRef.current, fresh);
    setProgress(fresh);
    setActiveNodeId(null);
    setCurrentChapter(chapters[0]?.chapter ?? 1);
    setShowChapters(false);
  }

  const total = chapter.nodes.length;
  const done = completed.size;
  // Fanfarria al completar el capítulo (sólo al cruzar el umbral).
  const wasComplete = useRef(false);
  useEffect(() => {
    const full = total > 0 && done === total;
    if (full && !wasComplete.current) playSfx("chapter");
    wasComplete.current = full;
  }, [done, total]);
  const nextChapter = chapters.find(
    (c) => c.chapter === chapter.chapter + 1,
  );

  return (
    <main className="mx-auto max-w-5xl px-3 py-3 sm:px-4 sm:py-6">
      {/*
        Barra de controles en una sola fila horizontal (se envuelve en pantallas
        muy estrechas). Antes se apilaban en columna a la derecha y empujaban el
        mapa hacia abajo, desperdiciando espacio vertical.
      */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setShowAdventures(true)}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
          title={t("adventure.title")}
        >
          {adventure.icon}{" "}
          <span className="hidden sm:inline">{adventure.tech}</span>
        </button>
        <button
          onClick={() => setShowChapters(true)}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
        >
          📖 <span className="hidden sm:inline">{t("header.chapters")}</span>
        </button>
        <button
          onClick={() => setShowStats(true)}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
        >
          📊 <span className="hidden sm:inline">{t("header.stats")}</span>
        </button>
        <button
          onClick={() => setShowLibrary(true)}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
        >
          📚 <span className="hidden sm:inline">{t("header.library")}</span>
        </button>
        {heroes.length > 1 && (
          <button
            onClick={() => setShowHeroes(true)}
            className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            🦸 <span className="hidden sm:inline">{t("header.hero")}</span>
          </button>
        )}
        <button
          onClick={() => {
            const next = !mute;
            setMuted(next);
            setMute(next);
            if (!next) playSfx("interact"); // confirmación audible
          }}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
          title={mute ? t("header.soundOn") : t("header.soundOff")}
        >
          {mute ? "🔇" : "🔊"}
        </button>
        {/* Selector de idioma */}
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
          title={t("lang.label")}
        >
          🌐 {lang.toUpperCase()}
        </button>

        {/* A la derecha: runas del capítulo y nivel global */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="text-xs text-slate-400 sm:text-sm">
            {t("header.runes")} {done}/{total}
          </span>
          <div className="flex w-28 items-center gap-2 sm:w-44">
            <span
              className="shrink-0 rounded-md bg-amber-500/20 px-1.5 py-0.5 text-[11px] font-bold text-amber-200 ring-1 ring-amber-500/40"
              title={`${xp} ${t("header.totalXp")}`}
            >
              {t("header.level")} {nivel.nivel}
            </span>
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800"
              title={
                nivel.paraSubir
                  ? `${nivel.enNivel}/${nivel.paraSubir} ${t("header.forLevel")} ${nivel.nivel + 1}`
                  : t("header.maxLevel")
              }
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all"
                style={{
                  width: nivel.paraSubir
                    ? `${Math.round((nivel.enNivel / nivel.paraSubir) * 100)}%`
                    : "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Título del capítulo */}
      <header className="mb-2 flex items-baseline gap-2 sm:mb-3">
        <p className="hidden text-[10px] font-semibold uppercase tracking-wider text-amber-400 sm:block sm:text-xs">
          {t("header.chapter")} {chapter.chapter} · {t("app.subtitle")} ·
        </p>
        <span className="shrink-0 text-sm font-black text-amber-400 sm:hidden">
          {chapter.chapter}.
        </span>
        <h1 className="min-w-0 truncate bg-gradient-to-r from-amber-200 to-emerald-300 bg-clip-text text-base font-black text-transparent sm:text-xl">
          {tc(chapter.title)}
        </h1>
        <Link
          href="/studio"
          className="ml-auto hidden shrink-0 text-xs text-indigo-300 underline-offset-2 hover:underline sm:block"
        >
          {t("header.spriteStudio")}
        </Link>
      </header>

      {/* El lore ya se cuenta en la tarjeta de entrada; en móvil sobra aquí. */}
      <p className="mb-4 hidden max-w-3xl text-sm leading-relaxed text-slate-400 sm:block">
        {tc(chapter.lore)} {t("controls.hint")}{" "}
        <kbd className="text-slate-200">WASD</kbd> {t("controls.orArrows")}{" "}
        <kbd className="rounded bg-amber-500 px-1 font-bold text-slate-900">
          E
        </kbd>{" "}
        {t("controls.toFace")}
      </p>

      {chapter.xpParaRetos ? (
        <div
          className={
            "mb-2 flex items-center gap-2 rounded-lg px-2.5 py-1 text-[11px] ring-1 sm:mb-3 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs " +
            (xpCapitulo >= chapter.xpParaRetos
              ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/30"
              : "bg-orange-500/10 text-orange-200 ring-orange-500/30")
          }
        >
          <span className="shrink-0 font-bold">
            {xpCapitulo >= chapter.xpParaRetos
              ? t("training.ready")
              : t("training.training")}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className={
                "h-full rounded-full transition-all " +
                (xpCapitulo >= chapter.xpParaRetos
                  ? "bg-emerald-400"
                  : "bg-orange-400")
              }
              style={{
                width: `${Math.min(100, Math.round((xpCapitulo / chapter.xpParaRetos) * 100))}%`,
              }}
            />
          </div>
          <span className="shrink-0 tabular-nums opacity-80">
            {Math.min(xpCapitulo, chapter.xpParaRetos)}/{chapter.xpParaRetos} XP
          </span>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl bg-slate-900 p-6 text-center ring-1 ring-white/10">
          <p className="mb-2 font-semibold text-rose-300">
            ⚠ Assets no encontrados
          </p>
          <code className="text-sm text-emerald-300">pnpm fetch:lpc</code>
        </div>
      ) : !frodo ? (
        <p className="text-slate-400">Invocando la Comarca…</p>
      ) : (
        <GameCanvas
          chapter={chapter}
          frodoUrl={frodo.url}
          cols={frodo.cols}
          frameSize={frodo.frameSize}
          heroId={heroId}
          nodeSheets={nodeSheets}
          completed={completed}
          lockedNodes={bloqueados}
          lang={lang}
          locked={
            activeNodeId !== null ||
            showChapters ||
            showIntro ||
            showStats ||
            showLibrary ||
            showHeroes ||
            reward !== null ||
            aviso !== null
          }
          onEnterNode={handleEnterNode}
        />
      )}

      {total > 0 && done === total && frodo && (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-center ring-1 ring-emerald-500/30">
          <p className="text-sm text-emerald-200">
            ✦ Capítulo {chapter.chapter} completado — {total}/{total} runas
            descifradas.
          </p>
          {nextChapter ? (
            <button
              onClick={() => handleSelectChapter(nextChapter.chapter)}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-400"
            >
              Continuar al Capítulo {nextChapter.chapter}: {tc(nextChapter.title)} →
            </button>
          ) : (
            <p className="text-xs text-slate-400">
              Has llegado al final de lo disponible. ¡Más capítulos pronto!
            </p>
          )}
        </div>
      )}

      {activeNode &&
        !reward &&
        (activeNode.kind === "battle" ? (
          <BattleModal
            key={activeNode.node_id}
            node={activeNode}
            enemySheet={nodeSheets[activeNode.enemy.spriteId]}
            nivel={nivel.nivel}
            onWin={handleSolved}
            onClose={() => setActiveNodeId(null)}
          />
        ) : activeNode.kind === "scroll" ? (
          <ScrollModal
            node={activeNode}
            onRead={handleSolved}
            onClose={() => setActiveNodeId(null)}
          />
        ) : activeNode.kind === "quiz" ? (
          <QuizModal
            key={activeNode.node_id}
            node={activeNode}
            onSolved={handleSolved}
            onClose={() => setActiveNodeId(null)}
          />
        ) : activeNode.kind === "archive" ? null : ( // la biblioteca va aparte
          <ChallengeModal
            key={activeNode.node_id}
            node={activeNode}
            solved={completed.has(activeNode.node_id)}
            savedCode={codeFor(progress, currentChapter, activeNode.node_id)}
            onCodeChange={handleCodeChange}
            onSolved={handleSolved}
            onClose={() => setActiveNodeId(null)}
          />
        ))}

      {showIntro && frodo && !showChapters && (
        <ChapterIntro
          chapter={chapter}
          variants={adventure.variants}
          variantLang={variantLang}
          onVariant={setVariantLang}
          onStart={() => setShowIntro(false)}
        />
      )}

      {aviso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 p-6 text-center shadow-2xl ring-1 ring-orange-500/30">
            <p className="text-4xl">🔒</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{aviso}</p>
            <button
              onClick={() => setAviso(null)}
              className="mt-5 rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 hover:bg-amber-400"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {showLibrary && (
        <Library
          chapters={chapters}
          progress={progress}
          onClose={() => setShowLibrary(false)}
        />
      )}

      {showStats && (
        <StatsPanel
          chapters={chapters}
          progress={progress}
          onClose={() => setShowStats(false)}
        />
      )}

      {reward && (
        <RewardModal
          reward={reward.data}
          heroSheet={nodeSheets[reward.data.hero]}
          nextChapterTitle={(() => {
            const c = chapters.find((x) => x.chapter === reward.next);
            return c ? tc(c.title) : undefined;
          })()}
          bookEnd={
            !reward.next
              ? "Así termina el Libro I: la Comunidad se disuelve. Frodo y Sam parten hacia Mordor; los caminos se separan. Tu leyenda continúa en los libros de práctica y en Las Dos Torres."
              : undefined
          }
          onContinue={handleRewardContinue}
        />
      )}

      {showHeroes && (
        <HeroPicker
          heroes={heroes}
          current={heroId}
          sheets={nodeSheets}
          onSelect={handleSelectHero}
          onClose={() => setShowHeroes(false)}
        />
      )}

      {showChapters && (
        <ChapterSelect
          adventure={adventure}
          progress={progress}
          current={currentChapter}
          variantLang={variantLang}
          onVariant={setVariantLang}
          onSelect={handleSelectChapter}
          onReset={handleReset}
          onClose={() => setShowChapters(false)}
        />
      )}

      {showAdventures && (
        <AdventureSelect
          current={adventureId}
          onSelect={handleSelectAdventure}
          onClose={
            // sólo se puede cerrar sin elegir si ya hay una aventura en curso
            Object.keys(progress.completed).length > 0 || !showAdventures
              ? () => setShowAdventures(false)
              : undefined
          }
        />
      )}
    </main>
  );
}
