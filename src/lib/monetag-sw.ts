/**
 * Monetag Service Worker Registration
 * This module handles the registration and management of the Monetag service worker
 */

export function registerMonetag() {
  // Only register service worker in production or when explicitly enabled
  if (typeof window === "undefined") return; // Skip SSR

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Monetag Service Worker registered successfully:", registration);
        })
        .catch((error) => {
          console.warn("Monetag Service Worker registration failed:", error);
        });
    });
  }
}

/**
 * Initialize Monetag settings
 * These settings should be configured in your environment variables
 */
export const monetagConfig = {
  domain: import.meta.env.VITE_MONETAG_DOMAIN || "5gvci.com",
  zoneId: parseInt(import.meta.env.VITE_MONETAG_ZONE_ID || "11076770"),
  enabled: import.meta.env.VITE_MONETAG_ENABLED === "true",
};

export default registerMonetag;
