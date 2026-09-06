#!/bin/bash

# fetch-repo-image.sh - Fetch GitHub repository image with explicit filename
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

echo "Fetching image for: $OUTPUT_NAME"
echo "Repository: $REPO_URL"

# The image service expects a repository, but some projects belong to an
# organization without a public repository. Use its GitHub avatar in that case.
REPO_PATH="${REPO_URL#https://github.com/}"
REPO_PATH="${REPO_PATH#http://github.com/}"
REPO_PATH="${REPO_PATH%/}"
OWNER="${REPO_PATH%%/*}"
REPOSITORY="${REPO_PATH#*/}"

if [ -z "$REPOSITORY" ] || [ "$REPOSITORY" = "$REPO_PATH" ]; then
    echo "No repository found; fetching the GitHub organization avatar..."
    AVATAR_URL=$(curl -fsSL -H 'User-Agent: azrael-image-generator' "https://api.github.com/orgs/$OWNER" | jq -r '.avatar_url // empty')
    if [ -z "$AVATAR_URL" ]; then
        AVATAR_URL=$(curl -fsSL -H 'User-Agent: azrael-image-generator' "https://api.github.com/users/$OWNER" | jq -r '.avatar_url // empty')
    fi
    if [ -z "$AVATAR_URL" ]; then
        echo "Error: Could not find a GitHub avatar for $OWNER"
        exit 1
    fi

        echo "Downloading organization avatar as ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg..."
        BANNER_OWNER="L-Atelier-de-Camille"
        curl -fsSL -o "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" "$AVATAR_URL"

        if command -v convert &>/dev/null; then
            echo "Creating a Bannerbear-style organization banner..."
            AVATAR_FILE="${OUTPUT_DIR}/${OUTPUT_NAME}-avatar.png"
            convert "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" \
                -resize 92x92^ -gravity center -extent 92x92 \
                \( -size 92x92 xc:none -fill white -draw 'circle 46,46 46,0' \) \
                -alpha off -compose CopyOpacity -composite "$AVATAR_FILE"

            convert -size 1280x640 xc:'#b5c0ce' \
                -fill '#282936' -draw 'roundrectangle 94,90 1186,550 24,24' \
                -fill '#f44336' -draw 'circle 135,131 146,131' \
                -fill '#ffc107' -draw 'circle 167,131 178,131' \
                -fill '#4bd66a' -draw 'circle 199,131 210,131' \
                -fill white -font Adwaita-Sans -pointsize 24 -gravity northeast \
                -annotate +165+126 '0' \
                -fill white -font Adwaita-Sans -pointsize 42 -gravity northeast \
                -annotate +124+114 '★' \
                -fill '#f26aa8' -font Adwaita-Mono -pointsize 31 -gravity northwest \
                -annotate +124+215 "$BANNER_OWNER" \
                -fill '#aeb4c5' -annotate +526+215 ' / ' \
                -fill '#4bd66a' -annotate +582+215 'booking-platform' \
                -fill '#aeb4c5' -font Adwaita-Sans -pointsize 24 -gravity southeast \
                -annotate +124+118 "$BANNER_OWNER" \
                "$AVATAR_FILE" -gravity southwest -geometry +124+122 -composite \
                "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
            rm -f "$AVATAR_FILE"
        fi
else

# Make API request with all required headers
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
fi

# Check if convert (ImageMagick) is available for conversion
if command -v convert &>/dev/null; then
    echo "Converting to WebP format using ImageMagick..."
    if convert "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" -quality 50 "${OUTPUT_DIR}/${OUTPUT_NAME}.webp" &>/dev/null; then
        echo "Successfully converted to WebP"
        # Remove the JPG file after successful conversion
        rm -f "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
        echo "Done! WebP file created: ${OUTPUT_DIR}/${OUTPUT_NAME}.webp"
    else
        echo "Warning: WebP conversion failed, keeping JPG file"
    fi
elif command -v cwebp &>/dev/null; then
    echo "Converting to WebP format..."
    if cwebp -q 50 "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" -o "${OUTPUT_DIR}/${OUTPUT_NAME}.webp" &>/dev/null; then
        echo "Successfully converted to WebP"
        # Remove the JPG file after successful conversion
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
