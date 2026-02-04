import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "AutoShop Manager",
      category: "Management System",
      description: "A complete dashboard for a local mechanic shop. It tracks vehicle parts, schedules appointments, and sends automatic SMS reminders to customers when their car is ready.",
      tech: ["Next.js", "PostgreSQL", "Twilio API"],
      color: "from-blue-500 to-cyan-500" // Gradient for the placeholder image
    },
    {
      title: "FreshBake POS",
      category: "E-commerce & Inventory",
      description: "An inventory system for a bakery that tracks flour usage in real-time and allows customers to order custom cakes online. Reduced food waste by 15%.",
      tech: ["React", "Node.js", "Stripe"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Local Gym Tracker",
      category: "SaaS Application",
      description: "Membership management software for small gyms. QR code check-in system and automated monthly billing integration.",
      tech: ["TypeScript", "Firebase", "Tailwind"],
      color: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white" id="projects">
      <div className="max-w-6xl mx-auto px-4">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all">
              
              {/* Project Image Placeholder - Using gradients so you don't need screenshots yet */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-all relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                   <span className="font-bold tracking-wider">View Details</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
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