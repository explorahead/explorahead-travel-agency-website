/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/**
 * Database Setup Script
 *
 * Run this script once to create the contacts table in your Neon database.
 *
 * Usage:
 *   npx tsx scripts/setup-database.ts
 *
 * Make sure to set the DATABASE_URL environment variable first.
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env.local") });

async function setupDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL environment variable is not set");
    console.log("\nTo set up your database:");
    console.log("1. Create a free Neon account at https://neon.tech");
    console.log("2. Create a new project");
    console.log("3. Copy the connection string");
    console.log("4. Add it to your .env.local file as DATABASE_URL");
    process.exit(1);
  }

  console.log("🔌 Connecting to database...");
  const sql = neon(databaseUrl);

  try {
    // Create contacts table
    console.log("📊 Creating contacts table...");
    await sql`
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
    console.log("✅ Contacts table created");

    // Create indexes
    console.log("📇 Creating indexes...");
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
    `;
    console.log("✅ Indexes created");

    // Verify setup
    const result = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'contacts'
      ORDER BY ordinal_position;
    `;
    console.log("\n📋 Table structure:");
    result.forEach((col) => {
      console.log(`   - ${col.column_name}: ${col.data_type}`);
    });

    console.log("\n🎉 Database setup complete!");
    console.log("\nYour contact form is now ready to store submissions.");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();
