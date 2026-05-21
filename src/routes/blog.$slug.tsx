import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ARTICLES } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.title} | EduGuide` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${a.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          author: { "@type": "Organization", name: a.author },
          datePublished: a.date,
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
      </div>
    </PageShell>
  ),
  component: Post,
});

function Post() {
  const { article } = Route.useLoaderData();
  const related = ARTICLES.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="container-px mx-auto max-w-3xl py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          {article.category}
        </span>
        <h1 className="mt-5 text-4xl md:text-5xl font-bold text-secondary leading-tight">{article.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground border-y border-border py-4">
          <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" /> {article.author}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(article.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readingTime} min read</span>
        </div>

        <div className="prose-lg mt-10 space-y-6 text-foreground leading-relaxed">
          <p>{article.excerpt} In this comprehensive guide, the EduGuide editorial team breaks down everything ambitious students need to know in 2026 — eligibility, deadlines, application strategy, and the long-term career impact.</p>
          <h2 className="text-2xl font-bold text-secondary mt-10">Why this matters</h2>
          <p>Choosing the right opportunity early in your academic journey can shape the next decade of your career. Whether you're applying for a fully funded scholarship or selecting a high-ROI online certification, the right decision compounds over time.</p>
          <h2 className="text-2xl font-bold text-secondary mt-10">Key requirements</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Strong academic record (GPA 3.0+ typically required)</li>
            <li>Clear statement of purpose tied to long-term goals</li>
            <li>Two to three professional or academic references</li>
            <li>Demonstrated English proficiency (IELTS, TOEFL, or equivalent)</li>
            <li>Evidence of leadership, community impact or research</li>
          </ul>
          <h2 className="text-2xl font-bold text-secondary mt-10">Application timeline</h2>
          <p>Most programs open applications 9–12 months before the academic year begins. Start gathering documents, drafting essays and contacting referees at least six months in advance.</p>
          <h2 className="text-2xl font-bold text-secondary mt-10">Career outlook</h2>
          <p>Graduates report significant salary uplift and faster promotion. According to recent labour-market data, candidates with relevant credentials earn 25–40% more within five years compared to peers without.</p>
          <h2 className="text-2xl font-bold text-secondary mt-10">Frequently asked questions</h2>
          <div className="space-y-4">
            <details className="p-5 rounded-xl bg-soft border border-border">
              <summary className="font-semibold cursor-pointer">Is this opportunity open to international students?</summary>
              <p className="mt-3 text-muted-foreground">Yes — eligibility is global for most programs covered in this guide. Specific country quotas may apply.</p>
            </details>
            <details className="p-5 rounded-xl bg-soft border border-border">
              <summary className="font-semibold cursor-pointer">How competitive is the selection process?</summary>
              <p className="mt-3 text-muted-foreground">Acceptance rates vary widely — from under 5% for elite programs to 30%+ for niche scholarships. Strong essays make the biggest difference.</p>
            </details>
            <details className="p-5 rounded-xl bg-soft border border-border">
              <summary className="font-semibold cursor-pointer">Do I need work experience?</summary>
              <p className="mt-3 text-muted-foreground">Most undergraduate programs do not require it. Many graduate programs prefer 1–3 years of relevant experience.</p>
            </details>
          </div>
        </div>

        {/* Article previous / next navigation */}
        {(() => {
          const idx = ARTICLES.findIndex((a) => a.slug === article.slug);
          const prev = ARTICLES[idx - 1];
          const next = ARTICLES[idx + 1];
          return (
            <nav className="mt-12 flex items-center justify-center gap-6">
              {prev ? (
                <Link to="/blog/$slug" params={{ slug: prev.slug }}
                  className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm font-semibold hover:bg-primary/10"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">←</span>
                  <div className="text-left">
                    <div className="text-[11px] text-muted-foreground">Previous</div>
                    <div className="font-semibold text-secondary line-clamp-1">{prev.title}</div>
                  </div>
                </Link>
              ) : (
                <div className="w-40" />
              )}

              {next ? (
                <Link to="/blog/$slug" params={{ slug: next.slug }}
                  className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm font-semibold hover:bg-primary/10"
                >
                  <div className="text-right">
                    <div className="text-[11px] text-muted-foreground">Next</div>
                    <div className="font-semibold text-secondary line-clamp-1">{next.title}</div>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">→</span>
                </Link>
              ) : (
                <div className="w-40" />
              )}
            </nav>
          );
        })()}

        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-secondary mb-8">Related articles</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }}
                  className="group p-5 rounded-2xl bg-card border border-border hover:shadow-card transition">
                  <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{r.readingTime} min read</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageShell>
  );
}
