"use client";

import React from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react'; // Added icons
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-800" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT SIDE: Contact Info Cards */}
          <div className="space-y-6">
            
            {/* Email Card */}
            <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t.contact.card_email}</h3>
                <p className="text-slate-400">contact@devsystem.com</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t.contact.card_location}</h3>
                <p className="text-slate-400">{t.contact.card_location_value}</p>
              </div>
            </div>

             {/* Message Card (Social/General) */}
             <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">WhatsApp / Chat</h3>
                <p className="text-slate-400">+55 11 99999-9999</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: The Form */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">{t.contact.form_title}</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.name_label}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.email_label}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.message_label}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02]"
              >
                <Send className="w-5 h-5" />
                {t.contact.btn_submit}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;