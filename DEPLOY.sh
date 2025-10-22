#!/bin/bash

# 🚀 3lectrify Platform - One-Command Deploy
# Run this in your terminal (not in Cursor)

set -e  # Exit on any error

echo "🚀 3lectrify Platform Deployment"
echo "================================"
echo ""

# Navigate to project
cd /Users/j.wild/Projects/3lectrify-platform

# Check if we're on main branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're on branch '$BRANCH', not 'main'"
    echo "Switching to main..."
    git checkout main
fi

# Show what we're about to push
echo "📦 Commits ready to push:"
git log origin/main..HEAD --oneline
echo ""

# Push to GitHub
echo "🔄 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Push complete!"
echo ""
echo "🔍 Vercel will now:"
echo "   1. Detect the push (immediate)"
echo "   2. Build your app (~30-60 seconds)"
echo "   3. Deploy to production (~30 seconds)"
echo ""
echo "📊 Track deployment:"
echo "   👉 https://vercel.com"
echo ""
echo "⏱️  Total time: ~2 minutes"
echo ""
echo "🎉 Your site will be live soon!"

