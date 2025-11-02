import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send an email to semwalanuragjun@gmail.com
    // 2. Save to a database
    // 3. Send to a CRM/webhook
    
    // For now, we'll log it and return success
    console.log('=== Contact Form Submission ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || 'N/A');
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('==============================');

    // TODO: Implement email sending using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - AWS SES
    
    // Example with Resend (you'd need to install and configure):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'SustainAI <noreply@sustainai.com>',
    //   to: 'semwalanuragjun@gmail.com',
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // });

    // TODO: Save to database
    // await db.contacts.create({
    //   data: {
    //     name,
    //     email,
    //     phone,
    //     subject,
    //     message,
    //     createdAt: new Date(),
    //   },
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We'll get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

