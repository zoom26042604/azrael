#!/bin/bash

# generate-project-images.sh - Batch generate GitHub project images
# This script uses a predefined mapping to generate images with correct filenames

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Get the project root directory (parent of scripts)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Output directory for project images
OUTPUT_DIR="$PROJECT_ROOT/public/images/projects"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Source the project repository mappings
source "$SCRIPT_DIR/project-repos.sh"

echo "=========================================="
echo "Generating project images"
echo "Script directory: $SCRIPT_DIR"
echo "Output directory: $OUTPUT_DIR"
echo "Total projects: ${#PROJECT_REPOS[@]}"
echo "=========================================="

# Counter for progress
count=0
total=${#PROJECT_REPOS[@]}

# Process each project
for project_name in "${!PROJECT_REPOS[@]}"; do
  repo_url="${PROJECT_REPOS[$project_name]}"
    count=$((count + 1))
    
    echo ""
    echo "[$count/$total] Processing: $project_name"
    echo "  Repository: $repo_url"
    echo "------------------------------------------"
    
    # Call fetch-repo-image.sh with project name and repo URL
    if "$SCRIPT_DIR/fetch-repo-image.sh" "$repo_url" "$project_name" "$OUTPUT_DIR"; then
        echo "✓ Successfully processed $project_name"
    else
        echo "✗ Failed to process $project_name"
        # Continue with next repo even if one fails
        continue
    fi
    
    # Add a small delay to be nice to the API
    sleep 1
done

echo ""
echo "=========================================="
echo "Image generation complete!"
echo "=========================================="
