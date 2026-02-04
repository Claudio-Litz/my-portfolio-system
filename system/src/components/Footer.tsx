import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-slate-950 text-slate-400 text-center border-t border-slate-800">
      <p className="text-sm">
        © {new Date().getFullYear()} MyPortfolio. Built with Next.js & Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;