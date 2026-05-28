const SMART_LINK_URL =
  "https://www.effectivecpmnetwork.com/pn466aiwkn?key=1ca04b32e719df4207d5b03e53f0709c";
const SMART_LINK_COOLDOWN_MS = 3 * 60 * 1000;
const STORAGE_KEY = "smart-link-last-opened-at";

/** Opens smart-link in a controlled cooldown window to avoid spam. */
export function maybeOpenSmartLink() {
  if (typeof window === "undefined") return;

  const lastOpenedAtRaw = localStorage.getItem(STORAGE_KEY);
  const lastOpenedAt = lastOpenedAtRaw ? Number(lastOpenedAtRaw) : 0;
  const now = Date.now();

  if (Number.isFinite(lastOpenedAt) && now - lastOpenedAt < SMART_LINK_COOLDOWN_MS) {
    return;
  }

  const popup = window.open(SMART_LINK_URL, "_blank", "noopener,noreferrer");
  if (popup) {
    localStorage.setItem(STORAGE_KEY, String(now));
  }
}
