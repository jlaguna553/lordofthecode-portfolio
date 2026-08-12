"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { BattleNode } from "@/lib/game/types";
import { playSfx } from "@/lib/game/audio";
import { vidaMaxima } from "@/lib/game/rpg";
import { shuffleQuestion } from "@/lib/game/quiz";
import { useLang } from "@/lib/i18n/context";

interface Props {
  node: BattleNode;
  /** Sprite compuesto del enemigo, si el capítulo lo tiene cargado. */
  enemySheet?: { url: string; cols: number; frameSize: number };
  /** Nivel actual del jugador: determina con cuánta vida entra al combate. */
  nivel: number;
  onWin: (
    nodeId: string,
    stats?: { timeSec: number; attempts: number; hints: number },
  ) => void;
  onClose: () => void;
}

/** Barra de vida con casillas: se lee de un vistazo cuánto te queda. */
function Vida({
  actual,
  max,
  color,
}: {
  actual: number;
  max: number;
  color: string;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={
            "h-2.5 w-4 rounded-sm transition " +
            (i < actual ? color : "bg-slate-700/60")
          }
        />
      ))}
    </div>
  );
}

/**
 * Combate por turnos. La mecánica es la práctica del capítulo: cada pregunta
 * es un turno. Aciertas y golpeas; fallas y te golpea a ti. Las preguntas
 * versan sobre lo mismo que los retos de código que vienen después, así que
 * pelear ES estudiar.
 */
