import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { ARTICLES, type Article } from "@/data/articles";
import { Clock, Search } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — Education, Scholarships & Career Insights | EduGuide" },
      { name: "description", content: "Articles on scholarships, study abroad, careers in AI and tech, and online learning. Expert guides for ambitious students." },
      { property: "og:title", content: "EduGuide Blog" },
      { property: "og:description", content: "Expert guides for scholarships, study abroad and careers." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

const CATEGORIES = ["All", "Scholarships", "Study Abroad", "Technology", "Business", "Education"] as const;

function Blog() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = ARTICLES.filter((a: Article) =>
    (cat === "All" || a.category === cat) &&
    (q === "" || a.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Blog"
        title="Guides for Scholarships, Careers & Study Abroad"
        description="In-depth articles updated regularly — written for students navigating global education."
      />
      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 h-12 rounded-xl text-sm font-medium border transition ${
                  cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }}
              className="group p-7 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{a.category}</span>
              <h2 className="mt-3 text-lg font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">{a.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {a.readingTime} min</span>
                <span>{new Date(a.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No articles match your search.</p>
        )}
      </section>
    </PageShell>
  );
}
