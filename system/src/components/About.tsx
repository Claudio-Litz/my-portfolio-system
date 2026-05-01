"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const skills = [
  { label: 'React / Next.js', color: '#3b82f6' },
  { label: 'Firebase', color: '#f59e0b' },
  { label: 'Django', color: '#10b981' },
  { label: 'Supabase', color: '#06b6d4' },
  { label: 'Streamlit', color: '#ef4444' },
  { label: 'PostgreSQL', color: '#8b5cf6' },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24" id="about" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Photo */}
          <div className="flex-shrink-0 relative">
            <div
              className="w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden relative"
              style={{ border: '1px solid var(--border)' }}
            >
              <Image
                src="/profile.jpg"
                alt="Claudio Glitz"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 208px, 256px"
                priority
              />
            </div>
            {/* Accent decoration */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10"
              style={{ background: 'linear-gradient(135deg, #2563eb20, #0891b220)', border: '1px solid #3b82f630' }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="section-label mb-4">{t.about.subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
              {t.about.title}
            </h2>

            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              {t.about.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {skills.map(({ label, color }) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}30`,
                    color: color,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Status */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-400">Based in Brazil · Working Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;