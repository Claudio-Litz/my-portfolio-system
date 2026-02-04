import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* The "Hook" - Small badge */}
        <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider text-green-400 uppercase bg-green-900/30 rounded-full border border-green-800">
          Available for New Projects
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Robust Systems. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Seamless Solutions.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400">
          I build scalable web systems and digital tools for small businesses. 
          From mechanics to bakeries, I turn complex problems into simple code.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="px-8 py-4 text-lg font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-all">
            View My Work
          </button>
          <button className="px-8 py-4 text-lg font-bold text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-all">
            Contact Me
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;