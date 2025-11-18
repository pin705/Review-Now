#!/bin/bash

# Test script for backend API endpoints
# This script tests all API endpoints to ensure they work correctly

API_URL="http://localhost:3000/api"

echo "Testing Review Now Backend API..."
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Get all shops
echo "1. Testing GET /api/shops"
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/shops)
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✓ GET /api/shops - OK${NC}"
else
    echo -e "${RED}✗ GET /api/shops - Failed (HTTP $response)${NC}"
fi
echo ""

# Test 2: Search shops
echo "2. Testing GET /api/shops/search"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/shops/search?q=0901234567&type=phone")
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✓ GET /api/shops/search - OK${NC}"
else
    echo -e "${RED}✗ GET /api/shops/search - Failed (HTTP $response)${NC}"
fi
echo ""

# Test 3: Get all reviews
echo "3. Testing GET /api/reviews"
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/reviews)
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✓ GET /api/reviews - OK${NC}"
else
    echo -e "${RED}✗ GET /api/reviews - Failed (HTTP $response)${NC}"
fi
echo ""

# Test 4: Create a shop
echo "4. Testing POST /api/shops"
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST $API_URL/shops \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Shop API",
    "phone": "0999999999",
    "platform": "facebook",
    "verified": false
  }')
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✓ POST /api/shops - OK${NC}"
else
    echo -e "${RED}✗ POST /api/shops - Failed (HTTP $response)${NC}"
fi
echo ""

echo "=================================="
echo "API Testing Complete!"
echo ""
echo "Note: This script only tests if endpoints are responding."
echo "For full testing, ensure MongoDB is running and seeded with data."
