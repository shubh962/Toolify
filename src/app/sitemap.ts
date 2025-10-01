import { MetadataRoute } from "next";

const blogSlugs = [
    "the-ultimate-taskguru-toolkit", 
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
  "", // / (Homepage)
  "/about",
  "/help",
  "/privacy-policy",
  "/terms",
  "/blog", // BLOG LISTING PAGE
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taskguru.online";
  const currentDate = new Date().toISOString().split('T')[0]; // आज की तारीख (2025-10-01)

  // A. Static Entries (Home, About, Legal, Blog Listing)
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: (page === "" || page === "/blog") ? "daily" as const : "weekly" as const,
    priority: page === "" ? 1.0 : (page === "/blog" ? 0.85 : 0.6), // Homepage=1.0, Blog List=0.85
  }));
  
  // B. Dynamic Tool Pages (Core Business Logic)
  const toolEntries: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.9, // Tools get the highest priority
  }));

  // C. Dynamic Blog Post Pages (NEW: Only the working post)
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8, 
  }));


  // Combine all three arrays
  return [...staticEntries, ...toolEntries, ...blogEntries];
}
