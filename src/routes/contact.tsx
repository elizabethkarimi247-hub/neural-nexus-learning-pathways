import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Contact & feedback — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="Contact" title="Contact & feedback" />
      <Prose>
        <p>Have a question, idea, or want to partner with the community? Official contact channels will be published here by the organizers.</p>
<p>Members can also share feedback in the Discussions forum once it opens.</p>
      </Prose>
    </>
  ),
});
