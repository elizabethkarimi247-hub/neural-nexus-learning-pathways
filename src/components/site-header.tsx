import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Brain, LogOut, LayoutDashboard, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/community", label: "Community" },
  { to: "/discussions", label: "Discussions" },
  { to: "/learn", label: "Learning Hub" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/resources", label: "Resources" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session, profile } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const initials = (profile?.display_name ?? "?").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-brand shadow-glow">
            <Brain className="size-5 text-primary-foreground" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold">{SITE.name}</span>
            <span className="block text-[11px] text-muted-foreground">{SITE.institution}</span>
          </span>
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-1 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full" aria-label="Account menu">
                <Avatar className="size-9 border border-border">
                  <AvatarImage src={profile?.avatar_url ?? undefined} />
                  <AvatarFallback className="bg-accent text-xs">{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="truncate">{profile?.display_name ?? session.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}><LayoutDashboard /> Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}><UserCog /> Edit profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/auth">Sign in</Link></Button>
              <Button asChild variant="hero" size="sm"><Link to="/auth" search={{ mode: "signup" }}>Join Community</Link></Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-border px-4 py-3 xl:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
