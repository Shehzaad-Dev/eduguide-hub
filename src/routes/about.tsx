import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Target, Heart, Globe2, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About EduGuide — Our Mission for Global Education" },
      {
        name: "description",
        content:
          "EduGuide is a trusted educational portal helping students worldwide find scholarships, universities, courses and careers.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  {
    icon: Target,
    title: "Student-first",
    text: "Every guide is written for real students with real goals.",
  },
  {
    icon: Heart,
    title: "Trusted information",
    text: "We verify every scholarship, deadline and program detail.",
  },
  {
    icon: Globe2,
    title: "Globally minded",
    text: "Opportunities from 50+ countries, covered honestly.",
  },
  {
    icon: Users,
    title: "Community-driven",
    text: "Built with feedback from 200k+ students worldwide.",
  },
];

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About Us"
        title="Empowering students to access world-class education"
        description="EduGuide is on a mission to make global education opportunities accessible, transparent and achievable for every ambitious student."
      />
      <section className="container-px mx-auto max-w-5xl py-16 space-y-12">
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="p-7 rounded-2xl bg-card border border-border">
              <v.icon className="w-7 h-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-secondary">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="prose-lg space-y-5 text-foreground leading-relaxed">
          <h2 className="text-2xl font-bold text-secondary">Our story</h2>
          <p>
            EduGuide started with a simple belief: every student deserves clear, honest guidance
            about their future. Today, we serve hundreds of thousands of students with curated
            scholarships, university comparisons, online learning recommendations and career
            roadmaps.
          </p>
          <p>
            We work directly with educators, scholarship alumni and industry professionals to
            publish content that genuinely helps — not generic listicles. Whether you're chasing a
            fully funded master's in Germany or your first job in AI, we're here to guide you.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
