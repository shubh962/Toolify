import SplitPdf from "@/components/tools/SplitPdf";

export const metadata = {
  title: "Free PDF Splitter – Separate PDF Pages Online | TaskGuru",
  description:
    "Split PDF files into individual pages instantly. Free, fast, no signup required. 100% browser-based and privacy-safe.",
  alternates: {
    canonical: "https://www.taskguru.online/tools/split-pdf",
  },
};

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Split PDF Online for Free</h1>

      <p className="text-gray-600">
        Upload your PDF and split it into individual pages instantly. Your file
        never leaves your device.
      </p>

      <SplitPdf />

      {/* SEO CONTENT */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What is a PDF Splitter?</h2>
        <p>
          A PDF splitter allows you to separate a multi-page PDF document into
          individual pages. This is useful when you need only specific pages
          from a document.
        </p>

        <h2 className="text-xl font-semibold">How to Split a PDF Online</h2>
        <ul className="list-disc pl-6">
          <li>Upload your PDF file</li>
          <li>Click the Split PDF button</li>
          <li>Download individual PDF pages</li>
        </ul>

        <h2 className="text-xl font-semibold">Why Use TaskGuru PDF Splitter?</h2>
        <ul className="list-disc pl-6">
          <li>No signup required</li>
          <li>No watermark</li>
          <li>Works entirely in your browser</li>
          <li>Ad-free experience</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

        <p><strong>Is this PDF splitter free?</strong><br />Yes, it is completely free.</p>
        <p><strong>Are my files uploaded?</strong><br />No, all processing happens locally.</p>
        <p><strong>Can I split large PDFs?</strong><br />Yes, as long as your browser supports it.</p>
      </section>
    </main>
  );
}
