import ImageToPdf from "@/components/tools/ImageToPdf";

export const metadata = {
  title: "Image to PDF Converter – Free JPG/PNG to PDF Tool | Taskguru",
  description:
    "Convert JPG and PNG images into high-quality PDF files instantly using Toolify’s free Image to PDF Converter. Fast, secure, no login required, and fully browser-based.",
  robots: "index, follow",
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
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-pdf",
  },
  openGraph: {
    title: "Free Image to PDF Converter | Toolify",
    description:
      "Convert images to PDF in seconds — 100% free, no signup, no watermark. Works entirely in your browser.",
    url: "https://www.taskguru.online/tools/image-to-pdf",
    type: "website",
    images: [
      {
        url: "https://www.taskguru.online/assets/image-to-pdf-og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  return <ImageToPdf />;
}
