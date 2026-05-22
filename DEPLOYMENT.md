**Deployment & Ads Guidance**

- **Build command:** `npm run build`
- **Output directory:** Cloudflare Pages → `dist`; **Vercel → leave empty** (Nitro writes `.vercel/output` when `VERCEL=1`)

Recommended hosts for easy ad management and low cost:

- **Cloudflare Pages**: uses `cloudflare()` in `vite.config.ts` (default local/CI build without `VERCEL=1`).
- **Vercel (TanStack Start)**: builds with Nitro `preset: "vercel"` when `VERCEL=1` (set automatically on Vercel). **Do not** set Output Directory to `dist` — leave it empty so Vercel uses Nitro’s `.vercel/output` Build Output API. Framework preset: **TanStack Start**. Redeploy without build cache after changing this.
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

## Local dev (Windows)

1. **Only one** `npm run dev` at a time. If you see `Port 5173 is in use`, stop the old server:

```powershell
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
npm run dev
```

2. Open **http://localhost:5173/** (not 5174 unless you intentionally changed the port).

3. If you add new route files, run `npm run generate:routes` once, then restart dev.

4. `EPERM` on `routeTree.gen.ts` means a second Vite/IDE process is locking the file — close extra terminals and retry step 1.

- Top banner: every page (below navbar).
- Mid / bottom: homepage and blog articles.

Quick deploy example (Cloudflare Pages):

1. Connect the repo in Cloudflare Pages.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Add a Custom Domain and configure DNS.
