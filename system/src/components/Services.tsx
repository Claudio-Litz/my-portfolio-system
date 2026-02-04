"use client"; // <--- Important!

import React from 'react';
import { Terminal, Layout, Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import

const Services = () => {
  const { t } = useLanguage(); // <--- Get translations

  // We define the cards here so they update when 't' updates
  const services = [
    {
      title: t.services.card1_title,
      description: t.services.card1_desc,
      icon: <Database className="w-8 h-8 text-blue-500" />,
    },
    {
      title: t.services.card2_title,
      description: t.services.card2_desc,
      icon: <Layout className="w-8 h-8 text-purple-500" />,
    },
    {
      title: t.services.card3_title,
      description: t.services.card3_desc,
      icon: <Terminal className="w-8 h-8 text-green-500" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-800" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="mb-4 p-3 bg-slate-800 rounded-lg inline-block group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;