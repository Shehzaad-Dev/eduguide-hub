import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ads-consent");
    if (!stored) {
      // Auto-grant consent on first visit for seamless experience
      localStorage.setItem("ads-consent", "granted");
      window.dispatchEvent(new Event("ads-consent-changed"));
      setConsent("granted");
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    } else {
      setConsent(stored);
    }
  }, []);

  const giveConsent = () => {
    localStorage.setItem("ads-consent", "granted");
    window.dispatchEvent(new Event("ads-consent-changed"));
    setConsent("granted");
    setVisible(false);
  };

  const denyConsent = () => {
    localStorage.setItem("ads-consent", "denied");
    window.dispatchEvent(new Event("ads-consent-changed"));
    setConsent("denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto bg-gradient-to-r from-primary/90 to-primary/80 backdrop-blur-sm text-white p-3 md:p-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 justify-between">
        <div className="flex-1 text-xs md:text-sm leading-relaxed">
          <p className="font-medium mb-1">We use cookies & ads to improve your experience.</p>
          <p className="opacity-90">
            By continuing, you accept our{" "}
            <Link
              to="/privacy"
              className="underline hover:opacity-100 transition-opacity font-medium"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              to="/cookie-policy"
              className="underline hover:opacity-100 transition-opacity font-medium"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={denyConsent}
            className="px-3 py-1.5 rounded text-xs font-medium bg-white/20 hover:bg-white/30 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={giveConsent}
            className="px-3 py-1.5 rounded text-xs font-medium bg-white/90 text-primary hover:bg-white transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => setVisible(false)}
            className="p-1 hover:bg-white/10 transition-colors rounded"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;
