import { useEffect } from "react";
import { useAdsConsent } from "@/lib/use-ads-consent";

/**
 * Monetag Banner Ads Component
 * Injects Monetag banner scripts for displaying ads across the site
 */

export function MonetgBanners() {
  const consent = useAdsConsent();

  useEffect(() => {
    if (consent !== "granted") return;

    // Inject Monetag banner script 1 (zone 11076796 from nap5k.com)
    const script1 = document.createElement("script");
    script1.innerHTML = `(function(s){s.dataset.zone='11076796',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
    document.body.appendChild(script1);

    // Inject Monetag banner script 2 (zone 244413 from quge5.com)
    const script2 = document.createElement("script");
    script2.src = "https://quge5.com/88/tag.min.js";
    script2.setAttribute("data-zone", "244413");
    script2.setAttribute("async", "true");
    script2.setAttribute("data-cfasync", "false");
    document.body.appendChild(script2);

    return () => {
      // Cleanup scripts on component unmount if needed
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
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

// Export for backward compatibility
export const AdsterraAutoRefreshBanners = MonetgBanners;
