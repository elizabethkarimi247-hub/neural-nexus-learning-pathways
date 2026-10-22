export const SITE = {
  name: "Neural Nexus",
  institution: "Mama Ngina University College",
  fullName: "Neural Nexus · Mama Ngina University College",
  tagline: "The AI & Machine Learning community of Mama Ngina University College.",
};

export const pageTitle = (page?: string) =>
  page ? `${page} — ${SITE.fullName}` : `${SITE.fullName} — AI & ML Community`;

export const seo = (page: string | undefined, description: string) => {
  const title = pageTitle(page);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
};

export const INTERESTS = [
  "Machine Learning", "Deep Learning", "Generative AI", "NLP", "Computer Vision",
  "Data Science", "MLOps", "Robotics", "AI Ethics", "Research",
];
