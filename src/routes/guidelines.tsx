import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/guidelines")({
  head: () => seo("Community guidelines", "Community guidelines — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="Safety" title="Community guidelines" />
      <Prose>
        <p>We want Neural Nexus to be welcoming, rigorous and kind.</p>
<h2>Be respectful</h2><ul><li>No harassment, hate speech or personal attacks.</li><li>Critique ideas, not people.</li></ul>
<h2>Share responsibly</h2><ul><li>Credit original authors and link sources.</li><li>Don't share copyrighted course material.</li><li>Flag AI-generated content as such.</li></ul>
<h2>Keep it useful</h2><ul><li>No spam, self-promotion floods or misleading opportunities.</li><li>Use the right category and clear titles.</li></ul>
<h2>Reporting</h2><p>Report content that breaks these rules. Moderators review every report and record their decisions. You can contact moderators to appeal.</p>
      </Prose>
    </>
  ),
});
