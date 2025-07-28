import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: 'Toolify | Your All-in-One AI Toolkit',
  description: 'A suite of powerful AI and utility tools to streamline your workflow.',
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
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Header />
        {children}
        <Toaster />
        <footer className="py-6 text-center text-muted-foreground">
          Made By shubham With ❤️
        </footer>
      </body>
    </html>
  );
}
