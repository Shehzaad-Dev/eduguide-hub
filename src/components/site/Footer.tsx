import { Link } from "@tanstack/react-router";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { SITE } from "@/data/site";

const cols = [
  {
    title: "Explore",
    links: [
      { to: "/scholarships", label: "Scholarships" },
      { to: "/universities", label: "Universities" },
      { to: "/courses", label: "Courses" },
      { to: "/study-abroad", label: "Study Abroad" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/career-guidance", label: "Career Guidance" },
      { to: "/online-learning", label: "Online Learning" },
      { to: "/student-resources", label: "Student Resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/services", label: "Services" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/cookie-policy", label: "Cookie Policy" },
      { to: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-elegant">
              <GraduationCap className="w-5 h-5" />
            </span>
            {SITE.name}
          </Link>
          <p className="mt-4 text-sm text-secondary-foreground/70 max-w-sm leading-relaxed">
            {SITE.description}
          </p>
          <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground/50" />
              <input
                type="email"
                placeholder="Your email"
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-4 rounded-lg bg-gradient-to-r from-accent to-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold mb-4 font-display">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-secondary-foreground/60">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
