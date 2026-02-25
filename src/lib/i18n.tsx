'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import pt from '@/i18n/pt.json';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';

export type Lang = 'pt' | 'en' | 'es';

export type Dictionary = typeof pt;

const dictionaries: Record<Lang, Dictionary> = { pt, en, es };

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'pt',
  setLang: () => {},
  t: pt,
});

const STORAGE_KEY = 'portfolio_lang';

interface I18nProviderProps {
  children: React.ReactNode;
  /** Pass the [lang] route param to initialize from URL */
  initialLang?: Lang;
}

export function I18nProvider({ children, initialLang }: I18nProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? 'pt');

  useEffect(() => {
    // If a route-based lang was passed, it is authoritative — persist it
    if (initialLang) {
      setLangState(initialLang);
      try { localStorage.setItem(STORAGE_KEY, initialLang); } catch { /* ignore */ }
      return;
    }
    // Fallback: read from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && ['pt', 'en', 'es'].includes(stored)) {
        setLangState(stored);
      }
    } catch { /* ignore */ }
  }, [initialLang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}

export function useLangString(strings: Record<Lang, string>): string {
  const { lang } = useI18n();
  return strings[lang];
}

