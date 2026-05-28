import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { maybeOpenSmartLink } from "@/lib/smart-link";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all border-b",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-border shadow-sm"
          : "bg-background/60 backdrop-blur-sm border-transparent",
      )}
    >
      <nav className="container-px mx-auto max-w-7xl flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-secondary"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-elegant">
            <GraduationCap className="w-5 h-5" />
          </span>
          {SITE.name}
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors hover:bg-soft [&.active]:text-primary [&.active]:bg-primary/5"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/scholarships"
            onClick={maybeOpenSmartLink}
            title="Sponsored offer may open in a new tab"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-shadow"
          >
            Find Scholarships
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-soft"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <ul className="container-px mx-auto max-w-7xl py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground rounded-md hover:bg-soft [&.active]:text-primary [&.active]:bg-primary/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/scholarships"
                onClick={maybeOpenSmartLink}
                title="Sponsored offer may open in a new tab"
                className="block text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold"
              >
                Find Scholarships
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
