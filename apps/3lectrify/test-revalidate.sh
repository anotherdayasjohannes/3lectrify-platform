#!/bin/bash

# Test script for Sanity webhook revalidation endpoint
# Usage: ./test-revalidate.sh [secret]

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
LOCAL_URL="http://localhost:3000/api/revalidate"
SECRET="${1:-test-secret-12345}" # Use provided secret or default

echo -e "${YELLOW}Testing Sanity Revalidation Endpoint${NC}"
echo "======================================"
echo ""

# Test 1: Invalid secret
echo -e "${YELLOW}Test 1: Invalid Secret (should return 401)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${LOCAL_URL}?secret=wrong-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-123",
    "_type": "page",
    "slug": { "current": "home" }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 401 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Got 401 as expected"
  echo "   Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 401, got $HTTP_CODE"
  echo "   Response: $BODY"
fi
echo ""

# Test 2: Valid home page update
echo -e "${YELLOW}Test 2: Home Page Update (should return 200)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${LOCAL_URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "home-page-123",
    "_type": "page",
    "slug": { "current": "home" }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Got 200 OK"
  echo "   Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 200, got $HTTP_CODE"
  echo "   Response: $BODY"
fi
echo ""

# Test 3: Dynamic page update
echo -e "${YELLOW}Test 3: Dynamic Page Update (should return 200)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${LOCAL_URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "about-page-456",
    "_type": "page",
    "slug": { "current": "about" }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Got 200 OK"
  echo "   Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 200, got $HTTP_CODE"
  echo "   Response: $BODY"
fi
echo ""

# Test 4: Site settings update
echo -e "${YELLOW}Test 4: Site Settings Update (should return 200)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${LOCAL_URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "site-settings",
    "_type": "siteSettings"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Got 200 OK"
  echo "   Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 200, got $HTTP_CODE"
  echo "   Response: $BODY"
fi
echo ""

# Test 5: Legal page update
echo -e "${YELLOW}Test 5: Legal Page Update (should return 200)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${LOCAL_URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "privacy-policy",
    "_type": "legalPage",
    "slug": { "current": "datenschutz" }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Got 200 OK"
  echo "   Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 200, got $HTTP_CODE"
  echo "   Response: $BODY"
fi
echo ""

# Test 6: Missing secret
echo -e "${YELLOW}Test 6: Missing Secret (should return 401)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${LOCAL_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-789",
    "_type": "page",
    "slug": { "current": "test" }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 401 ]; then
  echo -e "${GREEN}✓ PASS${NC} - Got 401 as expected"
  echo "   Response: $BODY"
else
  echo -e "${RED}✗ FAIL${NC} - Expected 401, got $HTTP_CODE"
  echo "   Response: $BODY"
fi
echo ""

echo "======================================"
echo -e "${YELLOW}Testing Complete${NC}"
echo ""
echo "Next Steps:"
echo "1. Set REVALIDATION_SECRET in .env.local"
echo "2. Run: npm run dev"
echo "3. Run: ./test-revalidate.sh YOUR_SECRET_HERE"
echo "4. Deploy to Vercel and configure webhook in Sanity"

