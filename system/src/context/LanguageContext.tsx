"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/data/translations';

// UPDATE: Added 'es' to the type
type LanguageContextType = {
  lang: 'en' | 'pt' | 'es' | 'de'; 
  toggleLanguage: () => void;
  t: typeof translations.en; 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // UPDATE: Added 'es' to state type
  const [lang, setLang] = useState<'en' | 'pt' | 'es'| 'de'>('en'); 

  const toggleLanguage = () => {
    // UPDATE: Logic to cycle En -> Pt -> Es -> De -> En
    setLang((prev) => {
      if (prev === 'en') return 'pt';
      if (prev === 'pt') return 'es';
      if (prev === 'es') return 'de';
      return 'en';
    });
  };

  const value: LanguageContextType = {
    lang,
    toggleLanguage,
    t: translations[lang] as typeof translations.en, 
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}