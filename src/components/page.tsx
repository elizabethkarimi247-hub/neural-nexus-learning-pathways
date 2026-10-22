import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="grid-bg border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {eyebrow && <p className="text-xs font-medium uppercase tracking-widest text-cyan">{eyebrow}</p>}
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc">{children}</div>;
}

export function ComingSoon({ title, eyebrow, description, items }: { title: string; eyebrow: string; description: string; items: string[] }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title}>{description}</PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="surface p-8">
          <div className="flex items-center gap-2 text-sm text-cyan"><Sparkles className="size-4" /> Opening soon</div>
          <p className="mt-2 max-w-xl text-muted-foreground">This space is being built. Nothing has been published here yet — here's what's coming:</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => <li key={i} className="rounded-lg border border-border bg-background/40 px-4 py-3 text-sm">{i}</li>)}
          </ul>
          <Button asChild variant="hero" className="mt-8"><Link to="/auth" search={{ mode: "signup" }}>Join to get early access</Link></Button>
        </div>
      </div>
    </>
  );
}
