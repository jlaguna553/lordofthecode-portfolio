"use client";

import type { Chapter } from "@/lib/game/types";
import { useLang } from "@/lib/i18n/context";
import type { Localized } from "@/lib/i18n/core";
import type { MapNode } from "@/lib/game/types";
import type { Progress } from "@/lib/game/progress";
import { completedOf, statsFor } from "@/lib/game/progress";

interface Props {
  /** Capítulos de la aventura activa. */
  chapters: Chapter[];
  progress: Progress;
  onClose: () => void;
}

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Tema que enseña un nodo, sea del tipo que sea. */
function topicOf(n: MapNode): Localized<string> {
  return n.kind === "scroll"
    ? n.scroll.topic
    : n.kind === "quiz"
      ? n.quiz.topic
      : n.kind === "battle"
        ? n.enemy.name
        : n.kind === "archive"
          ? "Archivo"
          : n.poo_challenge.topic;
}

/** Área de preparación a la que pertenece cada capítulo. */
function areaOf(chapter: number): string {
  if (chapter <= 8) return "POO en PHP";
  if (chapter === 9) return "SOLID y diseño";
  if (chapter === 12) return "Lógica y razonamiento";
  return "Algoritmos";
}

/** Tiempo objetivo del nodo, si lo tiene. */
function targetOf(n: MapNode): number | undefined {
  return n.kind === "quiz"
    ? n.quiz.timeLimitSec
    : n.kind === "scroll" || n.kind === "battle" || n.kind === "archive"
      ? undefined
      : n.poo_challenge.timeLimitSec;
}

