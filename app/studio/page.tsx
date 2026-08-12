"use client";

import { useEffect, useMemo, useState } from "react";
import type { LpcManifest, Selection } from "@/lib/lpc/types";
import { ANIMATIONS, type Direction } from "@/lib/lpc/animations";
import CharacterCanvas from "@/components/CharacterCanvas";
import LayerPicker from "@/components/LayerPicker";
import ExportPanel from "@/components/ExportPanel";
import type { LpcManifest as Manifest } from "@/lib/lpc/types";
import { CHALLENGES } from "@/data/challenges";
import { PRESETS, resolvePresetSelection, type Preset } from "@/data/presets";

/**
 * Encuentra la cabeza que mejor combina con un cuerpo: mismo tipo de cuerpo y,
 * a ser posible, mismo tono de piel (variante). Así la cabeza sigue al cuerpo.
 */
function matchingHeadId(
  manifest: Manifest,
  bodyOptionId: string | null,
): string | null {
  const body = manifest.categories.find((c) => c.id === "body");
  const head = manifest.categories.find((c) => c.id === "head");
  const bodyOpt = body?.options.find((o) => o.id === bodyOptionId);
  if (!head || !bodyOpt) return null;
  const sameType = head.options.filter((o) => o.bodyType === bodyOpt.bodyType);
  const exact = sameType.find((o) => o.variant === bodyOpt.variant);
  return (exact ?? sameType[0])?.id ?? null;
}

const DIRECTIONS: { id: Direction; label: string }[] = [
  { id: "down", label: "↓" },
  { id: "up", label: "↑" },
  { id: "left", label: "←" },
  { id: "right", label: "→" },
];

