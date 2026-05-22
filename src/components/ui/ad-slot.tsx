import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { type AdPlacement, getZoneHtml, hasAdProviderConfigured } from "@/lib/ads-config";
import { loadAdProviderScript } from "@/lib/load-ad-provider";
import { useAdsConsent } from "@/lib/use-ads-consent";

type AdSlotProps = {
  id?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  /** RevBid zone HTML from env, or override with custom snippet. */
  placement?: AdPlacement;
  adHtml?: string;
  /** Load as soon as consent is granted (for above-the-fold slots). */
  eager?: boolean;
  onLoad?: () => void;
};

export function AdSlot({
  id,
  className,
  width = "100%",
  height = 90,
  placement,
  adHtml: adHtmlOverride,
  eager = false,
  onLoad,
}: AdSlotProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(eager);
  const consent = useAdsConsent();

  const zoneHtml = placement ? getZoneHtml(placement) : undefined;
  const adHtml = adHtmlOverride ?? zoneHtml;
  const configured = hasAdProviderConfigured();

  useEffect(() => {
    if (eager) {
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
  }, [eager]);

  useEffect(() => {
    if (!inView) return;
    if (consent !== "granted") return;
    loadAdProviderScript();
  }, [inView, consent]);

  useEffect(() => {
    if (!inView) return;
    if (consent !== "granted") return;
    if (!ref.current) return;

    const host = ref.current;
    host.replaceChildren();

    if (adHtml) {
      const cleanHtml = DOMPurify.sanitize(adHtml, {
        ADD_TAGS: ["script", "ins", "iframe", "div"],
        ADD_ATTR: ["async", "defer", "src", "data-zone", "data-ad-slot", "id", "class", "style"],
      });
      host.innerHTML = cleanHtml;
      host.querySelectorAll("script").forEach((oldScript) => {
        const script = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
          script.setAttribute(attr.name, attr.value),
        );
        if (oldScript.textContent) script.textContent = oldScript.textContent;
        oldScript.replaceWith(script);
      });
      onLoad?.();
      return;
    }

    if (placement && configured) {
      const zone = document.createElement("div");
      zone.dataset.revbidPlacement = placement;
      zone.dataset.adSlot = id ?? placement;
      zone.className = "flex h-full min-h-[inherit] w-full items-center justify-center";
      zone.setAttribute("aria-hidden", "true");
      host.appendChild(zone);
      onLoad?.();
    }
  }, [inView, consent, adHtml, placement, configured, id, onLoad]);

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    minHeight: typeof height === "number" ? `${height}px` : undefined,
  };

  const showPlaceholder = inView && consent === "granted" && !adHtml && !configured;

  return (
    <div id={id} className={className} ref={ref} style={style} aria-label="Advertisement">
      {!inView && (
        <div className="h-full w-full animate-pulse rounded-inherit bg-muted" aria-hidden />
      )}

      {inView && consent === null && (
        <div className="flex h-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
          Accept cookies to load ads
        </div>
      )}

      {inView && consent === "denied" && (
        <div className="flex h-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
          Ads disabled
        </div>
      )}

      {showPlaceholder && (
        <div className="flex h-full flex-col items-center justify-center gap-1 p-3 text-center text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">Ad space</span>
          <span>Add RevBid zone HTML in .env — see .env.example</span>
        </div>
      )}
    </div>
  );
}

export default AdSlot;
