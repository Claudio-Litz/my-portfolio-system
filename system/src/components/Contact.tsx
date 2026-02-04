import React from 'react';
import { Mail, MessageSquare, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-20 bg-slate-900 text-white" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let's Build Something <span className="text-blue-400">Great</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Have an idea for a system? Need to modernize your shop? 
              I am currently available for freelance work. Send me a message and let's talk about your project.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:your.email@example.com" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Mail me at</p>
                  <p className="font-medium">contact@mysite.com</p>
                </div>
              </a>

              <div className="flex gap-4">
                <a href="#" className="flex-1 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center gap-2">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex-1 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center gap-2">
                  <Github className="w-5 h-5 text-purple-400" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <form className="space-y-4 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Name</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Email</label>
                <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Project Type</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                <option>Web Development</option>
                <option>System Automation</option>
                <option>Maintenance/Fix</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Message</label>
              <textarea className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white h-32 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell me about your project..."></textarea>
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;