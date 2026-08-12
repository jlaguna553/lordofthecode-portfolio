"use client";

import { useEffect, useMemo, useState } from "react";
import type { QuizNode } from "@/lib/game/types";
import { playSfx } from "@/lib/game/audio";
import { shuffleQuestion } from "@/lib/game/quiz";
import { useLang } from "@/lib/i18n/context";

interface Props {
  node: QuizNode;
  onSolved: (
    nodeId: string,
    stats?: { timeSec: number; attempts: number; hints: number },
  ) => void;
  onClose: () => void;
}

/**
 * Acertijo de lógica: preguntas de opción múltiple, una a una.
 * Se completa acertando TODAS; siempre se puede reintentar.
 */
export default function QuizModal({ node, onSolved, onClose }: Props) {
  const { tc } = useLang();
  const q = node.quiz;
  const total = q.questions.length;

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [finished, setFinished] = useState(false);
  const [intentos, setIntentos] = useState(1);

  // Cronómetro de la tanda (informativo, como en el test real).
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);
  const mmss = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const overtime = q.timeLimitSec ? elapsed > q.timeLimitSec : false;

  // Opciones mezcladas: estables mientras estás en esta pregunta, se rebarajan
  // al pasar a la siguiente o al reintentar la tanda.
  const pregunta = useMemo(
    () => shuffleQuestion(q.questions[index]),
    [q.questions, index, intentos],
  );
  const acerto = checked && picked === pregunta.correct;

  function comprobar() {
    setChecked(true);
    const bien = picked === pregunta.correct;
    playSfx(bien ? "quizRight" : "quizWrong");
    if (bien) setAciertos((a) => a + 1);
  }

  function siguiente() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setPicked(null);
      setChecked(false);
      return;
    }
    setFinished(true);
    const todas = aciertos === total;
    if (todas) {
      onSolved(node.node_id, {
        timeSec: elapsed,
        attempts: intentos,
        hints: 0,
      });
    }
  }

  function reintentar() {
    setIndex(0);
    setPicked(null);
    setChecked(false);
    setAciertos(0);
    setFinished(false);
    setElapsed(0);
    setIntentos((n) => n + 1);
  }

  const perfecto = aciertos === total;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-violet-500/25">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-gradient-to-b from-violet-500/10 to-transparent p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
              🜛 Enigma · {tc(q.topic)}
            </p>
            <h2 className="text-xl font-bold text-slate-100">{tc(node.title)}</h2>
          </div>
          <div className="flex items-center gap-2">
            {q.timeLimitSec && !finished && (
              <div
                className={
                  "rounded-lg px-3 py-1.5 font-mono text-sm tabular-nums ring-1 " +
                  (overtime
                    ? "bg-rose-500/15 text-rose-300 ring-rose-500/40"
                    : "bg-slate-800 text-slate-300 ring-white/10")
                }
              >
                ⏱ {mmss(elapsed)}
                <span className="opacity-60"> / {mmss(q.timeLimitSec)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {!finished ? (
            <>
              <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Pregunta {index + 1} de {total}
                </span>
                <span>{aciertos} acertadas</span>
              </div>

              <blockquote className="mb-4 border-l-2 border-violet-500/40 bg-violet-500/5 p-3 text-sm italic text-violet-100/80">
                {tc(node.lore_intro)}
              </blockquote>

              <p className="mb-4 whitespace-pre-line text-base font-medium leading-relaxed text-slate-100">
                {tc(pregunta.question)}
              </p>

              <ul className="space-y-2">
                {pregunta.options.map((op, i) => {
                  const esCorrecta = i === pregunta.correct;
                  const elegida = picked === i;
                  let cls =
                    "bg-slate-800/60 text-slate-200 ring-white/10 hover:bg-slate-800";
                  if (checked && esCorrecta)
                    cls = "bg-emerald-500/15 text-emerald-200 ring-emerald-500/40";
                  else if (checked && elegida)
                    cls = "bg-rose-500/15 text-rose-200 ring-rose-500/40";
                  else if (elegida)
                    cls = "bg-violet-500/20 text-violet-100 ring-violet-500/50";
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        disabled={checked}
                        data-correct={
                          process.env.NODE_ENV !== "production" &&
                          i === pregunta.correct
                            ? "1"
                            : undefined
                        }
                        onClick={() => setPicked(i)}
                        className={
                          "w-full rounded-xl px-4 py-3 text-left text-sm transition ring-1 disabled:cursor-default " +
                          cls
                        }
                      >
                        <span className="mr-2 font-bold opacity-60">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {tc(op)}
                        {checked && esCorrecta && (
                          <span className="ml-2 font-bold">✓</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {checked && (
                <div
                  className={
                    "mt-4 rounded-xl p-4 text-sm ring-1 " +
                    (acerto
                      ? "bg-emerald-500/10 text-emerald-100 ring-emerald-500/30"
                      : "bg-amber-500/10 text-amber-100 ring-amber-500/30")
                  }
                >
                  <p className="mb-1 font-bold">
                    {acerto ? "✓ Correcto" : "✗ No era esa"}
                  </p>
                  <p className="leading-relaxed opacity-90">
                    {tc(pregunta.explanation)}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="py-6 text-center">
              <p className="text-4xl">{perfecto ? "✦" : "🜛"}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-100">
                {aciertos} de {total} acertadas
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {perfecto
                  ? "El enigma queda descifrado."
                  : "Las runas siguen mudas. Vuelve a intentarlo: ahora conoces el razonamiento."}
              </p>
              {q.timeLimitSec && (
                <p className="mt-2 font-mono text-xs text-slate-500">
                  Tiempo: {mmss(elapsed)} (objetivo {mmss(q.timeLimitSec)})
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 p-4">
          {!finished ? (
            !checked ? (
              <button
                onClick={comprobar}
                disabled={picked === null}
                className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-40"
              >
                Comprobar
              </button>
            ) : (
              <button
                onClick={siguiente}
                className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                {index + 1 < total ? "Siguiente →" : "Ver resultado"}
              </button>
            )
          ) : (
            <>
              {!perfecto && (
                <button
                  onClick={reintentar}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                >
                  Reintentar
                </button>
              )}
              <button
                onClick={onClose}
                className={
                  "rounded-lg px-4 py-2 text-sm font-bold text-white " +
                  (perfecto
                    ? "bg-emerald-500 hover:bg-emerald-400"
                    : "bg-slate-700 hover:bg-slate-600")
                }
              >
                {perfecto ? "Continuar →" : "Cerrar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
