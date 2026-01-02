// src/components/MoreTools.tsx

import Link from "next/link";
import {
  ArrowRight,
  Image,
  FileText,
  File,
  Crop,
  Combine,
  AlignLeft,
  FileImage,
  Calendar,    // Age Calculator ke liye
  Calculator,  // Metal Weight Calculator ke liye
  Scissors,
} from "lucide-react";

// Sabhi tools ki list (Total 10 Tools)
const allTools = [
  {
    name: "AI Background Remover",
    description: "Remove background from any image instantly using AI technology.",
    href: "/tools/background-remover",
    icon: <Crop className="w-6 h-6 text-indigo-500" />,
    cta: "Remove Now",
  },
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images without losing visual quality.",
    href: "/tools/image-compressor",
    icon: <Image className="w-6 h-6 text-green-500" />,
    cta: "Compress Now",
  },
  {
    name: "PDF to Word Converter",
    description: "Convert PDF files into fully editable Word documents quickly.",
    href: "/tools/pdf-to-word",
    icon: <FileText className="w-6 h-6 text-red-500" />,
    cta: "Convert Now",
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDF files into one single document easily.",
    href: "/tools/merge-pdf",
    icon: <Combine className="w-6 h-6 text-purple-500" />,
    cta: "Merge Now",
  },
  {
  name: "Split PDF",
  description: "Split a PDF into individual pages instantly. Secure, fast, and works offline in your browser.",
  href: "/tools/split-pdf",
  icon: <Scissors className="w-6 h-6 text-blue-600" />,
  cta: "Split Now",
},
  {
    name: "AI Text Paraphraser",
    description: "Rewrite text and essays instantly for unique and fresh content.",
    href: "/tools/text-paraphraser",
    icon: <AlignLeft className="w-6 h-6 text-blue-500" />,
    cta: "Paraphrase Now",
  },
  {
    name: "Image to Text OCR",
    description: "Extract text from images, scanned notes, and photos accurately.",
    href: "/tools/image-to-text",
    icon: <File className="w-6 h-6 text-yellow-500" />,
    cta: "Extract Now",
  },
  {
    name: "Image to PDF",
    description: "Convert JPG, PNG, or WEBP images into a single PDF file instantly.",
    href: "/tools/image-to-pdf",
    icon: <FileImage className="w-6 h-6 text-rose-500" />,
    cta: "Convert Now",
  },
  {
    name: "Resume Maker (ATS Friendly)",
    description: "Build professional resumes with live preview and instant PDF download.",
    href: "/tools/resume-maker",
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    cta: "Build Resume",
  },
  {
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days from your DOB.",
    href: "/tools/age-calculator",
    icon: <Calendar className="w-6 h-6 text-orange-500" />,
    cta: "Calculate Age",
  },
  {
    name: "Metal Weight Calculator",
    description: "Calculate the weight of metal shapes like pipes, bars, and sheets.",
    href: "/tools/metal-weight-calculator",
    icon: <Calculator className="w-6 h-6 text-slate-500" />,
    cta: "Calculate Weight",
  },
];

export default function MoreTools() {
  return (
    <section className="mt-16 py-12 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          🔗 Discover More Useful Tools
        </h2>

        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
          Don't stop here! Explore our full suite of free, AI-powered utilities to
          simplify your workflow and boost productivity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/50">
                  {tool.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 transition">
                {tool.cta}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
