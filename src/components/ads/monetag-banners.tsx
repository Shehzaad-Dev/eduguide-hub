import { useEffect } from "react";
import { useAdsConsent } from "@/lib/use-ads-consent";
import { monetagConfig } from "@/lib/monetag-sw";

/**
 * Monetag Banner Ads Component
 * Injects Monetag banner scripts for displaying ads across the site
 */

export function MonetagBanners() {
  const consent = useAdsConsent();

  useEffect(() => {
    if (consent !== "granted") return;
    if (!monetagConfig.enabled) return;

    // Safely inject Monetag banner scripts only when zone IDs are present
    const zone1 = import.meta.env.VITE_MONETAG_ZONE_1;
    const zone2 = import.meta.env.VITE_MONETAG_ZONE_2;

    if (!zone1 && !zone2) return;

    const scripts: HTMLScriptElement[] = [];

    if (zone1) {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.setAttribute("data-zone", zone1);
      s1.src = `https://nap5k.com/tag.min.js`;
      document.body.appendChild(s1);
      scripts.push(s1);
    }

    if (zone2) {
      const s2 = document.createElement("script");
      s2.async = true;
      s2.setAttribute("data-zone", zone2);
      s2.src = `https://quge5.com/88/tag.min.js`;
      document.body.appendChild(s2);
      scripts.push(s2);
    }

    return () => {
      scripts.forEach((s) => s.parentNode?.removeChild(s));
    };
  }, [consent]);

  return (
    <section className="border-b border-border bg-soft/90" aria-label="Monetag advertisements">
      <div className="container-px mx-auto max-w-7xl py-4">
        {/* Monetag banners inject here automatically via the scripts above */}
      </div>
    </section>
  );
}

// Named export kept for clarity
export default MonetagBanners;
