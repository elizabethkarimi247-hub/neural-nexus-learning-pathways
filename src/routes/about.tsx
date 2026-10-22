import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => seo("About us", "About Neural Nexus — Neural Nexus, the AI & ML community of Mama Ngina University College."),
  component: () => (
    <>
      <PageHeader eyebrow="About" title="About Neural Nexus" />
      <Prose>
        <p>Neural Nexus is the Artificial Intelligence and Machine Learning community of Mama Ngina University College. We bring together students, beginners, developers, researchers and mentors who want to learn AI and build with it.</p>
<h2>Our mission</h2><p>Make AI and ML learning practical, collaborative and accessible to every student — regardless of starting point.</p>
<h2>Our vision</h2><p>A campus where students don't just use AI tools, but understand, build and responsibly shape them.</p>
<h2>Leadership</h2><p>Community leadership details will be published here by the organizers.</p>
      </Prose>
    </>
  ),
});
