'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations, type TranslationKeys } from './translations';

interface LanguageContextType {
  lang: Language;
  t: TranslationKeys;
  toggleLanguage: () => void;
  barrierTypeLabel: (type: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  }, []);

  const t = translations[lang];
  const barrierTypeLabel = useCallback((type: string): string => {
    return t.barrierTypes[type as keyof typeof t.barrierTypes] || type;
  }, [t]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, barrierTypeLabel }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
