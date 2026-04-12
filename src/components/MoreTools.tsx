// src/components/MoreTools.tsx
import Link from "next/link";
import {
  ArrowRight, Image as ImageIcon, FileText, File, Crop, Combine,
  AlignLeft, FileImage, Calendar, Calculator, Scissors, QrCode,
  CreditCard, Youtube, ShieldAlert, Key, Zap, FileSpreadsheet,
  Keyboard, Search, NotebookPen
} from "lucide-react";

const allTools = [
  { slug: "background-remover", name: "BG Remover", href: "/tools/background-remover", icon: <Crop className="w-5 h-5 text-indigo-500" /> },
  { slug: "image-compressor", name: "Image Compressor", href: "/tools/image-compressor", icon: <ImageIcon className="w-5 h-5 text-green-500" /> },
  { slug: "pdf-to-word", name: "PDF to Word", href: "/tools/pdf-to-word", icon: <FileText className="w-5 h-5 text-red-500" /> },
  { slug: "merge-pdf", name: "Merge PDF", href: "/tools/merge-pdf", icon: <Combine className="w-5 h-5 text-purple-500" /> },
  { slug: "split-pdf", name: "Split PDF", href: "/tools/split-pdf", icon: <Scissors className="w-5 h-5 text-blue-600" /> },
  { slug: "text-paraphraser", name: "AI Paraphraser", href: "/tools/text-paraphraser", icon: <AlignLeft className="w-5 h-5 text-blue-500" /> },
  { slug: "image-to-text", name: "Image to Text", href: "/tools/image-to-text", icon: <File className="w-5 h-5 text-yellow-500" /> },
  { slug: "image-to-pdf", name: "Image to PDF", href: "/tools/image-to-pdf", icon: <FileImage className="w-5 h-5 text-rose-500" /> },
  { slug: "resume-maker", name: "Resume Maker", href: "/tools/resume-maker", icon: <FileText className="w-5 h-5 text-indigo-600" /> },
  { slug: "age-calculator", name: "Age Calculator", href: "/tools/age-calculator", icon: <Calendar className="w-5 h-5 text-orange-500" /> },
  { slug: "youtube-thumbnail-downloader", name: "YT Thumbnail", href: "/tools/youtube-thumbnail-downloader", icon: <Youtube className="w-5 h-5 text-red-600" /> },
  { slug: "metal-weight-calculator", name: "Metal Weight", href: "/tools/metal-weight-calculator", icon: <Calculator className="w-5 h-5 text-slate-500" /> },
  { slug: "qr-barcode-generator", name: "QR Generator", href: "/tools/qr-barcode-generator", icon: <QrCode className="w-5 h-5 text-teal-500" /> },
  { slug: "emi-calculator", name: "EMI Calculator", href: "/tools/emi-calculator", icon: <CreditCard className="w-5 h-5 text-violet-500" /> },
  // Newly Added Tools from Sitemap
  { slug: "ai-content-detector", name: "AI Detector", href: "/tools/ai-content-detector", icon: <ShieldAlert className="w-5 h-5 text-red-400" /> },
  { slug: "password-generator", name: "Pass Gen", href: "/tools/password-generator", icon: <Key className="w-5 h-5 text-gray-600" /> },
  { slug: "word-counter", name: "Word Counter", href: "/tools/word-counter", icon: <NotebookPen className="w-5 h-5 text-emerald-500" /> },
  { slug: "typing-speed-test", name: "Typing Test", href: "/tools/typing-speed-test", icon: <Keyboard className="w-5 h-5 text-sky-500" /> },
  { slug: "excel-to-pdf", name: "Excel to PDF", href: "/tools/excel-to-pdf", icon: <FileSpreadsheet className="w-5 h-5 text-green-600" /> },
  { slug: "invoice-generator", name: "Invoice Maker", href: "/tools/invoice-generator", icon: <Zap className="w-5 h-5 text-yellow-600" /> },
];

interface MoreToolsProps {
  currentSlug?: string;
  limit?: number;
}

export default function MoreTools({ currentSlug, limit }: MoreToolsProps) {
  const filtered = allTools
    .filter((tool) => tool.slug !== currentSlug)
    .slice(0, limit ?? allTools.length);

  return (
    <section className="mt-20 py-10 border-t border-gray-100 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600 fill-blue-600" /> 
              Other Useful Tools
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Fast, free, and secure utilities for daily tasks.</p>
          </div>
          <Link href="/tools" className="hidden sm:flex items-center text-sm font-bold text-blue-600 hover:text-blue-700">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group flex items-center p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-200"
            >
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-white dark:bg-gray-900 shadow-sm group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div className="ml-3 overflow-hidden">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
