import AdSlot from "@/components/ui/ad-slot";

/** Global leaderboard below the navbar — visible on every page. */
export function SiteTopAd() {
  const SMART_LINK_URL =
    "https://www.effectivecpmnetwork.com/pn466aiwkn?key=1ca04b32e719df4207d5b03e53f0709c";

  return (
    <section className="border-b border-border bg-soft" aria-label="Advertisement">
      <div className="container-px mx-auto max-w-7xl py-3 md:py-4 grid gap-3">
        <AdSlot
          id="site-top-ad"
          placement="top"
          eager
          collapseIfEmpty
          className="mx-auto rounded-lg overflow-hidden"
          width="100%"
          height={90}
        />

        <div className="grid gap-3 lg:grid-cols-[1fr,auto]">
          <AdSlot
            id="site-top-ad-2"
            placement="top"
            eager
            collapseIfEmpty
            className="mx-auto rounded-lg overflow-hidden"
            width="100%"
            height={60}
          />

          <a
            href={SMART_LINK_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Open Smart Link Offer
          </a>
        </div>
      </div>
    </section>
  );
}
