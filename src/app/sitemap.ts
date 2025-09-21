import { MetadataRoute } from "next";

const staticPages = [
  "",
  "/about",
  "/help",
  "/privacy-policy",
  "/terms",
  "/blog",
];

const tools = [
  { slug: "background-remover", updatedAt: "2025-09-01" },
  { slug: "image-to-text-ocr", updatedAt: "2025-09-05" },
  { slug: "merge-pdf-to-word", updatedAt: "2025-09-10" },
  { slug: "pdf-to-word", updatedAt: "2025-09-12" },
  { slug: "text-paraphraser", updatedAt: "2025-09-15" },
  { slug: "text-to-word", updatedAt: "2025-09-17" },
  { slug: "image-translator", updatedAt: "2025-09-19" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taskguru.online";

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date("2025-09-01"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const toolEntries = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt), // use updatedAt for freshness
    changeFrequency: "daily" as const, // encourage frequent re-crawling
    priority: 0.9,
  }));

  return [...staticEntries, ...toolEntries];
}
