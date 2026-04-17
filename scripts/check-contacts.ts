/**
 * Check recent contacts in the database
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env.local") });

async function checkContacts() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log("📊 Recent contacts in database:\n");

    const contacts = await sql`
      SELECT id, first_name, last_name, email, request_type, created_at
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 10
    `;

    if (contacts.length === 0) {
      console.log("No contacts found.");
    } else {
      contacts.forEach((contact) => {
        console.log(`ID: ${contact.id}`);
        console.log(`Name: ${contact.first_name} ${contact.last_name}`);
        console.log(`Email: ${contact.email}`);
        console.log(`Type: ${contact.request_type}`);
        console.log(`Date: ${new Date(contact.created_at).toLocaleString()}`);
        console.log("---");
      });
      console.log(`\nTotal contacts: ${contacts.length}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkContacts();
