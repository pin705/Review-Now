#!/bin/bash

# Test Image Upload API
# Usage: ./test-upload.sh

echo "Testing Image Upload to Cloudinary..."

# Sample base64 encoded 1x1 red pixel PNG
BASE64_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="

# Test upload endpoint
curl -X POST http://localhost:3005/api/upload \
  -H "Content-Type: application/json" \
  -d "{\"image\": \"$BASE64_IMAGE\", \"folder\": \"test\"}" \
  | jq .

echo ""
echo "✓ Upload test complete!"
echo "Check response for 'url' field with Cloudinary link"
