import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/accessibility")({
  head: () => seo("Accessibility", "Accessibility — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Accessibility" />
      <Prose>
        <p>We aim for an experience that works for everyone: readable contrast, full keyboard navigation, visible focus states and layouts that adapt to any screen.</p>
<p>If something is hard to use, please let the organizers know so we can fix it.</p>
      </Prose>
    </>
  ),
});
