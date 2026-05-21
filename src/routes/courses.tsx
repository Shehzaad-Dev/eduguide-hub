import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CAREERS, PLATFORMS } from "@/data/site";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/courses")({
  component: Courses,
  head: () => ({
    meta: [
      { title: "Courses — Career-Focused Online Programs | EduGuide" },
      { name: "description", content: "Explore career-oriented courses in AI, data science, cybersecurity, design and more. Build skills that lead to high-paying jobs." },
      { property: "og:title", content: "Courses | EduGuide" },
      { property: "og:description", content: "Career-aligned courses across top online learning platforms." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
});

function Courses() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Courses"
        title="Career-Focused Online Courses"
        description="Curated programs across top platforms — designed to land you a job in the world's most in-demand fields."
      />
      <section className="container-px mx-auto max-w-7xl py-16">
        <h2 className="text-2xl font-bold text-secondary mb-8">Browse by career path</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {CAREERS.map((c) => (
            <div key={c.title} className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition">
              <h3 className="font-semibold text-lg text-secondary">{c.title}</h3>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div><div className="text-xs text-muted-foreground">Salary</div><div className="font-display font-bold text-primary">{c.salary}</div></div>
                <div><div className="text-xs text-muted-foreground">Growth</div><div className="font-display font-bold text-accent-foreground">{c.growth}</div></div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-secondary mb-8">Recommended platforms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-soft border border-border hover:border-primary/40 hover:shadow-card transition">
              <div className="font-display font-bold text-lg text-secondary group-hover:text-primary transition-colors">{p.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <ExternalLink className="mt-4 w-4 h-4 text-primary" />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
