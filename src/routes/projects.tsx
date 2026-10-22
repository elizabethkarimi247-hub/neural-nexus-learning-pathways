import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/projects")({
  head: () => seo("Projects", "Showcase work, recruit collaborators and track milestones."),
  component: () => (
    <ComingSoon eyebrow="Build" title="Build real AI projects together" description="Showcase work, recruit collaborators and track milestones." items={['Project showcase', 'Recruiting & applications', 'Milestones & updates', 'Beginner-friendly filter', 'GitHub & demo links', 'Stars & feedback']} />
  ),
});
