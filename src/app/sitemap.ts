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
  "background-remover",
  "image-to-text-ocr",
  "merge-pdf-to-word",
  "pdf-to-word",
  "text-paraphraser",
  "text-to-word",
  "image-translator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taskguru.online";

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const toolEntries = tools.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...toolEntries];
}
