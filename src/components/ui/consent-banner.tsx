import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ads-consent");
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const giveConsent = () => {
    localStorage.setItem("ads-consent", "granted");
    window.dispatchEvent(new Event("ads-consent-changed"));
    setVisible(false);
  };

  const denyConsent = () => {
    localStorage.setItem("ads-consent", "denied");
    window.dispatchEvent(new Event("ads-consent-changed"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-5 shadow-2xl md:p-6">
        <div className="text-sm md:text-base leading-relaxed">
          <p className="font-semibold text-secondary">Cookie & Ad Consent</p>
          <p className="mt-2 text-muted-foreground">
            We use cookies and ad technologies to personalize content and keep this website free.
            Please choose your preference.
          </p>
          <p className="mt-2 text-muted-foreground">
            Read our{" "}
            <Link to="/privacy" className="underline font-medium text-primary">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/cookie-policy" className="underline font-medium text-primary">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={denyConsent}
            className="h-10 rounded-lg border border-border px-4 text-sm font-medium text-foreground hover:bg-soft transition-colors"
          >
            Decline
          </button>
          <button
            onClick={giveConsent}
            className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Accept & Continue
          </button>
          <button
            onClick={() => setVisible(false)}
            className="ml-auto p-1 text-muted-foreground hover:text-foreground transition-colors rounded"
            aria-label="Close consent popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;
