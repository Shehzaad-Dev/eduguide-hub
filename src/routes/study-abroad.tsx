import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Globe2 } from "lucide-react";

export const Route = createFileRoute("/study-abroad")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Study Abroad — Complete Country Guides | EduGuide" },
      {
        name: "description",
        content:
          "Step-by-step guides for studying in the USA, UK, Germany, Canada and more. Costs, visas, top universities and student life.",
      },
      { property: "og:url", content: "/study-abroad" },
    ],
    links: [{ rel: "canonical", href: "/study-abroad" }],
  }),
});

const COUNTRIES = [
  {
    name: "United States",
    flag: "🇺🇸",
    desc: "Top universities, vibrant campus life and the world's largest scholarship pool.",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    desc: "Three-year degrees, post-study work visa and globally respected institutions.",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    desc: "Tuition-free public universities and world-leading engineering programs.",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    desc: "Affordable, welcoming and a clear path to permanent residency.",
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    desc: "English-taught programs and strong industry-academia links.",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    desc: "Eight Group of Eight universities and excellent post-study work rights.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Study Abroad"
        title="Choose the right country for your dream degree"
        description="Honest, in-depth country guides written by students and educators who've been there."
      />
      <section className="container-px mx-auto max-w-7xl py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COUNTRIES.map((c) => (
          <article
            key={c.name}
            className="p-7 rounded-2xl bg-card border border-border hover:shadow-card transition"
          >
            <div className="text-4xl">{c.flag}</div>
            <h2 className="mt-4 text-xl font-semibold text-secondary flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-primary" /> {c.name}
            </h2>
            <p className="mt-3 text-muted-foreground">{c.desc}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
