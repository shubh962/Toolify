import { MetadataRoute } from "next";

const BASE = "https://www.taskguru.online";

const blogSlugs = [
  "extract-text-scanned-pdf",
  "free-online-tools-students-2026-no-login",
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
  "why-i-built-free-paraphraser",
  "why-i-built-free-qr-code-generator",
  "why-i-built-free-resume-maker",
  "why-i-built-free-pdf-to-word-converter",
  "why-i-built-free-image-compressor",
  "why-i-built-free-pdf-merger",
  "why-i-built-free-image-to-text-ocr",
  "free-productivity-tools-2026",
  "how-to-make-ai-text-undetectable-free-2026",
  "how-to-create-invoice-free",
  "how-to-create-free-qr-code",
  "how-to-paraphrase-text-free",
  "how-to-remove-plagiarism-free",
  "how-to-sign-pdf-online-free",
  "how-to-remove-background-from-image-free",
  "how-to-merge-pdf-files-free",
  "how-to-compress-pdf-free",
  "how-to-write-professional-english-emails",
  "grammarly-free-vs-free-grammar-checker",
  "check-credit-card-eligibility-without-hard-inquiry",
  "best-free-paraphrasing-tool-online-2026",
];

const toolSlugs = [
  "background-remover",
  "image-compressor",
  "image-to-text",
  "pdf-to-word",
  "word-to-pdf",
  "merge-pdf",
  "split-pdf",
  "text-paraphraser",
  "ai-content-detector",
  "typing-speed-test",
  "image-to-pdf",
  "pdf-compressor",
  "resume-maker",
  "qr-barcode-generator",
  "password-generator",
  "age-calculator",
  "youtube-thumbnail-downloader",
  "youtube-to-pdf",
  "metal-weight-calculator",
  "emi-calculator",
  "excel-to-pdf",
  "pdf-to-excel",
  "word-counter",
  "pdf-redactor",
  "unlock-pdf-no-upload",
  "esign-pdf-no-upload",
  "invoice-generator",
  "pdf-editor-pro",
  "grammar-checker",
  "pomodoro-timer",
  "credit-card-eligibility-checker",
];

// Priority tiers for static pages
const staticPages: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "",                 priority: 1.0,  changeFrequency: "daily"   },
  { path: "/tools",           priority: 0.95, changeFrequency: "daily"   },
  { path: "/blog",            priority: 0.9,  changeFrequency: "daily"   },
  { path: "/apps",            priority: 0.85, changeFrequency: "weekly"  },
  { path: "/about",           priority: 0.7,  changeFrequency: "monthly" },
  { path: "/contact",         priority: 0.6,  changeFrequency: "monthly" },
  { path: "/help",            priority: 0.6,  changeFrequency: "monthly" },
  { path: "/privacy-policy",  priority: 0.4,  changeFrequency: "yearly"  },
  { path: "/terms",           priority: 0.4,  changeFrequency: "yearly"  },
  { path: "/disclaimer",      priority: 0.4,  changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${BASE}${path}`,
      lastModified: today,
      changeFrequency,
      priority,
    })
  );

  const toolEntries: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...toolEntries, ...blogEntries];
}
