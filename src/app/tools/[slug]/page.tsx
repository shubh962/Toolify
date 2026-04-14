import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import Link from "next/link";
// Standard imports for all component
import YoutubeThumbnail from '@/components/tools/YoutubeThumbnail';
import YoutubeToPdf from '@/components/tools/YoutubeToPdf';
import BackgroundRemover from '@/components/tools/BackgroundRemover';
import ExcelToPdf from '@/components/tools/ExcelToPdf';
import PdfToExcel from '@/components/tools/PdfToExcel';
import ImageToText from '@/components/tools/ImageToText';
import TextParaphraser from '@/components/tools/TextParaphraser';
import AiContentDetector from '@/components/tools/AiContentDetector';
import PdfToWord from '@/components/tools/PdfToWord';
import MergePdf from '@/components/tools/MergePdf';
import SplitPdf from '@/components/tools/SplitPdf';
import ImageCompressor from '@/components/tools/ImageCompressor';
import ImageToPdf from '@/components/tools/ImageToPdf';
import PlaceholderTool from '@/components/tools/PlaceholderTool';
import MoreTools from '@/components/MoreTools';
import ResumeMakerFlow from '@/components/tools/ResumeMakerFlow';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import AgeCalculator from '@/components/tools/AgeCalculator';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';
import EmiCalculator from '@/components/tools/EmiCalculator';
import QrBarcodeGenerator from '@/components/tools/QrBarcodeGenerator';
import PdfCompressor from '@/components/tools/PdfCompressor';
import TypingSpeedTest from '@/components/tools/TypingSpeedTest';
import WordCounter from '@/components/tools/WordCounter';
import PdfRedactor from '@/components/tools/PdfRedactor';
import WordToPdf from '@/components/tools/WordToPdf';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';
import { ShieldCheck, Lock, Zap } from 'lucide-react';

export async function generateStaticParams() {
  return tools
    .filter((tool) => typeof tool.slug === "string" && tool.slug.length > 0)
    .map((tool) => ({
      slug: tool.slug,
    }));
}

// ✅ Next.js 15 compatibility: params awaited
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | TaskGuru",
      description: "The tool you are looking for does not exist on TaskGuru.",
    };
  }

  return {
    title: `${tool.title} — Free Online Tool | TaskGuru`,
    description: tool.description,
    alternates: {
      canonical: `https://www.taskguru.online/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.title} — Free Online Tool | TaskGuru`,
      description: tool.description,
      type: "website",
      url: `https://www.taskguru.online/tools/${tool.slug}`,
    },
  };
}

const toolComponentMap: { [key: string]: React.ComponentType<any> } = {
  "background-remover": BackgroundRemover,
  "image-to-text": ImageToText,
  "text-paraphraser": TextParaphraser,
  "ai-content-detector": AiContentDetector,
  "typing-speed-test": TypingSpeedTest,
  "pdf-to-word": PdfToWord,
  "word-to-pdf": WordToPdf,
  "merge-pdf": MergePdf,
  "image-compressor": ImageCompressor,
  "image-to-pdf": ImageToPdf,
  "excel-to-pdf": ExcelToPdf,
  "pdf-to-excel": PdfToExcel,
  "qr-barcode-generator": QrBarcodeGenerator,
  "password-generator": PasswordGenerator,
  "age-calculator": AgeCalculator,
  "metal-weight-calculator": MetalWeightCalculator,
  "split-pdf": SplitPdf,
  "youtube-thumbnail-downloader": YoutubeThumbnail,
  "youtube-to-pdf": YoutubeToPdf,
  "emi-calculator": EmiCalculator,
  "pdf-compressor": PdfCompressor,
  "word-counter": WordCounter,
  "pdf-redactor": PdfRedactor,
  "invoice-generator": InvoiceGenerator,
};

// ✅ Next.js 15 compatibility: params awaited
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="flex-1 pt-32 pb-12 md:pt-40 md:pb-16 min-h-screen">
      <div className="container mx-auto px-6">

        {/* Title Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground">
            {tool.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {tool.description}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Free
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5" /> No Sign-Up Required
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-600 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" /> Instant Processing
            </span>
          </div>
        </div>

        {/* Tool Render Section */}
        <div className="min-h-[400px] mb-20">
          {tool.slug === "resume-maker" ? (
            <ResumeMakerFlow />
          ) : (
            (() => {
              const ToolComponent = tool.isPlaceholder
                ? PlaceholderTool
                : toolComponentMap[tool.slug];

              return ToolComponent ? (
                <ToolComponent title={tool.title} description={tool.description} />
              ) : (
                <PlaceholderTool title={tool.title} />
              );
            })()
          )}
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto py-12 border-t mt-12">

          {'content' in tool && tool.content && (
            <div
              className="text-base text-muted-foreground leading-relaxed space-y-4 mb-16 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: tool.content as string }}
            />
          )}

          {/* Trust Signals */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                Privacy & Security
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your privacy is our priority. When you use our <strong>{tool.title}</strong>,
                all processing happens securely. We do not store your files on our servers permanently.
                Files are automatically deleted after processing to ensure your data remains private
                and confidential.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Why Use This Tool?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                TaskGuru provides this <strong>{tool.title}</strong> for free to help students,
                professionals, and creators work faster. Unlike other paid software,
                our tool runs directly in your browser, requiring no installation and
                no credit card registration.
              </p>
            </div>
          </div>

          {/* How-To Guide */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              How to use {tool.title} online?
            </h2>
            <div className="space-y-4">
              {[
                `Upload your file or enter your data into the ${tool.title} box above.`,
                "Wait a few moments while our AI algorithm processes your request securely.",
                "Preview the result and click the Download or Copy button to get your output instantly.",
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-muted-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Generic FAQ — only for tools WITHOUT their own faqSchema */}
          {!tool.hasOwnFaq && (
            <div className="mt-16 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: `Is the ${tool.title} really free?`,
                    a: `Yes — completely free. No subscription, no credit card, no account required. Use it unlimited times.`,
                  },
                  {
                    q: `Is my data safe when using ${tool.title}?`,
                    a: "Yes. Most TaskGuru tools process files directly in your browser — your files never leave your device. For server-processed tools, files are deleted immediately after processing.",
                  },
                  {
                    q: `Does ${tool.title} work on mobile?`,
                    a: "Yes. All TaskGuru tools work on any device — desktop, tablet, and mobile (iOS/Android) — directly in your browser without any app download.",
                  },
                  {
                    q: `Do I need an account to use ${tool.title}?`,
                    a: "No account needed. Open the tool, use it, download your result — no signup or email required. Ever.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden group"
                  >
                    <summary className="bg-gray-50 dark:bg-gray-900 px-5 py-4 cursor-pointer font-bold text-sm text-foreground list-none flex justify-between items-center">
                      {faq.q}
                      <span className="transition-transform group-open:rotate-180 text-gray-400 flex-shrink-0 ml-2">▼</span>
                    </summary>
                    <div className="px-5 py-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <MoreTools />
    </main>
  );
          }