export default function BattleModal({
  node,
  enemySheet,
  nivel,
  onWin,
  onClose,
}: Props) {
  const { tc } = useLang();
  const enemigo = node.enemy;
  const maxJugador = vidaMaxima(nivel);

  const [vidaEnemigo, setVidaEnemigo] = useState(enemigo.hp);
  const [vidaJugador, setVidaJugador] = useState(maxJugador);
  const [turno, setTurno] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [intentos, setIntentos] = useState(1);
  const [sacudida, setSacudida] = useState<"jugador" | "enemigo" | null>(null);

  const inicio = useRef(Date.now());
  const yaGanado = useRef(false);

  // Las preguntas se recorren en bucle: un enemigo con 4 de vida y 3 preguntas
  // vuelve a la primera. Barajamos para que repetir el combate no sea de memoria.
  const orden = useMemo(() => {
    const idx = enemigo.questions.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
    // Rebarajar al reintentar (`intentos` cambia).
  }, [enemigo.questions, intentos]);

  // Opciones mezcladas por turno: estables durante el turno (aunque el
  // cronómetro/estado re-renderice), se rebarajan al avanzar o al reintentar.
  const pregunta = useMemo(
    () => shuffleQuestion(enemigo.questions[orden[turno % orden.length]]),
    [enemigo.questions, orden, turno, intentos],
  );
  const acerto = checked && picked === pregunta.correct;
  const ganado = vidaEnemigo <= 0;
  const perdido = vidaJugador <= 0;
  const terminado = ganado || perdido;

  useEffect(() => {
    if (ganado && !yaGanado.current) {
      yaGanado.current = true;
      playSfx("chapter");
      onWin(node.node_id, {
        timeSec: Math.round((Date.now() - inicio.current) / 1000),
        attempts: intentos,
        hints: 0,
      });
    }
  }, [ganado, intentos, node.node_id, onWin]);

  function atacar() {
    setChecked(true);
    const bien = picked === pregunta.correct;
    playSfx(bien ? "quizRight" : "quizWrong");
    if (bien) {
      setVidaEnemigo((v) => v - 1);
      setSacudida("enemigo");
    } else {
      setVidaJugador((v) => Math.max(0, v - enemigo.damage));
      setSacudida("jugador");
    }
    setTimeout(() => setSacudida(null), 400);
  }

  function siguienteTurno() {
    setTurno((t) => t + 1);
    setPicked(null);
    setChecked(false);
  }

  function reintentar() {
    setVidaEnemigo(enemigo.hp);
    setVidaJugador(maxJugador);
    setTurno(0);
    setPicked(null);
    setChecked(false);
    setIntentos((n) => n + 1);
    inicio.current = Date.now();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        className={
          "flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 " +
          (enemigo.boss ? "ring-rose-500/40" : "ring-orange-500/25")
        }
      >
        {/* --- Cabecera: quién es y cómo van las vidas --- */}
        <div
          className={
            "border-b border-white/10 p-4 " +
            (enemigo.boss
              ? "bg-gradient-to-b from-rose-500/15 to-transparent"
              : "bg-gradient-to-b from-orange-500/10 to-transparent")
          }
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={
                  "text-xs font-semibold uppercase tracking-wider " +
                  (enemigo.boss ? "text-rose-300" : "text-orange-300")
                }
              >
                {enemigo.boss ? "⚔ Jefe de capítulo" : "⚔ Combate"}
              </p>
              <h2 className="truncate text-xl font-bold text-slate-100">
                {tc(enemigo.name)}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
            >
              ✕ Huir
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {enemySheet && (
                <span
                  className={
                    "block shrink-0 transition-transform " +
                    (sacudida === "enemigo" ? "-translate-y-1 scale-110" : "")
                  }
                  style={{
                    width: enemySheet.frameSize,
                    height: enemySheet.frameSize,
                    backgroundImage: `url(${enemySheet.url})`,
                    // Fila 10 = caminar hacia el sur; primer fotograma de la fila.
                    backgroundPosition: `0 -${10 * enemySheet.frameSize}px`,
                    imageRendering: "pixelated",
                  }}
                />
              )}
              <div>
                <p className="mb-1 text-xs text-slate-400">{tc(enemigo.name)}</p>
                <Vida
                  actual={vidaEnemigo}
                  max={enemigo.hp}
                  color={enemigo.boss ? "bg-rose-400" : "bg-orange-400"}
                />
              </div>
            </div>
            <div className={sacudida === "jugador" ? "animate-pulse" : ""}>
              <p className="mb-1 text-right text-xs text-slate-400">
                Frodo · nivel {nivel}
              </p>
              <Vida actual={vidaJugador} max={maxJugador} color="bg-emerald-400" />
            </div>
          </div>
        </div>

        {/* --- Cuerpo: el turno --- */}
        <div className="flex-1 overflow-auto p-6">
          {!terminado ? (
            <>
              <blockquote
                className={
                  "mb-4 border-l-2 p-3 text-sm italic " +
                  (enemigo.boss
                    ? "border-rose-500/40 bg-rose-500/5 text-rose-100/80"
                    : "border-orange-500/40 bg-orange-500/5 text-orange-100/80")
                }
              >
                {turno === 0 && enemigo.taunt ? tc(enemigo.taunt) : tc(node.lore_intro)}
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
                    cls = "bg-amber-500/20 text-amber-100 ring-amber-500/50";
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
                      : "bg-rose-500/10 text-rose-100 ring-rose-500/30")
                  }
                >
                  <p className="mb-1 font-bold">
                    {acerto
                      ? "⚔ ¡Golpe certero!"
                      : `✗ Fallas, y ${tc(enemigo.name)} te alcanza (−${enemigo.damage})`}
                  </p>
                  <p className="leading-relaxed opacity-90">
                    {tc(pregunta.explanation)}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-5xl">{ganado ? "⚔" : "☠"}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-100">
                {ganado ? `${tc(enemigo.name)} cae` : "Has caído"}
              </h3>
              {ganado ? (
                <p className="mt-2 text-sm text-emerald-300">
                  +{enemigo.xp} puntos de experiencia
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-400">
                  Nadie muere de verdad en la Comarca. Repasa lo que has fallado
                  y vuelve a intentarlo.
                </p>
              )}
            </div>
          )}
        </div>

        {/* --- Pie: acción --- */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 p-4">
          {!terminado ? (
            !checked ? (
              <button
                onClick={atacar}
                disabled={picked === null}
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-amber-400 disabled:opacity-40"
              >
                ⚔ Atacar
              </button>
            ) : (
              <button
                onClick={siguienteTurno}
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
              >
                Siguiente turno →
              </button>
            )
          ) : (
            <>
              {perdido && (
                <button
                  onClick={reintentar}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                >
                  Volver a intentarlo
                </button>
              )}
              <button
                onClick={onClose}
                className={
                  "rounded-lg px-4 py-2 text-sm font-bold text-white " +
                  (ganado
                    ? "bg-emerald-500 hover:bg-emerald-400"
                    : "bg-slate-700 hover:bg-slate-600")
                }
              >
                {ganado ? "Continuar →" : "Cerrar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
