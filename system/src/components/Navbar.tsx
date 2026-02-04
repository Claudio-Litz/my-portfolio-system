"use client";

import React, { useState } from 'react';
import { Menu, X, Code2, Globe } from 'lucide-react'; 
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, toggleLanguage } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Code2 className="text-blue-500" />
            <span>DevSystem</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all">
                  {link.name}
                </a>
              ))}
              
              {/* Language Toggle Button - UPDATED */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
              >
                <Globe className="w-4 h-4" />
                {/* Shows the CURRENT language in Uppercase (EN, PT, ES) */}
                <span className="text-sm font-bold">{lang.toUpperCase()}</span>
              </button>

              <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold transition-all ml-4">
                {t.nav.hire}
              </a>
            </div>
          </div>
          
           <div className="-mr-2 flex md:hidden items-center gap-4">
            {/* Mobile Lang Toggle */}
            <button onClick={toggleLanguage} className="text-slate-300 font-bold border border-slate-700 px-2 py-1 rounded">
               {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;