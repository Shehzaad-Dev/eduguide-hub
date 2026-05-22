import { adsConfig } from "@/lib/ads-config";

let providerLoadStarted = false;

/** Lazy-load the RevBid (or other) tag script once, after consent. */
export function loadAdProviderScript(): void {
  if (typeof document === "undefined") return;
  if (providerLoadStarted) return;
  if (!adsConfig.scriptUrl) return;

  providerLoadStarted = true;
  const existing = document.querySelector(`script[data-ad-provider="${adsConfig.provider}"]`);
  if (existing) return;

  const script = document.createElement("script");
  script.src = adsConfig.scriptUrl;
  script.async = true;
  script.defer = true;
  script.dataset.adProvider = adsConfig.provider;
  document.head.appendChild(script);
}
