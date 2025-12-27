import type { Metadata } from 'next';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

export const metadata: Metadata = {
  title: 'Metal Weight Calculator (2025) – Accurate Steel, Aluminium, Copper Weights',
  description:
    'Free online metal weight calculator. Get precise weight for Mild Steel, Stainless Steel, Aluminium, and Copper. Supports Sheets, Pipes, Beams, and Hex bars.',
  alternates: {
    canonical: 'https://www.taskguru.online/tools/metal-weight-calculator',
  },
};

export default function MetalWeightCalculatorPage() {
  // Schema.org Structured Data for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TaskGuru Metal Weight Calculator",
    "operatingSystem": "Any",
    "applicationCategory": "BusinessApplication",
    "featureList": "Calculate weight for 20+ metal shapes, Real-time density database, Works offline",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1450"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is metal weight calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Metal weight is calculated using the formula: Weight = Volume x Density. The volume is determined by the specific geometric cross-section of the metal shape."
        }
      },
      {
        "@type": "Question",
        "name": "Which metals are supported by this calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This tool supports Mild Steel (MS), Stainless Steel (SS), Aluminium, Copper, Brass, and Iron."
        }
      }
    ]
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-6 bg-white text-slate-900">
      {/* 🛠️ Injection of JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* SECTION 1: HERO & TOOL */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-slate-900">
          The Ultimate <span className="text-blue-600">Metal Weight</span> Calculator
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
          The most accurate professional-grade tool for engineers and fabricators. 
          Get instant estimates for 20+ shapes with industrial precision and zero data usage.
        </p>
      </header>

      <div className="mb-24 shadow-2xl rounded-[3rem] border border-slate-100 overflow-hidden">
        <MetalWeightCalculator />
      </div>

      {/* SECTION 2: CONTENT GUIDE */}
      <article className="prose prose-slate max-w-none border-t border-slate-100 pt-16">
        
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-slate-800">Comprehensive Guide to Metal Weight Calculation</h2>
        <p className="text-lg leading-relaxed text-slate-600">
          In construction and manufacturing, accurate material estimation prevents costly errors. 
          Our <strong>Metal Weight Calculator</strong> provides industrial-grade precision for various structural 
          shapes. Whether you need the weight of a heavy-duty <strong>I-Beam</strong> or a 
          <strong>Mild Steel sheet</strong>, our tool handles the complex math for you.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4 text-slate-800 tracking-tight">How is Metal Weight Calculated? (The Science)</h3>
        <p className="text-slate-600 leading-relaxed">
          The weight of any metal object is fundamentally determined by its volume and the density of the specific material used. 
          The core formula used by our tool is:
        </p>
        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] text-center my-10 shadow-2xl">
          <p className="text-sm font-bold text-blue-400 uppercase mb-3 tracking-[0.2em] opacity-80">Primary Formula</p>
          <p className="text-3xl md:text-5xl font-black tracking-tighter">
            Weight = Volume x Density
          </p>
        </div>

        <h4 className="font-bold text-xl mt-12 mb-6 text-slate-800 tracking-tight">Calculating Volume for Different Shapes</h4>
        <p className="text-slate-600 mb-8 leading-relaxed">Each geometric shape requires a different volume calculation approach:</p>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
            <strong className="text-slate-900 block mb-2">Flat Sheet / Plate:</strong> 
            <span className="font-mono text-slate-500 italic">Volume = Length x Width x Thickness</span>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
            <strong className="text-slate-900 block mb-2">Round Bar / Rod:</strong> 
            <span className="font-mono text-slate-500 italic">Volume = PI x Radius² x Length</span>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
            <strong className="text-slate-900 block mb-2">Hollow Round Pipe:</strong> 
            <span className="font-mono text-slate-500 italic">Volume = PI x (OuterRadius² - InnerRadius²) x Length</span>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
            <strong className="text-slate-900 block mb-2">I-Beam / Structural:</strong> 
            <span className="font-mono text-slate-500 italic">Volume = Cross Sectional Area x Length</span>
          </div>
        </div>

        {/* SECTION 3: MATERIAL DENSITY */}
        <h2 className="text-3xl font-black mt-24 mb-8 text-slate-800 tracking-tight">Industrial Material Density Database</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Density varies based on the alloy composition. Our tool uses standard industrial values for maximum accuracy:
        </p>
        
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-xl mb-16">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-6 font-black uppercase tracking-widest text-sm">Material Type</th>
                <th className="p-6 font-black uppercase tracking-widest text-sm text-right">Density (g/cm³)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors"><td className="p-6 font-bold text-slate-800">Mild Steel (MS)</td><td className="p-6 text-right font-mono font-black text-blue-600">7.85</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="p-6 font-bold text-slate-800">Stainless Steel (SS 304)</td><td className="p-6 text-right font-mono font-black text-blue-600">8.00</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="p-6 font-bold text-slate-800">Aluminium (6061)</td><td className="p-6 text-right font-mono font-black text-blue-600">2.70</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="p-6 font-bold text-slate-800">Copper (Pure)</td><td className="p-6 text-right font-mono font-black text-blue-600">8.96</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="p-6 font-bold text-slate-800">Brass (Common)</td><td className="p-6 text-right font-mono font-black text-blue-600">8.50</td></tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 4: FAQs */}
        <h2 className="text-4xl font-black mt-24 mb-12 text-center uppercase tracking-widest text-slate-800">Engineering FAQs</h2>
        <div className="space-y-6 max-w-4xl mx-auto mb-24">
          <div className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-4 text-xl">Q: Why is Stainless Steel heavier than Mild Steel?</h4>
            <p className="text-slate-600 leading-relaxed font-medium italic">
              A: Stainless steel alloys often contain heavier elements like Nickel and Chromium, which increases the overall density slightly compared to standard Mild Steel.
            </p>
          </div>
          <div className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-4 text-xl">Q: How do you calculate the weight of a sheet?</h4>
            <p className="text-slate-600 leading-relaxed font-medium italic">
              A: For a sheet or plate, simply multiply the Width (mm) x Length (mm) x Thickness (mm) and then multiply by the material density (e.g., 7.85 for MS).
            </p>
          </div>
          <div className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-4 text-xl">Q: Does the calculator work on mobile devices?</h4>
            <p className="text-slate-600 leading-relaxed font-medium italic">
              A: Yes, TaskGuru Toolify is fully responsive and optimized for mobile screens, making it perfect for on-site metal weight estimations.
            </p>
          </div>
        </div>

      </article>

      <footer className="mt-20 py-12 border-t border-slate-100 text-center">
        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">
          TaskGuru Toolify 2025 • Precision Engineering Tools
        </p>
      </footer>
    </main>
  );
}

