#!/bin/bash

# fetch-repo-image.sh - Fetch GitHub repository image with Bannerbear template
# Usage: ./fetch-repo-image.sh <github-repo-url> <output-filename> [output-directory]

set -e

# Check parameters
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
    echo "Usage: $0 <github-repo-url> <output-filename> [output-directory]"
    echo "Example: $0 https://github.com/zoom26042604/azrael azrael ./public/images/projects"
    exit 1
fi

# Clean the URL by removing trailing slashes
REPO_URL="${1%/}"
OUTPUT_NAME="$2"

# Set output directory (default to current directory)
OUTPUT_DIR="${3:-.}"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "Fetching project data for: $OUTPUT_NAME"
echo "Repository: $REPO_URL"

# Extract owner and repo name from URL
if [[ $REPO_URL =~ github\.com/([^/]+)/([^/]+) ]]; then
    OWNER="${BASH_REMATCH[1]}"
    REPO="${BASH_REMATCH[2]}"
else
    echo "Error: Invalid GitHub URL format"
    exit 1
fi

echo "Owner: $OWNER"
echo "Repo: $REPO"

# Fetch repository data from GitHub API
echo "Fetching repository information..."
REPO_DATA=$(curl -s "https://api.github.com/repos/$OWNER/$REPO")

# Extract repository info
REPO_NAME=$(echo "$REPO_DATA" | jq -r '.name // empty')
REPO_DESC=$(echo "$REPO_DATA" | jq -r '.description // empty')
REPO_TOPICS=$(echo "$REPO_DATA" | jq -r '.topics[]? // empty' | tr '\n' ',' | sed 's/,$//')

echo "Repository Name: $REPO_NAME"
echo "Description: $REPO_DESC"
echo "Topics: $REPO_TOPICS"

# Fetch README to get more detailed description
echo "Fetching README..."
README_CONTENT=$(curl -s "https://api.github.com/repos/$OWNER/$REPO/readme" | jq -r '.content // empty' | base64 -d 2>/dev/null || echo "")

# Extract first paragraph from README (after title)
if [ -n "$README_CONTENT" ]; then
    DETAILED_DESC=$(echo "$README_CONTENT" | grep -v '^#' | grep -v '^```' | grep -v '^\[' | grep -v '^!' | sed '/^$/d' | head -3 | tr '\n' ' ' | cut -c1-200)
    if [ -n "$DETAILED_DESC" ]; then
        REPO_DESC="$DETAILED_DESC"
    fi
fi

echo "Using description: $REPO_DESC"

# Make API request with all required headers
# This uses the Bannerbear-based API to generate the social image
API_RESPONSE=$(curl -s 'https://lpf64gdwdb.execute-api.us-east-1.amazonaws.com/?repo='"$REPO_URL"'' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:143.0) Gecko/20100101 Firefox/143.0' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'Accept-Language: en-CA,en-US;q=0.7,en;q=0.3' \
  -H 'Accept-Encoding: gzip, deflate, br, zstd' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Origin: https://www.bannerbear.com' \
  -H 'Connection: keep-alive' \
  -H 'Referer: https://www.bannerbear.com/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Priority: u=0' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'TE: trailers')

# Note: To use custom Bannerbear template with description, you would need:
# 1. Your Bannerbear API key
# 2. A template ID with fields for: title, description, tags
# 3. Make POST request to: https://api.bannerbear.com/v2/images with:
#    {
#      "template": "YOUR_TEMPLATE_ID",
#      "modifications": [
#        {"name": "title", "text": "$REPO_NAME"},
#        {"name": "description", "text": "$REPO_DESC"},
#        {"name": "tags", "text": "$REPO_TOPICS"}
#      ]
#    }

# Check if API response is valid JSON
if ! echo "$API_RESPONSE" | jq . >/dev/null 2>&1; then
    echo "Error: Invalid JSON response from API"
    echo "Response: $API_RESPONSE"
    exit 1
fi

# Check if we have at least 3 items (index 2 exists)
ARRAY_LENGTH=$(echo "$API_RESPONSE" | jq 'length')
if [ "$ARRAY_LENGTH" -lt 3 ]; then
    echo "Error: API returned only $ARRAY_LENGTH items, but we need at least 3 (index 2)"
    exit 1
fi

# Extract the 3rd image URL (index 2)
IMAGE_URL=$(echo "$API_RESPONSE" | jq -r '.[2]')

if [ "$IMAGE_URL" = "null" ] || [ -z "$IMAGE_URL" ]; then
    echo "Error: Could not extract image URL from API response"
    exit 1
fi

# Download the image to output directory
echo "Downloading image as ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg..."
if curl -s -o "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" "$IMAGE_URL"; then
    echo "Successfully downloaded ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
else
    echo "Error: Failed to download image"
    exit 1
fi

# Check if ImageMagick is available for conversion
if command -v magick &>/dev/null; then
    echo "Converting to WebP format..."
    if magick "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" -quality 85 "${OUTPUT_DIR}/${OUTPUT_NAME}.webp" &>/dev/null; then
        echo "Successfully converted to WebP"
        rm -f "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
        echo "Done! WebP file created: ${OUTPUT_DIR}/${OUTPUT_NAME}.webp"
    else
        echo "Warning: WebP conversion failed, keeping JPG file"
    fi
elif command -v cwebp &>/dev/null; then
    echo "Converting to WebP format..."
    if cwebp -q 85 "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" -o "${OUTPUT_DIR}/${OUTPUT_NAME}.webp" &>/dev/null; then
        echo "Successfully converted to WebP"
        rm -f "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
        echo "Done! WebP file created: ${OUTPUT_DIR}/${OUTPUT_NAME}.webp"
    else
        echo "Warning: WebP conversion failed, keeping JPG file"
    fi
else
    echo "Warning: Neither convert (ImageMagick) nor cwebp installed. Install with:"
    echo "  macOS: brew install webp"
    echo "  Linux: sudo apt-get install imagemagick webp"
    echo "Keeping JPG file: ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
fi
