"use client";

import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-900" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.about.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-800 p-8 md:p-12 rounded-2xl border border-slate-700 shadow-xl">
          
          {/* Left Side: Avatar/Image Placeholder */}
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-slate-700 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-inner overflow-hidden">
            {/* You can replace this icon with an <img> tag later! */}
            <User className="w-24 h-24 text-slate-500" />
          </div>

          {/* Right Side: Text Description */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {t.about.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400 font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Based in Brazil • Working Worldwide
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;