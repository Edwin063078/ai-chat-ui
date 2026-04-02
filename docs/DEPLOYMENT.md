# Deployment Guide

Instructions for deploying the Chat UI to production environments.

## Prerequisites

- Node.js 18+
- Git
- npm or yarn
- GitHub account (for Vercel)
- (Optional) Docker for containerization

## Quick Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd session-1-ai-chat

# Deploy
vercel

# Follow prompts to connect GitHub and deploy
```

### Option 2: Using GitHub Integration

1. Push code to GitHub repository
2. Visit https://vercel.com/new
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. Deploy with single click

### Option 3: Manual GitHub Deployment

1. **Create GitHub Repository**
   ```bash
   git add .
   git commit -m "Initial chat UI commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Select GitHub repository
   - Configure settings (defaults are fine)
   - Click "Deploy"

## Environment Variables

Create `.env.local` for local development:

```env
# API Configuration (when connecting to real backend)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ASSISTANT_NAME=Claude
```

For production, set in Vercel Project Settings:
1. Go to Settings → Environment Variables
2. Add variables for production
3. Redeploy

## Local Development

### First Time Setup
```bash
# Clone repository
git clone <repo-url>
cd session-1-ai-chat

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Daily Development
```bash
npm run dev
```

Server will hot-reload on file changes.

### Build & Test Production Build
```bash
# Build for production
npm run build

# Test production build locally
npm start
```

Open http://localhost:3000 to verify

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t chat-ui .

# Run container
docker run -p 3000:3000 chat-ui

# Visit http://localhost:3000
```

### Docker Compose (with backend)

```yaml
version: '3.8'

services:
  chat-ui:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3001

  api:
    image: your-api-image:latest
    ports:
      - "3001:3001"
```

Run with:
```bash
docker-compose up
```

## Production Checklist

### Before Deploying

- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint errors: `npm run lint`
- [ ] Test on mobile browser
- [ ] Test keyboard navigation
- [ ] Test dark/light mode (if applicable)
- [ ] Update .env.production with correct URLs
- [ ] Update metadata in `app/layout.tsx`
- [ ] Test error states
- [ ] Verify all images/icons load
- [ ] Performance audit in DevTools

### Deployment Steps

1. **Commit changes**
   ```bash
   git add .
   git commit -m "Production ready deployment"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically deploy on push to main
   - Check deployment status at https://vercel.com/dashboard

3. **Verify Production**
   - Visit your production URL
   - Test all features
   - Check console for errors

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Vercel CDN automatically optimizes
- Images cached globally

### Bundle Size
```bash
# Analyze bundle
npm run analyze

# Check specific bundle
webpack-bundle-analyzer
```

### Core Web Vitals
Track in Vercel Analytics:
- LCP (Largest Contentful Paint) < 2.5s ✅
- FID (First Input Delay) < 100ms ✅
- CLS (Cumulative Layout Shift) < 0.1 ✅

## Scaling Considerations

### Database (if needed)
- Use serverless database (Firebase, Supabase, MongoDB Atlas)
- Connection pooling for reliability
- Regular backups

### API Rate Limiting
- Implement rate limiting on backend
- Handle rate limit responses in frontend
- Show user-friendly error messages

### Caching
- Redis for session caching
- CDN for static assets
- Browser caching headers

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Performance monitoring
- Uptime monitoring

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
npm run build

# Check Node version
node --version  # Should be 18+
```

### Deployment Hangs
- Check environment variables
- Verify API endpoints are accessible
- Check memory usage
- Review Vercel logs

### Performance Issues
- Check Core Web Vitals
- Analyze bundle size
- Review network requests
- Check database queries

### Environment Variables Not Loading
```bash
# Verify .env files
cat .env.local

# Make sure it's not in .gitignore
cat .gitignore
```

## Rollback Procedure

### On Vercel
1. Go to Deployments
2. Hover over previous deployment
3. Click reverted button
4. Verify production is restored

### Manual Rollback
```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

## Monitoring & Analytics

### Vercel Analytics
- Visit https://vercel.com/dashboard
- Check Real User Metrics (RUM)
- Monitor Web Vitals
- View traffic analytics

### Error Tracking (Sentry)
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

### Custom Analytics
- Track user interactions
- Log feature usage
- Monitor performance events
- Export to analytics platform

## Maintenance

### Regular Tasks
- **Weekly**: Check error logs, monitor performance
- **Monthly**: Review analytics, update dependencies
- **Quarterly**: Security audit, performance optimization

### Dependency Updates
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update major versions
npm install package@latest
```

## Security

### Headers
Vercel automatically sets security headers:
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Content-Security-Policy

### Secrets Management
```env
# Never commit secrets
# Use Vercel Secrets for:
# - API keys
# - Database passwords
# - Auth tokens
```

### SSL/TLS
- Automatic for *.vercel.app domains
- Custom domain support
- Free SSL certificates

## Support & Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)

### Community
- GitHub Issues
- Next.js Discussions
- Stack Overflow (tag: nextjs)

---

**Last Updated:** April 2025
**Version:** 1.0
