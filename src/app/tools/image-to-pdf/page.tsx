import ImageToPdf from "@/components/tools/ImageToPdf";

export const metadata = {
  title: "Image to PDF Converter – Free JPG/PNG to PDF Tool | TaskGuru",
  description:
    "Convert JPG & PNG images to professional A4 PDFs instantly using TaskGuru. Fast, secure, no login required.",
  // ✅ FIX 3: Object format — string format is ignored in Next.js App Router
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-pdf",
  },
};

export default function Page() {
  return (
    // ✅ FIX 2: Removed duplicate SEO article — it lives inside ImageToPdf.tsx
    <div className="space-y-16 py-10">
      {/* Hero heading */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to PDF Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert JPG &amp; PNG images to clean A4 PDF instantly — Free, Secure &amp; Fast.
        </p>
      </section>

      {/* Tool + built-in SEO article */}
      <ImageToPdf />
    </div>
  );
}
