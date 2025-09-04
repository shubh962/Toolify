"use client";

import Script from "next/script";

export default function BlogPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which is the best free PDF to Word converter online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best free PDF to Word converter is TaskGuru’s tool. It preserves formatting, works online in your browser, and requires no signup."
        }
      },
      {
        "@type": "Question",
        "name": "How can I remove background from an image online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru offers an AI-powered Background Remover that removes backgrounds instantly from images without Photoshop or complex editing."
        }
      },
      {
        "@type": "Question",
        "name": "How do I compress images without losing quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With TaskGuru’s Image Compressor, you can reduce JPG, PNG, and WebP file sizes while maintaining sharp quality, perfect for faster uploads."
        }
      },
      {
        "@type": "Question",
        "name": "What is an AI text paraphraser and why use it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI text paraphraser rewrites text in a smarter way while keeping the meaning intact. TaskGuru provides a free paraphrasing tool for essays, blogs, and professional writing."
        }
      },
      {
        "@type": "Question",
        "name": "How do I extract text from images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru’s Image to Text OCR tool lets you upload images and copy the extracted text instantly, useful for scanned notes, receipts, and photos."
        }
      }
    ]
  };

  return (
    <>
      {/* ✅ FAQ Schema (specific to blog page) */}
      <Script
        id="faq-schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ Blog Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            🚀 The Ultimate Free Online Tools You Need in 2025
          </h1>
          <p className="mb-6">
            Welcome to <strong>TaskGuru</strong> – your one-stop platform for
            free, powerful, and AI-powered online tools. Whether you need to{" "}
            <em>convert PDFs, edit images, compress files, paraphrase content,</em>{" "}
            or <em>extract text</em>, we’ve got you covered. Everything works
            online, no software downloads required.
          </p>

          {/* PDF to Word */}
          <h2 className="text-2xl font-semibold mt-10">
            📄 Free PDF to Word Converter
          </h2>
          <p>
            Need to edit a PDF? With the{" "}
            <a
              href="https://taskguru.online/tools/pdf-to-word"
              className="text-primary underline"
            >
              PDF to Word Converter
            </a>{" "}
            from TaskGuru, you can turn PDFs into fully editable Word documents
            instantly. Unlike many tools that mess up formatting, our converter
            keeps your layout, fonts, and tables intact.
          </p>

          {/* Background Remover */}
          <h2 className="text-2xl font-semibold mt-10">
            🖼️ Free AI Background Remover
          </h2>
          <p>
            Editing images doesn’t need to be hard. Our{" "}
            <a
              href="https://taskguru.online/tools/background-remover"
              className="text-primary underline"
            >
              Background Remover
            </a>{" "}
            uses AI to cut out image backgrounds automatically. Perfect for
            product photos, profile pictures, or creative designs.
          </p>

          {/* Image Compressor */}
          <h2 className="text-2xl font-semibold mt-10">
            📉 Free Image Compressor
          </h2>
          <p>
            Big images slow down websites and uploads. With TaskGuru’s{" "}
            <a
              href="https://taskguru.online/tools/image-compressor"
              className="text-primary underline"
            >
              Image Compressor
            </a>
            , you can shrink image file sizes up to 80% while keeping
            high-quality resolution.
          </p>

          {/* Text Paraphraser */}
          <h2 className="text-2xl font-semibold mt-10">
            ✍️ Free AI Text Paraphraser
          </h2>
          <p>
            Struggling with essays or blog writing? TaskGuru’s{" "}
            <a
              href="https://taskguru.online/tools/text-paraphraser"
              className="text-primary underline"
            >
              AI Text Paraphraser
            </a>{" "}
            helps you rewrite content while preserving the original meaning.
            Ideal for students, writers, and professionals looking for
            plagiarism-free alternatives.
          </p>

          {/* Image to Text */}
          <h2 className="text-2xl font-semibold mt-10">
            🔠 Free Image to Text (OCR)
          </h2>
          <p>
            Turn images into editable text with our{" "}
            <a
              href="https://taskguru.online/tools/image-to-text"
              className="text-primary underline"
            >
              Image to Text OCR
            </a>
            . Whether it’s scanned notes, receipts, or photos, TaskGuru’s OCR
            extracts accurate text that you can copy and use right away.
          </p>

          {/* FAQ Section */}
          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              ❓ Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">
                  Which is the best free PDF to Word converter online?
                </h3>
                <p>
                  TaskGuru’s PDF to Word Converter is free, secure, and
                  preserves document formatting.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  How can I remove background from an image online?
                </h3>
                <p>
                  Upload your image to TaskGuru’s Background Remover and
                  download a transparent PNG instantly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  How do I compress images without losing quality?
                </h3>
                <p>
                  TaskGuru’s Image Compressor reduces file size while keeping
                  high resolution intact.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">What is an AI text paraphraser?</h3>
                <p>
                  It’s a tool that rewrites text smartly. TaskGuru’s paraphraser
                  creates plagiarism-free versions instantly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">How do I extract text from images?</h3>
                <p>
                  Use TaskGuru’s Image-to-Text OCR to upload images and copy
                  extracted text within seconds.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
