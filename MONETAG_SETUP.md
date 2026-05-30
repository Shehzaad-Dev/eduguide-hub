# Monetag Setup & Deployment Guide

## ✅ What's Been Configured

Your EduGuide site is now fully configured for Monetag integration:

### 1. **Service Worker Setup**
- ✅ Service worker file: `public/sw.js`
- ✅ Configuration: Domain `5gvci.com`, Zone ID `11076770`
- ✅ Auto-registration on app load (handles in `src/lib/monetag-sw.ts`)

### 2. **Environment Configuration**
- ✅ Monetag config in `.env.local`:
  ```
  VITE_MONETAG_ENABLED=true
  VITE_MONETAG_DOMAIN=5gvci.com
  VITE_MONETAG_ZONE_ID=11076770
  ```

### 3. **Client-Side Integration**
- ✅ Service worker registration in root component
- ✅ Proper error handling and logging
- ✅ Client-side only (doesn't break SSR)

---

## 🚀 Before Pushing to GitHub

### Step 1: Verify Local Setup
```bash
# Install dependencies (if not done)
npm install
# or
bun install

# Build the project to test production setup
npm run build
# or
bun run build

# Test locally
npm run preview
```

### Step 2: Verify Service Worker is Accessible
- Open your app in browser
- Open DevTools → Application → Service Workers
- You should see `/sw.js` registered
- Check console for "Monetag Service Worker registered successfully" message

### Step 3: Push to GitHub
```bash
# Add all changes
git add .

# Commit the changes
git commit -m "Add Monetag service worker setup for site monetization"

# Push to your repository
git push origin main
# (or your branch name)
```

---

## 📋 For Monetag Approval

### Information to Provide to Monetag:

1. **Domain**: Your deployment domain (e.g., your Vercel/production URL)
2. **Service Worker Location**: `/sw.js` - publicly accessible at `https://yourdomain.com/sw.js`
3. **Configuration**:
   - Domain: `5gvci.com`
   - Zone ID: `11076770`

### Files Monetag Will Verify:

- ✅ `/public/sw.js` - Main service worker file
- ✅ Service worker is properly registered in the app
- ✅ `.env.local` has correct configuration (local only, won't affect approval)

### Deployment Requirements:

1. **Ensure `public/sw.js` is deployed** - This file must be publicly accessible
   - For Vercel: Automatically served from `/public` folder
   - For Cloudflare: Configured in `vite.config.ts` (using `cloudflare()` plugin)

2. **Check your deployment URL**:
   - Visit `https://yourdomain.com/sw.js`
   - You should see the service worker file content

3. **Verify service worker is working**:
   - Open your site in browser
   - Check DevTools → Application → Service Workers
   - Should show registered service worker

---

## 🔄 Updating Monetag Ads Configuration

### After Monetag Approval:

When Monetag approves and provides you new configuration (domain, zone ID, etc.):

1. **Update `.env.local`** (for local development):
   ```
   VITE_MONETAG_DOMAIN=your-new-domain.com
   VITE_MONETAG_ZONE_ID=your-new-zone-id
   ```

2. **Update `public/sw.js`**:
   ```javascript
   self.options = {
       "domain": "your-new-domain.com",
       "zoneId": your-new-zone-id
   }
   ```

3. **Commit and push**:
   ```bash
   git add .env.local public/sw.js
   git commit -m "Update Monetag configuration after approval"
   git push origin main
   ```

4. **Deploy** - Changes will automatically deploy to production

---

## 📊 Monitoring & Troubleshooting

### Check Service Worker Registration:

In browser console:
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => console.log('Registered:', reg));
});
```

### Common Issues:

| Issue | Solution |
|-------|----------|
| Service worker not registering | Check DevTools → Application tab |
| 404 on `/sw.js` | Verify file exists in `public/sw.js` |
| HTTPS only | Service workers only work over HTTPS (and localhost) |
| Approve delay | Monetag takes 24-48 hours typically |

### Check in DevTools:

1. **Application Tab → Service Workers**: Should list `/sw.js`
2. **Console Tab**: Look for our registration messages
3. **Network Tab**: Should see `/sw.js` loading successfully

---

## 📝 File Structure

```
public/
├── sw.js                    ← Monetag service worker
├── robots.txt
└── ads.txt

src/
├── lib/
│   └── monetag-sw.ts        ← Registration module
├── routes/
│   └── __root.tsx           ← Imports and triggers registration
└── ...

.env.local                    ← Monetag config (not pushed to GitHub)
```

---

## ✨ Next Steps

1. ✅ **Verify Everything Works Locally**
   ```bash
   npm run build && npm run preview
   ```

2. ✅ **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Monetag service worker setup"
   git push
   ```

3. ✅ **Deploy to Production** (Vercel/Cloudflare)
   - Your CI/CD should auto-deploy on push
   - Verify `/sw.js` is accessible at your domain

4. ✅ **Submit to Monetag**
   - Provide your domain URL
   - They will verify and approve within 24-48 hours

5. ✅ **Update Configuration** (after approval)
   - Use the configuration from Monetag
   - Update `.env.local` and `public/sw.js`
   - Push changes and redeploy

---

## 🎯 Summary

Your site is **fully configured** for Monetag. The service worker will:
- ✅ Auto-register on page load
- ✅ Serve Monetag ads when approved
- ✅ Handle errors gracefully
- ✅ Work with your existing ad providers (Adsterra)

**Status**: Ready for GitHub push and Monetag approval! 🚀
