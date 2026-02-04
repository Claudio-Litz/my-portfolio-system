"use client";

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t.projects.project1_title,
      description: t.projects.project1_desc,
      tags: ["React", "Node.js", "PDF"],
    },
    {
      title: t.projects.project2_title,
      description: t.projects.project2_desc,
      tags: ["Next.js", "PostgreSQL", "Stripe"],
    },
    {
      title: t.projects.project3_title,
      description: t.projects.project3_desc,
      tags: ["WhatsApp API", "Google Calendar", "AI"],
    },
  ];

  return (
    <section className="py-20 bg-slate-900" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all">
              {/* Fake Image Placeholder */}
              <div className="h-48 bg-slate-700 flex items-center justify-center">
                 <span className="text-slate-500">Project Image {index + 1}</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4 h-20">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-full border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-sm text-white font-medium hover:text-blue-400 transition-colors">
                    <ExternalLink size={16} /> {t.projects.btn_demo}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-slate-400 font-medium hover:text-white transition-colors">
                    <Github size={16} /> {t.projects.btn_code}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;