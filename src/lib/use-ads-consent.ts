import { useEffect, useState } from "react";

export type AdsConsent = "granted" | "denied" | null;

export function readAdsConsent(): AdsConsent {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("ads-consent");
  if (stored === "granted" || stored === "denied") return stored;
  return null;
}

export function useAdsConsent(): AdsConsent {
  const [consent, setConsent] = useState<AdsConsent>(null);

  useEffect(() => {
    setConsent(readAdsConsent());

    const handler = () => setConsent(readAdsConsent());
    window.addEventListener("ads-consent-changed", handler);
    return () => window.removeEventListener("ads-consent-changed", handler);
  }, []);

  return consent;
}
