import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  'https://tscvzrxnxadnvgnsdrqx.supabase.co'!,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3Z6cnhueGFkbnZnbnNkcnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDcxMjgsImV4cCI6MjA2MDMyMzEyOH0.cvE6KoZXbSnigKUpbFzFwLtN-O6H4SxIyu5bn9rU1lY'!
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@wedesist.com',
    pass: 'Wjcvdentqvtpmgum',
  },
});

// Email template styles
const emailStyles = `
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #1a365d;
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      border-radius: 12px 12px 0 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      background: #ffffff;
      padding: 40px 30px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .message-box {
      background: #f1f5f9;
      border-left: 4px solid #3b82f6;
      padding: 25px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .message-box h3 {
      color: #1e40af;
      margin-top: 0;
    }
    .footer {
      text-align: center;
      padding: 25px;
      color: #64748b;
      font-size: 14px;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      margin: 25px 0;
      font-weight: 600;
      text-align: center;
      transition: all 0.3s ease;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    .info-item {
      margin: 20px 0;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
    }
    .info-label {
      font-weight: 600;
      color: #1e40af;
      display: block;
      margin-bottom: 5px;
    }
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e2e8f0, transparent);
      margin: 25px 0;
    }
  </style>
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      purpose,
      experience,
      motivation,
      organization,
      'partnership-type': partnershipType,
      'feedback-type': feedbackType,
      suggestion,
      'event-type': eventType,
      'event-details': eventDetails,
      date,
      location
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error } = await supabase
      .from('requests')
      .insert([
        {
          name,
          email,
          phone,
          purpose,
          experience,
          motivation,
          organization,
          partnership_type: partnershipType,
          feedback_type: feedbackType,
          suggestion,
          event_type: eventType,
          event_details: eventDetails,
          event_date: date,
          event_location: location,
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Error saving to Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to save request' },
        { status: 500 }
      );
    }

    // Prepare email content based on purpose
    let purposeSpecificContent = '';
    if (purpose === 'volunteer') {
      purposeSpecificContent = `
        <div class="info-item">
          <span class="info-label">Experience</span>
          ${experience}
        </div>
        <div class="info-item">
          <span class="info-label">Motivation</span>
          ${motivation}
        </div>
      `;
    } else if (purpose === 'partner') {
      purposeSpecificContent = `
        <div class="info-item">
          <span class="info-label">Organization</span>
          ${organization}
        </div>
        <div class="info-item">
          <span class="info-label">Partnership Type</span>
          ${partnershipType}
        </div>
      `;
    } else if (purpose === 'feedback') {
      purposeSpecificContent = `
        <div class="info-item">
          <span class="info-label">Feedback Type</span>
          ${feedbackType}
        </div>
        <div class="info-item">
          <span class="info-label">Suggestion</span>
          ${suggestion}
        </div>
      `;
    } else if (purpose === 'event') {
      purposeSpecificContent = `
        <div class="info-item">
          <span class="info-label">Event Type</span>
          ${eventType}
        </div>
        <div class="info-item">
          <span class="info-label">Event Details</span>
          ${eventDetails}
        </div>
        <div class="info-item">
          <span class="info-label">Proposed Date</span>
          ${new Date(date).toLocaleString()}
        </div>
        <div class="info-item">
          <span class="info-label">Proposed Location</span>
          ${location}
        </div>
      `;
    }

    // Email to admin
    const adminMailOptions = {
      from: 'Wedesist <test@wedesist.com>',
      to: 'admin@wedesist.com',
      subject: `New ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} Request`,
      html: `
        ${emailStyles}
        <div class="container">
          <div class="header">
            <h1>New ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} Request</h1>
          </div>
          <div class="content">
            <div class="info-item">
              <span class="info-label">Name</span>
              ${name}
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              ${email}
            </div>
            <div class="info-item">
              <span class="info-label">Phone</span>
              ${phone}
            </div>
            ${purposeSpecificContent}
            <div class="divider"></div>
            <a href="mailto:${email}" class="button">Reply to Request</a>
          </div>
          <div class="footer">
            <p>This is an automated message from the Desist request form.</p>
          </div>
        </div>
      `,
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: 'Wedesist <test@wedesist.com>',
      to: email,
      subject: 'Thank you for your request',
      html: `
        ${emailStyles}
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Request!</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>We have received your ${purpose} request and appreciate your interest in Desist. Our team will review your request and get back to you as soon as possible.</p>
            
            <div class="message-box">
              <h3>Your Request Details</h3>
              <div class="info-item">
                <span class="info-label">Request Type:</span>
                ${purpose.charAt(0).toUpperCase() + purpose.slice(1)}
              </div>
              ${purposeSpecificContent}
            </div>

            <div class="divider"></div>
            
            <p>If you have any additional information to share, please feel free to reply to this email.</p>
            
            <a href="https://wedesist.com" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>Best regards,<br>The Desist Team</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    try {
      // Send both emails
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);

      console.log('Request saved and emails sent successfully');
      return NextResponse.json(
        { message: 'Request submitted successfully' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      return NextResponse.json(
        { error: 'Failed to send confirmation emails' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 