import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/community")({
  head: () => seo("Community", "A searchable directory of students, mentors and researchers at Mama Ngina University College."),
  component: () => (
    <ComingSoon eyebrow="Members" title="Meet the people of Neural Nexus" description="A searchable directory of students, mentors and researchers at Mama Ngina University College." items={['Member directory with filters', 'Public profiles & badges', 'Follow members', 'Member spotlights', 'Skill & interest search', 'Privacy-first profile controls']} />
  ),
});
