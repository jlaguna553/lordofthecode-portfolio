/**
 * Efectos de sonido sintetizados con la Web Audio API.
 *
 * Se generan por código en vez de cargar ficheros: sin dependencias, sin
 * problemas de licencia, y encaja con la estética chiptune del pixel-art.
 *
 * `renderSfx()` está separado de la reproducción para poder RENDERIZAR los
 * sonidos en un OfflineAudioContext y comprobar que realmente suenan.
 */

export type SfxName =
  | "interact" // acercarse y pulsar E
  | "success" // reto resuelto
  | "fail" // los tests no pasan
  | "scroll" // pergamino estudiado
  | "quizRight" // respuesta correcta
  | "quizWrong" // respuesta incorrecta
  | "chapter"; // capítulo completado

interface Note {
  freq: number;
  /** Desplazamiento en segundos desde el inicio del efecto. */
  at: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  /** Frecuencia final para un barrido. */
  glideTo?: number;
}

/** Cada efecto es una secuencia corta de notas. */
const RECIPES: Record<SfxName, Note[]> = {
  interact: [{ freq: 660, at: 0, dur: 0.07, type: "square", gain: 0.1 }],
  success: [
    { freq: 523, at: 0, dur: 0.09 },
    { freq: 659, at: 0.08, dur: 0.09 },
    { freq: 784, at: 0.16, dur: 0.09 },
    { freq: 1047, at: 0.24, dur: 0.22 },
  ],
  fail: [
    { freq: 330, at: 0, dur: 0.14, type: "sawtooth", gain: 0.09 },
    { freq: 220, at: 0.12, dur: 0.22, type: "sawtooth", gain: 0.09 },
  ],
  scroll: [
    { freq: 440, at: 0, dur: 0.28, type: "triangle", gain: 0.1, glideTo: 880 },
  ],
  quizRight: [
    { freq: 784, at: 0, dur: 0.09 },
    { freq: 1047, at: 0.08, dur: 0.16 },
  ],
  quizWrong: [
    { freq: 300, at: 0, dur: 0.12, type: "sawtooth", gain: 0.08 },
    { freq: 233, at: 0.1, dur: 0.18, type: "sawtooth", gain: 0.08 },
  ],
  chapter: [
    { freq: 523, at: 0, dur: 0.12 },
    { freq: 659, at: 0.11, dur: 0.12 },
    { freq: 784, at: 0.22, dur: 0.12 },
    { freq: 1047, at: 0.33, dur: 0.12 },
    { freq: 1319, at: 0.44, dur: 0.4 },
  ],
};

/**
 * Programa un efecto en el contexto dado. Devuelve su duración en segundos.
 * Sirve tanto para sonar en vivo como para renderizar en un test.
 */
export function renderSfx(
  ctx: BaseAudioContext,
  name: SfxName,
  destination: AudioNode = ctx.destination,
  startAt = 0,
): number {
  const notes = RECIPES[name];
  let end = 0;
  for (const n of notes) {
    const t0 = startAt + n.at;
    const t1 = t0 + n.dur;
    end = Math.max(end, n.at + n.dur);

    const osc = ctx.createOscillator();
    osc.type = n.type ?? "square";
    osc.frequency.setValueAtTime(n.freq, t0);
    if (n.glideTo) osc.frequency.linearRampToValueAtTime(n.glideTo, t1);

    // Envolvente: ataque corto y caída exponencial (evita chasquidos).
    const g = ctx.createGain();
    const peak = n.gain ?? 0.12;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t1);

    osc.connect(g).connect(destination);
    osc.start(t0);
    osc.stop(t1 + 0.02);
  }
  return end;
}

// Reproducción en vivo

const MUTE_KEY = "lotc:muted";
let ctx: AudioContext | null = null;
let muted: boolean | null = null;

export function isMuted(): boolean {
  if (muted !== null) return muted;
  if (typeof window === "undefined") return true;
  try {
    muted = window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    muted = false;
  }
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* modo privado: el ajuste vive sólo en memoria */
  }
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // Los navegadores arrancan suspendidos hasta la primera interacción.
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playSfx(name: SfxName): void {
  if (isMuted()) return;
  const c = getCtx();
  if (!c) return;
  try {
    renderSfx(c, name, c.destination, c.currentTime);
  } catch {
    /* si el audio falla, el juego sigue funcionando igual */
  }
}
