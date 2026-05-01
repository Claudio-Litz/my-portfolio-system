"use client";

import React, { useState } from 'react';
import { Quote, Send, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// ── ADD NEW TESTIMONIALS HERE ─────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Claudio built our inventory system in 3 weeks. We went from 2 hours of daily spreadsheets to zero. The dashboard is clean, fast, and exactly what we needed.",
    author: "Marcos V.",
    role: "Auto Parts Owner · São Paulo",
    color: '#3b82f6',
  },
  {
    quote: "The client gallery platform he built has been running for over a year without a single issue. My clients love how easy it is to download their photos.",
    author: "Ana L.",
    role: "Photographer · Porto Alegre",
    color: '#8b5cf6',
  },
  {
    quote: "He understood our bakery workflow on the first call. The system tracks orders, ingredients, and costs — no technical knowledge needed on our end.",
    author: "Roberto S.",
    role: "Bakery Owner · Curitiba",
    color: '#10b981',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AVATAR_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  background: 'var(--bg-base)',
  color: 'var(--text-primary)',
  fontSize: '14px',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
};

interface FieldProps {
  error?: string;
  focused: boolean;
}

function fieldBorder({ error, focused }: FieldProps): string {
  if (error) return '1px solid rgba(239,68,68,0.6)';
  if (focused) return '1px solid rgba(59,130,246,0.5)';
  return '1px solid var(--border)';
}

const Testimonials = () => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.testimonials.validation_name;
    if (!form.email.trim()) e.email = t.testimonials.validation_email;
    else if (!EMAIL_REGEX.test(form.email)) e.email = t.testimonials.validation_email_invalid;
    if (!form.message.trim()) e.message = t.testimonials.validation_message;
    else if (form.message.trim().length < 20) e.message = t.testimonials.validation_message_min;
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const body = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: `[TESTIMONIAL SUBMISSION]\n\nFrom: ${form.name.trim()}${form.role.trim() ? ` (${form.role.trim()})` : ''}\nEmail: ${form.email.trim()}\n\nTestimonial:\n${form.message.trim()}`,
        type: 'testimonial',
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', role: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-24" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">{t.testimonials.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            {t.testimonials.title}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t.testimonials.description}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TESTIMONIALS.map((item, index) => {
            const initials = getInitials(item.author);
            const color = item.color ?? getColor(item.author);
            return (
              <div
                key={index}
                className="p-7 rounded-2xl flex flex-col card-hover"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <Quote className="w-6 h-6 mb-5 opacity-40" style={{ color }} />
                <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-secondary)' }}>
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${color}20`, color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {item.author}
                    </p>
                    {item.role && (
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.role}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit your testimonial */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          
          {/* Toggle header */}
          <button
            onClick={() => { setShowForm(v => !v); setStatus('idle'); }}
            className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors duration-200"
            style={{ background: showForm ? 'var(--bg-card)' : 'transparent' }}
            onMouseEnter={e => { if (!showForm) e.currentTarget.style.background = 'rgba(59,130,246,0.04)'; }}
            onMouseLeave={e => { if (!showForm) e.currentTarget.style.background = 'transparent'; }}
          >
            <div>
              <p className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {t.testimonials.worked_title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {t.testimonials.worked_subtitle}
              </p>
            </div>
            {showForm
              ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
              : <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
            }
          </button>

          {/* Form */}
          {showForm && (
            <div className="px-7 pb-8 pt-2" style={{ borderTop: '1px solid var(--border)' }}>

              {status === 'success' ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle className="w-10 h-10" style={{ color: '#10b981' }} />
                  <p className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {t.testimonials.success_title}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t.testimonials.success_desc}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-sm underline underline-offset-2 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t.testimonials.success_another}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-4 rounded-xl text-sm"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {t.testimonials.error_msg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="testimonial-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {t.testimonials.form_name} <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        id="testimonial-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        onFocus={() => setFocused(p => ({ ...p, name: true }))}
                        onBlur={() => setFocused(p => ({ ...p, name: false }))}
                        placeholder={t.testimonials.placeholder_name}
                        style={{ ...inputBase, border: fieldBorder({ error: errors.name, focused: focused.name }) }}
                      />
                      {errors.name && <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="testimonial-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {t.testimonials.form_email} <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        id="testimonial-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        onFocus={() => setFocused(p => ({ ...p, email: true }))}
                        onBlur={() => setFocused(p => ({ ...p, email: false }))}
                        placeholder={t.testimonials.placeholder_email}
                        style={{ ...inputBase, border: fieldBorder({ error: errors.email, focused: focused.email }) }}
                      />
                      {errors.email && <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Role (optional) */}
                  <div>
                    <label htmlFor="testimonial-role" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      {t.testimonials.form_role} <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>{t.testimonials.form_optional}</span>
                    </label>
                    <input
                      id="testimonial-role"
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
                      onFocus={() => setFocused(p => ({ ...p, role: true }))}
                      onBlur={() => setFocused(p => ({ ...p, role: false }))}
                      placeholder={t.testimonials.placeholder_role}
                      style={{ ...inputBase, border: fieldBorder({ error: undefined, focused: focused.role }) }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="testimonial-message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      {t.testimonials.form_testimonial} <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      id="testimonial-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      onFocus={() => setFocused(p => ({ ...p, message: true }))}
                      onBlur={() => setFocused(p => ({ ...p, message: false }))}
                      placeholder={t.testimonials.placeholder_testimonial}
                      style={{ ...inputBase, border: fieldBorder({ error: errors.message, focused: focused.message }), resize: 'none' }}
                    />
                    {errors.message
                      ? <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{errors.message}</p>
                      : <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>{t.testimonials.form_min_chars}</p>
                    }
                  </div>

                  {/* Notice + Submit */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    <p className="text-xs flex-1" style={{ color: 'var(--text-muted)' }}>
                      🔒 {t.testimonials.form_privacy}
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', fontFamily: 'Syne, sans-serif' }}
                    >
                      <Send className="w-4 h-4" />
                      {status === 'loading' ? t.testimonials.btn_submitting : t.testimonials.btn_submit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;