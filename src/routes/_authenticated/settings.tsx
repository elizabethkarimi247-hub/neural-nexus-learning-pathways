import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProfileForm } from "@/components/profile-form";
import { useAuth } from "@/hooks/use-auth";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => seo("Edit profile", "Edit your Neural Nexus member profile."),
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  if (!profile) return <div className="p-16 text-center text-muted-foreground">Loading…</div>;
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-semibold">Edit profile</h1>
      <div className="surface mt-8 p-6 md:p-8">
        <ProfileForm submitLabel="Save changes" onDone={() => navigate({ to: "/dashboard" })} />
      </div>
    </div>
  );
}
