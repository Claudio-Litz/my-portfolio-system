import React from 'react';
import { Layout, Database, Smartphone, Wrench } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Custom Websites",
      description: "Fast, SEO-optimized sites that help customers find your business online. Perfect for local shops.",
      icon: <Layout className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "System Automation",
      description: "Replace paper with code. I build tools to manage inventory, scheduling, and customer data.",
      icon: <Database className="w-8 h-8 text-emerald-400" />,
    },
    {
      title: "Mobile Friendly",
      description: "Your systems will work perfectly on phones and tablets, so you can manage your business from anywhere.",
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Maintenance & Fixes",
      description: "Already have a site? I fix bugs, improve speed, and keep your digital systems secure.",
      icon: <Wrench className="w-8 h-8 text-orange-400" />,
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white" id="services">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Can Do For You</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I don't just write code; I build tools that save you time and make you money.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all hover:bg-slate-800">
              <div className="mb-4 p-3 bg-slate-900/50 rounded-lg inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
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