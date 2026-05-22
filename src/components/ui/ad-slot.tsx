import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

type AdSlotProps = {
  id?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  adHtml?: string;
  onLoad?: () => void;
};

export function AdSlot({
  id,
  className,
  width = "100%",
  height = 90,
  adHtml,
  onLoad,
}: AdSlotProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ads-consent");
    if (stored === "granted" || stored === "denied") setConsent(stored);

    const handler = () => {
      const v = localStorage.getItem("ads-consent");
      if (v === "granted" || v === "denied") setConsent(v);
    };

    window.addEventListener("ads-consent-changed", handler);
    return () => window.removeEventListener("ads-consent-changed", handler);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      {
        rootMargin: "200px",
      },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (consent !== "granted") return;
    if (!ref.current || !adHtml) return;

    const cleanHtml = DOMPurify.sanitize(adHtml);

    ref.current.innerHTML = cleanHtml;
    onLoad?.();
  }, [visible, consent, adHtml, onLoad]);

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    minHeight: typeof height === "number" ? `${height}px` : undefined,
  };

  return (
    <div id={id} className={className} ref={ref} style={style} aria-label="Ad slot">
      {!visible && <div className="bg-muted w-full h-full" />}

      {visible && consent !== "granted" && (
        <div className="text-sm text-muted-foreground p-2">Ad blocked until consent is given.</div>
      )}
    </div>
  );
}

export default AdSlot;
