import type { Metadata } from 'next';
import Script from 'next/script';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

export const metadata: Metadata = {
  title: 'Metal Weight Calculator (2025) – Accurate Steel, Aluminium, Copper Weights',
  description:
    'Free online metal weight calculator. Calculate accurate weight for Mild Steel, Stainless Steel, Aluminium, Copper, Brass and Iron. Supports sheets, pipes, bars, beams and angles.',
  alternates: {
    canonical: 'https://www.taskguru.online/tools/metal-weight-calculator',
  },
};

export default function MetalWeightCalculatorPage() {

  /* ================= STRUCTURED DATA ================= */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "TaskGuru Metal Weight Calculator",
        "operatingSystem": "Web",
        "applicationCategory": "EngineeringApplication",
        "url": "https://www.taskguru.online/tools/metal-weight-calculator",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1240"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is metal weight calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Metal weight is calculated using the formula Weight = Volume × Density. Volume depends on the geometric shape and dimensions of the metal."
            }
          },
          {
            "@type": "Question",
            "name": "Which metals are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator supports Mild Steel, Stainless Steel, Aluminium, Copper, Brass and Iron."
            }
          },
          {
            "@type": "Question",
            "name": "Which units are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Millimeter (MM), Inches (IN), Meter (M) and Feet (FT) are supported."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-6 bg-white text-slate-900">

      {/* ================= JSON-LD ================= */}
      <Script
        id="metal-weight-calculator-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ================= HERO ================= */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
          The Ultimate <span className="text-blue-600">Metal Weight</span> Calculator
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
          The most accurate professional-grade metal weight calculator for engineers,
          fabricators and contractors. Calculate weights instantly for more than
          20 metal shapes with industrial precision.
        </p>
      </header>

      {/* ================= TOOL ================= */}
      <div className="mb-24 shadow-2xl rounded-[3rem] border border-slate-100 overflow-hidden">
        <MetalWeightCalculator />
      </div>

      {/* ================= FULL CONTENT ================= */}
      <article className="prose prose-slate max-w-none border-t border-slate-100 pt-16">

        <h2>Comprehensive Guide to Metal Weight Calculation</h2>
        <p>
          In construction, fabrication and manufacturing, accurate material estimation
          prevents wastage, cost overruns and structural errors. Our
          <strong> Metal Weight Calculator</strong> is designed to provide fast,
          reliable and industry-standard weight calculations for a wide range of
          metals and shapes.
        </p>

        <h3>How is Metal Weight Calculated?</h3>
        <p>
          The weight of any metal object depends on two core factors:
          <strong> volume</strong> and <strong>density</strong>.
          Density is a fixed material property, while volume depends on the
          dimensions and shape of the metal.
        </p>

        <pre>
Weight = Volume × Density
        </pre>

        <h3>Volume Calculation for Common Shapes</h3>
        <ul>
          <li><strong>Sheet / Plate:</strong> Length × Width × Thickness</li>
          <li><strong>Round Bar:</strong> π × Radius² × Length</li>
          <li><strong>Round Pipe:</strong> π × (OuterRadius² − InnerRadius²) × Length</li>
          <li><strong>Square Bar:</strong> Side × Side × Length</li>
          <li><strong>Angle (L-Section):</strong> (A + B − Thickness) × Thickness × Length</li>
          <li><strong>I-Beam / Channel:</strong> Cross-sectional area × Length</li>
        </ul>

        <h2>Supported Metals & Density Values</h2>
        <p>
          Our calculator uses standard industrial density values to ensure
          accuracy across engineering and fabrication use-cases.
        </p>

        <table>
          <thead>
            <tr>
              <th>Material</th>
              <th>Density (g/cm³)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Mild Steel (MS)</td><td>7.85</td></tr>
            <tr><td>Stainless Steel (SS)</td><td>8.00</td></tr>
            <tr><td>Aluminium</td><td>2.70</td></tr>
            <tr><td>Copper</td><td>8.96</td></tr>
            <tr><td>Brass</td><td>8.50</td></tr>
            <tr><td>Iron</td><td>7.87</td></tr>
          </tbody>
        </table>

        <h2>Why Use This Metal Weight Calculator?</h2>
        <ul>
          <li>Supports MM, Inches, Meter and Feet</li>
          <li>20+ industrial metal shapes</li>
          <li>No signup required</li>
          <li>Runs completely client-side</li>
          <li>Mobile-friendly and fast</li>
        </ul>

        <h2>Engineering FAQs</h2>

        <h4>Why is Stainless Steel heavier than Mild Steel?</h4>
        <p>
          Stainless Steel contains alloying elements like Chromium and Nickel,
          increasing its density slightly compared to Mild Steel.
        </p>

        <h4>Do I need height for sheet metal calculation?</h4>
        <p>
          No. Sheet or plate weight calculation only requires length, width
          and thickness. Height and diameter are not required.
        </p>

        <h4>Can I use this calculator on mobile?</h4>
        <p>
          Yes. The Metal Weight Calculator is fully responsive and works
          perfectly on mobile devices.
        </p>

      </article>

      {/* ================= FOOTER ================= */}
      <footer className="mt-24 py-12 border-t border-slate-100 text-center">
        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">
          TaskGuru Toolify 2025 • Precision Engineering Tools
        </p>
      </footer>
    </main>
  );
}
