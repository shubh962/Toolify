import { MetadataRoute } from "next";

const blogSlugs = [
 "top-10-best-free-tools-2026-productivity",
  "the-ultimate-taskguru-toolkit",
//  "projects-presentations-ai-toolkit",
  "streamline-remote-workflow",
  "ai-document-power-up",
 // "free-ai-tools-for-students-2025",
  "ultimate-ai-toolkit-free-tools",
  "stop-paying-for-saas-free-ai-tools",
  "anti-subscription-guide-free-ai-tools",
//  "free-ai-tools-that-replace-paid-software-2025",
 // "best-free-online-tools-2026",
  "10-best-free-online-tools-2026",
//  "best-utility-tools-2025-26",
  //"mastering-digital-productivity-taskguru-toolkit",
 // "happy-new-year-2026",
];

const toolSlugs = [
  "background-remover",
  "image-compressor",
  "image-to-text",
  "pdf-to-word",
  "merge-pdf",
  "split-pdf",
  "text-paraphraser",
  "image-to-pdf",
  "resume-maker",
  "age-calculator",
  "metal-weight-calculator",
];

const staticPages = [
  "", // homepage
  "/about",
  "/help",
  "/privacy-policy",
  "/terms",
  "/blog",
  "/contact",
  "/disclaimer",
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
