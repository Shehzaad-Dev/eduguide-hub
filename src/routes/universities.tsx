import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { UNIVERSITIES } from "@/data/site";
import { ExternalLink, Globe2 } from "lucide-react";

export const Route = createFileRoute("/universities")({
  component: Universities,
  head: () => ({
    meta: [
      { title: "Top Universities — Harvard, MIT, Oxford & more | EduGuide" },
      { name: "description", content: "Explore the world's top-ranked universities including Harvard, MIT, Stanford, Oxford, Cambridge, ETH Zurich and more." },
      { property: "og:title", content: "Top Universities | EduGuide" },
      { property: "og:description", content: "Global rankings, programs and admissions for the world's best universities." },
      { property: "og:url", content: "/universities" },
    ],
    links: [{ rel: "canonical", href: "/universities" }],
  }),
});

function Universities() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Universities"
        title="The World's Most Prestigious Universities"
        description="Globally ranked institutions with strong international student programs and scholarships."
      />
      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITIES.map((u) => (
            <article key={u.name} className="p-7 rounded-2xl bg-card border border-border hover:shadow-card transition">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 font-display font-bold text-primary shrink-0">
                  {u.rank}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-secondary">{u.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5" /> {u.country}
                  </p>
                </div>
              </div>
              <a href={u.url} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all">
                Visit website <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
