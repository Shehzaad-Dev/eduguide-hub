export type AdPlacement = "top" | "mid" | "bottom";

export const adsConfig = {
  provider: (import.meta.env.VITE_AD_PROVIDER as string | undefined) ?? "revbid",
  /** Full <script> or <meta> snippet from RevBid dashboard (site verification). */
  headHtml: import.meta.env.VITE_REVBID_HEAD_HTML as string | undefined,
  /** Main header-bidding / tag script URL from RevBid after approval. */
  scriptUrl: import.meta.env.VITE_REVBID_SCRIPT_URL as string | undefined,
  zones: {
    top: import.meta.env.VITE_REVBID_ZONE_TOP_HTML as string | undefined,
    mid: import.meta.env.VITE_REVBID_ZONE_MID_HTML as string | undefined,
    bottom: import.meta.env.VITE_REVBID_ZONE_BOTTOM_HTML as string | undefined,
  },
} as const;

export function getZoneHtml(placement: AdPlacement): string | undefined {
  return adsConfig.zones[placement];
}

export function hasAdProviderConfigured(): boolean {
  return Boolean(
    adsConfig.scriptUrl || adsConfig.zones.top || adsConfig.zones.mid || adsConfig.zones.bottom,
  );
}
