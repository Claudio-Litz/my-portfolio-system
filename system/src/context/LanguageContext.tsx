"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/data/translations';

// UPDATE: Added 'es' to the type
type LanguageContextType = {
  lang: 'en' | 'pt' | 'es'; 
  toggleLanguage: () => void;
  t: typeof translations.en; 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // UPDATE: Added 'es' to state type
  const [lang, setLang] = useState<'en' | 'pt' | 'es'>('en'); 

  const toggleLanguage = () => {
    // UPDATE: Logic to cycle En -> Pt -> Es -> En
    setLang((prev) => {
      if (prev === 'en') return 'pt';
      if (prev === 'pt') return 'es';
      return 'en';
    });
  };

  const value = {
    lang,
    toggleLanguage,
    t: translations[lang], 
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