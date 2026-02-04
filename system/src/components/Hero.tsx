"use client"; // <--- Add this at the very top

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import hook

const Hero = () => {
  const { t } = useLanguage(); // <--- Get current translations

  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          {t.hero.badge} {/* <--- Dynamic Text */}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
          {t.hero.title_start} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {t.hero.title_highlight}
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#projects" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-500">
            {t.hero.btn_projects}
            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </a>
          
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700">
            {t.hero.btn_contact}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;