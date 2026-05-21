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
        <p>The content on EduGuide is intended to provide general educational information to students exploring scholarships, universities and courses. We work to verify information, but program details (deadlines, eligibility, availability) can change without notice.</p>

        <p>Always confirm application requirements and deadlines directly with the official program or university pages before submitting applications. EduGuide is an independent editorial resource and is not formally affiliated with universities unless explicitly stated.</p>

        <p className="font-semibold">Affiliate links & external content</p>
        <p>Where links are affiliate links we may earn a small commission at no extra cost to you; we only recommend providers we trust. External sites have their own terms and privacy policies — please review them before taking action.</p>

        <p>If you rely on content on this site, please treat it as guidance and verify specifics with official sources. If you have concerns about an item listed on EduGuide, contact us at <a className="text-primary" href="mailto:hello@eduguide.com">hello@eduguide.com</a> and we will investigate promptly.</p>

        <p className="mt-6 font-semibold text-secondary">Built for students. Loved by educators.</p>
      </section>
    </PageShell>
  );
}
