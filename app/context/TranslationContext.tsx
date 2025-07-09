'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import esTranslations from '../translations/es.json';

type Language = 'en' | 'es';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, JsonValue> = {
  en: enTranslations,
  es: esTranslations,
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: JsonValue = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && !Array.isArray(value) && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation is not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 