/**
 * Test Resend Email API
 */

import { config } from "dotenv";
import { dirname, join } from "path";
import { Resend } from "resend";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env.local") });

async function testResend() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  console.log("🧪 Testing Resend Email API\n");
  console.log(`API Key: ${apiKey?.substring(0, 10)}...`);
  console.log(`From Email: ${fromEmail}`);
  console.log(`Admin Email: ${adminEmail}\n`);

  if (!apiKey) {
    console.error("❌ RESEND_API_KEY not set in .env.local");
    process.exit(1);
  }

  if (!fromEmail) {
    console.error("❌ RESEND_FROM_EMAIL not set in .env.local");
    process.exit(1);
  }

  if (!adminEmail) {
    console.error("❌ ADMIN_EMAIL not set in .env.local");
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  try {
    console.log("📤 Sending test email...\n");

    const result = await resend.emails.send({
      from: `ExplorAhead Test <${fromEmail}>`,
      to: adminEmail,
      subject: "Test Email from ExplorAhead Contact Form",
      html: `
        <h1>✅ Email Test Successful!</h1>
        <p>This is a test email from your ExplorAhead contact form setup.</p>
        <p>If you received this, your Resend integration is working correctly!</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Sent from ExplorAhead Travel Agency<br>
          Test conducted at ${new Date().toLocaleString()}
        </p>
      `,
      text: `
✅ Email Test Successful!

This is a test email from your ExplorAhead contact form setup.
If you received this, your Resend integration is working correctly!

---
Sent from ExplorAhead Travel Agency
Test conducted at ${new Date().toLocaleString()}
      `.trim(),
    });

    if (result.error) {
      console.error("❌ Failed to send email:");
      console.error(result.error);
      process.exit(1);
    }

    console.log("✅ Email sent successfully!");
    console.log(`Email ID: ${result.data?.id}`);
    console.log(`\n📧 Check your inbox at: ${adminEmail}`);
    console.log("\nIf you don't see it:");
    console.log("1. Check your spam/junk folder");
    console.log("2. Verify ADMIN_EMAIL is set to your real email address");
    console.log("3. Make sure Resend API key is valid (check https://resend.com/api-keys)");
  } catch (error) {
    console.error("❌ Error sending email:");
    console.error(error);
    process.exit(1);
  }
}

testResend();
