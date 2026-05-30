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

Ad management notes (Adsterra — use raw Adsterra zone snippets):

1. Sign up at https://adsterra.com/publishers and get your Adsterra publisher ad unit snippets.
2. Copy each placement's full HTML snippet into your local environment file:
   - `VITE_ADSTERRA_ZONE_TOP_HTML`
   - `VITE_ADSTERRA_ZONE_MID_HTML`
   - `VITE_ADSTERRA_ZONE_BOTTOM_HTML`
3. On Cloudflare Pages / Vercel, add the same variables under **Environment variables** and redeploy.
4. Add any required Adsterra `ads.txt` entries to `public/ads.txt` if Adsterra provides them.

Ads lazy-load: Adsterra snippets only inject after user consent and once the slot enters the viewport.

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
