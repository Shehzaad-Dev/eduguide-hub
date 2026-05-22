import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { PLATFORMS } from "@/data/site";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/online-learning")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Best Online Learning Platforms in 2026 | EduGuide" },
      {
        name: "description",
        content:
          "Compare Coursera, edX, Udemy, FutureLearn and more. Find the right platform for your career goals.",
      },
      { property: "og:url", content: "/online-learning" },
    ],
    links: [{ rel: "canonical", href: "/online-learning" }],
  }),
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Online Learning"
        title="The best learning platforms in 2026"
        description="Vetted platforms offering courses, certifications and degrees that boost careers."
      />
      <section className="container-px mx-auto max-w-7xl py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-7 rounded-2xl bg-card border border-border hover:shadow-card hover:border-primary/40 transition"
          >
            <div className="font-display font-bold text-xl text-secondary group-hover:text-primary transition-colors">
              {p.name}
            </div>
            <p className="mt-3 text-muted-foreground">{p.tagline}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Visit platform <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        ))}
      </section>
    </PageShell>
  );
}
