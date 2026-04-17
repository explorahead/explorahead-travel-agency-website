/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { neon } from "@neondatabase/serverless";

/**
 * Initialize Neon database connection
 * Uses the DATABASE_URL environment variable
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return neon(databaseUrl);
}

/**
 * SQL to create the contacts table
 * Run this once to set up the database schema
 */
export const CREATE_CONTACTS_TABLE = `
  CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    request_type VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'contact_form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

/**
 * SQL to create an index on email for faster lookups
 */
export const CREATE_EMAIL_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
`;

/**
 * SQL to create an index on created_at for sorting
 */
export const CREATE_CREATED_AT_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
`;

/**
 * Contact form data interface
 */
export interface ContactFormData {
  requestType: string;
  companyName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
}

/**
 * Insert a new contact into the database
 */
export async function insertContact(data: ContactFormData) {
  const sql = getDb();

  const result = await sql`
    INSERT INTO contacts (
      request_type,
      company_name,
      first_name,
      last_name,
      email,
      phone,
      message,
      source
    ) VALUES (
      ${data.requestType},
      ${data.companyName || null},
      ${data.firstName},
      ${data.lastName},
      ${data.email},
      ${data.phone || null},
      ${data.message},
      ${data.source || "contact_form"}
    )
    RETURNING id, created_at;
  `;

  return result[0];
}

/**
 * Get all contacts (for admin purposes)
 */
export async function getContacts(limit = 100, offset = 0) {
  const sql = getDb();

  return await sql`
    SELECT * FROM contacts
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset};
  `;
}

/**
 * Get contacts by email
 */
export async function getContactsByEmail(email: string) {
  const sql = getDb();

  return await sql`
    SELECT * FROM contacts
    WHERE email = ${email}
    ORDER BY created_at DESC;
  `;
}
