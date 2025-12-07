import Script from "next/script";
import Link from "next/link";
import {
  Zap,
  BrainCircuit,
  FileText,
  Crop,
  Minimize,
  Combine,
  ScanText,
  ArrowRight,
} from "lucide-react";

// ✅ FULL SEO METADATA — AdSense Approved + Google Indexing Guaranteed
export const metadata = {
  title: "Top Free AI Tools for Students in 2025 (No Login Required)",
  description:
    "Best free AI tools for students in 2025. Rewrite notes, extract text, convert PDFs, remove backgrounds, compress images—100% free and no login required.",
  robots: "index, follow",
  alternates: {
    canonical:
      "https://www.taskguru.online/blog/free-ai-tools-for-students-2025",
  },
  openGraph: {
    title: "Top Free AI Tools for Students in 2025 (No Login Required)",
    description:
      "Explore the best free AI tools for students in 2025 — paraphrasing, PDF tools, OCR, image tools and more.",
    url: "https://www.taskguru.online/blog/free-ai-tools-for-students-2025",
    type: "article",
    images: [
      {
        url: "https://www.taskguru.online/assets/student-ai-tools-featured.png",
        width: 1200,
        height: 630,
        alt: "AI Tools for Students 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Free AI Tools for Students in 2025",
    description:
      "Use the best online AI tools for students — paraphraser, PDF tools, OCR, background remover, compressor & more.",
    images: [
      "https://www.taskguru.online/assets/student-ai-tools-featured.png",
    ],
  },
};

// ✅ JSON-LD Schema (Google News + AdSense safe)
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Top Free AI Tools for Students in 2025 (No Login Required)",
  image:
    "https://www.taskguru.online/assets/student-ai-tools-featured.png",
  author: {
    "@type": "Person",
    name: "Shubham Gautam",
  },
  publisher: {
    "@type": "Organization",
    name: "TaskGuru",
    logo: {
      "@type": "ImageObject",
      url: "https://www.taskguru.online/logo.png",
    },
  },
  url: "https://www.taskguru.online/blog/free-ai-tools-for-students-2025",
  datePublished: "2025-12-01",
  dateModified: "2025-12-01",
  description:
    "A complete guide to the best free AI tools for students in 2025.",
};

export default function FreeAiTools2025Post() {
  return (
    <>
      <Script
        id="student-ai-blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-lg max-w-none dark:prose-invert">

          {/* HEADER */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary">
              Top Free AI Tools for Students in 2025 (No Login Required)
            </h1>
            <p className="text-muted-foreground mt-3">
              Published: December 2025 • Tools that make learning effortless.
            </p>
          </header>

          {/* INTRO */}
          <section className="mb-12">
            <p className="text-xl leading-relaxed">
              Student life moves fast — notes, projects, assignments,
              presentations. AI helps you finish work faster, cleaner, and more confidently.
            </p>

            <p className="mt-4">
              TaskGuru provides free, fast, no-login tools designed for modern students.  
              Explore more articles on our{" "}
              <Link href="/blog" className="text-primary underline">
                blog library
              </Link>{" "}
              or try{" "}
              <Link href="/tools/text-paraphraser" className="text-primary underline">
                AI Paraphraser
              </Link>{" "}
              instantly.
            </p>

            <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 mt-6">
              <p className="text-lg">
                Think of these tools as your quiet assistant — helping you finish academic tasks with clarity and speed.
              </p>
            </div>
          </section>

          {/* WHY AI */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary">Why AI Matters for Students in 2025</h2>

            <p className="mt-3 leading-relaxed">
              Digital submissions are now the norm — clean formatting and quick output are essential.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
              <li>✔ Rewrite and improve clarity</li>
              <li>✔ Extract text instantly</li>
              <li>✔ Clean presentation visuals</li>
              <li>✔ Convert PDFs within seconds</li>
            </ul>
          </section>

          {/* ----------- TOOL #1 ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-blue-600">
              <BrainCircuit className="w-7 h-7" /> 1. AI Paraphraser
            </h2>

            <p className="mt-3">
              Transform confusing paragraphs into simple, academic-ready writing.
            </p>

            <Link
              href="/tools/text-paraphraser"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Try Paraphraser <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* ----------- TOOL #2 ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-teal-600">
              <ScanText className="w-7 h-7" /> 2. Image to Text (OCR)
            </h2>

            <p className="mt-3">Upload a photo — get editable text instantly.</p>

            <Link
              href="/tools/image-to-text"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Extract Text <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* ----------- TOOL #3 ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-indigo-600">
              <Crop className="w-7 h-7" /> 3. Background Remover
            </h2>

            <p className="mt-3">
              Get clean PNGs for presentations, projects, and documents.
            </p>

            <Link
              href="/tools/background-remover"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Remove Background <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* ----------- TOOL #4 ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-green-600">
              <Minimize className="w-7 h-7" /> 4. Image Compressor
            </h2>

            <p className="mt-3">Reduce file size without losing quality.</p>

            <Link
              href="/tools/image-compressor"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Compress Image <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* ----------- TOOL #5 ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-red-600">
              <FileText className="w-7 h-7" /> 5. PDF to Word
            </h2>

            <p className="mt-3">Convert uneditable PDFs into Word files instantly.</p>

            <Link
              href="/tools/pdf-to-word"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Convert PDF <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* ----------- TOOL #6 ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-purple-600">
              <Combine className="w-7 h-7" /> 6. Merge PDF
            </h2>

            <p className="mt-3">Combine multiple PDFs into one organized file.</p>

            <Link
              href="/tools/merge-pdf"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Merge PDFs <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* ----------- TOOL #7 (NEW) ----------- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-orange-600">
              <FileText className="w-7 h-7" /> 7. Image to PDF
            </h2>

            <p className="mt-3">
              Convert photos, notes, diagrams or scanned pages into a clean PDF — ideal for homework and submissions.
            </p>

            <div className="mt-5 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold mb-2">Best uses</h3>
              <ul className="space-y-1">
                <li>• Convert book pages to PDF</li>
                <li>• Submit handwritten assignments</li>
                <li>• Combine multiple photos into one PDF</li>
                <li>• Digital record keeping</li>
              </ul>
            </div>

            <Link
              href="/tools/image-to-pdf"
              className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
            >
              Convert Images to PDF <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* AUTHOR BIO (Required for AdSense E-E-A-T compliance) */}
          <section className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 mt-10 border border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-3">About the Author</h3>
            <p>
              This article is written by <strong>Shubham Gautam</strong>, creator of TaskGuru — 
              a platform offering free productivity and AI tools for students and creators. 
              Shubham works on simplifying digital workflows using clean, fast, no-login utilities.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-20 mt-14">
            <h2 className="text-3xl font-bold text-primary">FAQ</h2>

            <div className="space-y-6 mt-6">
              <p><strong>Are TaskGuru tools free?</strong><br />Yes. Fully free.</p>
              <p><strong>Do they work on mobile?</strong><br />Yes. Fast and smooth.</p>
              <p><strong>Are files stored?</strong><br />No. Everything is processed instantly on the client side.</p>
              <p><strong>Who can use these tools?</strong><br />Students, teachers, office users, and creators.</p>
            </div>
          </section>

          {/* CTA */}
          <section className="p-6 bg-primary/10 rounded-xl border-l-4 border-primary mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6" /> Explore More Tools
            </h3>
            <p className="leading-relaxed mb-4">
              Free, fast & powerful tools designed to make your academic workflow easier.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-primary hover:bg-indigo-700 transition"
            >
              Visit TaskGuru <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </section>

        </article>
      </main>
    </>
  );
}
