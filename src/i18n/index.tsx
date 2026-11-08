import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fr, type Dict } from "./fr";
import { en } from "./en";

export type Lang = "fr" | "en";

const dicts: Record<Lang, Dict> = { fr, en };

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const I18nContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    /* stockage indisponible */
  }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = dicts[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', t.meta.title);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[property="og:locale"]', lang === "fr" ? "fr_FR" : "en_US");
    setMeta('meta[name="twitter:title"]', t.meta.title);
    setMeta('meta[name="twitter:description"]', t.meta.description);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* stockage indisponible */
    }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans <I18nProvider>");
  return ctx;
}

export { dicts };
