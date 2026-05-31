import { useEffect, useState, useRef } from "react";
import { useAdsConsent } from "@/lib/use-ads-consent";
import { monetagConfig } from "@/lib/monetag-sw";

declare global {
  interface Window {
    adHtml?: string;
  }
}

function buildMonetagScript(src: string, zone: string): HTMLScriptElement {
  const script = document.createElement("script");
  script.defer = true;
  script.async = false;
  script.src = src;
  script.setAttribute("data-zone", zone);
  script.setAttribute("data-cfasync", "false");
  return script;
}

function waitForGlobalAdHtml(maxRetries = 10, intervalMs = 200): Promise<boolean> {
  return new Promise((resolve) => {
    let attempts = 0;

    const check = () => {
      if (typeof window.adHtml !== "undefined") {
        return resolve(true);
      }
      attempts += 1;
      if (attempts >= maxRetries) {
        return resolve(false);
      }
      window.setTimeout(check, intervalMs);
    };

    check();
  });
}

export function MonetagBanners() {
  const consent = useAdsConsent();
  const [isReady, setIsReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const slotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (consent !== "granted") {
      return;
    }

    if (typeof window === "undefined") {
      setFailed(true);
      return;
    }

    if (!monetagConfig.enabled) {
      console.warn("Monetag is disabled. Set VITE_MONETAG_ENABLED=true to enable it.");
      setFailed(true);
      return;
    }

    const zone1 = import.meta.env.VITE_MONETAG_ZONE_1;
    const zone2 = import.meta.env.VITE_MONETAG_ZONE_2;
    if (!zone1 && !zone2) {
      console.warn("Monetag env vars missing: VITE_MONETAG_ZONE_1 and/or VITE_MONETAG_ZONE_2 must be defined.");
      setFailed(true);
      return;
    }

    const mountNode = slotRef.current;
    if (!mountNode) {
      console.warn("Monetag slot container was not mounted.");
      setFailed(true);
      return;
    }

    const scripts: HTMLScriptElement[] = [];

    const initialize = async () => {
      // Ensure the global variable exists before any third-party logic runs.
      if (typeof window.adHtml === "undefined") {
        window.adHtml = "";
      }

      const hasAdHtml = await waitForGlobalAdHtml();
      if (!hasAdHtml) {
        console.warn("Monetag did not detect window.adHtml before loading; continuing with a safe default.");
      }

      if (zone1) {
        const script = buildMonetagScript("https://nap5k.com/tag.min.js", zone1);
        script.onerror = () => {
          console.warn("Failed to load Monetag script for zone 1.");
          setFailed(true);
        };
        mountNode.appendChild(script);
        scripts.push(script);
      }

      if (zone2) {
        const script = buildMonetagScript("https://quge5.com/88/tag.min.js", zone2);
        script.onerror = () => {
          console.warn("Failed to load Monetag script for zone 2.");
          setFailed(true);
        };
        mountNode.appendChild(script);
        scripts.push(script);
      }

      setIsReady(true);
    };

    initialize().catch((error) => {
      console.warn("Monetag initialization failed:", error);
      setFailed(true);
    });

    return () => {
      scripts.forEach((script) => script.parentNode?.removeChild(script));
    };
  }, [consent]);

  if (failed) {
    return null;
  }

  if (!isReady) {
    return null;
  }

  return (
    <section className="border-b border-border bg-soft/90" aria-label="Monetag advertisements">
      <div ref={slotRef} className="container-px mx-auto max-w-7xl py-4" />
    </section>
  );
}

export default MonetagBanners;
