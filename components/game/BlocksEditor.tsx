"use client";

import { useEffect, useMemo, useState } from "react";

interface Props {
  /** Pool de bloques: unos forman la solución (en orden), otros son distractores. */
  blocks: string[];
  /** Se llama con el código ensamblado (bloques elegidos unidos por saltos de línea). */
  onChange: (code: string) => void;
  /** Cambiar este valor reordena el pool y vacía la selección (para "Reiniciar"). */
  resetKey?: number;
  lang: "es" | "en";
}

interface Block {
  id: number;
  text: string;
}

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Editor por BLOQUES (estilo Parsons), pensado para móvil: en vez de teclear,
 * el jugador toca bloques del banco para añadirlos a su código, los reordena y
 * ejecuta. Algunos bloques son distractores: el compilador y los tests deciden.
 */
export default function BlocksEditor({ blocks, onChange, resetKey = 0, lang }: Props) {
  const T = (es: string, en: string) => (lang === "en" ? en : es);

  // Pool estable y barajado; se rehace al cambiar los bloques o resetKey.
  const pool = useMemo<Block[]>(
    () => shuffle(blocks.map((text, id) => ({ id, text }))),
    [blocks, resetKey],
  );

  // Ids elegidos, en orden. Cada bloque del pool se usa una vez.
  const [chosen, setChosen] = useState<number[]>([]);
  useEffect(() => setChosen([]), [pool]);

  const byId = useMemo(() => {
    const m = new Map<number, string>();
    for (const b of pool) m.set(b.id, b.text);
    return m;
  }, [pool]);

  // Reporta el código ensamblado cada vez que cambia la selección.
  useEffect(() => {
    onChange(chosen.map((id) => byId.get(id) ?? "").join("\n"));
  }, [chosen, byId, onChange]);

  const available = pool.filter((b) => !chosen.includes(b.id));

  const add = (id: number) => setChosen((c) => [...c, id]);
  const remove = (idx: number) =>
    setChosen((c) => c.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) =>
    setChosen((c) => {
      const j = idx + dir;
      if (j < 0 || j >= c.length) return c;
      const a = [...c];
      [a[idx], a[j]] = [a[j], a[idx]];
      return a;
    });

  return (
    <div className="flex flex-col gap-3 overflow-auto p-4 lg:h-full lg:min-h-0">
      {/* Código ensamblado */}
      <div>
        <h4 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          {T("Tu código", "Your code")}
        </h4>
        {chosen.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 bg-slate-950/40 px-3 py-4 text-center text-xs text-slate-500">
            {T(
              "Toca los bloques de abajo para ir montando tu solución, en orden.",
              "Tap the blocks below to assemble your solution, in order.",
            )}
          </p>
        ) : (
          <ol className="space-y-1">
            {chosen.map((id, idx) => (
              <li
                key={`${id}-${idx}`}
                className="flex items-stretch gap-1 rounded-lg bg-slate-800 ring-1 ring-white/10"
              >
                <span className="flex w-6 shrink-0 items-center justify-center rounded-l-lg bg-slate-700/60 font-mono text-[10px] text-slate-400">
                  {idx + 1}
                </span>
                <pre className="flex-1 overflow-x-auto whitespace-pre px-2 py-1.5 font-mono text-[12px] leading-relaxed text-slate-100">
                  <code>{byId.get(id)}</code>
                </pre>
                <div className="flex shrink-0 items-center gap-0.5 pr-1">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    title={T("Subir", "Move up")}
                    className="rounded px-1.5 py-1 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === chosen.length - 1}
                    title={T("Bajar", "Move down")}
                    className="rounded px-1.5 py-1 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    title={T("Quitar", "Remove")}
                    className="rounded px-1.5 py-1 text-rose-300 hover:bg-rose-500/20"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Banco de bloques disponibles */}
      <div>
        <h4 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          {T("Bloques disponibles", "Available blocks")}
          <span className="ml-1 font-normal normal-case text-slate-500">
            {T(
              "· no todos son correctos",
              "· not all of them are correct",
            )}
          </span>
        </h4>
        {available.length === 0 ? (
          <p className="px-1 text-xs text-slate-500">
            {T("Has usado todos los bloques.", "You've used every block.")}
          </p>
        ) : (
          <ul className="space-y-1">
            {available.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => add(b.id)}
                  className="flex w-full items-center gap-2 rounded-lg bg-slate-800/60 px-2 py-1.5 text-left ring-1 ring-white/10 transition hover:bg-indigo-500/15 hover:ring-indigo-500/40"
                >
                  <span className="shrink-0 text-indigo-300">＋</span>
                  <pre className="flex-1 overflow-x-auto whitespace-pre font-mono text-[12px] leading-relaxed text-slate-200">
                    <code>{b.text}</code>
                  </pre>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
