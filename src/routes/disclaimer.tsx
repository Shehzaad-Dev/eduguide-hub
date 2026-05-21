import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/disclaimer")({
  component: Page,
  head: () => ({
    meta: [{ title: "Disclaimer | EduGuide" }, { name: "description", content: "EduGuide content disclaimer and limitations of advice." }],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
});

function Page() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Disclaimer" description="Last updated: May 2026" />
      <section className="container-px mx-auto max-w-3xl py-16 prose-lg space-y-5 leading-relaxed text-foreground">
        <p>The information on EduGuide is provided for general educational purposes only. While we make every effort to keep listings accurate, scholarships, deadlines, eligibility and university requirements can change at any time.</p>
        <p>Always verify details directly with the official scholarship provider or university before applying. EduGuide is not affiliated with any university or scholarship body unless explicitly stated.</p>
        <p>Some links on this site are affiliate links, meaning we may earn a small commission at no cost to you if you choose to enroll in a course. This helps keep EduGuide free for students.</p>
      </section>
    </PageShell>
  );
}
