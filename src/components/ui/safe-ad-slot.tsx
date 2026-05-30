import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { type AdPlacement, getAdHtml, hasAdProviderConfigured } from "@/lib/base64-ads-config";
import { useAdsConsent } from "@/lib/use-ads-consent";

type SafeAdSlotProps = {
  id?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placement?: AdPlacement;
  adHtml?: string; // Pre-decoded HTML or custom override
  eager?: boolean; // Load immediately when consent given
  onLoad?: () => void;
  collapseIfEmpty?: boolean;
};

/**
 * SafeAdSlot Component
 * 
 * Safely renders ad HTML from Base64-encoded environment variables
 * Features:
 * - Client-side only rendering (no SSR/hydration issues)
 * - HTML sanitization with DOMPurify
 * - Script re-execution for ad networks
 * - Consent-based loading
 * - No page hijacking
 */
export function SafeAdSlot({
  id,
  className,
  width = "100%",
  height = 90,
  placement,
  adHtml: adHtmlOverride,
  eager = false,
  onLoad,
  collapseIfEmpty = false,
}: SafeAdSlotProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(eager);
  const [hasRenderedAd, setHasRenderedAd] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const consent = useAdsConsent();

  // Ensure we only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get ad HTML from placement or override
  const placementHtml = placement ? getAdHtml(placement) : undefined;
  const adHtml = adHtmlOverride ?? placementHtml;
  const configured = hasAdProviderConfigured();

  // Check if ad is in viewport
  useEffect(() => {
    if (eager || !isClient) {
      setInView(true);
      return;
    }
    if (!ref.current) return;

    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.01 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [eager, isClient]);

  // Inject and render ad HTML safely
  useEffect(() => {
    if (!isClient) return;
    if (!inView) return;
    if (consent !== "granted") return;
    if (!ref.current) return;
    if (!adHtml) return;

    const host = ref.current;
    host.replaceChildren();

    try {
      // DOMPurify configuration for ad scripts
      const cleanHtml = DOMPurify.sanitize(adHtml, {
        ADD_TAGS: ["script", "ins", "iframe", "div", "span"],
        ADD_ATTR: [
          "async",
          "defer",
          "src",
          "data-cfasync",
          "data-zone",
          "data-ad-slot",
          "id",
          "class",
          "style",
          "type",
          "charset",
          "data-*", // Allow all data-* attributes
        ],
        ALLOWED_STYLES: {
          "*": {
            "height": [/.*/],
            "width": [/.*/],
            "display": [/.*/],
            "position": [/.*/],
            "margin": [/.*/],
            "padding": [/.*/],
          },
        },
      });

      // Create a wrapper to prevent scripts from escaping
      const wrapper = document.createElement("div");
      wrapper.style.isolation = "isolate"; // CSS isolation to contain scripts
      wrapper.innerHTML = cleanHtml;

      // Reexecute scripts so they run properly
      wrapper.querySelectorAll("script").forEach((oldScript) => {
        const newScript = document.createElement("script");

        // Copy all attributes
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Copy text content
        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }

        // Replace old script with new one (triggers execution)
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      host.appendChild(wrapper);
      setHasRenderedAd(true);
      onLoad?.();
    } catch (error) {
      console.error("Failed to render ad:", error);
      setHasRenderedAd(false);
    }
  }, [isClient, inView, consent, id, onLoad, adHtml]);

  // Check if ad actually rendered
  useEffect(() => {
    if (!ref.current) return;
    if (!collapseIfEmpty) return;
    if (consent !== "granted") return;
    if (!isClient) return;

    const host = ref.current;
    const hasVisibleAdMarkup = () =>
      Boolean(host.querySelector("iframe, img, ins, object, embed, script, [data-ad-slot]"));

    const checkVisibility = () => {
      setHasRenderedAd(hasVisibleAdMarkup());
    };

    checkVisibility();
    const observer = new MutationObserver(checkVisibility);
    observer.observe(host, { childList: true, subtree: true });
    const timeout = window.setTimeout(checkVisibility, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [collapseIfEmpty, consent, inView, isClient]);

  // Dynamic styles
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height:
      collapseIfEmpty && inView && consent === "granted" && !hasRenderedAd
        ? "0px"
        : typeof height === "number"
          ? `${height}px`
          : height,
    minHeight:
      collapseIfEmpty && inView && consent === "granted" && !hasRenderedAd ? "0px" : undefined,
    overflow: "hidden",
    isolation: "isolate", // Prevent script breakout
  };

  // Don't render on server
  if (!isClient) {
    return <div ref={ref} className={className} style={style} />;
  }

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={style}
      role="region"
      aria-label="Advertisement"
    />
  );
}
