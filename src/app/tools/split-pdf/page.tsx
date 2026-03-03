// src/app/tools/split-pdf/page.tsx
import SplitPdfWrapper from '@/components/tools/SplitPdfWrapper';
import Link from "next/link";

export const metadata = {
  title: "Free Online PDF Splitter | Extract Pages Securely",
  description: "Split PDF pages instantly with our free, browser-based tool. 100% private processing. No uploads required.",
  alternates: { canonical: "https://www.taskguru.online/tools/split-pdf" },
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* 1. Tool Section */}
      <section className="text-center space-y-6 pt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Free Online PDF Splitter
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Extract pages from your PDF documents instantly, securely, and completely offline.
        </p>
      </section>

      <SplitPdfWrapper />

      {/* 2. Educational SEO Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h2>What is a PDF Splitter?</h2>
        <p>
          A PDF splitter is a digital utility designed to break down large, multi-page documents 
          into individual files or smaller, manageable segments. Whether you are dealing with 
          a lengthy research paper, a bulk scan of receipts, or a large e-book, splitting 
          allows you to extract exactly the information you need without unnecessary overhead.
        </p>

        <h2>Why Use Our Client-Side Splitter?</h2>
        <p>
          Privacy is our priority. Unlike traditional online converters that force you to upload 
          your sensitive documents to a remote server, our tool processes data entirely in your 
          browser. This offers three distinct advantages:
        </p>
        <ul>
          <li><strong>100% Privacy:</strong> Your files never leave your device.</li>
          <li><strong>Instant Speed:</strong> No waiting for upload queues or server processing.</li>
          <li><strong>Offline Capability:</strong> Since it runs locally, you can work without a constant internet connection once the tool is loaded.</li>
        </ul>

        <h2>How to Split PDF Pages in 3 Steps</h2>
        <ol>
          <li><strong>Upload:</strong> Click the upload area to select the PDF you wish to split.</li>
          <li><strong>Process:</strong> Our local engine automatically analyzes and segments your file.</li>
          <li><strong>Download:</strong> Save your pages individually or download them all at once in a compressed ZIP file.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>Is this tool really free?</h3>
        <p>Yes, we believe essential digital tools should be accessible to everyone at no cost.</p>
        
        <h3>Are my files safe?</h3>
        <p>Absolutely. Because the splitting process happens in your browser's local memory, your files are never transmitted over the internet or stored on our servers.</p>
        
        <h3>Can I split password-protected PDFs?</h3>
        <p>Currently, our tool requires unprotected files. Please remove any encryption or passwords from your PDF before attempting to split it.</p>
      </article>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800">
        <h3 className="font-bold text-lg mb-2">Need more tools?</h3>
        <p className="text-sm">
          Check out our other utilities, including <Link href="/tools/merge-pdf" className="text-blue-600 underline">PDF Merging</Link>, 
          <Link href="/tools/pdf-to-word" className="text-blue-600 underline"> PDF to Word Conversion</Link>, and more.
        </p>
      </section>
    </div>
  );
}
