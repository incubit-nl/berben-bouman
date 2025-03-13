import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // Only use secure: true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: ['name', 'email', 'message'].filter(field => !body[field])
        },
        { status: 400 }
      );
    }

    // Verify SMTP connection before sending
    await transporter.verify();

    // Prepare email content
    const emailContent = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contact@yourdomain.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Submitted on: ${new Date().toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</small></p>
        <p><small>IP: ${request.headers.get('x-forwarded-for') || 'unknown'}</small></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${subject ? `Subject: ${subject}\n` : ''}
        Message:
        ${message}
        
        Submitted on: ${new Date().toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      `,
    };

    const info = await transporter.sendMail(emailContent);

    // Send success response with message ID
    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    const errorMessage = (error as any).code === 'ECONNREFUSED' 
      ? 'Could not connect to email server'
      : (error as any).code === 'EAUTH' 
      ? 'Email authentication failed'
      : (error as any).code === 'ESOCKET'
      ? 'SSL/TLS connection failed'
      : 'An unexpected error occurred';

    return NextResponse.json(
      { 
        error: errorMessage,
        code: (error as any).code || 'UNKNOWN',
        details: process.env.NODE_ENV === 'development' ? (error as any).message : undefined
      },
      { status: (error as any).code === 'EAUTH' ? 401 : 500 }
    );
  }
}
