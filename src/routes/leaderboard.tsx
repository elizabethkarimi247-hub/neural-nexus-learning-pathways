import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/leaderboard")({
  head: () => seo("Leaderboard", "Points for approved contributions, badges and monthly recognition."),
  component: () => (
    <ComingSoon eyebrow="Recognition" title="Celebrating real contributions" description="Points for approved contributions, badges and monthly recognition." items={['Contribution points', 'Achievement badges', 'Monthly top contributors', 'Learning streaks', 'Helpful answers', 'Opt-out of public ranking']} />
  ),
});
