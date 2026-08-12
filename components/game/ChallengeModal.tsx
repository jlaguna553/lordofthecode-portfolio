"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type { ChallengeNode, EvalResult } from "@/lib/game/types";
import { runChallenge, warmup, langOf } from "@/lib/game/runner";
import { useLang } from "@/lib/i18n/context";
import { playSfx } from "@/lib/game/audio";
import BlocksEditor from "./BlocksEditor";

interface Props {
  node: ChallengeNode;
  solved: boolean;
  /** Código que el jugador escribió la última vez en este reto. */
  savedCode?: string;
  /** Persiste el código (se llama con debounce mientras se escribe). */
  onCodeChange?: (nodeId: string, code: string) => void;
  onSolved: (
    nodeId: string,
    stats?: { timeSec: number; attempts: number; hints: number },
  ) => void;
  onClose: () => void;
}

export default function ChallengeModal({
  node,
  solved,
  savedCode,
  onCodeChange,
  onSolved,
  onClose,
}: Props) {
  const { tc, lang } = useLang();
  const c = node.poo_challenge;
  // Si el jugador ya escribió aquí, retomamos su código donde lo dejó.
  const [code, setCode] = useState(savedCode ?? c.starter_code);
  const restored = Boolean(savedCode && savedCode !== c.starter_code);
  // Instancia del editor Monaco (para escribirle al Reiniciar; va no controlado).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  // Modo BLOQUES (Parsons) para móvil: sólo disponible si el reto trae `blocks`.
  const hasBlocks = Boolean(c.blocks && c.blocks.length > 0);
  const [isMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches,
  );
  // Un reto ya resuelto se abre en SOLO LECTURA: se puede ver (y volver a
  // ejecutar para repasar), pero no editar. Siempre en modo editor.
  const [mode, setMode] = useState<"editor" | "blocks">(
    solved ? "editor" : hasBlocks && isMobile ? "blocks" : "editor",
  );
  const [blocksResetKey, setBlocksResetKey] = useState(0);
  const T = (es: string, en: string) => (lang === "en" ? en : es);

  // Guardado con debounce: no escribimos en localStorage en cada tecla.
  // En solo lectura (resuelto) no hay cambios que guardar.
  useEffect(() => {
    if (!onCodeChange || solved) return;
    const id = setTimeout(() => onCodeChange(node.node_id, code), 600);
    return () => clearTimeout(id);
  }, [code, node.node_id, onCodeChange, solved]);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [running, setRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const hints = c.hints ?? [];

  // Cronómetro de práctica: sólo informa, nunca bloquea.
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  elapsedRef.current = elapsed;
  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const overtime = c.timeLimitSec ? elapsed > c.timeLimitSec : false;
  const mmss = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // Precargar php-wasm mientras el jugador lee el lore.
  useEffect(() => {
    warmup(c);
  }, [c]);

  async function handleRun() {
    setRunning(true);
    try {
      const r = await runChallenge(code, c);
      const intento = attempts + 1;
      setAttempts(intento);
      setResult(r);
      playSfx(r.ok ? "success" : "fail");
      if (r.ok && !solved) {
        onSolved(node.node_id, {
          timeSec: elapsedRef.current,
          attempts: intento,
          hints: hintsShown,
        });
      }
    } catch (e) {
      setResult({
        ok: false,
        results: [],
        phpError: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setRunning(false);
    }
  }

  const allPass = result?.ok ?? false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
        {/* Cabecera */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span
                className={
                  "rounded px-1.5 py-0.5 text-[10px] font-bold ring-1 " +
                  (langOf(c) === "python"
                    ? "bg-sky-500/15 text-sky-300 ring-sky-500/40"
                    : langOf(c) === "javascript"
                      ? "bg-amber-500/15 text-amber-300 ring-amber-500/40"
                      : langOf(c) === "typescript"
                        ? "bg-blue-500/15 text-blue-300 ring-blue-500/40"
                        : langOf(c) === "go"
                          ? "bg-cyan-500/15 text-cyan-300 ring-cyan-500/40"
                          : langOf(c) === "react"
                            ? "bg-cyan-500/15 text-cyan-200 ring-cyan-400/40"
                            : langOf(c) === "sql"
                              ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
                              : langOf(c) === "vue"
                                ? "bg-green-500/15 text-green-300 ring-green-500/40"
                                : langOf(c) === "aws"
                                  ? "bg-amber-500/15 text-amber-300 ring-amber-500/40"
                                  : langOf(c) === "docker"
                                    ? "bg-sky-500/15 text-sky-300 ring-sky-500/40"
                                    : "bg-violet-500/15 text-violet-300 ring-violet-500/40")
                }
              >
                {langOf(c) === "python"
                  ? "🐍 Python"
                  : langOf(c) === "javascript"
                    ? "🟨 JavaScript"
                    : langOf(c) === "typescript"
                      ? "🔷 TypeScript"
                      : langOf(c) === "go"
                        ? "🐹 Go"
                        : langOf(c) === "react"
                          ? "⚛️ React"
                          : langOf(c) === "sql"
                            ? "🗃️ SQL"
                            : langOf(c) === "vue"
                              ? "💚 Vue"
                              : langOf(c) === "aws"
                                ? "☁️ AWS"
                                : langOf(c) === "docker"
                                  ? "🐳 Docker"
                                  : "🐘 PHP"}
              </span>
              Capítulo · {tc(c.topic)}
            </p>
            <h2 className="text-xl font-bold text-slate-100">{tc(node.title)}</h2>
          </div>
          {c.timeLimitSec && (
            <div
              className={
                "rounded-lg px-3 py-1.5 text-center font-mono text-sm tabular-nums ring-1 " +
                (overtime
                  ? "bg-rose-500/15 text-rose-300 ring-rose-500/40"
                  : "bg-slate-800 text-slate-300 ring-white/10")
              }
              title="Tiempo objetivo (sólo informativo)"
            >
              ⏱ {mmss(elapsed)}
              <span className="opacity-60"> / {mmss(c.timeLimitSec)}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
          >
            ✕ Cerrar
          </button>
        </div>

        {/*
          En móvil: una sola columna que fluye y hace scroll como un todo.
          En lg: dos columnas (narrativa | editor), cada una con su scroll.
        */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:grid-cols-[1fr_1.2fr] lg:overflow-hidden">
          {/* Panel narrativo + instrucciones */}
          <div className="shrink-0 border-b border-white/10 p-5 lg:shrink lg:overflow-auto lg:border-b-0 lg:border-r">
            <blockquote className="mb-4 border-l-2 border-amber-500/50 bg-amber-500/5 p-3 text-sm italic text-amber-100/90">
              {tc(node.lore_intro)}
            </blockquote>
            <h3 className="mb-1 text-sm font-bold text-slate-200">Tu misión</h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              {tc(c.instructions)}
            </p>

            {c.support_code && (
              <details className="mb-4 rounded-lg bg-slate-800/60 ring-1 ring-white/10">
                <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-sky-300 select-none">
                  🧩 Código de apoyo disponible
                </summary>
                <p className="px-3 pb-2 text-[11px] leading-relaxed text-slate-400">
                  Estas clases y funciones ya existen: puedes usarlas, pero no
                  las declares tú.
                </p>
                <pre className="overflow-x-auto rounded-b-lg bg-slate-950/70 px-3 py-2 text-[11px] leading-relaxed text-slate-200">
                  <code>{c.support_code}</code>
                </pre>
              </details>
            )}

            <h3 className="mb-2 text-sm font-bold text-slate-200">
              Runas de prueba ({c.test_cases.length})
            </h3>
            <ul className="space-y-1.5">
              {c.test_cases.map((t, i) => {
                const r = result?.results[i];
                return (
                  <li
                    key={i}
                    className={
                      "rounded-lg px-3 py-2 text-xs ring-1 " +
                      (!r
                        ? "bg-slate-800/50 text-slate-400 ring-white/5"
                        : r.pass
                          ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/30"
                          : "bg-rose-500/10 text-rose-200 ring-rose-500/30")
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span>{!r ? "○" : r.pass ? "✓" : "✗"}</span>
                      <code className="font-mono">
                        {t.raw || !c.sut ? t.input : `$sut->${t.input}`}
                      </code>
                    </div>
                    {t.description && (
                      <p className="mt-0.5 pl-5 opacity-80">{tc(t.description)}</p>
                    )}
                    {r && !r.pass && (
                      <p className="mt-1 pl-5 font-mono text-[11px] opacity-90">
                        esperado {r.expected} · obtuvo {r.got}
                      </p>
                    )}
                    {r?.warning && (
                      <p className="mt-1 pl-5 text-[11px] text-amber-300/90">
                        ⚠ PHP avisa: {r.warning}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            {hints.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200">Pistas</h3>
                  {hintsShown < hints.length && (
                    <button
                      type="button"
                      onClick={() => setHintsShown((n) => n + 1)}
                      className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-500/40 transition hover:bg-amber-500/30"
                    >
                      💡 Pedir pista ({hintsShown}/{hints.length})
                    </button>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {hints.slice(0, hintsShown).map((h, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90 ring-1 ring-amber-500/20"
                    >
                      <span className="font-bold">{i + 1}.</span> {tc(h)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result?.phpError && (
              <pre className="mt-3 overflow-auto rounded-lg bg-rose-950/60 p-3 text-[11px] text-rose-200 ring-1 ring-rose-500/30">
                {result.phpError}
              </pre>
            )}
          </div>

          {/* Editor + acciones */}
          <div className="flex min-h-0 flex-col">
            {solved && (
              <div className="flex shrink-0 items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
                ✓{" "}
                {T(
                  "Reto resuelto · solo lectura",
                  "Puzzle solved · read-only",
                )}
              </div>
            )}
            {hasBlocks && !solved && (
              <div className="flex shrink-0 items-center gap-1 border-b border-white/10 bg-slate-900/60 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setMode("blocks")}
                  className={
                    "rounded-md px-2.5 py-1 text-xs font-semibold transition " +
                    (mode === "blocks"
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700")
                  }
                >
                  🧩 {T("Bloques", "Blocks")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Al pasar a teclear, si no hay nada montado, parte del
                    // andamiaje en vez de un editor vacío.
                    if (!code.trim()) setCode(c.starter_code);
                    setMode("editor");
                  }}
                  className={
                    "rounded-md px-2.5 py-1 text-xs font-semibold transition " +
                    (mode === "editor"
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700")
                  }
                >
                  ⌨ {T("Editor", "Editor")}
                </button>
                <span className="ml-1 hidden text-[11px] text-slate-500 sm:inline">
                  {T(
                    "Ordena los bloques o escribe a mano",
                    "Order the blocks or type by hand",
                  )}
                </span>
              </div>
            )}
            <div
              className={
                // En móvil el editor de texto necesita una altura fija (Monaco
                // no dimensiona solo); el de bloques fluye con su contenido.
                // En lg, ambos rellenan la columna.
                "lg:min-h-[280px] lg:flex-1 " +
                (mode === "blocks" && hasBlocks && !solved
                  ? "shrink-0"
                  : "h-[52vh] shrink-0 lg:h-auto")
              }
            >
              {mode === "blocks" && hasBlocks && !solved ? (
                <BlocksEditor
                  blocks={c.blocks!}
                  onChange={setCode}
                  resetKey={blocksResetKey}
                  lang={lang}
                />
              ) : (
                /*
                  Editor NO controlado: `defaultValue` en vez de `value`. Monaco
                  es la fuente de verdad del texto y `onChange` sólo alimenta el
                  estado que se usa al ejecutar. Con `value` controlado, los
                  re-renders del cronómetro (uno por segundo) hacían que Monaco
                  recibiera un value desfasado y reejecutara setValue, borrando lo
                  tecleado y mandando el cursor al final.
                */
                <Editor
                  height="100%"
                  language={langOf(c) === "react" || langOf(c) === "vue" || langOf(c) === "aws" ? "javascript" : langOf(c) === "docker" ? "dockerfile" : langOf(c)}
                  path={`reto-${node.node_id}.${langOf(c) === "python" ? "py" : langOf(c) === "javascript" ? "js" : langOf(c) === "typescript" ? "ts" : langOf(c) === "go" ? "go" : langOf(c) === "react" ? "tsx" : langOf(c) === "sql" ? "sql" : langOf(c) === "vue" ? "js" : langOf(c) === "aws" ? "js" : langOf(c) === "docker" ? "dockerfile" : "php"}`}
                  theme="vs-dark"
                  defaultValue={code}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                  onChange={(v) => setCode(v ?? "")}
                  options={{
                    readOnly: solved,
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    tabSize: 4,
                    insertSpaces: true,
                  }}
                />
              )}
            </div>

            <div className="sticky bottom-0 z-10 flex shrink-0 flex-wrap items-center gap-3 border-t border-white/10 bg-slate-900/95 p-4 backdrop-blur">
              <button
                onClick={handleRun}
                disabled={running}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
              >
                {running
                  ? "Pronunciando…"
                  : solved
                    ? T("▶ Revisar", "▶ Review")
                    : "▶ Ejecutar runas"}
              </button>
              {!solved && (
                <button
                  onClick={() => {
                    if (mode === "blocks") {
                      // Rebaraja el pool y vacía la selección.
                      setBlocksResetKey((k) => k + 1);
                      setCode("");
                    } else {
                      // Editor no controlado: hay que escribirle el texto a mano.
                      editorRef.current?.setValue(c.starter_code);
                      setCode(c.starter_code);
                    }
                    setResult(null);
                  }}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
                >
                  {mode === "blocks" ? T("Vaciar", "Clear") : "Reiniciar"}
                </button>
              )}
              {restored && !result && !solved && (
                <span
                  className="text-xs text-slate-500"
                  title="Se retomó el código que escribiste la última vez"
                >
                  ✎ código guardado
                </span>
              )}

              {allPass && (
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-sm font-semibold text-emerald-400">
                    ✦ ¡Conjuro completado!
                  </span>
                  <button
                    onClick={onClose}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
                  >
                    Continuar →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
