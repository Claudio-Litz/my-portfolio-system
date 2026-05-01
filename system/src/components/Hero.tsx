"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = glowRef.current?.parentElement;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden pt-36 pb-24 lg:pt-52 lg:pb-36 hero-grid" style={{ background: 'var(--bg-base)' }}>
      {/* Mouse-tracking glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      />

      {/* Static ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
          style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-blue-400 text-sm font-medium tracking-wide">{t.hero.badge}</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]" style={{ fontFamily: 'Syne, sans-serif' }}>
          <span className="gradient-text">{t.hero.title_start}</span>
          <br />
          <span className="accent-text">{t.hero.title_highlight}</span>
        </h1>

        {/* Tagline */}
        <p className="max-w-xl text-lg md:text-xl mb-3 font-medium" style={{ color: 'var(--text-secondary)' }}>
          {t.hero.description}
        </p>

        <p className="text-sm mb-12 tracking-wide" style={{ color: 'var(--text-muted)' }}>
          Practical web solutions for real problems.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl transition-all duration-200 hover:brightness-110 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #0891b2)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            <Zap className="w-4 h-4" />
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-200"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontFamily: 'Syne, sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#3b82f640')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {t.hero.btn_projects}
          </a>
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50">
          {['Next.js', 'React', 'Firebase', 'Supabase', 'Django', 'Streamlit'].map(tech => (
            <span key={tech} className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;