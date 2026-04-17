#!/bin/bash

# Test Contact Form API
# This script tests the /api/contact endpoint locally

echo "🧪 Testing Contact Form API..."
echo ""

# Start dev server in background if not running
if ! lsof -ti:3000 > /dev/null; then
  echo "⚠️  Dev server not running. Starting it now..."
  echo "   Run 'npm run dev' in another terminal first."
  exit 1
fi

echo "📤 Sending test contact form submission..."
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "requestType": "GENERAL",
    "companyName": "Test Company",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1 234 567 8900",
    "message": "This is a test message from the API test script.",
    "source": "api_test"
  }')

echo "📥 Response:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ Test passed! Contact form is working."
  echo ""
  echo "Check your inbox at: $(grep ADMIN_EMAIL .env.local | cut -d= -f2)"
  echo "And john.doe@example.com should have received a confirmation email."
else
  echo "❌ Test failed. Check the response above for errors."
  exit 1
fi
