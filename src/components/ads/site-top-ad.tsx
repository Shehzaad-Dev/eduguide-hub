import AdSlot from "@/components/ui/ad-slot";

/** Global leaderboard below the navbar — visible on every page. */
export function SiteTopAd() {
  return (
    <section className="border-b border-border bg-soft" aria-label="Advertisement">
      <div className="container-px mx-auto max-w-7xl py-3 md:py-4">
        <AdSlot
          id="site-top-ad"
          placement="top"
          eager
          className="mx-auto rounded-lg overflow-hidden"
          width="100%"
          height={90}
        />
      </div>
    </section>
  );
}
