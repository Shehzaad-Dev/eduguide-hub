export type AdPlacement = "top" | "mid" | "bottom";

export const adsConfig = {
  provider: "adsterra",
  zones: {
    top: import.meta.env.VITE_ADSTERRA_ZONE_TOP_HTML as string | undefined,
    mid: import.meta.env.VITE_ADSTERRA_ZONE_MID_HTML as string | undefined,
    bottom: import.meta.env.VITE_ADSTERRA_ZONE_BOTTOM_HTML as string | undefined,
  },
} as const;

export function getZoneHtml(placement: AdPlacement): string | undefined {
  return adsConfig.zones[placement];
}

export function hasAdProviderConfigured(): boolean {
  return Boolean(adsConfig.zones.top || adsConfig.zones.mid || adsConfig.zones.bottom);
}
