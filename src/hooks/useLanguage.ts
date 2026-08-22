import { useCallback, useEffect, useState } from "react";
import type { Language } from "../lib/i18n";
import { t as translate, type TranslationKey } from "../lib/i18n";

const STORAGE_KEY = "marksix-language";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch {
      /* ignore */
    }
    return "zh";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore */
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "zh" ? "en" : "zh"));
  }, []);

  const t = useCallback((key: TranslationKey) => translate(key, language), [language]);

  return { language, toggleLanguage, t };
}
