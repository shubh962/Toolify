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
import UnlockPdf from "@/components/tools/UnlockPdf";
import PdfEditorPro from '@/components/tools/PdfEditorPro';
import CreditCardEligibility from '@/components/tools/CreditCardEligibility';
import ESignPdf from '@/components/tools/ESignPdf';
import GrammarChecker from '@/components/tools/GrammarChecker';
import PomodoroTimer from '@/components/tools/PomodoroTimer';
import { ShieldCheck, Lock, Zap } from 'lucide-react';

export async function generateStaticParams() {
  return tools
    .filter((tool) => typeof tool.slug === "string" && tool.slug.length > 0)
    .map((tool) => ({
      slug: tool.slug,
    }));
}

// ✅ Per-tool SEO overrides — targeting Search Console queries
const toolSeoOverrides: Record<string, { title: string; description: string }> = {
  "text-paraphraser": {
    title: "Free AI Paraphraser — Paraphrase & Humanize Text Online | TaskGuru",
    description: "Free AI paraphrasing tool — rewrite any text instantly. Convert AI text to human text, remove plagiarism. No signup, no word limit. Used by students & professionals worldwide.",
  },
  "qr-barcode-generator": {
    title: "Free QR Code Generator — Create QR Codes Instantly Online | TaskGuru",
    description: "Generate free QR codes for URLs, WiFi, text, email & more. Also create barcodes (EAN-13, UPC, Code128). Download HD PNG. No signup, unlimited, 100% free.",
  },
  "ai-content-detector": {
    title: "Free AI Content Detector — Check if Text is AI or Human Written | TaskGuru",
    description: "Detect AI-generated text from ChatGPT, Gemini & Claude free. Check if content is AI-written or human. No signup, instant results, 100% free.",
  },
  "image-to-text": {
    title: "Free Image to Text Converter (OCR) — Extract Text from Any Image | TaskGuru",
    description: "Extract text from JPG, PNG, screenshots & scanned documents free. OCR runs in your browser — 100% private, no upload, no signup.",
  },
  "resume-maker": {
    title: "Free Resume Maker — Build ATS-Friendly Resume & Download PDF | TaskGuru",
    description: "Create a professional ATS-friendly resume free — no signup, no watermark, no paywall. Real-time ATS score. Download PDF instantly.",
  },
  "background-remover": {
    title: "Free AI Background Remover — Remove Image Background Instantly | TaskGuru",
    description: "Remove image backgrounds free using AI — no signup, no watermark, instant results. Create transparent PNGs for eCommerce, thumbnails, and social media.",
  },
  "image-compressor": {
    title: "Free Image Compressor — Reduce Image Size to 20KB, 50KB, 100KB | TaskGuru",
    description: "Compress JPG, PNG, WebP images free — reduce to exact KB without quality loss. Perfect for scholarship forms, passport photos, and websites. No signup.",
  },
  "pdf-to-word": {
    title: "Free PDF to Word Converter — Convert PDF to Editable DOCX | TaskGuru",
    description: "Convert PDF to editable Word document free — no signup, no watermark. Works in your browser on Windows, Mac, Android, iOS.",
  },
  "merge-pdf": {
    title: "Free PDF Merger — Merge PDF Files Online Instantly | TaskGuru",
    description: "Merge multiple PDF files into one free — no signup, no watermark, instant download. Drag to reorder pages. Perfect for visa, job applications.",
  },
  "password-generator": {
    title: "Free Password Generator — Create Strong Secure Passwords | TaskGuru",
    description: "Generate strong secure passwords free — 4 to 64 characters, custom symbols. Cryptographically secure. No signup, 100% private.",
  },
  "invoice-generator": {
    title: "Free Invoice Generator — Create PDF Invoices Instantly | TaskGuru",
    description: "Create professional PDF invoices free — add line items, tax (GST/VAT), payment terms. No signup, no watermark. Perfect for freelancers.",
  },
  "emi-calculator": {
    title: "Free EMI Calculator — Calculate Loan EMI, Interest & Schedule | TaskGuru",
    description: "Calculate loan EMI instantly — principal, interest rate, tenure. Monthly EMI, total interest, and payment schedule. Works for SBI, HDFC, ICICI & all banks.",
  },
  "word-to-pdf": {
    title: "Free Word to PDF Converter — Convert DOCX to PDF Online | TaskGuru",
    description: "Convert Word documents to PDF free — no Microsoft Office needed. Works in browser on Windows, Mac, iOS, Android. No signup, no watermark.",
  },
  "pdf-compressor": {
    title: "Free PDF Compressor — Reduce PDF Size Without Quality Loss | TaskGuru",
    description: "Compress PDF files free — reduce size for email, upload, and storage. No signup, instant, runs in browser. Files never uploaded to server.",
  },
  "split-pdf": {
    title: "Free PDF Splitter — Split PDF Into Individual Pages Online | TaskGuru",
    description: "Split PDF into separate pages free — download as ZIP. No signup, no watermark. Uses WebAssembly in your browser — your PDF never leaves device.",
  },
  "youtube-thumbnail-downloader": {
    title: "Free YouTube Thumbnail Downloader — Download HD & 4K Thumbnails | TaskGuru",
    description: "Download any YouTube video thumbnail free — HD, Full HD, 4K quality. Paste URL and download instantly. Works for Shorts too. No signup.",
  },
  "typing-speed-test": {
    title: "Free Typing Speed Test — Check WPM & Accuracy Online | TaskGuru",
    description: "Test your typing speed in WPM and accuracy free. Choose 30, 60, or 120 second tests. Real-time feedback. Perfect for government job exam preparation.",
  },
  "word-counter": {
    title: "Free Word Counter — Count Words, Characters & Reading Time | TaskGuru",
    description: "Count words, characters, sentences, and reading time instantly. Check keyword density and platform limits (Twitter, Instagram, LinkedIn). No signup.",
  },
  "pdf-redactor": {
    title: "Free PDF Redactor — Redact & Black Out PDF Text Online | TaskGuru",
    description: "Permanently redact sensitive text from PDFs free — draw black boxes or search text. HIPAA & GDPR compliant. 100% private, runs in browser.",
  },
  "age-calculator": {
    title: "Free Age Calculator — Calculate Exact Age in Years, Months & Days | TaskGuru",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Enter date of birth and get results instantly. No signup required.",
  },
  "metal-weight-calculator": {
    title: "Free Metal Weight Calculator — Steel, Aluminium, Copper & More | TaskGuru",
    description: "Calculate metal weight online free — steel, SS, aluminium, copper, brass. 12 shapes: sheets, bars, pipes, beams. Instant results in KG/LB.",
  },
  "excel-to-pdf": {
    title: "Free Excel to PDF Converter — Convert XLSX to PDF Online | TaskGuru",
    description: "Convert Excel spreadsheets to PDF free — no Microsoft Office needed. Preview sheets, download clean PDF. 100% private, runs in browser.",
  },
  "pdf-to-excel": {
    title: "Free PDF to Excel Converter — Extract Tables & Data to XLSX | TaskGuru",
    description: "Convert PDF to Excel free — extract tables, bank statements, invoices to .xlsx instantly. Works in browser, no upload, 100% private.",
  },
  "image-to-pdf": {
    title: "Free Image to PDF Converter — Convert JPG & PNG to PDF | TaskGuru",
    description: "Convert images to PDF free — JPG, PNG, WebP supported. Instant A4 PDF download, no signup, no watermark. Your images never leave your device.",
  },
  "youtube-to-pdf": {
    title: "Free YouTube to PDF Converter — Convert Video Transcripts to Notes | TaskGuru",
    description: "Convert YouTube videos to PDF notes free — extract transcripts for studying. Perfect for students and researchers. No signup required.",
  },
  "unlock-pdf-no-upload": {
    title: "Free PDF Password Remover — Remove PDF Password Instantly | TaskGuru",
    description: "Remove password from PDF files free — no upload, no signup, no watermark. Unlock user passwords and owner restrictions in your browser. 100% private.",
  },
  "esign-pdf-no-upload": {
    title: "Free E-Sign PDF Online — Sign PDF Without Uploading | TaskGuru",
    description: "Sign PDF documents free — draw or type signature, no upload to server. Free DocuSign alternative. Legally valid in India, USA, UK, EU. No account.",
  },
  "grammar-checker": {
  title: "Free Grammar Checker Online — Fix English Errors Instantly | TaskGuru",
  description: "Check grammar, spelling, and punctuation errors free — no sign-up, no word limit. Paste your text and get instant corrections. Works for essays, emails, and reports.",
},
  "pomodoro-timer": {
  title: "Free Pomodoro Timer Online — Focus Timer with Task List | TaskGuru",
  description: "Free Pomodoro timer with 25/5/15 intervals, task list, sound alerts, and session tracking. No download, no sign-up. Start focusing in seconds.",
  canonical: "https://www.taskguru.online/tools/pomodoro-timer",
},
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | TaskGuru",
      description: "The tool you are looking for does not exist on TaskGuru.",
    };
  }

  const override = toolSeoOverrides[slug];
  const finalTitle = override?.title ?? `${tool.title} | TaskGuru`;
  const finalDesc = override?.description ?? tool.description;
  const canonical = `https://www.taskguru.online/tools/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.taskguru.online" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.taskguru.online/tools" },
      { "@type": "ListItem", position: 3, name: tool.title, item: canonical },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: finalTitle.replace(" | TaskGuru", ""),
    url: canonical,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: finalDesc,
    publisher: {
      "@type": "Organization",
      name: "TaskGuru",
      url: "https://www.taskguru.online",
    },
  };

  return {
    title: finalTitle,
    description: finalDesc,
    keywords: `${tool.title.toLowerCase()}, free, online, no signup, taskguru`,
    alternates: { canonical },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      type: "website",
      url: canonical,
      siteName: "TaskGuru",
      images: [{ url: "https://www.taskguru.online/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      site: "@Shubham_962",
    },
    other: {
      "application/ld+json": JSON.stringify([breadcrumbSchema, appSchema]),
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
  "grammar-checker": GrammarChecker,
  "pdf-redactor": PdfRedactor,
  "invoice-generator": InvoiceGenerator,
  "unlock-pdf-no-upload": UnlockPdf,
  "pdf-editor-pro": PdfEditorPro,
  "esign-pdf-no-upload": ESignPdf,
  "pomodoro-timer": PomodoroTimer,
  "credit-card-eligibility-checker": CreditCardEligibility,
};

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // ADDED: Related tools logic
  const relatedToolsRaw = tools.filter(
    (t) => t.slug !== tool.slug && t.category === tool.category
  );

  const relatedTools =
    relatedToolsRaw.length >= 3
      ? relatedToolsRaw.slice(0, 5)
      : tools
          .filter((t) => t.slug !== tool.slug)
          .slice(0, 5);

  return (
    <main className="flex-1 pt-32 pb-12 md:pt-40 md:pb-16 min-h-screen">
      <div className="container mx-auto px-6">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.taskguru.online" },
                { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.taskguru.online/tools" },
                { "@type": "ListItem", position: 3, name: tool.title, item: `https://www.taskguru.online/tools/${tool.slug}` },
              ],
            }),
          }}
        />

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

        {!tool.hasOwnFaq && (
          <div className="max-w-4xl mx-auto py-12 border-t mt-12">
            {'content' in tool && tool.content && (
              <div
                className="text-base text-muted-foreground leading-relaxed space-y-4 mb-16 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: tool.content as string }}
              />
            )}

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

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                How to use {tool.title} online?
              </h2>
              <div className="space-y-4">
                {[
                  `Upload your file or enter your data into the ${tool.title} tool above.`,
                  "Wait a moment while our tool processes your request securely in your browser.",
                  "Preview the result and click Download or Copy to get your output instantly.",
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

            <div className="mt-16 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: `Is ${tool.title} really free?`,
                    a: `Yes — completely free. No subscription, no credit card, no account required. Use it unlimited times with no limits.`,
                  },
                  {
                    q: `Is my data safe when using ${tool.title}?`,
                    a: "Yes. TaskGuru tools process files directly in your browser — your files never leave your device and are never uploaded to any server.",
                  },
                  {
                    q: `Does ${tool.title} work on mobile?`,
                    a: "Yes. All TaskGuru tools work on any device — desktop, tablet, iPhone, and Android — directly in your browser with no app download needed.",
                  },
                  {
                    q: `Do I need to create an account to use ${tool.title}?`,
                    a: "No. Open the tool, use it, download your result. TaskGuru never requires signup, email, or any registration — ever.",
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

            {/* ADDED: Related Tools Section */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-xl font-bold mb-4">
                Related Tools
              </h3>

              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {relatedTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="block p-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                    >
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>

      <MoreTools />
    </main>
  );
}
