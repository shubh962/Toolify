import ImageToText from "@/components/tools/ImageToText";

export const metadata = {
  title: "Image to Text Converter (OCR) – Extract Text from Images | TaskGuru",
  description:
    "Free Online OCR tool to extract text from JPG, PNG, and WEBP images instantly. Fast, accurate & secure image-to-text converter.",
  keywords: [
    "image to text",
    "ocr",
    "extract text from image",
    "photo to text",
    "jpg to text",
    "png to text",
    "scan text from image",
    "online ocr",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-text",
  },
  openGraph: {
    title: "Free Image to Text Converter (OCR) | TaskGuru",
    description:
      "Upload an image and convert it to editable text instantly using OCR. No signup needed.",
    url: "https://www.taskguru.online/tools/image-to-text",
    type: "website",
  },
};

export default function Page() {
  return <ImageToText />;
}
