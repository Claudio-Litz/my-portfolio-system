import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// ── HTML Sanitization ────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Simple In-Memory Rate Limiter ────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// Periodically clean up stale entries (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 300_000);

// ── Email Validation ─────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= 254;
}

// ── Field Length Limits ──────────────────────────────────────────────────────
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    // Validate Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid Content-Type' },
        { status: 415 }
      );
    }

    // Rate limiting by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, type } = body;

    // Validate required fields exist and are strings
    if (
      !name || typeof name !== 'string' ||
      !email || typeof email !== 'string' ||
      !message || typeof message !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    // Trim and enforce length limits
    const safeName = name.trim().slice(0, MAX_NAME_LENGTH);
    const safeEmail = email.trim().slice(0, MAX_EMAIL_LENGTH);
    const safeMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);

    if (!safeName || !safeEmail || !safeMessage) {
      return NextResponse.json(
        { error: 'Fields cannot be empty' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(safeEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate type if provided
    if (type !== undefined && type !== 'testimonial' && type !== 'contact') {
      return NextResponse.json(
        { error: 'Invalid submission type' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const isTestimonial = type === 'testimonial';

    // Sanitize all values before inserting into HTML
    const htmlName = escapeHtml(safeName);
    const htmlEmail = escapeHtml(safeEmail);
    const htmlMessage = escapeHtml(safeMessage).replace(/\n/g, '<br>');

    // Email to owner — different subject + formatting for testimonials
    const mailToYou = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: isTestimonial
        ? `⭐ New Testimonial Submission from ${safeName}`
        : `New Contact Form Submission from ${safeName}`,
      html: isTestimonial
        ? `
          <h2>⭐ New Testimonial Submission</h2>
          <p><strong>Name:</strong> ${htmlName}</p>
          <p><strong>Email:</strong> ${htmlEmail}</p>
          <p><strong>Testimonial:</strong></p>
          <blockquote style="border-left:4px solid #3b82f6;padding-left:12px;color:#555;">
            ${htmlMessage}
          </blockquote>
          <hr>
          <p style="color:#888;font-size:12px;">
            Review and manually add this to your Testimonials.tsx if approved.
          </p>
        `
        : `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${htmlName}</p>
          <p><strong>Email:</strong> ${htmlEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${htmlMessage}</p>
        `,
    };

    // Confirmation to the sender
    const mailToVisitor = {
      from: process.env.GMAIL_USER,
      to: safeEmail,
      subject: isTestimonial
        ? 'Testimonial received — thank you!'
        : 'Thank you for contacting me!',
      html: isTestimonial
        ? `
          <h2>Thank you, ${htmlName}!</h2>
          <p>Your testimonial has been received and will be reviewed before being published on my portfolio.</p>
          <p>I appreciate you taking the time to share your experience.</p>
        `
        : `
          <h2>Thank you, ${htmlName}!</h2>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <hr>
          <p><strong>Your Message:</strong></p>
          <p>${htmlMessage}</p>
        `,
    };

    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToVisitor);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}