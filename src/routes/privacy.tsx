import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy policy", "Privacy policy — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <Prose>
        <p>This policy explains what we collect and why.</p>
<h2>What we collect</h2><ul><li>Account details: your email and sign-in information.</li><li>Profile details you choose to add (name, bio, skills, links).</li></ul>
<h2>How we use it</h2><ul><li>To run your account and personalize your dashboard.</li><li>We never sell your data and never show your email publicly.</li></ul>
<h2>Your choices</h2><p>You can edit your profile, make it private, or request account deletion at any time.</p>
      </Prose>
    </>
  ),
});
