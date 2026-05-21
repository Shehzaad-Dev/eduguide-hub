import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  component: Page,
  head: () => ({
    meta: [{ title: "Privacy Policy | EduGuide" }, { name: "description", content: "How EduGuide handles your data and protects your privacy." }],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Page() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: May 2026" />
      <section className="container-px mx-auto max-w-3xl py-16 prose-lg space-y-5 leading-relaxed text-foreground">
        <p>EduGuide respects your privacy. This policy explains what data we collect, how we use it and your rights.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">Information we collect</h2>
        <p>We collect minimal information: email when you subscribe to our newsletter, and anonymized analytics about how visitors use the site.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">How we use it</h2>
        <p>To send weekly scholarship updates (only if you opt in), improve our content and ensure the website runs smoothly.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">Third parties</h2>
        <p>We may display ads from Google AdSense and affiliate links. These third parties may set cookies subject to their own privacy policies.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">Your rights</h2>
        <p>You can unsubscribe from emails at any time, and request deletion of your data by emailing hello@eduguide.com.</p>
      </section>
    </PageShell>
  );
}
