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

Ad management notes (RevBid — fast publisher approval):

1. Sign up at https://revbid.net/register → **Create Account In Publisher**.
2. Add your live domain, verify with **Head Tag** (paste into `VITE_REVBID_HEAD_HTML` in `.env.local`).
3. After approval (~24–48h), copy your **script URL** and **zone HTML** into `.env.local` (see `.env.example`).
4. On Cloudflare Pages / Vercel, add the same variables under **Environment variables** and redeploy.
5. Upload `public/ads.txt` lines from the RevBid dashboard when provided.

Ads lazy-load: script and zones load only after consent and when slots enter the viewport (top slot loads immediately after consent).

- Top banner: every page (below navbar).
- Mid / bottom: homepage and blog articles.

Quick deploy example (Cloudflare Pages):

1. Connect the repo in Cloudflare Pages.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Add a Custom Domain and configure DNS.
