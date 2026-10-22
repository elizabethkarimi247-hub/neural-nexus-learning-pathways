import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/learn")({
  head: () => seo("Learning Hub", "Ordered modules, lessons, exercises and progress tracking."),
  component: () => (
    <ComingSoon eyebrow="Learn" title="Structured paths from Python to LLMs" description="Ordered modules, lessons, exercises and progress tracking." items={['Python for AI', 'Mathematics for ML', 'ML Fundamentals', 'Deep Learning', 'NLP & Computer Vision', 'Generative AI & MLOps']} />
  ),
});
