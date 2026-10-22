import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/reset-password")({
  head: () => seo("Reset password", "Set a new password for your Neural Nexus account."),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    navigate({ to: "/dashboard" });
  };
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form onSubmit={submit} className="surface grid w-full max-w-md gap-4 p-8">
        <h1 className="text-2xl font-semibold">Choose a new password</h1>
        <div className="grid gap-1.5">
          <Label htmlFor="pw">New password</Label>
          <Input id="pw" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button variant="hero" type="submit">Update password</Button>
      </form>
    </div>
  );
}
