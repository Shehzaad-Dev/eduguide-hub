import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { BookOpen, FileText, Calculator, Languages, Lightbulb, Users } from "lucide-react";

export const Route = createFileRoute("/student-resources")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Student Resources — Free Tools & Guides | EduGuide" },
      { name: "description", content: "Free tools, study guides, application templates and resources for students worldwide." },
      { property: "og:url", content: "/student-resources" },
    ],
    links: [{ rel: "canonical", href: "/student-resources" }],
  }),
});

const RES = [
  { icon: FileText, title: "Essay Templates", desc: "Sample SOPs, scholarship essays and personal statements." },
  { icon: Calculator, title: "Cost Calculators", desc: "Estimate the total cost of studying abroad by country." },
  { icon: Languages, title: "IELTS / TOEFL Prep", desc: "Free resources to boost your English proficiency score." },
  { icon: BookOpen, title: "Study Techniques", desc: "Science-backed methods to learn faster and retain more." },
  { icon: Lightbulb, title: "Career Quizzes", desc: "Discover careers that match your strengths and interests." },
  { icon: Users, title: "Mentor Network", desc: "Connect with alumni and current students worldwide." },
];

function Page() {
  return (
    <PageShell>
      <PageHeader eyebrow="Resources" title="Everything you need, in one place"
        description="Templates, calculators and guides to power every step of your student journey." />
      <section className="container-px mx-auto max-w-7xl py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {RES.map((r) => (
          <div key={r.title} className="p-7 rounded-2xl bg-card border border-border hover:shadow-card transition">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-primary/10 text-primary"><r.icon className="w-6 h-6" /></span>
            <h2 className="mt-5 text-lg font-semibold text-secondary">{r.title}</h2>
            <p className="mt-2 text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
