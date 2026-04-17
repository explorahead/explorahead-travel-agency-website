/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * GET /api/test-email
 * Test if Resend email is working
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "RESEND_API_KEY not configured" },
        { status: 500 }
      );
    }

    if (!adminEmail) {
      return NextResponse.json(
        { success: false, error: "ADMIN_EMAIL not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    console.log("📤 Sending test email...");
    console.log(`From: ${fromEmail}`);
    console.log(`To: ${adminEmail}`);

    const result = await resend.emails.send({
      from: `ExplorAhead Test <${fromEmail}>`,
      to: adminEmail,
      subject: "✅ Test Email from ExplorAhead",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">✅ Email Test Successful!</h1>
          <p>This is a test email from your ExplorAhead contact form setup.</p>
          <p>If you received this, your Resend integration is working correctly!</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Sent from ExplorAhead Travel Agency<br>
            Test conducted at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("❌ Email send error:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error.message || "Failed to send email",
          details: result.error,
        },
        { status: 500 }
      );
    }

    console.log("✅ Email sent successfully! ID:", result.data?.id);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      emailId: result.data?.id,
      sentTo: adminEmail,
      sentFrom: fromEmail,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
