#!/bin/bash
# Quick setup and deployment script for Monetag integration

echo "🚀 EduGuide Monetag Setup Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verify setup
echo -e "${BLUE}1. Verifying Monetag setup...${NC}"
if [ -f "public/sw.js" ]; then
    echo -e "${GREEN}✓ Service worker file exists: public/sw.js${NC}"
else
    echo -e "${YELLOW}✗ Service worker file missing!${NC}"
    exit 1
fi

if [ -f "src/lib/monetag-sw.ts" ]; then
    echo -e "${GREEN}✓ Registration module exists: src/lib/monetag-sw.ts${NC}"
else
    echo -e "${YELLOW}✗ Registration module missing!${NC}"
    exit 1
fi

if grep -q "VITE_MONETAG_ENABLED" ".env.local"; then
    echo -e "${GREEN}✓ Monetag config exists in .env.local${NC}"
else
    echo -e "${YELLOW}✗ Monetag config missing in .env.local!${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}2. Build verification...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${YELLOW}✗ Build failed!${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}3. Git preparation...${NC}"
echo "Run these commands to push to GitHub:"
echo ""
echo "  git add ."
echo "  git commit -m 'Add Monetag service worker setup for site monetization'"
echo "  git push origin main"
echo ""

echo -e "${GREEN}✓ All checks passed! Ready for GitHub deployment${NC}"
echo ""
echo "Next steps:"
echo "1. Review MONETAG_SETUP.md for detailed instructions"
echo "2. Deploy to production (Vercel/Cloudflare)"
echo "3. Verify /sw.js is accessible at your domain"
echo "4. Submit to Monetag for approval"
