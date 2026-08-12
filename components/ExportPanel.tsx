"use client";

import { useState } from "react";
import type { LpcCategory, Selection } from "@/lib/lpc/types";
import { resolveLayers } from "@/lib/lpc/loader";
import { measureSheet } from "@/lib/lpc/compositor";
import {
  buildCharacterExport,
  downloadJson,
  downloadPng,
  type CharacterExport,
} from "@/lib/lpc/export";
import { CHALLENGES, findChallenge } from "@/data/challenges";

interface SheetMeta {
  width: number;
  height: number;
  layers: number;
}

interface Props {
  categories: LpcCategory[];
  selection: Selection;
  /** id del personaje (controlado por el editor; los presets lo fijan). */
  characterId: string;
  onCharacterId: (id: string) => void;
  /** id del acertijo POO seleccionado (controlado). */
  challengeId: string;
  onChallengeId: (id: string) => void;
}

/**
 * Panel de exportación: compone la spritesheet completa a PNG y genera el JSON
 * de metadatos (con el acertijo POO) para alimentar el motor del juego.
 */
export default function ExportPanel({
  categories,
  selection,
  characterId,
  onCharacterId,
  challengeId,
  onChallengeId,
}: Props) {
  const [result, setResult] = useState<CharacterExport | null>(null);
  const [meta, setMeta] = useState<SheetMeta | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleGenerate() {
    setBusy(true);
    try {
      const layers = await resolveLayers(categories, selection);
      const challenge = findChallenge(challengeId);
      const data = buildCharacterExport({
        id: characterId.trim() || "personaje",
        categories,
        selection,
        layers,
        challenge: challenge
          ? {
              topic: challenge.topic,
              prompt: challenge.prompt,
              code_template: challenge.code_template,
            }
          : undefined,
      });
      const size = measureSheet(layers);
      setMeta({ width: size.width, height: size.height, layers: layers.length });
      setResult(data);
    } finally {
      setBusy(false);
    }
  }

  function onSelectChallenge(id: string) {
    onChallengeId(id);
    const ch = findChallenge(id);
    if (ch) onCharacterId(ch.id);
  }

  // JSON mostrado con el sprite_url truncado para legibilidad.
  const preview = result
    ? JSON.stringify(
        {
          ...result,
          sprite_url:
            result.sprite_url.slice(0, 42) +
            `… (${Math.round(result.sprite_url.length / 1024)} KB base64)`,
        },
        null,
        2,
      )
    : "";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-300">
          ID del personaje
        </label>
        <input
          value={characterId}
          onChange={(e) => onCharacterId(e.target.value)}
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          placeholder="golem_guardia_moria"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-300">
          Acertijo POO vinculado
        </label>
        <select
          value={challengeId}
          onChange={(e) => onSelectChallenge(e.target.value)}
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-white/10 focus:ring-indigo-500"
        >
          {CHALLENGES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={busy}
        className="w-full rounded-lg bg-indigo-500 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
      >
        {busy ? "Componiendo…" : "Generar spritesheet + JSON"}
      </button>

      {result && (
        <div className="space-y-3">
          {meta && (
            <figure className="rounded-lg bg-slate-950 p-2 ring-1 ring-white/10">
              <div className="max-h-64 overflow-auto rounded bg-[repeating-conic-gradient(#1e293b_0%_25%,#0f172a_0%_50%)] bg-[length:16px_16px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.sprite_url}
                  alt="Spritesheet compuesta"
                  className="pixelated w-full"
                />
              </div>
              <figcaption className="mt-1.5 text-center text-[10px] text-slate-500">
                Spritesheet {meta.width}×{meta.height}px · {meta.layers} capas
              </figcaption>
            </figure>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => downloadPng(result.sprite_url, `${result.id}.png`)}
              className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
            >
              ↓ PNG
            </button>
            <button
              type="button"
              onClick={() => downloadJson(result, `${result.id}.json`)}
              className="flex-1 rounded-lg bg-sky-600 py-2 text-xs font-semibold text-white transition hover:bg-sky-500"
            >
              ↓ JSON
            </button>
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg bg-slate-950 p-3 text-[11px] leading-relaxed text-emerald-200 ring-1 ring-white/10">
            {preview}
          </pre>
        </div>
      )}
    </div>
  );
}
