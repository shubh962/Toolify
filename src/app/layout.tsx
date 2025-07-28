import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Toolify | Your All-in-One AI Toolkit',
  description: 'A suite of powerful AI and utility tools to streamline your workflow, including PDF to Word, Image Compressor, and Background Remover.',
  keywords: 'AI tools, PDF to Word, merge PDF, background remover, image compressor, image to text, text paraphraser, free tools',
  openGraph: {
    title: 'Toolify | Your All-in-One AI Toolkit',
    description: 'Discover powerful AI and utility tools to boost your productivity.',
    type: 'website',
    url: 'https://your-website-url.com',
    images: [
      {
        url: 'https://your-website-url.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Toolify - AI Tools Hub',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
        <footer className="py-6 text-center text-muted-foreground">
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <p>Developed with ❤️ by Shubham Gautam</p>
              <span className="hidden sm:inline">|</span>
              <Link href="/about" className="hover:text-primary underline-offset-4 hover:underline">
                About & Copyright
              </Link>
            </div>
            <p className="mt-2 text-xs">© 2025 Toolify — All Rights Reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}