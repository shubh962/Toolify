import ImageToText from "@/components/tools/ImageToText";

export const metadata = {
  title: "Image to Text Converter (OCR) – Extract Text from Images Online | TaskGuru",
  description:
    "Use the free Image to Text (OCR) tool by TaskGuru to extract text from JPG, PNG, and WEBP images instantly. Fast, accurate, AI-enhanced OCR with no signup required.",
  keywords: [
    "image to text",
    "online ocr",
    "extract text from image",
    "ocr converter",
    "photo to text",
    "jpg to text",
    "png to text",
    "scan text from image",
    "best free ocr tool",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-text",
  },
  openGraph: {
    title: "Free Image to Text Converter (OCR) | TaskGuru",
    description:
      "Convert images into editable text instantly using our free online OCR tool. Works with PNG, JPG, WEBP — fully browser-based and secure.",
    url: "https://www.taskguru.online/tools/image-to-text",
    type: "website",
    images: [
      {
        url: "https://www.taskguru.online/assets/og-image-to-text.png",
        width: 1200,
        height: 630,
        alt: "Image to Text OCR Tool Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Text Converter Online (OCR) | TaskGuru",
    description:
      "Extract text from any image using our free OCR tool. No signup needed, works instantly in your browser.",
    images: ["https://www.taskguru.online/assets/og-image-to-text.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Page() {
  return <ImageToText />;
}
