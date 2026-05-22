import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact EduGuide — Get in Touch" },
      {
        name: "description",
        content:
          "Have questions about scholarships, universities or courses? Contact the EduGuide team — we'd love to hear from you.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions, suggestions or partnerships — drop us a message and we'll get back within 48 hours."
      />
      <section className="container-px mx-auto max-w-6xl py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-5">
          {[
            { icon: Mail, title: "Email", text: "hello@eduguide.com" },
            { icon: MessageSquare, title: "Live chat", text: "Mon–Fri, 9am–6pm" },
            { icon: MapPin, title: "Headquarters", text: "London · Berlin · New York" },
          ].map((i) => (
            <div
              key={i.title}
              className="p-6 rounded-2xl bg-soft border border-border flex items-start gap-4"
            >
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                <i.icon className="w-5 h-5" />
              </span>
              <div>
                <div className="font-semibold text-secondary">{i.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{i.text}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="lg:col-span-3 p-8 rounded-2xl bg-card border border-border shadow-card space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Your name" placeholder="Ada Lovelace" />
            <Field label="Email" type="email" placeholder="ada@example.com" />
          </div>
          <Field label="Subject" placeholder="Question about Chevening scholarship" />
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Message</label>
            <textarea
              rows={6}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <button className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition">
            Send message <Send className="w-4 h-4" />
          </button>
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-secondary mb-2">{label}</label>
      <input
        {...rest}
        className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
