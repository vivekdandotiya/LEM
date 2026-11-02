export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  isSample: boolean;
  aspect: "large" | "tall" | "wide" | "standard";
  visualType: "web" | "meta" | "social" | "seo";
}

export const projectsData: ProjectItem[] = [
  {
    id: "sample-project-01",
    title: "Aura Architectural Group",
    client: "Sample Client 01",
    category: "Web Development & Digital Identity",
    year: "2025",
    description: "An editorial digital experience built for a premier architecture practice, pairing high-contrast typography with smooth scroll transitions.",
    isSample: true,
    aspect: "large",
    visualType: "web",
  },
  {
    id: "sample-project-02",
    title: "Vanguard Capital Partners",
    client: "Sample Client 02",
    category: "Organic Search & Technical SEO",
    year: "2025",
    description: "Enterprise domain migration and topical clustering that elevated high-intent commercial keywords into top organic search positions.",
    isSample: true,
    aspect: "standard",
    visualType: "seo",
  },
  {
    id: "sample-project-03",
    title: "Maison Solis Fine Jewelry",
    client: "Sample Client 03",
    category: "Meta Advertising & Motion Creative",
    year: "2025",
    description: "Multi-angle motion ad campaigns and server-side conversion architecture delivering qualified prospective clientele.",
    isSample: true,
    aspect: "standard",
    visualType: "meta",
  },
  {
    id: "sample-project-04",
    title: "Kinetic Health & Performance",
    client: "Sample Client 04",
    category: "Social Media Strategy & Creative Direction",
    year: "2024",
    description: "Short-form vertical video series and cohesive editorial grid curation that grew an active community of fitness practitioners.",
    isSample: true,
    aspect: "wide",
    visualType: "social",
  },
];
