"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, GitBranch, Link2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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
        setStatusMessage('Message sent! I\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setStatusMessage('Failed to send. Try reaching me on WhatsApp instead.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again.');
    }
  };

  const contactLinks = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'WhatsApp',
      value: '+55 47 99952-1198',
      href: 'https://wa.me/5547999521198',
      color: '#10b981',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: t.contact.card_email,
      value: 'claudioglitz1@gmail.com',
      href: 'mailto:claudioglitz1@gmail.com',
      color: '#3b82f6',
    },
    {
      icon: <Link2 className="w-5 h-5" />,
      label: 'LinkedIn',
      value: t.contact.linkedin_subtitle,
      href: 'https://www.linkedin.com/in/claudio-litz-65201a357/',
      color: '#0ea5e9',
    },
    {
      icon: <GitBranch className="w-5 h-5" />,
      label: 'GitHub',
      value: '@Claudio-Litz',
      href: 'https://github.com/Claudio-Litz',
      color: '#94a3b8',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t.contact.card_location,
      value: t.contact.card_location_value,
      href: null,
      color: '#f59e0b',
    },
  ];

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    background: 'var(--bg-base)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <section className="py-24" id="contact" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="section-label mb-4">{t.contact.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            {t.contact.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: Contact links */}
          <div className="lg:col-span-2 space-y-3">
            {contactLinks.map((link, index) => {
              const content = (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    cursor: link.href ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => {
                    if (link.href) e.currentTarget.style.borderColor = `${link.color}40`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${link.color}12`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{link.label}</p>
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{link.value}</p>
                  </div>
                  {link.href && (
                    <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: link.color }} />
                  )}
                </div>
              );

              return link.href ? (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>

          {/* RIGHT: Form */}
          <div
            className="lg:col-span-3 p-8 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              {t.contact.form_title}
            </h3>

            {status === 'success' && (
              <div className="mb-5 p-4 rounded-xl text-sm" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981' }}>
                {statusMessage}
              </div>
            )}
            {status === 'error' && (
              <div className="mb-5 p-4 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
                {statusMessage}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {t.contact.name_label}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="John Doe"
                  required
                  onFocus={e => (e.target.style.borderColor = '#3b82f660')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {t.contact.email_label}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="john@example.com"
                  required
                  onFocus={e => (e.target.style.borderColor = '#3b82f660')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {t.contact.message_label}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputStyle, resize: 'none' }}
                  required
                  onFocus={e => (e.target.style.borderColor = '#3b82f660')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                <Send className="w-4 h-4" />
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