export default function StatsPanel({ chapters, progress, onClose }: Props) {
  const { tc } = useLang();
  // --- Recorremos toda la campaña cruzando con el progreso ---
  let totalNodos = 0;
  let hechos = 0;
  const porTipo = {
    challenge: { total: 0, done: 0 },
    scroll: { total: 0, done: 0 },
    quiz: { total: 0, done: 0 },
    battle: { total: 0, done: 0 },
  };
  const porCapitulo: {
    cap: number;
    titulo: string;
    total: number;
    done: number;
  }[] = [];
  const porArea = new Map<string, { total: number; done: number }>();
  const flojos: {
    titulo: string;
    cap: number;
    motivo: string;
    tema: string;
  }[] = [];
  const tiempos: {
    titulo: string;
    cap: number;
    seg: number;
    objetivo: number;
  }[] = [];

  for (const ch of chapters) {
    const done = completedOf(progress, ch.chapter);
    let capDone = 0;
    for (const n of ch.nodes) {
      totalNodos++;
      const kind = n.kind ?? "challenge";
      if (kind === "archive") continue; // la biblioteca no cuenta en stats
      porTipo[kind].total++;
      const resuelto = done.has(n.node_id);
      if (resuelto) {
        hechos++;
        porTipo[kind].done++;
      }

      if (resuelto) capDone++;
      const area = areaOf(ch.chapter);
      const a = porArea.get(area) ?? { total: 0, done: 0 };
      a.total++;
      if (resuelto) a.done++;
      porArea.set(area, a);

      const st = statsFor(progress, ch.chapter, n.node_id);
      const objetivo = targetOf(n);
      if (st && objetivo) {
        tiempos.push({
          titulo: tc(n.title),
          cap: ch.chapter,
          seg: st.timeSec,
          objetivo,
        });
      }
      if (st) {
        const motivos: string[] = [];
        if (objetivo && st.timeSec > objetivo)
          motivos.push(`${mmss(st.timeSec)} vs ${mmss(objetivo)} objetivo`);
        if (st.attempts >= 4) motivos.push(`${st.attempts} intentos`);
        if (st.hints >= 2) motivos.push(`${st.hints} pistas`);
        if (motivos.length)
          flojos.push({
            titulo: tc(n.title),
            cap: ch.chapter,
            motivo: motivos.join(" · "),
            tema: tc(topicOf(n)),
          });
      }
    }
    porCapitulo.push({
      cap: ch.chapter,
      titulo: tc(ch.title),
      total: ch.nodes.length,
      done: capDone,
    });
  }

  const areas = [...porArea.entries()];
  const capitulos = [...porCapitulo].sort(
    (a, b) => a.done / a.total - b.done / b.total,
  );
  const pct = totalNodos ? Math.round((hechos / totalNodos) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Tu preparación
            </p>
            <h2 className="text-xl font-bold text-slate-100">Estadísticas</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
          >
            ✕ Cerrar
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-auto p-6">
          {/* Resumen */}
          <section>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="text-sm font-bold text-slate-200">Progreso total</h3>
              <span className="font-mono text-sm text-emerald-300">
                {hechos}/{totalNodos} · {pct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-950">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              {[
                ["Retos", porTipo.challenge, "text-amber-300"],
                ["Pergaminos", porTipo.scroll, "text-sky-300"],
                ["Enigmas", porTipo.quiz, "text-violet-300"],
                ["Combates", porTipo.battle, "text-orange-300"],
              ].map(([label, v, color]) => {
                const val = v as { total: number; done: number };
                return (
                  <div
                    key={label as string}
                    className="rounded-xl bg-slate-800/60 p-3 ring-1 ring-white/5"
                  >
                    <p className={`font-mono text-lg font-bold ${color as string}`}>
                      {val.done}/{val.total}
                    </p>
                    <p className="text-xs text-slate-400">{label as string}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dominio por área de preparación */}
          <section>
            <h3 className="mb-2 text-sm font-bold text-slate-200">
              Por área de preparación
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {areas.map(([area, v]) => {
                const p = Math.round((v.done / v.total) * 100);
                return (
                  <div
                    key={area}
                    className="rounded-xl bg-slate-800/60 p-3 ring-1 ring-white/5"
                  >
                    <p className="mb-1 text-xs text-slate-400">{area}</p>
                    <p className="font-mono text-base font-bold text-slate-100">
                      {p}%
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-950">
                      <div
                        className={
                          "h-full rounded-full " +
                          (p === 100 ? "bg-emerald-500" : p > 0 ? "bg-amber-500" : "bg-slate-700")
                        }
                        style={{ width: `${Math.max(p, 2)}%` }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-slate-500">
                      {v.done}/{v.total} nodos
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dominio por capítulo */}
          <section>
            <h3 className="mb-2 text-sm font-bold text-slate-200">
              Por capítulo
              <span className="ml-2 font-normal text-xs text-slate-500">
                (lo más flojo primero)
              </span>
            </h3>
            <ul className="space-y-1.5">
              {capitulos.map((v) => {
                const p = Math.round((v.done / v.total) * 100);
                return (
                  <li key={v.cap} className="flex items-center gap-3">
                    <span
                      className="w-56 shrink-0 truncate text-xs text-slate-300"
                      title={v.titulo}
                    >
                      <span className="text-slate-500">C{v.cap}</span> {v.titulo}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-950">
                      <div
                        className={
                          "h-full rounded-full " +
                          (p === 100
                            ? "bg-emerald-500"
                            : p > 0
                              ? "bg-amber-500"
                              : "bg-slate-700")
                        }
                        style={{ width: `${Math.max(p, 2)}%` }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right font-mono text-xs text-slate-500">
                      {v.done}/{v.total}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Tiempos cronometrados */}
          {tiempos.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-bold text-slate-200">
                Tiempos frente al objetivo
              </h3>
              <ul className="space-y-1">
                {tiempos.map((t, i) => {
                  const dentro = t.seg <= t.objetivo;
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-slate-800/40 px-3 py-1.5 text-xs"
                    >
                      <span className="truncate text-slate-300">
                        <span className="text-slate-500">C{t.cap}</span> {t.titulo}
                      </span>
                      <span
                        className={
                          "ml-3 shrink-0 font-mono " +
                          (dentro ? "text-emerald-300" : "text-rose-300")
                        }
                      >
                        {mmss(t.seg)} / {mmss(t.objetivo)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Dónde flojeas */}
          <section>
            <h3 className="mb-2 text-sm font-bold text-slate-200">
              Para repasar
            </h3>
            {flojos.length === 0 ? (
              <p className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-200 ring-1 ring-emerald-500/30">
                Nada que señalar: todo lo resuelto fue dentro de tiempo, a la
                primera y sin pistas. Sigue así.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {flojos.map((f, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-100 ring-1 ring-amber-500/25"
                  >
                    <span className="font-semibold">{f.titulo}</span>
                    <span className="text-amber-300/70"> · C{f.cap}</span>
                    <p className="mt-0.5 opacity-80">{f.motivo}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-slate-500">
              Consejo del pergamino: repite a los dos días los que te costaron.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
