import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const cols = [
  { title: "Community", links: [["/about", "About us"], ["/guidelines", "Community guidelines"], ["/faq", "FAQ"], ["/contact", "Contact"]] },
  { title: "Explore", links: [["/discussions", "Discussions"], ["/learn", "Learning Hub"], ["/projects", "Projects"], ["/events", "Events"]] },
  { title: "Legal", links: [["/privacy", "Privacy policy"], ["/terms", "Terms of service"], ["/accessibility", "Accessibility"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">{SITE.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.links.map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-muted-foreground hover:text-foreground">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.fullName}
      </p>
    </footer>
  );
}
