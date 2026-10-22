import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type Profile } from "@/hooks/use-auth";
import { INTERESTS } from "@/lib/site";
import { cn } from "@/lib/utils";

const LEVELS = ["beginner", "intermediate", "advanced"] as const;

export function ProfileForm({ submitLabel, onDone }: { submitLabel: string; onDone: () => void }) {
  const { profile, session, refreshProfile } = useAuth();
  const [f, setF] = useState<Partial<Profile>>({ ...profile });
  const [skills, setSkills] = useState((profile?.skills ?? []).join(", "));
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setF((p) => ({ ...p, [k]: v }));

  const toggleInterest = (i: string) => {
    const cur = f.interests ?? [];
    set("interests", cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setBusy(true);
    const username = f.username?.trim().toLowerCase() || null;
    if (username && !/^[a-z0-9_]{3,24}$/.test(username)) {
      setBusy(false);
      return toast.error("Username: 3–24 lowercase letters, numbers or _");
    }
    const { error } = await supabase.from("profiles").update({
      display_name: f.display_name?.trim() || null,
      username,
      avatar_url: f.avatar_url?.trim() || null,
      bio: f.bio?.trim() || null,
      job_role: f.job_role?.trim() || null,
      experience_level: f.experience_level ?? null,
      interests: f.interests ?? [],
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      github_url: f.github_url?.trim() || null,
      linkedin_url: f.linkedin_url?.trim() || null,
      learning_goals: f.learning_goals?.trim() || null,
      is_public: f.is_public ?? true,
      onboarded: true,
    }).eq("id", session.user.id);
    setBusy(false);
    if (error) return toast.error(error.code === "23505" ? "That username is taken" : error.message);
    await refreshProfile();
    toast.success("Profile saved");
    onDone();
  };

  const field = (k: keyof Profile, label: string, placeholder = "") => (
    <div className="grid gap-1.5">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} placeholder={placeholder} value={(f[k] as string) ?? ""} onChange={(e) => set(k, e.target.value as never)} />
    </div>
  );

  return (
    <form onSubmit={save} className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("display_name", "Display name")}
        {field("username", "Username", "e.g. amina_ml")}
        {field("job_role", "Current role / education", "e.g. 2nd-year CS student")}
        {field("avatar_url", "Profile image URL", "https://…")}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bio">Short bio</Label>
        <Textarea id="bio" rows={3} value={f.bio ?? ""} onChange={(e) => set("bio", e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Experience level</Label>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button type="button" key={l} onClick={() => set("experience_level", l)}
              className={cn("rounded-full border px-4 py-1.5 text-sm capitalize transition-colors", f.experience_level === l ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Label>AI/ML interests</Label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button type="button" key={i} onClick={() => toggleInterest(i)}
              className={cn("rounded-full border px-3 py-1 text-sm transition-colors", f.interests?.includes(i) ? "border-cyan bg-cyan/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
              {i}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="skills">Skills & technologies (comma separated)</Label>
        <Input id="skills" placeholder="Python, PyTorch, pandas" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("github_url", "GitHub URL", "https://github.com/…")}
        {field("linkedin_url", "LinkedIn URL (optional)", "https://linkedin.com/in/…")}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="goals">Learning goals</Label>
        <Textarea id="goals" rows={2} value={f.learning_goals ?? ""} onChange={(e) => set("learning_goals", e.target.value)} />
      </div>
      <label className="flex items-center gap-3 text-sm">
        <Switch checked={f.is_public ?? true} onCheckedChange={(v) => set("is_public", v)} />
        Show my profile in the public member directory
      </label>
      <div className="flex gap-3">
        <Button type="submit" variant="hero" disabled={busy}>{submitLabel}</Button>
      </div>
    </form>
  );
}
