import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { SCHOLARSHIPS } from "@/data/site";
import { ExternalLink, Award } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  component: Scholarships,
  head: () => ({
    meta: [
      { title: "Scholarships — Fully Funded Opportunities | EduGuide" },
      {
        name: "description",
        content:
          "Browse fully funded scholarships in the USA, UK, Europe and worldwide. Find scholarships for undergraduate, master and PhD students.",
      },
      { property: "og:title", content: "Scholarships — EduGuide" },
      {
        property: "og:description",
        content: "Hand-picked fully funded scholarships for international students.",
      },
      { property: "og:url", content: "/scholarships" },
    ],
    links: [{ rel: "canonical", href: "/scholarships" }],
  }),
});

function Scholarships() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Scholarships"
        title="Fully Funded Scholarships for International Students"
        description="Tuition, stipend and travel covered. Updated weekly with verified opportunities."
      />
      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHOLARSHIPS.map((s) => (
            <article
              key={s.name}
              className="p-7 rounded-2xl bg-card border border-border hover:shadow-card transition flex flex-col"
            >
              <div className="flex items-center justify-between">
                <Award className="w-6 h-6 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground bg-accent/20 px-2 py-1 rounded">
                  {s.funding}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-secondary">{s.name}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground text-xs">Country</dt>
                  <dd className="font-medium">{s.country}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Level</dt>
                  <dd className="font-medium">{s.level}</dd>
                </div>
              </dl>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold hover:shadow-elegant transition"
              >
                Apply now <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
