import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CAREERS } from "@/data/site";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/career-guidance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Career Guidance — High-Paying Careers in 2026 | EduGuide" },
      { name: "description", content: "Explore the fastest-growing, highest-paying careers and the courses that lead to them." },
      { property: "og:url", content: "/career-guidance" },
    ],
    links: [{ rel: "canonical", href: "/career-guidance" }],
  }),
});

function Page() {
  return (
    <PageShell>
      <PageHeader eyebrow="Career Guidance" title="Build a career that compounds over time"
        description="Salary data, growth rates and learning paths for the most in-demand careers." />
      <section className="container-px mx-auto max-w-7xl py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAREERS.map((c) => (
          <article key={c.title} className="p-7 rounded-2xl bg-card border border-border hover:shadow-card transition">
            <TrendingUp className="w-6 h-6 text-accent" />
            <h2 className="mt-4 text-xl font-semibold text-secondary">{c.title}</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-xs text-muted-foreground">Avg. salary</div><div className="font-display font-bold text-primary text-lg">{c.salary}</div></div>
              <div><div className="text-xs text-muted-foreground">Growth</div><div className="font-display font-bold text-accent-foreground text-lg">{c.growth}</div></div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
