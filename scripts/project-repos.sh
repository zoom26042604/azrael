#!/bin/bash
# project-repos.sh - Mapping of project names to GitHub repositories
# This file is sourced by generate-project-images.sh

# For zsh: declare -A PROJECT_REPOS
# For bash: using arrays
declare -A PROJECT_REPOS

# Assign values to the associative array
PROJECT_REPOS=(
    ["portfolio-personnel"]="https://github.com/zoom26042604/azrael"
    ["game-2048"]="https://github.com/zoom26042604/game-2048"
    ["interactive-cv"]="https://github.com/zoom26042604/cv"
)
