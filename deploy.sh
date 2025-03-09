#!/bin/bash

# Switch to the main branch
git checkout main

# Merge latest changes from dev
git merge dev --no-edit

# Build the Angular project
ng build --output-path=dist

# Remove all files except .git (to keep the repo intact)
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'dist' -exec rm -rf {} +

# Move built files to root
mv dist/* .

# Clean up empty dist folder
rmdir dist

# Add and commit changes
git add .
git commit -m "Deploy: $1"

# Push to main
git push origin main

# Switch back to dev
git checkout dev
