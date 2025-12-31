import SplitPdf from "@/components/tools/SplitPdf";
import Link from "next/link";

export const metadata = {
  title: "Free PDF Splitter – Separate PDF Pages Online | TaskGuru",[span_15](end_span)
  description: "Split PDF files into individual pages instantly using our free online PDF splitter. No signup, no uploads, 100% browser-based and privacy-safe.",[span_16](end_span)
  alternates: {
  canonical: "https://www.taskguru.online/tools/split-pdf",[span_17](end_span)
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "TaskGuru PDF Splitter",
        "url": "https://www.taskguru.online/tools/split-pdf",
        "applicationCategory": "Utility",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0" }
      },
      {
        "@type": "HowTo",
        "name": "How to Split PDF Pages Online",
        "step": [
          { "@type": "HowToStep", "text": "Upload your PDF file using the selector." [span_18](start_span)},[span_18](end_span)
          { "@type": "HowToStep", "text": "Click the Split PDF button." [span_19](start_span)},[span_19](end_span)
          { "@type": "HowToStep", "text": "Download individual PDF pages instantly from the list." [span_20](start_span)}
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is TaskGuru PDF Splitter free to use?",[span_20](end_span)
            "acceptedAnswer": {
              "@type": "Answer",
              [span_21](start_span)"text": "Yes, TaskGuru PDF Splitter is completely free and does not require any signup."[span_21](end_span)
            }
          },
          {
            "@type": "Question",
            [span_22](start_span)"name": "Are my PDF files uploaded to a server?",[span_22](end_span)
            "acceptedAnswer": {
              "@type": "Answer",
              [span_23](start_span)"text": "No. All PDF splitting happens locally in your browser for maximum privacy."[span_23](end_span)
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="text-center space-y-4">
        [span_24](start_span)<h1 className="text-3xl md:text-5xl font-bold">Split PDF Online for Free</h1>[span_24](end_span)
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Easily split a PDF file into individual pages using TaskGuru’s free PDF Splitter. 
          [span_25](start_span)Your files are processed securely inside your browser and are never uploaded to any server.[span_25](end_span)
        </p>
      </header>

      <section>
        <SplitPdf />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
        [span_26](start_span)<div className="bg-white p-4 border rounded-xl shadow-sm">✅ No signup required</div>[span_26](end_span)
        [span_27](start_span)<div className="bg-white p-4 border rounded-xl shadow-sm">✅ No watermark added</div>[span_27](end_span)
        [span_28](start_span)<div className="bg-white p-4 border rounded-xl shadow-sm">✅ Files never leave device</div>[span_28](end_span)
        [span_29](start_span)<div className="bg-white p-4 border rounded-xl shadow-sm">✅ Works on all browsers</div>[span_29](end_span)
      </section>

      <article className="prose prose-gray max-w-none space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What is a PDF Splitter and Why Use It?</h2>
          <p className="text-gray-700 text-lg">
            [span_30](start_span)A PDF splitter is a tool that allows you to break a multi-page PDF document into separate, individual pages.[span_30](end_span) 
            [span_31](start_span)This is useful when you want to extract only specific pages from a large document or share selected pages without sending the entire file.[span_31](end_span)
          </p>
          <p className="text-gray-700">
            Common use cases include extracting a single invoice from a monthly batch, separating chapters of an eBook for focused study, 
            or isolating specific legal exhibits for court filings.
          </p>
        </section>

        <section className="bg-gray-50 p-8 rounded-2xl space-y-4">
          <h2 className="text-2xl font-semibold">Technical Safety & Privacy</h2>
          <p>
            Unlike other online tools, TaskGuru uses <strong>client-side processing</strong>. This means the splitting occurs in your 
            [span_32](start_span)computer&apos;s RAM, not on our servers.[span_32](end_span) This architectural choice ensures that sensitive information remains 
            completely private and secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How to Split a PDF File Online</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Select your PDF file using the file picker above.</li>
            <li>Click the <strong>Split PDF Now</strong> button.</li>
            <li>Once processing is complete, a list of individual pages will appear.</li>
            <li>Click the <strong>Download</strong> link on any page you wish to save.</li>
          </ol>
        </section>

        <section className="space-y-4">
          [span_33](start_span)<h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>[span_33](end_span)
          <div className="space-y-6">
            <div>
              <p className="font-bold underline italic">Is TaskGuru PDF Splitter free to use?</p>
              [span_34](start_span)<p>Yes, the PDF Splitter is completely free with no signup or payment required.[span_34](end_span)</p>
            </div>
            <div>
              <p className="font-bold underline italic">Are my PDF files uploaded to a server?</p>
              <p>No. [span_35](start_span)All processing happens locally in your browser to ensure privacy.[span_35](end_span)</p>
            </div>
            <div>
              <p className="font-bold underline italic">Can I split large PDF files?</p>
              [span_36](start_span)<p>Yes, as long as your browser has sufficient memory to process the file size.[span_36](end_span)</p>
            </div>
          </div>
        </section>
      </article>

      <section className="space-y-3 border-t pt-10">
        [span_37](start_span)<h3 className="text-xl font-semibold">Related PDF Tools</h3>[span_37](end_span)
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <Link href="/tools/merge-pdf" className="text-blue-600 underline font-bold">Merge PDF</Link>
            [span_38](start_span)<p className="text-sm text-gray-500 mt-1">Combine multiple PDF files into one</p>[span_38](end_span)
          </li>
          <li className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <Link href="/tools/pdf-to-word" className="text-blue-600 underline font-bold">PDF to Word</Link>
            [span_39](start_span)<p className="text-sm text-gray-500 mt-1">Convert PDF to editable Word files</p>[span_39](end_span)
          </li>
          <li className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <Link href="/tools/image-to-pdf" className="text-blue-600 underline font-bold">Image to PDF</Link>
            [span_40](start_span)<p className="text-sm text-gray-500 mt-1">Convert images into PDF format</p>[span_40](end_span)
          </li>
        </ul>
      </section>
    </main>
  );
}

