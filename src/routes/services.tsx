import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Award, GraduationCap, BookOpen, Briefcase, Globe2, Headphones } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Services — How EduGuide Helps Students | EduGuide" },
      {
        name: "description",
        content:
          "Discover how EduGuide supports students with scholarships, university guidance, online learning and careers.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const SERVICES = [
  {
    icon: Award,
    title: "Scholarship Discovery",
    desc: "Daily-updated database of fully funded scholarships worldwide.",
  },
  {
    icon: GraduationCap,
    title: "University Guidance",
    desc: "Compare admissions, programs and rankings of top universities.",
  },
  {
    icon: BookOpen,
    title: "Course Recommendations",
    desc: "Career-aligned courses from leading online platforms.",
  },
  {
    icon: Briefcase,
    title: "Career Roadmaps",
    desc: "Step-by-step paths into AI, data science, design and more.",
  },
  {
    icon: Globe2,
    title: "Study Abroad Planning",
    desc: "Country guides covering visas, costs and student life.",
  },
  {
    icon: Headphones,
    title: "Student Support",
    desc: "Email support and a growing community of mentors.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Services"
        title="Everything we do for students"
        description="A complete educational support system — free, transparent and built around your goals."
      />
      <section className="container-px mx-auto max-w-7xl py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="p-7 rounded-2xl bg-card border border-border hover:shadow-card transition"
          >
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
              <s.icon className="w-6 h-6" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-secondary">{s.title}</h2>
            <p className="mt-2 text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
