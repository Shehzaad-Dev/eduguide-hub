import { SafeAdSlot } from "@/components/ui/safe-ad-slot";

/**
 * Example: Safe Ad Banner Component
 *
 * This component shows how to safely integrate Base64-encoded ad scripts
 * without causing Vercel crashes or page hijacking issues.
 *
 * Replace your old ad banner components with this pattern.
 */

export function SafeAdBanners() {
  return (
    <section className="border-b border-border bg-soft/90" aria-label="Site advertisements">
      <div className="container-px mx-auto max-w-7xl py-4 grid gap-4">
        {/* Top banner - 728x90 leaderboard */}
        <div className="grid gap-4 justify-items-center">
          <div className="overflow-hidden rounded-xl w-full max-w-[728px] bg-muted/10 border border-border">
            <SafeAdSlot
              id="ad-top-banner"
              placement="top"
              width="100%"
              height={90}
              eager={true} // Load immediately since it's above the fold
              collapseIfEmpty={true} // Hide if ad doesn't render
              className="w-full"
            />
          </div>
        </div>

        {/* Mid section - 300x250 rectangle + side ads */}
        <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1fr),auto]">
          <div className="overflow-hidden rounded-xl bg-muted/10 border border-border">
            <SafeAdSlot
              id="ad-mid-banner"
              placement="mid"
              width="100%"
              height={250}
              collapseIfEmpty={true}
              className="w-full"
            />
          </div>

          {/* Optional: Additional ad spaces */}
          <div className="grid gap-4">{/* You can add more SafeAdSlot components here */}</div>
        </div>

        {/* Bottom banner - 320x50 mobile or 468x60 */}
        <div className="grid gap-4 justify-items-center">
          <div className="overflow-hidden rounded-xl bg-muted/10 border border-border w-full max-w-md">
            <SafeAdSlot
              id="ad-bottom-banner"
              placement="bottom"
              width="100%"
              height={50}
              collapseIfEmpty={true}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Usage in your Page Shell:
 *
 * import { SafeAdBanners } from "@/components/ads/safe-ad-banners";
 * import { Navbar } from "./Navbar";
 * import { Footer } from "./Footer";
 *
 * export function PageShell({ children }: { children: React.ReactNode }) {
 *   return (
 *     <div className="flex min-h-dvh flex-col bg-background">
 *       <Navbar />
 *       <SafeAdBanners />           // Add this line
 *       <main className="flex-1">{children}</main>
 *       <Footer />
 *     </div>
 *   );
 * }
 */

/**
 * Individual SafeAdSlot for inline ads:
 *
 * // In any page component:
 * import { SafeAdSlot } from "@/components/ui/safe-ad-slot";
 *
 * export function BlogPost() {
 *   return (
 *     <article>
 *       <h1>My Blog Post</h1>
 *       <p>Content here...</p>
 *
 *       // Mid-article ad
 *       <div style={{ maxWidth: "728px", margin: "2rem auto" }}>
 *         <SafeAdSlot placement="top" height={90} />
 *       </div>
 *
 *       <p>More content...</p>
 *     </article>
 *   );
 * }
 */

/**
 * Configuration Reference:
 *
 * Properties:
 * - placement: "top" | "mid" | "bottom" - Which ad zone to load
 * - width: number | string - Width (default: "100%")
 * - height: number | string - Height (default: 90)
 * - eager: boolean - Load immediately (default: false, lazy-loads when in view)
 * - collapseIfEmpty: boolean - Hide if ad fails (default: false)
 * - id: string - DOM element ID
 * - className: string - CSS classes
 * - onLoad: () => void - Callback when ad loads
 *
 * Environment Variables Required:
 * - VITE_AD_ZONE_TOP_B64 (optional) - Top banner ad (Base64 encoded)
 * - VITE_AD_ZONE_MID_B64 (optional) - Mid section ad (Base64 encoded)
 * - VITE_AD_ZONE_BOTTOM_B64 (optional) - Bottom ad (Base64 encoded)
 */
