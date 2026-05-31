import { useEffect, useState, useRef } from "react";
import { useAdsConsent } from "@/lib/use-ads-consent";
import { monetagConfig } from "@/lib/monetag-sw";

const isMonetagEnabled = import.meta.env.VITE_MONETAG_ENABLED === "true";
const monetagZone1 = import.meta.env.VITE_MONETAG_ZONE_1;
const monetagZone2 = import.meta.env.VITE_MONETAG_ZONE_2;

function createScript(src: string, attrs: Record<string, string> = {}): HTMLScriptElement {
  const script = document.createElement("script");
  script.defer = true;
  script.async = false;
  script.src = src;

  Object.entries(attrs).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  return script;
}

function createInlineScript(content: string): HTMLScriptElement {
  const script = document.createElement("script");
  script.defer = true;
  script.async = false;
  script.type = "text/javascript";
  script.textContent = content;
  return script;
}

export function MonetagBanners() {
  const consent = useAdsConsent();
  const [failed, setFailed] = useState(false);
  const slotRef = useRef<HTMLDivElement | null>(null);

  const hasRequiredEnv = isMonetagEnabled && (monetagZone1 || monetagZone2);
  if (!hasRequiredEnv) {
    return null;
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      setFailed(true);
      return;
    }

    if (consent !== "granted") {
      return;
    }

    if (!monetagConfig.enabled) {
      console.warn("Monetag is disabled. Set VITE_MONETAG_ENABLED=true to enable it.");
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

    if (monetagZone1) {
      const script = createScript("https://nap5k.com/tag.min.js", {
        "data-zone": monetagZone1,
        "data-cfasync": "false",
      });
      script.onerror = () => {
        console.warn("Failed to load Monetag script for zone 1.");
        setFailed(true);
      };
      mountNode.appendChild(script);
      scripts.push(script);
    }

    if (monetagZone2) {
      const script = createInlineScript(
        `(function(s){s.dataset.zone='${monetagZone2}',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
      );
      script.onerror = () => {
        console.warn("Failed to load Monetag inline script for zone 2.");
        setFailed(true);
      };
      mountNode.appendChild(script);
      scripts.push(script);
    }

    return () => {
      scripts.forEach((script) => script.parentNode?.removeChild(script));
    };
  }, [consent]);

  if (failed) {
    return null;
  }

  return (
    <section className="border-b border-border bg-soft/90" aria-label="Monetag advertisements">
      <div ref={slotRef} className="container-px mx-auto max-w-7xl py-4" />
    </section>
  );
}

export default MonetagBanners;
