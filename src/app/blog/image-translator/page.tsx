import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AI Image Translator – Translate Any Image Instantly",
  description:
    "Use TaskGuru’s AI-powered Image Translator to detect and translate text in images instantly. Perfect for travelers, researchers, and multilingual tasks.",
  // ❌ Removed keywords (not useful anymore)
  alternates: {
    canonical: "https://taskguru.online/blog/image-translator",
  },
  openGraph: {
    title: "AI Image Translator – Translate Any Image Instantly",
    description:
      "TaskGuru's AI Image Translator extracts and translates text from any image. Try it free online!",
    url: "https://taskguru.online/blog/image-translator",
    siteName: "TaskGuru",
    images: [
      {
        url: "https://taskguru.online/og-image.png", // ✅ Fixed: actual OG image
        width: 1200,
        height: 630,
        alt: "AI Image Translator by TaskGuru",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Translator – Translate Any Image Instantly",
    description:
      "Detect and translate text from images instantly with TaskGuru's AI-powered Image Translator.",
    images: ["https://taskguru.online/og-image.png"],
  },
};

export default function ImageTranslatorBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "AI Image Translator – Translate Any Image Instantly",
    description:
      "TaskGuru’s AI Image Translator lets you upload images, extract text, and translate instantly with OCR + AI.",
    author: {
      "@type": "Person",
      name: "Shubham Gautam",
    },
    publisher: {
      "@type": "Organization",
      name: "TaskGuru",
      logo: {
        "@type": "ImageObject",
        url: "https://taskguru.online/logo.png",
      },
    },
    datePublished: "2025-09-04", // ✅ update dynamically if needed
    dateModified: "2025-09-04",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://taskguru.online/blog/image-translator",
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ✅ BlogPosting Schema */}
      <Script
        id="image-translator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <h1 className="text-4xl font-bold mb-4">
        AI Image Translator – Translate Any Image Instantly
      </h1>

      <p className="mb-4">
        In today's global world, images often contain crucial information in
        various languages. TaskGuru's <strong>AI Image Translator</strong>{" "}
        allows you to detect and translate text from any image with high
        accuracy using advanced OCR and AI models.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔍 How It Works</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Upload an image from your device</li>
        <li>AI detects and extracts all visible text</li>
        <li>Select your desired output language</li>
        <li>Get instant translation with one click</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🎯 Use Cases</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Translate foreign restaurant menus or signs</li>
        <li>Convert scanned documents into your language</li>
        <li>Use for research, business, or travel purposes</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🚀 Try It Now</h2>
      <p className="mb-6">
        Visit the{" "}
        <a
          className="text-blue-600 underline"
          href="/tools/image-translator"
        >
          Image Translator Tool
        </a>{" "}
        and experience the power of AI to make language barriers disappear!
      </p>
    </div>
  );
}
