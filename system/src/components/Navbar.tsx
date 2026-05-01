"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2, Globe, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LANGUAGES = [
  { code: 'en' as const, flag: '🇺🇸', name: 'English' },
  { code: 'pt' as const, flag: '🇧🇷', name: 'Português' },
  { code: 'es' as const, flag: '🇪🇸', name: 'Español' },
  { code: 'de' as const, flag: '🇩🇪', name: 'Deutsch' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langPanelOpen, setLangPanelOpen] = useState(false);
  const { t, lang, setLanguage } = useLanguage();
  const langPanelRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close language panel on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langPanelRef.current &&
        !langPanelRef.current.contains(e.target as Node) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(e.target as Node)
      ) {
        setLangPanelOpen(false);
      }
    };
    if (langPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langPanelOpen]);

  const handleSelectLanguage = (code: typeof lang) => {
    setLanguage(code);
    setLangPanelOpen(false);
  };

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,12,20,0.92)' : 'rgba(8,12,20,0.5)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(30,41,59,0.8)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              DevSystem
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'rgba(30,41,59,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language selector */}
            <div className="relative">
              <button
                ref={langButtonRef}
                onClick={() => setLangPanelOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-card)',
                  border: langPanelOpen ? '1px solid #3b82f640' : '1px solid var(--border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#3b82f640')}
                onMouseLeave={e => {
                  if (!langPanelOpen) e.currentTarget.style.borderColor = 'var(--border)';
                }}
                aria-expanded={langPanelOpen}
                aria-haspopup="listbox"
                id="language-selector-desktop"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-base leading-none">{currentLang?.flag}</span>
                {lang.toUpperCase()}
              </button>

              {/* Dropdown panel */}
              {langPanelOpen && (
                <div
                  ref={langPanelRef}
                  className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden lang-panel-enter"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                  role="listbox"
                  aria-label="Select language"
                >
                  <div className="p-1.5">
                    {LANGUAGES.map((language) => {
                      const isActive = lang === language.code;
                      return (
                        <button
                          key={language.code}
                          onClick={() => handleSelectLanguage(language.code)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                          style={{
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = 'rgba(30,41,59,0.6)';
                              e.currentTarget.style.color = 'var(--text-primary)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--text-secondary)';
                            }
                          }}
                          role="option"
                          aria-selected={isActive}
                        >
                          <span className="text-xl leading-none">{language.flag}</span>
                          <span className="flex-1 text-left">{language.name}</span>
                          {isActive && (
                            <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#3b82f6' }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              {t.nav.hire}
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile language selector */}
            <div className="relative">
              <button
                onClick={() => setLangPanelOpen(v => !v)}
                className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded border"
                style={{
                  color: 'var(--text-secondary)',
                  borderColor: langPanelOpen ? '#3b82f640' : 'var(--border)',
                  background: 'var(--bg-card)',
                }}
                aria-expanded={langPanelOpen}
                aria-haspopup="listbox"
                id="language-selector-mobile"
              >
                <span className="text-sm leading-none">{currentLang?.flag}</span>
                {lang.toUpperCase()}
              </button>

              {/* Mobile dropdown */}
              {langPanelOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden lang-panel-enter z-50"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(20px)',
                  }}
                  role="listbox"
                  aria-label="Select language"
                >
                  <div className="p-1.5">
                    {LANGUAGES.map((language) => {
                      const isActive = lang === language.code;
                      return (
                        <button
                          key={language.code}
                          onClick={() => handleSelectLanguage(language.code)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                          style={{
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                          }}
                          role="option"
                          aria-selected={isActive}
                        >
                          <span className="text-lg leading-none">{language.flag}</span>
                          <span className="flex-1 text-left">{language.name}</span>
                          {isActive && (
                            <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#3b82f6' }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t" style={{ background: 'rgba(8,12,20,0.98)', borderColor: 'var(--border)' }}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-3 px-3 py-2.5 rounded-lg text-base font-semibold text-white text-center"
              style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}
            >
              {t.nav.hire}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;