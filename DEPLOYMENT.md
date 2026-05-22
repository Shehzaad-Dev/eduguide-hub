**Deployment & Ads Guidance**

- **Build command:** `npm run build`
- **Output directory:** `dist`

Recommended hosts for easy ad management and low cost:

- **Cloudflare Pages (recommended)**: fast, cheap, first-class edge, integrates with `wrangler` and Workers. Good for ad logic at edge and privacy controls.
- **Vercel**: frictionless for Next/Vite apps, automatic deploys, simple dashboard.
- **Netlify**: simple deploys and redirect rules; supports headers via `netlify.toml`.

Affordable domain registrars:

- **Namecheap** — low cost, free WHOIS privacy for many TLDs.
- **Cloudflare Registrar** — very transparent pricing and easy DNS management.
- **Google Domains** — simple UI and reasonable pricing.

Ad management notes:

- Use a Consent Management Platform (CMP) if you run personalized ads (e.g., Cookiebot or a simple custom banner).
- For greater control and revenue, use Google Ad Manager + Prebid for header bidding.
- Start simple with Google AdSense and upgrade later.

Quick deploy example (Cloudflare Pages):

1. Connect the repo in Cloudflare Pages.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Add a Custom Domain and configure DNS.
