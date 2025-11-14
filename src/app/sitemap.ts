import { MetadataRoute } from "next";

const blogSlugs = [
  "the-ultimate-taskguru-toolkit",
  "projects-presentations-ai-toolkit",
  "streamline-remote-workflow",
  "ai-document-power-up",
];

const toolSlugs = [
  "background-remover",
  "image-compressor",
  "image-to-text",
  "pdf-to-word",
  "merge-pdf",
  "text-paraphraser",
];

const staticPages = [
  "", // homepage
  "/about",
  "/help",
  "/privacy-policy",
  "/terms",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.taskguru.online";   // ← FIXED (WWW ONLY)
  const currentDate = new Date().toISOString().split("T")[0];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === "" || page === "/blog" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : page === "/blog" ? 0.85 : 0.6,
  }));

  const toolEntries: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...toolEntries, ...blogEntries];
}
