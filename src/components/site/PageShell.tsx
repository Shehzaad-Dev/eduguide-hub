import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import ConsentBanner from "../ui/consent-banner";
import { PageStepper } from "./PageStepper";
import { AdsterraAutoRefreshBanners } from "@/components/ads/adsterra-refresh";
import { SiteTopAd } from "@/components/ads/site-top-ad";
import { RevBidHead } from "@/components/ads/revbid-head";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <RevBidHead />
      <Navbar />
      <SiteTopAd />
      <main className="flex-1">{children}</main>
      <PageStepper />
      <Footer />
      <ConsentBanner />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-soft to-background">
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="container-px mx-auto max-w-7xl py-16 md:py-24 text-center">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-secondary max-w-3xl mx-auto">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
