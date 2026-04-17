/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { contact } from "@/config/contact";
import { Resend } from "resend";

/**
 * Initialize Resend client
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  return new Resend(apiKey);
}

/**
 * Email data interface for contact form
 */
export interface ContactEmailData {
  requestType: string;
  companyName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Send notification email to admin when someone submits the contact form
 */
export async function sendContactNotificationEmail(data: ContactEmailData) {
  const resend = getResendClient();

  const adminEmail = process.env.ADMIN_EMAIL || contact.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@explorahead.com";

  const { firstName, lastName, email, phone, message, requestType, companyName } = data;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #d4a574; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">ExplorAhead Travel Agency</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1a365d; margin-top: 0; font-size: 18px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Request Type:</strong></td>
              <td style="padding: 8px 0;">${requestType}</td>
            </tr>
            ${
              companyName
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${companyName}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2d5a87;">${email}</a></td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${phone.replace(/\s/g, "")}" style="color: #2d5a87;">${phone}</a></td>
            </tr>
            `
                : ""
            }
          </table>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1a365d; margin-top: 0; font-size: 18px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">Message</h2>
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 8px; border-left: 4px solid #2d5a87;">
          <p style="margin: 0; font-size: 14px; color: #1a365d;">
            <strong>Quick Actions:</strong><br>
            <a href="mailto:${email}?subject=Re: Your inquiry to ExplorAhead" style="color: #2d5a87;">Reply to ${firstName}</a>
          </p>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>This email was sent from the ExplorAhead contact form.</p>
      </div>
    </body>
    </html>
  `;

  const text = `
New Contact Form Submission - ExplorAhead

Request Type: ${requestType}
${companyName ? `Company: ${companyName}\n` : ""}Name: ${firstName} ${lastName}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}
Message:
${message}

---
Reply to this contact: mailto:${email}
  `.trim();

  const result = await resend.emails.send({
    from: `ExplorAhead <${fromEmail}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Contact: ${firstName} ${lastName} - ${requestType}`,
    html,
    text,
  });

  return result;
}

/**
 * Send confirmation email to the user who submitted the form
 */
export async function sendContactConfirmationEmail(data: ContactEmailData) {
  const resend = getResendClient();

  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@explorahead.com";

  const { firstName, email } = data;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting ExplorAhead</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #d4a574; margin: 0; font-size: 24px;">Thank You, ${firstName}!</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">We've received your message</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <p style="margin-top: 0;">Hi ${firstName},</p>
          
          <p>Thank you for reaching out to ExplorAhead! We've received your message and our team will get back to you shortly.</p>
          
          <p>In the meantime, here's what you can expect:</p>
          
          <ul style="padding-left: 20px;">
            <li>We typically respond within <strong>24-48 hours</strong></li>
            <li>Our travel specialists will review your inquiry</li>
            <li>We'll reach out with personalized recommendations</li>
          </ul>
          
          <p>If you have any urgent questions, feel free to contact us directly:</p>
          
          <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">
              📧 <a href="mailto:${contact.email}" style="color: #2d5a87;">${contact.email}</a><br>
              📞 <a href="tel:${contact.phone.replace(/\s/g, "")}" style="color: #2d5a87;">${contact.phone}</a>
            </p>
          </div>
          
          <p>We're excited to help you plan your next adventure!</p>
          
          <p style="margin-bottom: 0;">
            Best regards,<br>
            <strong>The ExplorAhead Team</strong>
          </p>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} ExplorAhead. All rights reserved.</p>
        <p><a href="${contact.websiteUrl}" style="color: #2d5a87;">${contact.website}</a></p>
      </div>
    </body>
    </html>
  `;

  const text = `
Hi ${firstName},

Thank you for reaching out to ExplorAhead! We've received your message and our team will get back to you shortly.

What to expect:
- We typically respond within 24-48 hours
- Our travel specialists will review your inquiry
- We'll reach out with personalized recommendations

If you have any urgent questions, contact us directly:
Email: ${contact.email}
Phone: ${contact.phone}

We're excited to help you plan your next adventure!

Best regards,
The ExplorAhead Team

---
© ${new Date().getFullYear()} ExplorAhead
${contact.website}
  `.trim();

  const result = await resend.emails.send({
    from: `ExplorAhead <${fromEmail}>`,
    to: email,
    subject: `Thank you for contacting ExplorAhead, ${firstName}!`,
    html,
    text,
  });

  return result;
}
