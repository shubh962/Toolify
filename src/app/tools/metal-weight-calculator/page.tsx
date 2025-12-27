import type { Metadata } from 'next';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

export const metadata: Metadata = {
  title: 'Metal Weight Calculator (2025) – Steel, Aluminium, Copper | TaskGuru',
  description:
    'Calculate metal weight for MS, SS, Copper, Brass, and Aluminium. Accurate formulas for Sheets, Pipes, Beams, and Hex bars. 100% Free & Fast engineering tool.',
  alternates: {
    canonical: 'https://www.taskguru.online/tools/metal-weight-calculator',
  },
};

export default function MetalWeightCalculatorPage() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-6 bg-white text-slate-900">
      
      {/* SECTION 1: HERO & TOOL */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
          The Ultimate <span className="text-blue-600">Metal Weight</span> Calculator
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium">
          Professional-grade tool for engineers, architects, and fabricators. 
          Estimate weights for over 20+ shapes instantly with zero data usage.
        </p>
      </header>

      <div className="mb-24 shadow-2xl rounded-[3rem]">
        <MetalWeightCalculator />
      </div>

      {/* SECTION 2: CONTENT GUIDE */}
      <article className="prose prose-slate max-w-none border-t pt-16">
        
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-slate-800">Comprehensive Guide to Metal Weight Calculation</h2>
        <p className="text-lg leading-relaxed text-slate-600">
          In the construction and manufacturing industries, accurate material estimation is the difference between profit and loss. 
          Our <strong>Metal Weight Calculator</strong> is designed to provide industrial-grade precision without the need for complex manual 
          mathematical operations. Whether you are dealing with a heavy-duty <strong>I-Beam</strong> for a skyscraper or a thin 
          <strong>Aluminium sheet</strong> for aerospace components, understanding how weight is derived is crucial.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4 text-slate-800">How is Metal Weight Calculated? (The Science)</h3>
        <p className="text-slate-600">
          The weight of any metal object is fundamentally determined by its volume and the density of the material. 
          The core formula used by our tool is:
        </p>
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center my-8 shadow-xl">
          <p className="text-sm font-bold text-blue-400 uppercase mb-2 tracking-[0.2em]">Primary Formula</p>
          <p className="text-3xl md:text-4xl font-black tracking-tighter">
            Weight = Volume x Density
          </p>
        </div>

        <h4 className="font-bold text-xl mt-8 text-slate-800">Calculating Volume for Different Shapes</h4>
        <p className="text-slate-600">Depending on the shape, the volume calculation changes:</p>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Flat Sheet/Plate:</strong> Volume = Length x Width x Thickness
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Round Bar:</strong> Volume = PI x Radius² x Length
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Hollow Pipe:</strong> Volume = PI x (OuterRadius² - InnerRadius²) x Length
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Hexagonal Bar:</strong> Volume = (3√3 / 2) x Side² x Length
          </div>
        </div>

        {/* SECTION 3: MATERIAL DENSITY */}
        <h2 className="text-3xl font-black mt-20 mb-8 text-slate-800">Material Density Database</h2>
        <p className="text-slate-600 mb-6">
          Density is a measure of how much mass is contained in a given unit of volume. Different alloys have varying densities:
        </p>
        
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg mb-12">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-6 font-bold">Material Type</th>
                <th className="p-6 font-bold text-right">Density (g/cm³)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="p-6 font-bold text-slate-800">Mild Steel (MS)</td><td className="p-6 text-right font-mono">7.85</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Stainless Steel (SS 304)</td><td className="p-6 text-right font-mono">8.00</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Aluminium</td><td className="p-6 text-right font-mono">2.70</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Copper</td><td className="p-6 text-right font-mono">8.96</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Brass</td><td className="p-6 text-right font-mono">8.50</td></tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 4: FAQs */}
        <h2 className="text-4xl font-black mt-24 mb-10 text-center uppercase tracking-widest text-slate-800">FAQs</h2>
        <div className="space-y-6 max-w-4xl mx-auto mb-24">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
            <h4 className="font-black text-slate-800 mb-3 text-lg">Q: How accurate is this calculator?</h4>
            <p className="text-slate-600 leading-relaxed font-medium">A: Our tool follows industrial standards. Minor variations may occur due to alloy tolerances.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
            <h4 className="font-black text-slate-800 mb-3 text-lg">Q: Why use client-side calculation?</h4>
            <p className="text-slate-600 leading-relaxed font-medium">A: It ensures total privacy and lightning-fast speed as no data leaves your device.</p>
          </div>
        </div>

      </article>

      <footer className="mt-20 py-10 border-t border-slate-100 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          TaskGuru Toolify 2025 • Engineering Tools
        </p>
      </footer>
    </main>
  );
}

