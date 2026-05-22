import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Privacy Policy | EduGuide" },
      { name: "description", content: "How EduGuide handles your data and protects your privacy." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Page() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: May 2026" />
      <section className="container-px mx-auto max-w-3xl py-16 prose-lg space-y-5 leading-relaxed text-foreground">
        <p>
          EduGuide is committed to protecting your privacy. We collect only the information
          necessary to provide the services on this site and to improve the experience for students
          and educators.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-8">Information we collect</h2>
        <p>We collect:</p>
        <ul>
          <li>Email addresses you provide when subscribing to newsletter updates.</li>
          <li>
            Anonymous analytics data (page views, referral, device type) to help us improve content
            and performance.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-secondary mt-8">Cookies & third parties</h2>
        <p>
          We use cookies and may work with third-party services (ad networks, analytics providers,
          affiliate partners). Those services may set cookies under their own policies — please
          review their privacy notices for details.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-8">How we use your data</h2>
        <p>
          We use data to deliver newsletter content you subscribe to, personalize content, detect
          misuse, and improve the site. We do not sell personal data.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-8">Security and retention</h2>
        <p>
          We take standard technical measures to protect data. We retain personal data only as long
          as necessary to provide the service or as required by law.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-8">Your rights</h2>
        <p>
          You may unsubscribe at any time from our emails and you can request access, correction or
          deletion of your personal data by emailing{" "}
          <a className="text-primary" href="mailto:hello@eduguide.com">
            hello@eduguide.com
          </a>
          . We will respond promptly.
        </p>

        <p className="mt-8 font-semibold text-secondary">Built for students. Loved by educators.</p>
      </section>
    </PageShell>
  );
}
