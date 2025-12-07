import ImageToPdf from "@/components/tools/ImageToPdf";

export const metadata = {
  title: "Image to PDF Converter – Free JPG/PNG to PDF Tool | TaskGuru",
  description:
    "Convert JPG & PNG images into clean, professional A4 PDF instantly using TaskGuru's free Image to PDF Converter. Fast, secure, no login required, and 100% browser-based.",
  robots: "index, follow",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "photo to pdf",
    "convert image to pdf",
    "pdf converter online",
    "taskguru image to pdf",
    "free image converter",
  ],
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-pdf",
  },
  openGraph: {
    title: "Free Image to PDF Converter | TaskGuru",
    description:
      "Convert images to PDF in seconds — 100% free, no signup, no watermark. Works entirely in your browser.",
    url: "https://www.taskguru.online/tools/image-to-pdf",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="space-y-16 py-10">

      {/* ⭐ Server-Side Rendered Hero (Google Will Index This) */}
      <section className="max-w-4xl mx-auto text-center space-y-4 px-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to PDF Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert JPG & PNG images to clean A4 PDF instantly — Free, Secure & Fast.
        </p>
      </section>

      {/* ⭐ Server-Side SEO Content (IMPORTANT FOR INDEXING) */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow p-6 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">Why Convert Images to PDF? A Complete 2025 Guide</h2>

        <p>
          Converting images into PDF format has become a daily requirement for students, creators,
          office professionals, and individuals. A PDF file is more secure, more organized, and far more
          professional than loose image files. Whether you're submitting homework, uploading documents,
          or storing photographs, PDF ensures compatibility everywhere.
        </p>

        <h3 className="text-xl font-semibold">Benefits of Using an Image-to-PDF Converter</h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>PDFs look professional and print-ready.</li>
          <li>Many websites accept PDFs but reject image uploads.</li>
          <li>Multiple images can be arranged into a single PDF.</li>
          <li>Compatible across all devices without losing quality.</li>
          <li>Easy to lock, secure, encrypt, or share.</li>
        </ul>

        <p>
          TaskGuru’s Image to PDF tool works 100% inside your browser — no file is ever uploaded to
          any server. Your data remains private, secure, and fast. This makes it ideal for sensitive
          documents, ID cards, photos, receipts, notes, and more.
        </p>
      </section>

      {/* ⭐ Client-Side Tool Mount (Main Converter) */}
      <ImageToPdf />

    </div>
  );
}
