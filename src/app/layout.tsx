import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Toolify – Free Online Tools | Background Remover, Compressor & More',
  description: 'Toolify offers background remover, image compressor, and other useful online tools. 100% free and fast.',
  keywords: 'background remover, image compressor, online tools, Toolify, free tools',
  robots: 'index, follow',
  verification: {
    <meta name="google-site-verification" content="XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU" />
  },
  openGraph: {
    title: 'Toolify – Free Online Tools',
    description: 'Remove backgrounds, compress images, and more with Toolify.',
    url: 'https://toolify.vercel.app',
    siteName: 'Toolify',
    images: [
      {
        url: 'https://toolify.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Toolify Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
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
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <p>Developed with ❤️ by Shubham Gautam</p>
              <span className="hidden sm:inline">|</span>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="hover:text-primary underline-offset-4 hover:underline">
                    About & Copyright
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center mb-4">About Toolify</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Card className="shadow-lg border">
                      <CardHeader>
                        <CardTitle className="text-xl">Our Mission</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          <strong>Toolify</strong> is a digital platform crafted to simplify your daily online tasks with smart, reliable, and user-friendly tools. Founded by <strong>Shubham Gautam</strong>, Toolify aims to empower creators, developers, and everyday users through minimal design and maximum functionality.
                        </p>
                        <p>
                          We believe in delivering seamless experiences, respecting user privacy, and constantly evolving to serve better. Whether you're optimizing productivity or exploring new utilities, Toolify is built to support you — anytime, anywhere.
                        </p>
                        <p className="pt-3 text-center font-semibold text-base text-foreground/90 italic">
                          Toolify – Simple Tools. Smarter Life.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-destructive/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive text-xl">
                          <AlertTriangle className="h-5 w-5" />
                          Copyright Warning
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          <strong>© 2025 Toolify. All rights reserved.</strong>
                        </p>
                        <p>
                          Unauthorized reproduction, redistribution, or modification of any part of this website, its tools, content, or code is strictly prohibited and may result in legal action.
                        </p>
                        <p>
                          Toolify, its logo, and related services are intellectual property of Shubham Gautam.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="mt-4 text-xs">© 2025 Toolify — All Rights Reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
