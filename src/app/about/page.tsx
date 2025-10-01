import Link from 'next/link';
import { Lightbulb, Code, ShieldCheck, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Mission to Simplify Digital Life | TaskGuru',
  description: 'Learn about TaskGuru\'s mission to provide free, secure, and AI-powered online tools for productivity. Founded by Shubham Gautam.',
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-primary text-center">
        Our Mission: Simplify Your Digital Life
      </h1>
      
      {/* Intro Section */}
      <section className="mt-8 space-y-6 text-lg text-gray-700 dark:text-gray-300 border-b pb-8">
        <p>
          Welcome to TaskGuru – your comprehensive toolkit for smart online productivity. We believe that professional-grade tools for tasks like PDF conversion, image editing, and content writing should be free and instantly accessible to everyone.
        </p>
        <p>
          TaskGuru was founded by Shubham Gautam with a single goal: to eliminate the need for complicated software subscriptions and messy installations. We focus on delivering high-speed results directly through your browser.
        </p>
      </section>

      {/* Why Choose Us - Detailed H2/H3 Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground flex items-center justify-center gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-600" /> Why Trust TaskGuru?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Pillar 1: Technology */}
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Code className="w-5 h-5" /> Modern Technology Foundation
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
              <li>Built on Next.js 14 for blazing-fast speed and excellent SEO.</li>
              <li>Utilizes AI (Artificial Intelligence) for accurate tasks like background removal and text paraphrasing.</li>
              <li>Mobile-first design ensures a perfect experience on all devices.</li>
            </ul>
          </div>

          {/* Pillar 2: Security & Privacy */}
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
              <ShieldCheck className="w-5 h-5" /> Our Commitment to Privacy
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
              <li>Zero File Storage: All uploaded files are deleted immediately after processing.</li>
              <li>No mandatory sign-ups, keeping your usage anonymous.</li>
              <li>Clear <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary underline">Terms of Service</Link> available.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-primary hover:bg-indigo-700 transition duration-300">
          <Zap className="w-4 h-4 mr-2" /> Explore Our Free AI Toolkit
        </Link>
      </section>

    </main>
  );
}
