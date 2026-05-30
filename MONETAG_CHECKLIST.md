# Monetag Deployment Checklist

## ✅ Local Setup (Completed)

- [x] Service worker file created: `public/sw.js`
- [x] Monetag configuration added to `.env.local`
- [x] Service worker registration module created: `src/lib/monetag-sw.ts`
- [x] Root component updated to register service worker
- [x] All imports and dependencies configured

## 🔍 Pre-GitHub Push Verification

Before pushing to GitHub, verify:

- [ ] Build project successfully: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Service worker file exists: `public/sw.js`
- [ ] `.env.local` has Monetag variables
- [ ] Root component has service worker registration
- [ ] App runs without errors: `npm run preview`

## 🚀 GitHub Deployment

- [ ] Check git status: `git status`
- [ ] Stage changes: `git add .`
- [ ] Commit changes: `git commit -m "Add Monetag service worker setup"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify on GitHub that files are pushed:
  - [ ] `public/sw.js` is in the repo
  - [ ] `src/lib/monetag-sw.ts` is in the repo
  - [ ] `src/routes/__root.tsx` is updated
  - [ ] `.env.local` is NOT in the repo (ignored by .gitignore)
  - [ ] `MONETAG_SETUP.md` is in the repo

## 🌐 Production Deployment

- [ ] Deployment triggered (auto-deploy or manual)
- [ ] Check deployment status in Vercel/Cloudflare
- [ ] Verify `/sw.js` is accessible:
  - Visit `https://yourdomain.com/sw.js`
  - Should see the service worker content
- [ ] Test on production domain:
  - Open site in browser
  - Open DevTools → Application → Service Workers
  - Should see `/sw.js` registered

## 📧 Monetag Approval

- [ ] Account created at Monetag (if not already)
- [ ] Submit for approval with:
  - [ ] Your domain URL (production)
  - [ ] Service worker location: `/sw.js`
  - [ ] Your Monetag configuration details
- [ ] Wait for approval (typically 24-48 hours)
- [ ] Check email for approval notification

## 📊 After Monetag Approval

Once Monetag approves and provides new configuration:

- [ ] Update `.env.local` with new domain/zone ID
- [ ] Update `public/sw.js` with new configuration
- [ ] Test locally: `npm run preview`
- [ ] Commit changes: `git add . && git commit -m "Update Monetag config after approval"`
- [ ] Push changes: `git push origin main`
- [ ] Verify deployment updates
- [ ] Monitor Monetag ads on live site

## 🎯 Success Indicators

You'll know everything is working when:

- ✅ Service worker appears in DevTools Application tab
- ✅ No console errors related to service worker
- ✅ `/sw.js` file is accessible on production domain
- ✅ GitHub shows all new files in the repo
- ✅ Monetag approval email received
- ✅ Monetag ads visible on your site

---

## 📝 Quick Command Reference

```bash
# Verify build
npm run build

# Check for errors
npm run lint

# Test locally
npm run preview

# Git commands
git status                  # Check what changed
git add .                   # Stage all changes
git commit -m "message"     # Commit changes
git push origin main        # Push to GitHub
git log --oneline          # View commit history
```

---

## 🆘 Need Help?

If you encounter issues:

1. Check `MONETAG_SETUP.md` for detailed troubleshooting
2. Verify service worker file: `public/sw.js`
3. Check browser DevTools Application tab
4. Review console for error messages
5. Ensure deployment has `/sw.js` accessible
6. Contact Monetag support with your domain

---

**Status**: Ready to deploy! 🚀
