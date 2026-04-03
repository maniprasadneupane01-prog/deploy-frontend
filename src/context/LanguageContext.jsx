import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LangCtx = createContext(null);

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLangState] = useState(
    () => {
      try { return localStorage.getItem('biraj_lang') || 'en'; }
      catch { return 'en'; }
    }
  );

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem('biraj_lang', lang); } catch {}

    if (lang === 'ne' && !document.getElementById('font-ne')) {
      const link = document.createElement('link');
      link.id = 'font-ne';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tiro+Devanagari&display=swap';
      document.head.appendChild(link);
    }
  }, [lang, i18n]);

  const setLang = (l) => {
    setLangState(l);
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
};
