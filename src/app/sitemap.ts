import { MetadataRoute } from "next";

// ✅ 1. Correct Tool Slugs (आपके कॉम्पोनेंट फ़ाइलों के नाम से मैच करते हुए)
const toolSlugs = [
  "background-remover",
  "image-compressor", // ✅ Missing in your old list, added here
  "image-to-text",    // ✅ Simplified from 'image-to-text-ocr'
  "pdf-to-word",
  "merge-pdf",        // ✅ Simplified from 'merge-pdf-to-word'
  "text-paraphraser",
  // 🛑 'text-to-word' और 'image-translator' हटा दिए गए क्योंकि उनके कंपोनेंट फ़ाइलें (जैसे TextToWord.tsx) नहीं दिखी थीं।
];

const staticPages = [
  "", // / (Homepage)
  "/about",
  "/help",
  "/privacy-policy",
  "/terms",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taskguru.online";
  const currentDate = new Date().toISOString().split('T')[0]; // आज की तारीख (YYYY-MM-DD)

  // 1. Static Pages (Legal pages and Home)
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === "" ? "daily" as const : "weekly" as const,
    priority: page === "" ? 1.0 : 0.6, // Homepage gets highest priority
  }));

  // 2. Dynamic Tool Pages (High Priority)
  const toolEntries = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: currentDate, // हर डिप्लॉयमेंट पर तारीख़ अपडेट करें
    changeFrequency: "daily" as const, // Tools को रोज़ क्रॉल करने के लिए
    priority: 0.9,
  }));

  return [...staticEntries, ...toolEntries];
}
