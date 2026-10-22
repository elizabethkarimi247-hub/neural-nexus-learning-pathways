import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/discussions")({
  head: () => seo("Discussions", "Technical discussions, Q&A with accepted answers, and project updates."),
  component: () => (
    <ComingSoon eyebrow="Forum" title="Ask, share and debate AI" description="Technical discussions, Q&A with accepted answers, and project updates." items={['13 topic categories', 'Q&A with accepted answers', 'Code snippets & Markdown', 'Reactions & bookmarks', 'Trending / Unanswered sorting', 'Reporting & moderation']} />
  ),
});
