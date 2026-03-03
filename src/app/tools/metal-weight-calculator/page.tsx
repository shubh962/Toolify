import type { Metadata } from 'next';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

// title/description come from tools.ts via generateMetadata in [slug]/page.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.taskguru.online/tools/metal-weight-calculator',
  },
};

export default function MetalWeightCalculatorPage() {
  // ✅ FIX 1: Removed fake aggregateRating (ratingValue 4.9, ratingCount 1450)
  // ✅ FIX 5: Removed duplicate FAQPage schema — MetalWeightCalculator.tsx already has it
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TaskGuru Metal Weight Calculator",
    "operatingSystem": "Any",
    "applicationCategory": "BusinessApplication",
    "featureList": "Calculate weight for 12 metal shapes, Real-time density database, Works offline",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    // ✅ FIX 4: Removed <main> wrapper — layout.tsx already has <main>
    // ✅ FIX 4: Removed hardcoded bg-white text-slate-900 — breaks dark mode
    <div className="max-w-6xl mx-auto py-12 px-6">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
          The Ultimate{' '}
          <span className="text-blue-600">Metal Weight</span> Calculator
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
          Professional-grade tool for engineers and fabricators. Instant weight
          estimates for 12 shapes with industrial precision — free, no signup required.
        </p>
      </header>

      {/* TOOL — SEO article + FAQs live inside MetalWeightCalculator.tsx */}
      {/* ✅ FIX 3 + FIX 7: Removed prose classes + removed duplicate SEO article */}
      <div className="shadow-2xl rounded-[3rem] border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <MetalWeightCalculator />
      </div>

      {/* ✅ FIX 2 + FIX 4: Removed local <footer> and "TaskGuru Toolify" branding */}
    </div>
  );
}
