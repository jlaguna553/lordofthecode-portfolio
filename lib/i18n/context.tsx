"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LANG, loc, type Lang, type Localized } from "./core";
import { message, type MessageKey } from "./messages";

const KEY = "lotc:lang";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Traduce una clave de la INTERFAZ. */
  t: (key: MessageKey) => string;
  /** Resuelve un texto de CONTENIDO localizable al idioma actual. */
  tc: <T>(value: Localized<T>) => T;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Restaurar el idioma elegido (sólo en cliente, tras hidratar).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      /* localStorage bloqueado: se queda con el idioma por defecto */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* no persiste, pero el idioma cambia en memoria */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang,
      t: (key) => message(key, lang),
      tc: (value) => loc(value, lang),
    }),
    [lang, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Acceso al idioma actual y a los traductores `t` (UI) y `tc` (contenido). */
export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}
