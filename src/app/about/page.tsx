import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Toolify',
  description: 'Learn more about Toolify, its mission, and the team behind the smart, reliable, and user-friendly tools.',
};

export default function AboutPage() {
  return (
    <div className="flex-1 py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-center text-foreground mb-12">
          About Toolify
        </h1>

        <Card className="shadow-lg mb-10 border">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base text-muted-foreground">
            <p>
              <strong>Toolify</strong> is a digital platform crafted to simplify your daily online tasks with smart, reliable, and user-friendly tools. Founded by <strong>Shubham Gautam</strong>, Toolify aims to empower creators, developers, and everyday users through minimal design and maximum functionality.
            </p>
            <p>
              We believe in delivering seamless experiences, respecting user privacy, and constantly evolving to serve better. Whether you're optimizing productivity or exploring new utilities, Toolify is built to support you — anytime, anywhere.
            </p>
            <p className="pt-4 text-center font-semibold text-lg text-foreground/90 italic">
              Toolify – Simple Tools. Smarter Life.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive text-2xl">
              <AlertTriangle className="h-6 w-6" />
              Copyright Warning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base text-muted-foreground">
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
    </div>
  );
}
