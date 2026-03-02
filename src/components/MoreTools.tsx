// src/components/MoreTools.tsx

import Link from "next/link";
import {
  ArrowRight,
  Image as ImageIcon,
  FileText,
  File,
  Crop,
  Combine,
  AlignLeft,
  FileImage,
  Calendar,
  Calculator,
  Scissors,
  QrCode,
  CreditCard,
  Youtube,
} from "lucide-react";

const allTools = [
  {
    slug: "background-remover",
    name: "AI Background Remover",
    description: "Remove background from any image instantly using AI technology.",
    href: "/tools/background-remover",
    icon: <Crop className="w-6 h-6 text-indigo-500" />,
    cta: "Remove Now",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images without losing visual quality.",
    href: "/tools/image-compressor",
    icon: <ImageIcon className="w-6 h-6 text-green-500" />,
    cta: "Compress Now",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word Converter",
    description: "Convert PDF files into fully editable Word documents quickly.",
    href: "/tools/pdf-to-word",
    icon: <FileText className="w-6 h-6 text-red-500" />,
    cta: "Convert Now",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one single document easily.",
    href: "/tools/merge-pdf",
    icon: <Combine className="w-6 h-6 text-purple-500" />,
    cta: "Merge Now",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Split a PDF into individual pages instantly. Fast and secure.",
    href: "/tools/split-pdf",
    icon: <Scissors className="w-6 h-6 text-blue-600" />,
    cta: "Split Now",
  },
  {
    slug: "text-paraphraser",
    name: "AI Text Paraphraser",
    description: "Rewrite text and essays instantly for unique and fresh content.",
    href: "/tools/text-paraphraser",
    icon: <AlignLeft className="w-6 h-6 text-blue-500" />,
    cta: "Paraphrase Now",
  },
  {
    slug: "image-to-text",
    name: "Image to Text OCR",
    description: "Extract text from images, scanned notes, and photos accurately.",
    href: "/tools/image-to-text",
    icon: <File className="w-6 h-6 text-yellow-500" />,
    cta: "Extract Now",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG, PNG, or WebP images into a single PDF file instantly.",
    href: "/tools/image-to-pdf",
    icon: <FileImage className="w-6 h-6 text-rose-500" />,
    cta: "Convert Now",
  },
  {
    slug: "resume-maker",
    name: "Resume Maker (ATS Friendly)",
    description: "Build professional resumes with live preview and instant PDF download.",
    href: "/tools/resume-maker",
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    cta: "Build Resume",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days from your date of birth.",
    href: "/tools/age-calculator",
    icon: <Calendar className="w-6 h-6 text-orange-500" />,
    cta: "Calculate Age",
  },
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    description: "Download high-quality 1080p thumbnails from any YouTube video instantly.",
    href: "/tools/youtube-thumbnail-downloader",
    icon: <Youtube className="w-6 h-6 text-red-600" />,
    cta: "Download Now",
  },
  {
    slug: "metal-weight-calculator",
    name: "Metal Weight Calculator",
    description: "Calculate the weight of metal shapes like pipes, bars, and sheets.",
    href: "/tools/metal-weight-calculator",
    icon: <Calculator className="w-6 h-6 text-slate-500" />,
    cta: "Calculate Weight",
  },
  // ✅ FIX: Added missing tools that exist in toolComponentMap
  {
    slug: "qr-barcode-generator",
    name: "QR & Barcode Generator",
    description: "Generate custom QR codes and barcodes instantly for free.",
    href: "/tools/qr-barcode-generator",
    icon: <QrCode className="w-6 h-6 text-teal-500" />,
    cta: "Generate Now",
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate monthly loan EMI instantly with full amortization breakdown.",
    href: "/tools/emi-calculator",
    icon: <CreditCard className="w-6 h-6 text-violet-500" />,
    cta: "Calculate EMI",
  },
];

interface MoreToolsProps {
  // ✅ FIX: Accept current slug to exclude it from suggestions
  currentSlug?: string;
  // Optional: limit how many tools to show
  limit?: number;
}

export default function MoreTools({ currentSlug, limit }: MoreToolsProps) {
  // ✅ FIX: Filter out the current tool so it doesn't appear in suggestions
  const filtered = allTools
    .filter((tool) => tool.slug !== currentSlug)
    .slice(0, limit ?? allTools.length);

  return (
    <section className="mt-16 py-12 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          🔗 Discover More Free Tools
        </h2>
        <p className="text-center text-base text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Explore our full suite of free AI-powered utilities to simplify your
          workflow and boost productivity — no sign-up required.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/50">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 transition-colors">
                {tool.cta}
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
