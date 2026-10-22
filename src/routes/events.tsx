import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/events")({
  head: () => seo("Events", "Register for sessions hosted by the community."),
  component: () => (
    <ComingSoon eyebrow="Meet" title="Workshops, talks and hackathons" description="Register for sessions hosted by the community." items={['Upcoming / Past / My events', 'Registration & capacity', 'Agendas & speakers', 'Calendar export', 'Reminders', 'Study groups']} />
  ),
});
