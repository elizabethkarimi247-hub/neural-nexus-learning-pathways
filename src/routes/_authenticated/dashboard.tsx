import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, MessageSquare, FolderGit2, CalendarDays, Bell, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => seo("Dashboard", "Your personal Neural Nexus dashboard."),
  component: Dashboard,
});

function Dashboard() {
  const { profile } = useAuth();
  if (!profile) return <div className="p-16 text-center text-muted-foreground">Loading…</div>;

  const fields = [profile.display_name, profile.username, profile.avatar_url, profile.bio, profile.job_role, profile.experience_level, profile.interests.length, profile.skills.length, profile.github_url, profile.learning_goals];
  const pct = Math.round((fields.filter(Boolean).length / fields.length) * 100);

  const cards = [
    { icon: MessageSquare, title: "Recommended discussions", to: "/discussions", empty: "The forum opens soon. Your interests will shape what you see here." },
    { icon: BookOpen, title: "Learning progress", to: "/learn", empty: profile.experience_level === "beginner" ? "Start with Python for AI when the Learning Hub opens." : "Pick a pathway when the Learning Hub opens." },
    { icon: CalendarDays, title: "Upcoming events", to: "/events", empty: "No events published yet." },
    { icon: FolderGit2, title: "Your projects", to: "/projects", empty: "You haven't joined any projects yet." },
    { icon: Bookmark, title: "Saved items", to: "/resources", empty: "Bookmarks you save will appear here." },
    { icon: Bell, title: "Notifications", to: "/dashboard", empty: "You're all caught up." },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="surface flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="text-3xl font-semibold">{profile.display_name ?? "Member"}</h1>
          {profile.interests.length > 0 && <p className="mt-2 text-sm text-muted-foreground">Into {profile.interests.slice(0, 3).join(", ")}</p>}
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-2 flex justify-between text-sm"><span>Profile completion</span><span className="text-cyan">{pct}%</span></div>
          <Progress value={pct} />
          {pct < 100 && <Button asChild variant="link" className="mt-1 px-0"><Link to="/settings">Complete your profile →</Link></Button>}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, title, to, empty }) => (
          <Link key={title} to={to} className="surface group p-6 transition-shadow hover:shadow-glow">
            <Icon className="size-5 text-cyan" />
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{empty}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
