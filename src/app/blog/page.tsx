import React from "react";
import { Helmet } from "react-helmet";

const tools = [
  {
    name: "Background Remover",
    emoji: "🖼️❌",
    url: "https://taskguru.online/tools/background-remover",
    purpose:
      "Remove the background from any image instantly. Perfect for e-commerce, graphic design, and social media content.",
    steps: [
      "Visit the Background Remover tool",
      "Upload your image",
      "Click Remove Background",
      "Download the result",
    ],
  },
  {
    name: "Image to Text (OCR)",
    emoji: "🖼️➡️📄",
    url: "https://taskguru.online/tools/image-to-text",
    purpose:
      "Extract text from images, scanned documents, or screenshots instantly using AI-powered OCR.",
    steps: [
      "Visit the Image to Text tool",
      "Upload your image",
      "Click Extract Text",
      "Copy the output",
    ],
  },
  {
    name: "Text Paraphraser",
    emoji: "✍️",
    url: "https://taskguru.online/tools/text-paraphraser",
    purpose:
      "Rephrase text in a unique style while keeping the original meaning — ideal for students & content creators.",
    steps: [
      "Visit the Text Paraphraser tool",
      "Paste your text",
      "Click Paraphrase",
      "Copy the new version",
    ],
  },
  {
    name: "PDF to Word Converter",
    emoji: "📄➡️📝",
    url: "https://taskguru.online/tools/pdf-to-word",
    purpose:
      "Convert PDF files into fully editable Word documents in seconds.",
    steps: [
      "Visit the PDF to Word Converter",
      "Upload your PDF",
      "Click Convert",
      "Download the Word file",
    ],
  },
  {
    name: "Merge PDF",
    emoji: "📄➕📄",
    url: "https://taskguru.online/tools/merge-pdf",
    purpose:
      "Combine multiple PDF documents into a single file — quick and easy.",
    steps: [
      "Visit the Merge PDF tool",
      "Upload your PDFs",
      "Click Merge",
      "Download the merged file",
    ],
  },
  {
    name: "Image Compressor",
    emoji: "📉🖼️",
    url: "https://taskguru.online/tools/image-compressor",
    purpose:
      "Reduce image file size without losing quality — great for faster uploads.",
    steps: [
      "Visit the Image Compressor tool",
      "Upload your image",
      "Click Compress",
      "Download the optimized image",
    ],
  },
];

export default function TaskGuruBlog() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>TaskGuru Tools – Free AI Utilities for Productivity</title>
        <meta
          name="description"
          content="Use TaskGuru's free AI tools for background removal, image to text conversion, paraphrasing, PDF to Word, merging PDFs, and compressing images."
        />
        <meta property="og:title" content="TaskGuru – Free AI Tools" />
        <meta
          property="og:description"
          content="Instant online tools for background removal, text extraction, paraphrasing, PDF conversion, and more."
        />
        <meta property="og:url" content="https://taskguru.online/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          🚀 TaskGuru Tools – Step-by-Step Guide
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Free AI-powered tools to simplify your work. Convert, edit, and optimize files in seconds — no signup required.
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Quick Links Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">📌 Quick Tool Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <a
                key={tool.url}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition text-center"
              >
                <div className="text-3xl mb-2">{tool.emoji}</div>
                <h3 className="font-semibold">{tool.name}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* Tool Details */}
        {tools.map((tool) => (
          <section
            key={tool.url}
            className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2">
              {tool.name} {tool.emoji}
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Purpose:</strong> {tool.purpose}
            </p>
            <h3 className="text-lg font-semibold mb-2">How to Use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-4">
              {tool.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try This Tool →
            </a>
          </section>
        ))}
      </main>
    </div>
  );
}
