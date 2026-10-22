import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of service", "Terms of service — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms of service" />
      <Prose>
        <p>By using Neural Nexus you agree to follow the community guidelines and use the platform lawfully.</p>
<h2>Your content</h2><p>You own what you post. You grant the community permission to display it on the platform.</p>
<h2>Moderation</h2><p>Moderators may remove content or suspend accounts that break the guidelines, with recorded reasons.</p>
<h2>No warranty</h2><p>Learning resources are provided as-is. External resources belong to their original creators.</p>
      </Prose>
    </>
  ),
});
