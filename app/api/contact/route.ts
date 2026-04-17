/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { insertContact, type ContactFormData } from "@/lib/db";
import { sendContactConfirmationEmail, sendContactNotificationEmail } from "@/lib/email";
import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

const { logger } = Sentry;

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input
 */
function sanitize(str: string): string {
  return str.trim().slice(0, 1000);
}

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  return Sentry.startSpan(
    {
      op: "http.server",
      name: "POST /api/contact",
    },
    async (span) => {
      try {
        const body = await request.json();

        // Extract and sanitize form data
        const formData: ContactFormData = {
          requestType: sanitize(body.requestType || "GENERAL"),
          companyName: body.companyName ? sanitize(body.companyName) : undefined,
          firstName: sanitize(body.firstName || ""),
          lastName: sanitize(body.lastName || ""),
          email: sanitize(body.email || "").toLowerCase(),
          phone: body.phone ? sanitize(body.phone) : undefined,
          message: sanitize(body.message || ""),
          source: body.source || "contact_form",
        };

        // Add attributes to span for tracing
        span.setAttribute("contact.requestType", formData.requestType);
        span.setAttribute("contact.email", formData.email);
        span.setAttribute("contact.hasCompany", !!formData.companyName);
        span.setAttribute("contact.source", formData.source || "contact_form");

        // Validate required fields
        if (!formData.firstName || !formData.lastName) {
          logger.warn("Contact form validation failed: missing name");
          return NextResponse.json(
            { success: false, error: "First name and last name are required" },
            { status: 400 }
          );
        }

        if (!formData.email || !isValidEmail(formData.email)) {
          logger.warn("Contact form validation failed: invalid email", { email: formData.email });
          return NextResponse.json(
            { success: false, error: "Valid email is required" },
            { status: 400 }
          );
        }

        if (!formData.message) {
          logger.warn("Contact form validation failed: missing message");
          return NextResponse.json(
            { success: false, error: "Message is required" },
            { status: 400 }
          );
        }

        // Store in database
        let dbResult;
        try {
          dbResult = await Sentry.startSpan(
            {
              op: "db.query",
              name: "Insert contact",
            },
            async () => {
              return await insertContact(formData);
            }
          );
          logger.info(logger.fmt`New contact stored: ${formData.email}`, {
            contactId: dbResult?.id,
            requestType: formData.requestType,
          });
        } catch (dbError) {
          // Log the error but don't fail the request
          logger.error("Failed to store contact in database", {
            error: dbError instanceof Error ? dbError.message : "Unknown error",
          });
          Sentry.captureException(dbError);
          // Continue without database storage
        }

        // Send notification email to admin
        try {
          await Sentry.startSpan(
            {
              op: "email.send",
              name: "Send admin notification",
            },
            async () => {
              await sendContactNotificationEmail(formData);
            }
          );
          logger.info("Admin notification email sent", { email: formData.email });
        } catch (emailError) {
          logger.error("Failed to send admin notification email", {
            error: emailError instanceof Error ? emailError.message : "Unknown error",
          });
          Sentry.captureException(emailError);
          // Continue - don't fail the request
        }

        // Send confirmation email to user
        try {
          await Sentry.startSpan(
            {
              op: "email.send",
              name: "Send user confirmation",
            },
            async () => {
              await sendContactConfirmationEmail(formData);
            }
          );
          logger.info("User confirmation email sent", { email: formData.email });
        } catch (emailError) {
          logger.error("Failed to send user confirmation email", {
            error: emailError instanceof Error ? emailError.message : "Unknown error",
          });
          Sentry.captureException(emailError);
          // Continue - don't fail the request
        }

        return NextResponse.json(
          {
            success: true,
            message: "Thank you for your message. We'll be in touch soon!",
            contactId: dbResult?.id,
          },
          { status: 200 }
        );
      } catch (error) {
        logger.error("Contact form submission failed", {
          error: error instanceof Error ? error.message : "Unknown error",
        });
        Sentry.captureException(error);

        return NextResponse.json(
          { success: false, error: "Failed to process your request. Please try again." },
          { status: 500 }
        );
      }
    }
  );
}
