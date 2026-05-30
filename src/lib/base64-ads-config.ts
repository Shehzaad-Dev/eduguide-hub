/**
 * Base64 decoding utility for ad scripts
 * Safely decodes Base64 environment variables to HTML
 */

export function decodeBase64(encoded: string): string {
  try {
    if (!encoded) return "";
    return atob(encoded);
  } catch (error) {
    console.error("Failed to decode Base64 ad script:", error);
    return "";
  }
}

export function isBase64Encoded(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

export type AdPlacement = "top" | "mid" | "bottom";

export const adsConfig = {
  provider: "monetag",
  // If you ever switch back to ad networks with HTML scripts,
  // set these to Base64 encoded versions and they'll auto-decode
  zones: {
    top: import.meta.env.VITE_AD_ZONE_TOP_B64
      ? decodeBase64(import.meta.env.VITE_AD_ZONE_TOP_B64)
      : undefined,
    mid: import.meta.env.VITE_AD_ZONE_MID_B64
      ? decodeBase64(import.meta.env.VITE_AD_ZONE_MID_B64)
      : undefined,
    bottom: import.meta.env.VITE_AD_ZONE_BOTTOM_B64
      ? decodeBase64(import.meta.env.VITE_AD_ZONE_BOTTOM_B64)
      : undefined,
  },
} as const;

export function getAdHtml(placement: AdPlacement): string | undefined {
  return adsConfig.zones[placement];
}

export function hasAdProviderConfigured(): boolean {
  return Boolean(adsConfig.zones.top || adsConfig.zones.mid || adsConfig.zones.bottom);
}
