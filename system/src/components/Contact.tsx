"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react'; // Added icons
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Email sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage('Failed to send email. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    }
  };

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
                <p className="text-slate-400">claudioglitz1@gmail.com</p>
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
                <p className="text-slate-400">+55 47 99952-1198</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: The Form */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">{t.contact.form_title}</h3>
            
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400">
                {message}
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                {message}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.name_label}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.email_label}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.message_label}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {status === 'loading' ? 'Sending...' : t.contact.btn_submit}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;