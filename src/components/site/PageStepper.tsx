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
    <div className="bg-background/0">
      <div className="container-px mx-auto max-w-7xl py-6">
        <div className="flex items-center justify-center gap-4">
          <Link
            to={previous?.to ?? NAV[0].to}
            className={cn(
              "inline-flex items-center justify-center h-10 w-10 rounded-full border transition",
              previous ? "bg-white/90 text-secondary border-border hover:bg-primary/10" : "bg-muted text-muted-foreground cursor-not-allowed border-border"
            )}
            aria-disabled={!previous}
          >
            ←
          </Link>

          <div className="flex items-center gap-2">
            {NAV.map((item, index) => {
              const isActive = index === currentPage;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-10 min-w-[44px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
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
          </div>

          <Link
            to={next?.to ?? NAV[NAV.length - 1].to}
            className={cn(
              "inline-flex items-center justify-center h-10 w-10 rounded-full border transition",
              next ? "bg-white/90 text-secondary border-border hover:bg-primary/10" : "bg-muted text-muted-foreground cursor-not-allowed border-border"
            )}
            aria-disabled={!next}
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
}
