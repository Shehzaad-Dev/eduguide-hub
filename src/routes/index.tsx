import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Award,
  GraduationCap,
  Globe2,
  TrendingUp,
  Sparkles,
  BookOpen,
  Star,
  CheckCircle2,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { PageShell } from "@/components/site/PageShell";
import AdSlot from "@/components/ui/ad-slot";
import { SCHOLARSHIPS, UNIVERSITIES, PLATFORMS, CAREERS, TESTIMONIALS } from "@/data/site";
import { ARTICLES } from "@/data/articles";
import heroImg from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "EduGuide — Scholarships, Universities & Online Courses" },
      {
        name: "description",
        content:
          "Find fully funded scholarships, top universities, online certifications and career roadmaps. EduGuide is your trusted gateway to global education.",
      },
      { property: "og:title", content: "EduGuide — Scholarships, Universities & Online Courses" },
      {
        property: "og:description",
        content: "Trusted educational portal helping students study abroad and build careers.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const latest = ARTICLES.slice(0, 3);

  return (
    <PageShell>
      {/* TOP AD */}
      <section className="border-b border-border bg-soft">
        <div className="container-px mx-auto max-w-7xl py-6">
          <AdSlot
            id="homepage-top-ad"
            className="mx-auto rounded-3xl overflow-hidden border border-border bg-card shadow-card"
            width="100%"
            height={120}
            adHtml={`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f8fafc;color:#334155;font-size:16px;">Top ad slot — replace this with your ad provider code</div>`}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -z-10 top-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -z-10 bottom-0 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container-px mx-auto max-w-7xl pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> Trusted by 200k+ students worldwide
            </span>
            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
              Your Gateway to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Global Education
              </span>{" "}
              & Career Success
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover fully funded scholarships, world-class universities, top online platforms and
              career paths — all in one trusted student hub.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col sm:flex-row gap-2 p-2 bg-card rounded-2xl shadow-elegant border border-border max-w-xl"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search scholarships, courses, universities…"
                  className="w-full h-12 pl-11 pr-3 bg-transparent text-sm focus:outline-none"
                  aria-label="Search"
                />
              </div>
              <button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold text-sm shadow-elegant hover:shadow-glow transition">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/scholarships"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition"
              >
                Browse Scholarships <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/study-abroad"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white border border-border text-sm font-semibold hover:bg-soft transition"
              >
                Study Abroad Guide
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "500+", v: "Scholarships" },
                { k: "200+", v: "Universities" },
                { k: "30+", v: "Career Guides" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-3xl font-bold font-display text-secondary">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-3xl -z-10" />
            <img
              src={heroImg}
              alt="International students with books and graduation caps"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-3xl shadow-elegant border border-border"
            />
          </div>
        </div>
      </section>

      {/* MID-PAGE AD */}
      <section className="py-12 bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <AdSlot
            id="homepage-mid-ad"
            className="mx-auto rounded-3xl overflow-hidden border border-border bg-card shadow-card"
            width="100%"
            height={150}
            adHtml={`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f8fafc;color:#334155;font-size:16px;">Mid-page ad slot — replace with your ad provider script</div>`}
          />
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <Section
        eyebrow="Featured Scholarships"
        title="Fully Funded Opportunities Around the World"
        description="Hand-picked scholarships covering tuition, stipend and travel — open to international students."
        ctaTo="/scholarships"
        ctaLabel="See all scholarships"
        icon={Award}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCHOLARSHIPS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent-foreground bg-accent/20 px-2 py-1 rounded">
                  {s.funding}
                </span>
                <span className="text-xs text-muted-foreground">{s.country}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                {s.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.level}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* UNIVERSITIES */}
      <Section
        eyebrow="Top Universities"
        title="Study at the World's Most Prestigious Universities"
        description="Explore admission requirements, programs and student life at globally ranked institutions."
        ctaTo="/universities"
        ctaLabel="Explore universities"
        icon={GraduationCap}
        soft
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {UNIVERSITIES.map((u) => (
            <a
              key={u.name}
              href={u.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all flex gap-4 items-start"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary font-display font-bold text-sm shrink-0">
                {u.rank}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                  {u.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" /> {u.country}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* PLATFORMS */}
      <Section
        eyebrow="Online Learning Platforms"
        title="Learn Anything, From Anywhere"
        description="Vetted platforms with the best courses and certifications for career growth."
        ctaTo="/online-learning"
        ctaLabel="Compare platforms"
        icon={BookOpen}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-gradient-to-br from-soft to-card border border-border hover:border-primary/40 hover:shadow-card transition-all"
            >
              <div className="font-display font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                {p.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Visit platform <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* CAREERS */}
      <Section
        eyebrow="Career Paths"
        title="The Highest-Paying Careers of 2026"
        description="Future-proof careers with strong demand, growth and salary outlook."
        ctaTo="/career-guidance"
        ctaLabel="See full career guide"
        icon={TrendingUp}
        soft
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREERS.map((c) => (
            <div
              key={c.title}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition"
            >
              <h3 className="font-semibold text-secondary text-lg">{c.title}</h3>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Avg. salary</div>
                  <div className="font-display font-bold text-primary">{c.salary}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Growth</div>
                  <div className="font-display font-bold text-accent-foreground">{c.growth}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
              Student Stories
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-secondary">
              Loved by ambitious students everywhere
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="p-7 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="flex gap-0.5 mb-4 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border">
                  <div className="font-semibold text-secondary">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="py-20 md:py-24 bg-soft border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                Latest Articles
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-secondary">
                From the EduGuide blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latest.map((a) => (
              <Link
                key={a.slug}
                to="/blog/$slug"
                params={{ slug: a.slug }}
                className="group p-7 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all flex flex-col"
              >
                <span className="text-xs font-semibold text-primary">{a.category}</span>
                <h3 className="mt-3 text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">
                  {a.excerpt}
                </p>
                <div className="mt-5 text-xs text-muted-foreground">{a.readingTime} min read</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 md:py-28">
        <div className="container-px mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center text-primary-foreground shadow-elegant"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div
              className="absolute inset-0 opacity-30 -z-0"
              style={{
                background: "radial-gradient(circle at 30% 20%, white 0%, transparent 50%)",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold">
                Get weekly scholarship & career updates
              </h2>
              <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">
                Join 50,000+ students. New opportunities every week, straight to your inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-12 px-4 rounded-xl bg-white/15 backdrop-blur border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="h-12 px-6 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition">
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs text-primary-foreground/70 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Free forever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM AD */}
      <section className="py-12 bg-soft border-t border-border">
        <div className="container-px mx-auto max-w-7xl">
          <AdSlot
            id="homepage-bottom-ad"
            className="mx-auto rounded-3xl overflow-hidden border border-border bg-card shadow-card"
            width="100%"
            height={170}
            adHtml={`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f8fafc;color:#334155;font-size:16px;">Bottom ad slot — replace with your ad provider code</div>`}
          />
        </div>
      </section>
    </PageShell>
  );
}

function Section({
  eyebrow,
  title,
  description,
  ctaTo,
  ctaLabel,
  icon: Icon,
  soft,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaTo: string;
  ctaLabel: string;
  icon: ComponentType<{ className?: string }>;
  soft?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`py-20 md:py-24 ${soft ? "bg-soft border-y border-border" : ""}`}>
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
              <Icon className="w-3.5 h-3.5" /> {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-secondary">{title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all whitespace-nowrap"
          >
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
