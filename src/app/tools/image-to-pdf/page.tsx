import ImageToPdf from "@/components/tools/ImageToPdf";

export const metadata = {
  title: "Image to PDF Converter – Free JPG/PNG to PDF Tool | TaskGuru",
  description:
    "Convert JPG & PNG images to professional A4 PDFs instantly using TaskGuru. Fast, secure, no login required.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-pdf",
  },
};

export default function Page() {
  return (
    <div className="space-y-16 py-10">

      {/* ⭐ 1. Heading Section */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to PDF Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert JPG & PNG images to clean A4 PDF instantly — Free, Secure & Fast.
        </p>
      </section>

      {/* ⭐ 2. TOOL SECTION */}
      <ImageToPdf />

      {/* ⭐ 3. ABOUT & SEO CONTENT */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow p-6 rounded-xl space-y-4">

        <h2 className="text-2xl font-bold">Why Convert Images to PDF? A Complete 2025 Guide</h2>
        <p>
          Many people need a simple and reliable way to convert images into PDF files.
          Whether you’re a student submitting homework, a working professional handling
          documents, or someone who wants a clean digital record of photos, PDF format is
          more secure, more organized, and easier to share than loose image files.
        </p>

        <h3 className="text-xl font-semibold">Benefits of Using an Image-to-PDF Converter</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Professional A4 formatting — clean and print-ready</li>
          <li>Most portals accept PDFs instead of image uploads</li>
          <li>Multiple images can be combined into one document</li>
          <li>Compatible across all devices without losing quality</li>
          <li>PDFs can be secured, encrypted, and locked</li>
        </ul>

        <h3 className="text-xl font-semibold">Why TaskGuru’s Converter Is Different</h3>
        <p>
          Unlike most converters, TaskGuru processes your images directly on your device.
          Nothing is uploaded to any server. This ensures 100% privacy, instant speed,
          and secure handling of sensitive photos, receipts, ID cards, notes, and documents.
        </p>

        <h3 className="text-xl font-semibold">Common Uses</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Submitting ID cards and certificates</li>
          <li>Creating project or assignment PDFs</li>
          <li>Organizing receipts and scanned documents</li>
          <li>Sharing handwritten notes professionally</li>
          <li>Making clean multi-page PDFs</li>
        </ul>

        <p>
          Toolify’s Image-to-PDF Converter is built to be simple, fast, secure, and fully free.
          No login, no watermark, no wait time — convert your images to PDF instantly.
        </p>

      </section>

    </div>
  );
}
