import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, type } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Email to owner — different subject + formatting for testimonials
    const mailToYou = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: isTestimonial
        ? `⭐ New Testimonial Submission from ${name}`
        : `New Contact Form Submission from ${name}`,
      html: isTestimonial
        ? `
          <h2>⭐ New Testimonial Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Testimonial:</strong></p>
          <blockquote style="border-left:4px solid #3b82f6;padding-left:12px;color:#555;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          <hr>
          <p style="color:#888;font-size:12px;">
            Review and manually add this to your Testimonials.tsx if approved.
          </p>
        `
        : `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    // Confirmation to the sender
    const mailToVisitor = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: isTestimonial
        ? 'Testimonial received — thank you!'
        : 'Thank you for contacting me!',
      html: isTestimonial
        ? `
          <h2>Thank you, ${name}!</h2>
          <p>Your testimonial has been received and will be reviewed before being published on my portfolio.</p>
          <p>I appreciate you taking the time to share your experience.</p>
        `
        : `
          <h2>Thank you, ${name}!</h2>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <hr>
          <p><strong>Your Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
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