import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/resources")({
  head: () => seo("Resources", "External resources clearly attributed to their creators."),
  component: () => (
    <ComingSoon eyebrow="Library" title="Curated tools, datasets and papers" description="External resources clearly attributed to their creators." items={['Official documentation', 'Open datasets', 'Research papers', 'GitHub repositories', 'Free courses', 'Opportunities board']} />
  ),
});