export default function Page() {
  const [manifest, setManifest] = useState<LpcManifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection>({});
  const [animationId, setAnimationId] = useState(ANIMATIONS[0].id);
  const [direction, setDirection] = useState<Direction>("down");
  const [challengeId, setChallengeId] = useState(CHALLENGES[0].id);
  const [characterId, setCharacterId] = useState(CHALLENGES[0].id);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Cargar el manifest generado por `pnpm fetch:lpc`.
  useEffect(() => {
    fetch("/lpc/manifest.json")
      .then((r) => {
        if (!r.ok) throw new Error("manifest no encontrado");
        return r.json();
      })
      .then((m: LpcManifest) => {
        setManifest(m);
        // Selección inicial: primer cuerpo disponible.
        const body = m.categories.find((c) => c.id === "body");
        const bodyId = body?.options[0]?.id ?? null;
        if (bodyId) {
          setSelection({ body: bodyId, head: matchingHeadId(m, bodyId) });
        }
      })
      .catch(() => setError("No se encontró public/lpc/manifest.json. Ejecuta: pnpm fetch:lpc"));
  }, []);

  // bodyType derivado del cuerpo elegido (filtra capas ajustadas al cuerpo).
  const bodyType = useMemo(() => {
    if (!manifest) return null;
    const body = manifest.categories.find((c) => c.id === "body");
    const opt = body?.options.find((o) => o.id === selection["body"]);
    return opt?.bodyType ?? null;
  }, [manifest, selection]);

  function applyPreset(preset: Preset) {
    if (!manifest) return;
    const sel = resolvePresetSelection(manifest, preset);
    // Garantiza una cabeza acorde si el preset no la fijó explícitamente.
    const bodyId = sel["body"];
    if (!sel["head"] && bodyId) {
      sel["head"] = matchingHeadId(manifest, bodyId);
    }
    setSelection(sel);
    setChallengeId(preset.challengeId);
    setCharacterId(preset.characterId);
    setActivePreset(preset.id);
  }

  function handleChange(categoryId: string, optionId: string | null) {
    setActivePreset(null); // edición manual: ya no es un preset "puro"
    setSelection((prev) => {
      const next = { ...prev, [categoryId]: optionId };
      // Si cambia el cuerpo, purga las capas ajustadas incompatibles.
      if (categoryId === "body" && manifest) {
        const newBody = manifest.categories
          .find((c) => c.id === "body")
          ?.options.find((o) => o.id === optionId);
        const newType = newBody?.bodyType ?? null;
        for (const cat of manifest.categories) {
          const sel = next[cat.id];
          if (!sel) continue;
          const opt = cat.options.find((o) => o.id === sel);
          if (opt && opt.bodyType !== null && opt.bodyType !== newType) {
            next[cat.id] = null;
          }
        }
        // La cabeza sigue al cuerpo (tipo + tono de piel).
        next["head"] = matchingHeadId(manifest, optionId);
      }
      return next;
    });
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center p-8">
        <div className="max-w-md rounded-xl bg-slate-900 p-6 text-center ring-1 ring-white/10">
          <p className="mb-2 text-lg font-semibold text-rose-300">⚠ Assets no encontrados</p>
          <p className="text-sm text-slate-400">{error}</p>
          <code className="mt-4 block rounded bg-slate-950 px-3 py-2 text-sm text-emerald-300">
            pnpm fetch:lpc
          </code>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="bg-gradient-to-r from-indigo-300 to-emerald-300 bg-clip-text text-3xl font-black text-transparent">
          Lord of the Code
        </h1>
        <p className="text-sm text-slate-400">
          Generador de sprites LPC · exporta PNG + JSON de acertijos POO (PHP)
        </p>
      </header>

      {!manifest ? (
        <p className="text-slate-400">Cargando manifest…</p>
      ) : (
        <>
        {/* Barra de presets: personajes del Episodio 1 ligados a acertijos POO */}
        <section className="mb-6 space-y-4 rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Episodio 1 · Moria — presets (arquetipo + acertijo POO)
          </h2>
          {(
            [
              { key: "comunidad", label: "🛡️ La Comunidad", accent: "emerald" },
              { key: "sombra", label: "🔥 La Sombra", accent: "rose" },
            ] as const
          ).map((group) => (
            <div key={group.key}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.filter((p) => p.faction === group.key).map((p) => {
                  const active = activePreset === p.id;
                  const activeCls =
                    group.accent === "emerald"
                      ? "bg-emerald-500 text-white shadow shadow-emerald-500/30"
                      : "bg-rose-500 text-white shadow shadow-rose-500/30";
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className={
                        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition " +
                        (active
                          ? activeCls
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700")
                      }
                    >
                      <span className="text-lg leading-none">{p.emoji}</span>
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Columna izquierda: selección de capas */}
          <section className="order-2 rounded-2xl bg-slate-900/60 p-5 ring-1 ring-white/10 lg:order-1">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
              Capas (Paperdoll)
            </h2>
            <LayerPicker
              categories={manifest.categories}
              selection={selection}
              bodyType={bodyType}
              onChange={handleChange}
            />
          </section>

          {/* Columna central: previsualización */}
          <section className="order-1 flex flex-col items-center gap-4 lg:order-2">
            <div className="rounded-2xl bg-slate-900/60 p-5 ring-1 ring-white/10">
              <CharacterCanvas
                categories={manifest.categories}
                selection={selection}
                frameSize={manifest.frameSize}
                animationId={animationId}
                direction={direction}
                scale={4}
              />

              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {ANIMATIONS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAnimationId(a.id)}
                    className={
                      "rounded-lg px-2.5 py-1 text-xs font-medium transition " +
                      (animationId === a.id
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700")
                    }
                  >
                    {a.label}
                  </button>
                ))}
              </div>

              <div className="mt-2 flex justify-center gap-1.5">
                {DIRECTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDirection(d.id)}
                    className={
                      "h-8 w-8 rounded-lg text-sm font-bold transition " +
                      (direction === d.id
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700")
                    }
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-xs rounded-2xl bg-slate-900/60 p-5 ring-1 ring-white/10">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                Exportar
              </h2>
              <ExportPanel
                categories={manifest.categories}
                selection={selection}
                characterId={characterId}
                onCharacterId={setCharacterId}
                challengeId={challengeId}
                onChallengeId={setChallengeId}
              />
            </div>
          </section>
        </div>
        </>
      )}
    </main>
  );
}
