"use client";

import React from 'react';
import { Terminal, Layout, Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.card1_title,
      description: t.services.card1_desc,
      icon: <Database className="w-6 h-6" />,
      color: '#3b82f6',
    },
    {
      title: t.services.card2_title,
      description: t.services.card2_desc,
      icon: <Layout className="w-6 h-6" />,
      color: '#8b5cf6',
    },
    {
      title: t.services.card3_title,
      description: t.services.card3_desc,
      icon: <Terminal className="w-6 h-6" />,
      color: '#10b981',
    },
  ];

  return (
    <section className="py-24" id="services" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">{t.services.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            {t.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl group card-hover"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${service.color}15`, color: service.color }}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                {service.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;