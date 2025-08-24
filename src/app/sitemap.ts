import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taskguru.online"

  // ✅ List all important static pages
  const staticPages = [
    "",
    "/blog",
    "/about",
    "/privacy-policy",
    "/terms",
    "/help",
  ]

  // ✅ List only EXISTING tools
  const tools = [
    "/tools/background-remover",
    "/tools/image-to-text",
    "/tools/text-paraphraser",
    "/tools/pdf-to-word",
    "/tools/image-compressor",
  ]

  // ✅ Current date as ISO string (auto updates)
  const lastmod = new Date().toISOString()

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: lastmod,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : page === "/blog" ? 0.85 : 0.6,
    })),
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool}`,
      lastModified: lastmod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
