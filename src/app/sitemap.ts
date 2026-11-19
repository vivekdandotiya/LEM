import { MetadataRoute } from 'next';
import { getBaseUrl, getIndexableRoutes } from '@/data/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const indexableRoutes = getIndexableRoutes();

  return indexableRoutes.map((route) => ({
    url: route.path === '/' ? `${baseUrl}` : `${baseUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
