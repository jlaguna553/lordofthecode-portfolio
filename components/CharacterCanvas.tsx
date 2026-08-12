"use client";

import { useEffect, useRef, useState } from "react";
import type { LpcCategory, ResolvedLayer, Selection } from "@/lib/lpc/types";
import { resolveLayers } from "@/lib/lpc/loader";
import { composeFrame } from "@/lib/lpc/compositor";
import { getAnimation, type Direction } from "@/lib/lpc/animations";

interface Props {
  categories: LpcCategory[];
  selection: Selection;
  frameSize: number;
  animationId: string;
  direction: Direction;
  scale?: number;
}

/**
 * Previsualización animada del personaje compuesto.
 * Carga las capas de forma asíncrona (regla #3) y anima con requestAnimationFrame
 * dibujando frame a frame recortado de las spritesheets apiladas por zPos.
 */
export default function CharacterCanvas({
  categories,
  selection,
  frameSize,
  animationId,
  direction,
  scale = 4,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layersRef = useRef<ResolvedLayer[]>([]);
  const [loading, setLoading] = useState(false);

  // (Re)cargar capas cuando cambia la selección.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    resolveLayers(categories, selection).then((layers) => {
      if (cancelled) return;
      layersRef.current = layers;
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [categories, selection]);

  // Bucle de animación (independiente de la carga para no reiniciarse en cada frame).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const anim = getAnimation(animationId);
    let raf = 0;
    let frame = 0;
    let last = 0;
    const interval = 1000 / anim.fps;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < interval) return;
      last = now;
      const layers = layersRef.current;
      if (layers.length > 0) {
        composeFrame(canvas, layers, anim, direction, frame, frameSize, scale);
      }
      frame = (frame + 1) % anim.frames;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animationId, direction, frameSize, scale]);

  const size = frameSize * scale;

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="pixelated rounded-xl bg-[repeating-conic-gradient(#1e293b_0%_25%,#0f172a_0%_50%)] bg-[length:24px_24px] ring-1 ring-white/10"
        style={{ width: size, height: size }}
      />
      {loading && (
        <div className="absolute inset-0 grid place-items-center rounded-xl bg-slate-950/60 text-xs text-slate-300">
          cargando capas…
        </div>
      )}
    </div>
  );
}
