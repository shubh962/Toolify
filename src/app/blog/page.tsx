'use client';

import Head from "next/head";
import Script from "next/script";

export default function BlogPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best free PDF to Word converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru offers a free online PDF to Word converter that keeps formatting intact and works instantly in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "How to remove background from an image online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use TaskGuru’s AI Background Remover to remove image backgrounds instantly without Photoshop."
        }
      },
      {
        "@type": "Question",
        "name": "How to compress images without losing quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru’s free Image Compressor tool reduces file size while keeping high quality, perfect for web uploads."
        }
      },
      {
        "@type": "Question",
        "name": "What is an AI text paraphraser?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI text paraphraser rewrites sentences while keeping the meaning intact. TaskGuru provides a free online text paraphraser."
        }
      },
      {
        "@type": "Question",
        "name": "How to extract text from images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru’s Image to Text (OCR) tool lets you upload images and instantly copy the extracted text."
        }
      }
    ]
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Free Online Tools – PDF, Images & Text Utilities | TaskGuru</title>
        <meta
          name="description"
          content="Explore TaskGuru’s free online tools: PDF to Word converter, Background Remover, Image Compressor, Text Paraphraser, and Image-to-Text (OCR). No signup, 100% free."
        />
        <meta
          name="keywords"
          content="pdf to word, free pdf converter, background remover, remove image background, image compressor, compress jpg png, text paraphraser, rewrite text, image to text, OCR online"
        />
        <link rel="canonical" href="https://taskguru.online/blog" />
      </Head>

      {/* ✅ FAQ Schema */}
      <Script
        id="faq-schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ Blog Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            Ultimate Free Online Tools for PDFs, Images, and Text – TaskGuru
          </h1>
          <p className="mb-6">
            Looking for the best free online tools? 🚀 TaskGuru brings you a
            collection of AI-powered utilities that save time, improve
            productivity, and work right in your browser. No downloads, no
            signup required.
          </p>

          {/* PDF to Word */}
          <h2 className="text-2xl font-semibold mt-8">📄 Free PDF to Word Converter</h2>
          <p>
            Convert <strong>PDF to Word online</strong> instantly. TaskGuru’s{" "}
            <a href="/pdf-to-word" className="text-primary underline">
              PDF to Word Converter
            </a>{" "}
            keeps formatting intact and is 100% free to use.
          </p>

          {/* Background Remover */}
          <h2 className="text-2xl font-semibold mt-8">🖼️ Free AI Background Remover</h2>
          <p>
            Remove backgrounds from images instantly without Photoshop. Just
            upload your photo and TaskGuru’s{" "}
            <a href="/tools/background-remover" className="text-primary underline">
              Background Remover
            </a>{" "}
            does the magic.
          </p>

          {/* Image Compressor */}
          <h2 className="text-2xl font-semibold mt-8">📉 Free Image Compressor</h2>
          <p>
            Use our{" "}
            <a href="/tools/image-compressor" className="text-primary underline">
              Image Compressor
            </a>{" "}
            to <strong>compress JPG, PNG, or WebP</strong> without losing
            quality. Perfect for faster websites and sharing online.
          </p>

          {/* Text Paraphraser */}
          <h2 className="text-2xl font-semibold mt-8">✍️ Free AI Text Paraphraser</h2>
          <p>
            Rewrite essays, blog posts, or articles with TaskGuru’s{" "}
            <a href="/text-paraphraser" className="text-primary underline">
              AI Text Paraphraser
            </a>
            . Generate plagiarism-free, high-quality content instantly.
          </p>

          {/* Image to Text */}
          <h2 className="text-2xl font-semibold mt-8">🔠 Free Image to Text (OCR)</h2>
          <p>
            Extract text from scanned documents or photos with{" "}
            <a href="/tools/image-to-text" className="text-primary underline">
              Image to Text OCR
            </a>
            . Upload an image and copy the text. Works for notes, receipts, and more.
          </p>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">What is the best free PDF to Word converter?</h3>
                <p>TaskGuru’s PDF to Word converter is free, fast, and works online without signup.</p>
              </div>
              <div>
                <h3 className="font-semibold">How to remove background from an image online?</h3>
                <p>Upload your photo to TaskGuru’s AI Background Remover and download a clean cut-out instantly.</p>
              </div>
              <div>
                <h3 className="font-semibold">How to compress images without losing quality?</h3>
                <p>Use TaskGuru’s Image Compressor to shrink file sizes while keeping high-quality results.</p>
              </div>
              <div>
                <h3 className="font-semibold">How to paraphrase text online?</h3>
                <p>Paste your content into TaskGuru’s AI Text Paraphraser and get rewritten text instantly.</p>
              </div>
              <div>
                <h3 className="font-semibold">How to extract text from images?</h3>
                <p>Upload an image into TaskGuru’s Image to Text OCR tool and copy the extracted text easily.</p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
