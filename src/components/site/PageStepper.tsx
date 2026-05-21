import { Link, useRouterState } from "@tanstack/react-router";
import { NAV } from "@/data/site";
import { cn } from "@/lib/utils";

export function PageStepper() {
  const { location } = useRouterState();
  const activeIndex = NAV.findIndex((item) => item.to === location.pathname);
  const currentPage = activeIndex === -1 ? 0 : activeIndex;
  const previous = NAV[currentPage - 1];
  const next = NAV[currentPage + 1];

  return (
    <div className="border-b border-border bg-background/80">
      <div className="container-px mx-auto max-w-7xl py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-xs uppercase tracking-[0.24em] text-primary/80 font-semibold">
              Page navigation
            </span>
            <div className="rounded-full bg-soft px-3 py-1 text-sm text-muted-foreground">
              {currentPage + 1} of {NAV.length}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={previous?.to ?? NAV[0].to}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition",
                previous ? "border-border bg-white/90 text-secondary hover:border-primary/60 hover:bg-primary/10" : "cursor-not-allowed border-border bg-muted text-muted-foreground"
              )}
              aria-disabled={!previous}
            >
              ← Prev
            </Link>

            {NAV.map((item, index) => {
              const isActive = index === currentPage;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 min-w-[44px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
                    isActive
                      ? "bg-primary text-primary-foreground border-transparent shadow-elegant"
                      : "bg-white/90 text-secondary border-border hover:border-primary/60 hover:bg-primary/10"
                  )}
                  aria-label={`Go to page ${index + 1}: ${item.label}`}
                >
                  {index + 1}
                </Link>
              );
            })}

            <Link
              to={next?.to ?? NAV[NAV.length - 1].to}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition",
                next ? "border-border bg-white/90 text-secondary hover:border-primary/60 hover:bg-primary/10" : "cursor-not-allowed border-border bg-muted text-muted-foreground"
              )}
              aria-disabled={!next}
            >
              Next →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
