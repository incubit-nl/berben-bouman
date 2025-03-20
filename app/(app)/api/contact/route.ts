// pages/api/contact.ts
import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing to handle multipart/form-data
  },
};

export async function POST(request: Request) {
  const payload = await getPayloadClient();
  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      // Handle existing JSON-based contact form
      const body = await request.json();
      const { name, email, subject, message } = body;

      // Validation
      if (!name || !email || !message) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: ['name', 'email', 'message'].filter((field) => !body[field]),
          },
          { status: 400 }
        );
      }

      // Prepare email content
      const emailContent = `
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
          minute: '2-digit',
        })}</small></p>
        <p><small>IP: ${request.headers.get('x-forwarded-for') || 'unknown'}</small></p>
      `;

      const textContent = `
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
          minute: '2-digit',
        })}
      `;

      // Send email using Payload's email adapter
      const info = await payload.sendEmail({
        from: `"${name}" <info@berben-bouman.nl>`,
        to: process.env.CONTACT_EMAIL || 'contact@yourdomain.com',
        replyTo: email,
        subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
        html: emailContent,
        text: textContent,
      });

      return NextResponse.json({
        message: 'Email sent successfully',
        messageId: (info as any).messageId,
      });
    } else if (contentType.includes('multipart/form-data')) {
      // Handle vacancy application with file upload
      const form = formidable({ multiples: false, keepExtensions: true });
      const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
        form.parse(request as any, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const { name, email, phone, message, vacancy } = fields;
      const resume = files.resume as formidable.File | undefined;

      // Validation
      if (!name || !email || !phone || !vacancy) {
        return NextResponse.json(
          {
            error: 'Missing required fields',
            details: ['name', 'email', 'phone', 'vacancy'].filter((field) => !fields[field]),
          },
          { status: 400 }
        );
      }

      // Prepare email content
      const emailBody = `
        <h2>Nieuwe Sollicitatie</h2>
        <p><strong>Vacature:</strong> ${vacancy}</p>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message || 'Geen bericht'}</p>
        <hr>
        <p><small>Submitted on: ${new Date().toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}</small></p>
        <p><small>IP: ${request.headers.get('x-forwarded-for') || 'unknown'}</small></p>
      `;

      const textBody = `
        Nieuwe Sollicitatie
        
        Vacature: ${vacancy}
        Naam: ${name}
        Email: ${email}
        Telefoon: ${phone}
        Bericht:
        ${message || 'Geen bericht'}
        
        Submitted on: ${new Date().toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      `;

      // Handle resume attachment
      let attachment: { filename: string; content: Buffer } | undefined;
      if (resume) {
        const fileContent = await fs.readFile(resume.filepath);
        attachment = {
          filename: resume.originalFilename || 'resume.pdf',
          content: fileContent,
        };
      }

      // Send email using Payload's email adapter
      const info = await payload.sendEmail({
        from: `"${name}" <info@berben-bouman.nl>`,
        to: 'vacatures@berbenbouman.nl',
        replyTo: email,
        subject: `Sollicitatie: ${vacancy} - ${name}`,
        html: emailBody,
        text: textBody,
        attachments: attachment ? [attachment] : undefined,
      });

      // Clean up uploaded file
      if (resume) await fs.unlink(resume.filepath);

      return NextResponse.json({
        message: 'Application submitted successfully',
        messageId: (info as any).messageId,
      });
    } else {
      return NextResponse.json(
        { error: 'Unsupported content type' },
        { status: 415 }
      );
    }
  } catch (error) {
    const errorMessage =
      (error as any).code === 'ECONNREFUSED'
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
        details: process.env.NODE_ENV === 'development' ? (error as any).message : undefined,
      },
      { status: (error as any).code === 'EAUTH' ? 401 : 500 }
    );
  }
}