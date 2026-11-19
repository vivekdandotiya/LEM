import { MetadataRoute } from 'next';
import { getBaseUrl, isPreviewDeployment } from '@/data/routes';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  const isPreview = isPreviewDeployment();

  if (isPreview) {
    // In preview / staging environments, prevent search crawlers from indexing
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  // Production crawl directives following search engine best practices
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/__scene/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/__scene/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/__scene/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
