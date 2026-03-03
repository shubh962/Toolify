import ImageToText from "@/components/tools/ImageToText";

export const metadata = {
  title: "Image to Text Converter (OCR) – Extract Text from Images Online | TaskGuru",
  description:
    "Use the free Image to Text (OCR) tool by TaskGuru to extract text from JPG, PNG, and WEBP images instantly. Fast, accurate, AI-enhanced OCR with no signup required.",
  keywords: [
    "image to text",import ImageToText from "@/components/tools/ImageToText";

export const metadata = {
  title: "Image to Text Converter (OCR) – Extract Text from Images Online | TaskGuru",
  description:
    "Use the free Image to Text (OCR) tool by TaskGuru to extract text from JPG, PNG, and WEBP images instantly. Fast, accurate OCR with no signup required.",
  // ✅ FIX 1: Removed keywords array — Google ignores meta keywords since 2009
  // ✅ FIX 2: Object format — robots string is silently ignored in Next.js App Router
  robots: { index: true, follow: true },
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
  // ✅ FIX 4: Removed icons.icon — favicon belongs in app/layout.tsx, not per-page
};

export default function Page() {
  // ✅ FIX 3: Added h1 hero section — page.tsx owns the h1, ImageToText starts at h2
  return (
    <div className="space-y-16 py-10">
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-lg text-muted-foreground">
          Extract text from JPG, PNG, or WEBP images instantly — free, private, no signup.
        </p>
      </section>

      <ImageToText />
    </div>
  );
}
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
  },import ImageToText from "@/components/tools/ImageToText";

export const metadata = {
  title: "Image to Text Converter (OCR) – Extract Text from Images Online | TaskGuru",
  description:
    "Use the free Image to Text (OCR) tool by TaskGuru to extract text from JPG, PNG, and WEBP images instantly. Fast, accurate OCR with no signup required.",
  // ✅ FIX 1: Removed keywords array — Google ignores meta keywords since 2009
  // ✅ FIX 2: Object format — robots string is silently ignored in Next.js App Router
  robots: { index: true, follow: true },
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
  // ✅ FIX 4: Removed icons.icon — favicon belongs in app/layout.tsx, not per-page
};

export default function Page() {
  // ✅ FIX 3: Added h1 hero section — page.tsx owns the h1, ImageToText starts at h2
  return (
    <div className="space-y-16 py-10">
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-lg text-muted-foreground">
          Extract text from JPG, PNG, or WEBP images instantly — free, private, no signup.
        </p>
      </section>

      <ImageToText />
    </div>
  );
}
};

export default function Page() {
  return <ImageToText />;
}
