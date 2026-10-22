import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ", "Frequently asked questions — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="Help" title="Frequently asked questions" />
      <Prose>
        <h2>Who can join?</h2><p>Anyone interested in AI and ML — students of Mama Ngina University College in particular. No prior experience required.</p>
<h2>Is it free?</h2><p>Yes.</p>
<h2>I'm a complete beginner. Where do I start?</h2><p>Create an account, pick "Beginner" during onboarding, and follow the Python for AI pathway once the Learning Hub opens.</p>
<h2>Can I hide my profile?</h2><p>Yes. In your profile settings you can make your profile private. Your email is never shown publicly.</p>
      </Prose>
    </>
  ),
});
