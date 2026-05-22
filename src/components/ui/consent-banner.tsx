import React, { useEffect, useState } from "react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ads-consent");
    if (!stored) setVisible(true);
    else setConsent(stored);
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
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-8 md:bottom-8">
      <div className="rounded-lg bg-background/95 border border-border p-4 shadow-lg flex flex-col md:flex-row items-center gap-3">
        <div className="flex-1 text-sm text-muted-foreground">
          We use ads (e.g. RevBid) to support EduGuide. Accepting loads ad scripts and cookies for
          monetization. You can clear site data in your browser to reset this choice.
        </div>
        <div className="flex gap-2">
          <button onClick={denyConsent} className="btn btn-ghost">
            Decline
          </button>
          <button onClick={giveConsent} className="btn btn-primary">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;
