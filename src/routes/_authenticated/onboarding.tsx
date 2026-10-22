import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/profile-form";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => seo("Welcome", "Set up your Neural Nexus member profile."),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const { session, profile, refreshProfile } = useAuth();
  const skip = async () => {
    if (session) await supabase.from("profiles").update({ onboarded: true }).eq("id", session.user.id);
    await refreshProfile();
    navigate({ to: "/dashboard" });
  };
  if (!profile) return <div className="p-16 text-center text-muted-foreground">Loading…</div>;
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-cyan">Step 1 of 1</p>
      <h1 className="mt-2 text-3xl font-semibold">Tell us about yourself</h1>
      <p className="mt-2 text-muted-foreground">Everything is optional — you can edit it later.</p>
      <div className="surface mt-8 p-6 md:p-8">
        <ProfileForm submitLabel="Finish setup" onDone={() => navigate({ to: "/dashboard" })} />
      </div>
      <Button variant="ghost" className="mt-4" onClick={skip}>Skip for now</Button>
    </div>
  );
}
