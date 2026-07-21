import React, { createContext, useContext, useState } from 'react';
import { translations } from '../data/contentData';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  try {
    const saved = window.localStorage.getItem('language');
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // Ignore storage access errors and fall back to the default language.
  }

  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => getStoredLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    try {
      window.localStorage.setItem('language', lang);
    } catch {
      // Ignore storage write failures in restricted browser environments.
    }
  };

  const t = (key: string): any => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    
    return result !== undefined ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
