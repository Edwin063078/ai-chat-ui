#!/bin/bash
# Quick Deployment Script

echo "🚀 AI Chat UI - Quick Deployment"
echo "================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit: AI Chat UI"
else
    echo "✅ Git repository found"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  CREATE GITHUB REPOSITORY"
echo "   - Go to github.com/new"
echo "   - Create new repository: 'session-1-ai-chat'"
echo "   - Choose Public"
echo ""

echo "2️⃣  PUSH TO GITHUB"
echo "   Run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/session-1-ai-chat.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

echo "3️⃣  DEPLOY TO VERCEL"
echo "   - Go to vercel.com"
echo "   - Click 'New Project'"
echo "   - Select your GitHub repo"
echo "   - Click Deploy"
echo ""

echo "✨ Your app will be live at:"
echo "   https://session-1-ai-chat-YOUR_USERNAME.vercel.app"
echo ""

echo "For local testing:"
echo "   npm run dev"
echo "   Open http://localhost:3000"
