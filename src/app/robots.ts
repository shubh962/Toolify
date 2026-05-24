import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
      Disallow: /ads/,
    },
    sitemap: 'https://www.taskguru.online/sitemap.xml',
    host: 'www.taskguru.online',
  }
}
