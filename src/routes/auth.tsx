import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "@lovable.dev/cloud-auth-js/styles.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { seo, SITE } from "@/lib/site";

type Mode = "signin" | "signup" | "forgot";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode } => ({
    mode: s.mode === "signup" || s.mode === "forgot" ? s.mode : undefined,
  }),
  head: () => seo("Sign in", "Sign in or join Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const { session, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session && profile) navigate({ to: profile.onboarded ? "/dashboard" : "/onboarding" });
  }, [session, profile, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/onboarding" } });
        if (error) throw error;
        setSent("Check your inbox to confirm your email, then sign in.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
        if (error) throw error;
        setSent("If that email has an account, a reset link is on its way.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const oauth = async (provider: "google" | "lovable") => {
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/auth" });
    if (r.error) toast.error(r.error.message ?? "Sign-in failed");
  };

  const heading = mode === "signup" ? "Join the community" : mode === "forgot" ? "Reset your password" : "Welcome back";

  return (
    <div className="grid-bg flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="surface w-full max-w-md p-8 shadow-glow">
        <p className="text-xs uppercase tracking-widest text-cyan">{SITE.institution}</p>
        <h1 className="mt-2 text-3xl font-semibold">{heading}</h1>

        {sent ? (
          <p className="mt-6 rounded-lg border border-border bg-background/50 p-4 text-sm">{sent}</p>
        ) : (
          <>
            {mode !== "forgot" && (
              <div className="mt-6 grid gap-2">
                <Button variant="outline" onClick={() => oauth("google")}>Continue with Google</Button>
                <button type="button" className="lovable-auth-button" onClick={() => oauth("lovable")}>Continue with Lovable</button>
                <div className="my-2 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
              </div>
            )}
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {mode !== "forgot" && (
                <div className="grid gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              )}
              <Button type="submit" variant="hero" disabled={busy}>
                {mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
              </Button>
            </form>
          </>
        )}

        <div className="mt-6 flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>
              <button className="hover:text-foreground" onClick={() => { setMode("signup"); setSent(null); }}>New here? Join</button>
              <button className="hover:text-foreground" onClick={() => { setMode("forgot"); setSent(null); }}>Forgot password?</button>
            </>
          ) : (
            <button className="hover:text-foreground" onClick={() => { setMode("signin"); setSent(null); }}>Already a member? Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
