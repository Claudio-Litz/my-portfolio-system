"use client";

import React from 'react';
import { ExternalLink, GitBranch } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// ── ADD YOUR PROJECTS HERE ────────────────────────────────────────────
const PROJECT_DATA = [
  {
    image: '/projects/CreditSystemPrint.png',
    tags: ['Firebase', 'Vanilla JavaScript', 'CSS3'],
    demoUrl: 'https://test-credit-system.web.app',
    codeUrl: 'https://github.com/Claudio-Litz/Fiado',
    accentColor: '#f59e0b',
  },
  {
    image: '/projects/GalleryPrint.png',
    tags: ['Django', 'Pillow', 'Fancybox'],
    demoUrl: 'https://testesitesdeployed.pythonanywhere.com',
    codeUrl: 'https://github.com/Claudio-Litz/client-gallery-generator',
    accentColor: '#8b5cf6',
  },
  {
    image: '/projects/GestaoPrint.png',
    tags: ['Streamlit', 'Supabase', 'Plotly'],
    demoUrl: 'https://dash-financeiro-testesitesdeployed.streamlit.app/',
    codeUrl: 'https://github.com/Claudio-Litz/financeiro-dash',
    accentColor: '#10b981',
  },
];
// ─────────────────────────────────────────────────────────────────────

const Projects = () => {
  const { t } = useLanguage();

  const translatedTitles = [
    t.projects.project1_title,
    t.projects.project2_title,
    t.projects.project3_title,
  ];

  const translatedDescs = [
    t.projects.project1_desc,
    t.projects.project2_desc,
    t.projects.project3_desc,
  ];

  const projects = PROJECT_DATA.map((p, i) => ({
    ...p,
    title: translatedTitles[i],
    description: translatedDescs[i],
  }));

  return (
    <section className="py-24" id="projects" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">{t.projects.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            {t.projects.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={index}
              className="rounded-2xl overflow-hidden group card-hover flex flex-col"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Accent line at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg"
                      style={{
                        background: `${project.accentColor}10`,
                        border: `1px solid ${project.accentColor}25`,
                        color: project.accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:text-blue-400"
                  >
                    <ExternalLink size={14} />
                    {t.projects.btn_demo}
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <GitBranch size={14} />
                    {t.projects.btn_code}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;