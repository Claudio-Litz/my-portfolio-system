import React from 'react';
import { Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg"
            style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>DevSystem</span>
        </div>

        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Claudio Glitz · Built with Next.js & Tailwind
        </p>

        <a
          href="#contact"
          className="text-sm font-semibold transition-colors duration-200 hover:text-white"
          style={{ color: 'var(--text-muted)' }}
        >
          Start a Project →
        </a>
      </div>
    </footer>
  );
};

export default Footer;