import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/blog/*", "/__scene/"], // Exclude API, internal recording routes and sample posts
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
