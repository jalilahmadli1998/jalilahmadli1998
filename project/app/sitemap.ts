import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/sectors', '/projects', '/facility', '/quality', '/process', '/blog', '/careers', '/rfq', '/contact'];
  const now = new Date().toISOString();
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `https://www.example.com/${locale}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7
    }))
  );
}
