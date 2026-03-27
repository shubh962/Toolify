import { MetadataRoute } from "next";

const blogSlugs = [
  "extract-text-scanned-pdf",
  "what-is-a-qr-code",
  "reduce-image-size-kb-without-losing-quality",
  "local-first-web-apps-trend-2026",
  "taskguru-tech-stack-2026",
  "youtube-thumbnail-guide",
  "resume-ats-secrets",
  "image-compression-guide",
  "zero-cost-freelancer-tools",
  "how-to-compress-images-without-losing-quality",
  "what-is-ocr-image-to-text",
  "how-to-convert-pdf-to-word-free",
  "how-to-make-resume-with-no-experience",
  "rent-vs-buy-financial-guide",
  "why-i-built-taskguru",
  "why-free-background-remover",
  "how-to-paraphrase-text",
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
  "pdf-compressor",
  "resume-maker",
  "qr-barcode-generator",
  "age-calculator",
 "youtube-thumbnail-downloader",
  "metal-weight-calculator",
  "emi-calculator",
];

const staticPages = [
  "",
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
