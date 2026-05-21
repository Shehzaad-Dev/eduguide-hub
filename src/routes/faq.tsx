import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — Scholarships, Universities & Courses | EduGuide" },
      { name: "description", content: "Answers to the most common questions about scholarships, study abroad, online courses and careers." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
});

const FAQS = [
  { q: "Is EduGuide free to use?", a: "Yes — all our guides, articles and scholarship listings are completely free." },
  { q: "How often is content updated?", a: "We refresh scholarship listings weekly and update career guides each quarter." },
  { q: "Can I apply to scholarships directly via EduGuide?", a: "We link to the official scholarship portals. Applications happen on the provider's website." },
  { q: "Do you offer one-on-one consulting?", a: "Not yet — we focus on free, high-quality resources accessible to everyone." },
  { q: "Are the online courses you recommend accredited?", a: "We recommend reputable platforms. Accreditation varies by course — we note this in each guide." },
  { q: "How can I contribute or write for EduGuide?", a: "Email us via the contact page — we welcome guest contributions from educators and alumni." },
];

function FAQ() {
  return (
    <PageShell>
      <PageHeader eyebrow="FAQ" title="Frequently asked questions" description="Everything you need to know about EduGuide." />
      <section className="container-px mx-auto max-w-3xl py-16 space-y-3">
        {FAQS.map((f, i) => <Item key={i} {...f} />)}
      </section>
    </PageShell>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
        <span className="font-semibold text-secondary">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}
