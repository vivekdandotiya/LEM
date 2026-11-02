import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/blog/*"], // Disallow sample blog posts until client approves real content
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
