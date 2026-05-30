export type AdPlacement = "top" | "mid" | "bottom";

export const adsConfig = {
  provider: "monetag",
  zones: {
    top: parseInt(import.meta.env.VITE_MONETAG_ZONE_1 || "11076796"),
    mid: parseInt(import.meta.env.VITE_MONETAG_ZONE_2 || "244413"),
    bottom: parseInt(import.meta.env.VITE_MONETAG_ZONE_2 || "244413"),
  },
} as const;

export function getZoneId(placement: AdPlacement): number | undefined {
  return adsConfig.zones[placement];
}

export function hasAdProviderConfigured(): boolean {
  return Boolean(adsConfig.zones.top || adsConfig.zones.mid || adsConfig.zones.bottom);
}
