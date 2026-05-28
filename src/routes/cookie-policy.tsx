import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageShell";
import AdSlot from "@/components/ui/ad-slot";

export const Route = createFileRoute("/cookie-policy")({
  component: CookiePolicy,
  head: () => ({
    meta: [
      { title: "Cookie Policy — EduGuide" },
      {
        name: "description",
        content: "Our cookie policy explains how EduGuide uses cookies to enhance your browsing experience.",
      },
      { property: "og:title", content: "Cookie Policy — EduGuide" },
      { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
});

function CookiePolicy() {
  return (
    <PageShell>
      <PageHeader
        title="Cookie Policy"
        description="How we use cookies to improve your experience"
      />

      <section className="py-16 bg-background">
        <div className="container-px mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website. They help us
              remember your preferences, analyze how you use EduGuide, and serve relevant advertisements.
            </p>

            <h2>Types of Cookies We Use</h2>

            <h3>1. Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core
              functionality like page navigation and access to secure areas. Without these cookies, the
              website cannot operate effectively.
            </p>
            <ul>
              <li>Session cookies for user authentication</li>
              <li>Preference cookies to remember your choices</li>
              <li>Security cookies to protect against fraud</li>
            </ul>

            <h3>2. Performance Cookies</h3>
            <p>
              We use performance cookies to understand how visitors interact with our website. This helps
              us optimize content and improve user experience.
            </p>
            <ul>
              <li>Analytics cookies to track page views and user behavior</li>
              <li>Load time measurement cookies</li>
              <li>Error tracking cookies</li>
            </ul>

            <h3>3. Advertising & Monetization Cookies</h3>
            <p>
              EduGuide uses advertising networks like RevBid and Adsterra to support free access to
              educational content. These cookies enable:
            </p>
            <ul>
              <li>Personalized ad delivery based on your interests</li>
              <li>Ad performance measurement and reporting</li>
              <li>Fraud detection and prevention</li>
              <li>Frequency capping (limiting ad repetition)</li>
            </ul>

            <h2>Ad Networks & Cookie Usage</h2>

            <h3>RevBid</h3>
            <p>
              RevBid is our primary header-bidding partner. They use cookies to auction ad placements and
              deliver relevant advertisements. Their cookies help ensure you see ads that match your interests
              while helping us maintain quality content.
            </p>

            <h3>Adsterra</h3>
            <p>
              Adsterra provides display banner ads across our site with automatic refresh features. Their
              cookies track impression data, prevent bot activity, and ensure safe monetization practices.
            </p>

            <h3>Effective CPM Network</h3>
            <p>
              We also partner with Effective CPM Network for additional ad inventory. Like all ad networks,
              they use cookies for ad delivery and performance tracking.
            </p>

            <h2>Your Cookie Consent</h2>
            <p>
              When you first visit EduGuide, we show a consent popup before loading advertising
              cookies. You can:
            </p>
            <ul>
              <li>Accept cookies to enable ads and personalized experiences</li>
              <li>Decline cookies (ads will not load)</li>
              <li>Clear cookies at any time using your browser settings</li>
            </ul>

            <AdSlot
              id="cookie-policy-inline-ad"
              placement="mid"
              collapseIfEmpty
              className="mx-auto my-8 overflow-hidden rounded-2xl border border-border bg-card"
              width="100%"
              height={100}
            />

            <h2>Managing Your Cookies</h2>
            <p>Most web browsers allow you to control cookies through settings. You can:</p>
            <ul>
              <li>View cookies stored on your device</li>
              <li>Delete individual cookies or all cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Set your browser to ask before accepting cookies</li>
            </ul>

            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Disabling cookies may affect website functionality and ad delivery.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              EduGuide contains links to external sites. We are not responsible for their cookie practices.
              Please review their privacy policies and cookie notices separately.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our cookie practices, please visit our{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contact page
              </a>{" "}
              or review our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>

            <p className="text-xs text-muted-foreground mt-8">
              Last updated: May 27, 2026
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
