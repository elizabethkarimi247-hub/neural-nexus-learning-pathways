import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Users, MessagesSquare, CalendarDays, FlaskConical, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { seo, SITE } from "@/lib/site";
import hero from "@/assets/hero-network.jpg";

export const Route = createFileRoute("/")({
  head: () => seo(undefined, "Learn AI. Build Intelligence. Shape the Future. The AI & Machine Learning community of Mama Ngina University College."),
  component: Index,
});

const WHAT = [
  { icon: GraduationCap, t: "AI & ML learning", d: "Structured paths from first Python script to deployed models." },
  { icon: Users, t: "Collaborative projects", d: "Form teams, find collaborators, ship real work." },
  { icon: MessagesSquare, t: "Technical discussions", d: "Ask questions, share tutorials, debate papers." },
  { icon: CalendarDays, t: "Workshops & events", d: "Talks, hackathons and study groups on campus and online." },
  { icon: FlaskConical, t: "Research & innovation", d: "Read, reproduce and discuss current research." },
  { icon: Compass, t: "Mentorship & careers", d: "Guidance from peers and mentors who've been there." },
];

const PATHS = ["Python for AI", "Mathematics for ML", "ML Fundamentals", "Deep Learning", "Natural Language Processing", "Computer Vision", "Generative AI & LLMs", "MLOps & Deployment"];

function Index() {
  const { data: stats } = useQuery({
    queryKey: ["community-stats"],
    queryFn: async () => {
      const { data } = await supabase.rpc("community_stats");
      return data as { members: number } | null;
    },
  });
  const members = stats?.members ?? 0;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img src={hero} alt="" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 md:py-36">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-cyan" /> {SITE.institution}
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">
            Learn AI. <span className="text-gradient">Build Intelligence.</span> Shape the Future.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {SITE.name} is where students, builders and researchers learn machine learning together — through shared projects, honest discussion and hands-on workshops.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/auth" search={{ mode: "signup" }}>Join the Community</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/projects">Explore Projects</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="surface grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-center">
          {members > 0 ? (
            <div>
              <p className="font-display text-5xl font-semibold text-gradient">{members}</p>
              <p className="mt-1 text-muted-foreground">{members === 1 ? "member has" : "members have"} joined so far. Projects, events and resources open next.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold">We're just getting started</h2>
              <p className="mt-1 text-muted-foreground">Be one of the founding members and help shape what this community becomes.</p>
            </div>
          )}
          <Button asChild variant="hero"><Link to="/auth" search={{ mode: "signup" }}>Become a member <ArrowRight /></Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-semibold">What we do</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT.map(({ icon: Icon, t, d }) => (
            <div key={t} className="surface p-6 transition-shadow hover:shadow-glow">
              <span className="grid size-10 place-items-center rounded-lg bg-accent"><Icon className="size-5 text-cyan" /></span>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Learning pathways</h2>
            <p className="mt-2 text-muted-foreground">Beginner-friendly tracks, from the basics to production ML.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/learn">View the Learning Hub <ArrowRight /></Link></Button>
        </div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p, i) => (
            <li key={p} className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4">
              <span className="font-mono text-sm text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium">{p}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
