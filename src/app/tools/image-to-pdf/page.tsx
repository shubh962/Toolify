import ImageToPdf from "@/components/tools/ImageToPdf";

export const metadata = {
  title: "Image to PDF Converter – Free JPG/PNG to PDF Tool | Toolify",
  description:
    "Convert JPG and PNG images into high-quality PDF files instantly using Toolify’s free Image to PDF Converter. Fast, secure, no login required, and fully browser-based.",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "photo to pdf",
    "convert image to pdf",
    "online pdf converter",
    "toolify image to pdf",
    "free image converter",
  ],
  openGraph: {
    title: "Free Image to PDF Converter | Toolify",
    description:
      "Convert images to PDF in seconds — 100% free, no signup, no watermark. Works entirely in your browser.",
    url: "https://www.taskguru.online/tools/image-to-pdf",
    type: "website",
  },
};

export default function Page() {
  return <ImageToPdf />;
}
