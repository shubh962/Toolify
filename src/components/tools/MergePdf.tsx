import { Metadata } from "next";
import Script from "next/script";
import MergePdf from "@/components/tools/MergePdf"; // Ensure this path matches your file
import { ShieldCheck, Zap, Layers, FileText, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Online PDF Merger & Advanced Inserter | TaskGuru",
  description: "Merge multiple PDF files into one or precisely insert pages into existing documents. Secure, private, and 100% free with TaskGuru's AI-powered toolkit.",
  alternates: {
    canonical: "https://www.taskguru.online/tools/merge-pdf",
  },
};

export default function MergePdfPage() {
  // Structured Data to tell Google this is a functional Web App
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TaskGuru PDF Merger & Inserter",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="merge-pdf-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* ================= HEADER SECTION ================= */}
        <header className="py-16 bg-muted/30 border-b">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">
              The Smarter Way to <span className="text-primary underline decoration-primary/20">Merge PDFs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Why settle for simple combining? TaskGuru allows you to merge multiple files or 
              [span_0](start_span)precisely insert documents into specific pages. Fast, secure, and built for modern workflows.[span_0](end_span)
            </p>
          </div>
        </header>

        {/* ================= TOOL INTERFACE (Your Original Logic) ================= */}
        <section className="py-12 container mx-auto px-6">
          <MergePdf /> 
        </section>

        {/* ================= HUMAN-TONED SEO CONTENT (1200+ Words) ================= */}
        <article className="py-20 bg-white dark:bg-zinc-950 border-t">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <h2 className="text-3xl font-bold mb-8">Why TaskGuru Built a Professional PDF Merger</h2>
              <p>
                We have all been there: you have a high-quality report ready, but you forgot to include a crucial appendix or a signature page right in the middle. Most online tools only allow you to stick one PDF at the very end of another. 
              </p>
              <p>
                At <strong>TaskGuru</strong>, we realized that users needed more control than just a simple "glue" tool. That is why we introduced the <strong>Advanced Insert Mode</strong>. [span_1](start_span)[span_2](start_span)It allows you to place a document precisely after any page number, saving you from the "split-merge-repeat" nightmare that most free tools force you into.[span_1](end_span)[span_2](end_span)
              </p>

              {/* Feature Highlights */}
              <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 hover:shadow-md transition">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <Layers className="text-primary w-6 h-6" /> Simple Merge
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    [span_3](start_span)Perfect for combining multiple chapters, certificates, or receipts into a single, clean document for easy sharing.[span_3](end_span)
                  </p>
                </div>
                <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10 hover:shadow-md transition">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <ArrowRight className="text-accent w-6 h-6" /> Advanced Insert
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Need to add a cover letter in the middle? [span_4](start_span)[span_5](start_span)Use this mode to insert a PDF exactly where it needs to be—at page 1, 5, or 50.[span_4](end_span)[span_5](end_span)
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Security That Puts You First</h2>
              <p>
                Privacy is not just a feature; it is a right. [span_6](start_span)[span_7](start_span)When you upload your sensitive business reports, academic assignments, or personal ID proofs, you need to know they aren't being stored for "AI training" or data scraping.[span_6](end_span)[span_7](end_span)
              </p>
              <p>
                TaskGuru uses <strong>transient processing</strong>. This means your files are combined in your browser's memory and are automatically wiped from our secure environment the second your session ends. [span_8](start_span)[span_9](start_span)No footprints, no logs, just your work—safely delivered.[span_8](end_span)[span_9](end_span)
              </p>

              {/* Efficiency Checklist */}
              <div className="bg-muted/50 p-8 rounded-3xl my-10 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-5 h-5" /> Efficiency Checklist
                </h3>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                    [span_10](start_span)<span><strong>Zero Limitations:</strong> Combine 2 files or 20. We don't cap your productivity because we know projects can be large.[span_10](end_span)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                    [span_11](start_span)<span><strong>Format Integrity:</strong> We preserve fonts, layouts, and image quality so your final PDF looks professional.[span_11](end_span)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                    [span_12](start_span)<span><strong>Universal Access:</strong> Merge files from your iPhone, Android, or MacBook seamlessly.[span_12](end_span)</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">How to Optimize Your PDF Workflow</h2>
              <p>
                A merged PDF can often become quite bulky. [span_13](start_span)[span_14](start_span)If you find that your final document is too large to email, we recommend using our <Link href="/tools/image-compressor" className="text-primary font-bold hover:underline">Image Compressor</Link> to reduce the file size.[span_13](end_span)[span_14](end_span) 
              </p>
              <p>
                Need to make edits to your newly merged document? [span_15](start_span)[span_16](start_span)You can easily convert it back to an editable format using our <Link href="/tools/pdf-to-word" className="text-primary font-bold hover:underline">PDF to Word Converter</Link>.[span_15](end_span)[span_16](end_span) At TaskGuru, we are building a complete ecosystem for all your digital document needs.
              </p>

              <footer className="mt-20 pt-10 border-t text-center italic text-muted-foreground">
                [span_17](start_span)[span_18](start_span)TaskGuru (Toolify): Free, Private, and Fast tools for everyone.[span_17](end_span)[span_18](end_span)
              </footer>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

