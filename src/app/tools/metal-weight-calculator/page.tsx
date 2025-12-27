import type { Metadata } from 'next';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

export const metadata: Metadata = {
  title: 'Accurate Metal Weight Calculator | Steel, Aluminium, Copper & More',
  description:
    'Calculate the weight of MS, Stainless Steel, Aluminium, and Copper instantly. Supports Sheets, Round Bars, Pipes, and Beams with 100% accurate client-side calculations.',
  alternates: {
    canonical: 'https://www.taskguru.online/tools/metal-weight-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MetalWeightCalculatorPage() {
  return (
    <main className="page-container max-w-5xl mx-auto py-12 px-4">
      {/* 🚀 Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Professional Metal Weight Calculator
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Estimate the weight of various metal shapes instantly using our high-precision toolkit. 
          Whether you are working with <strong>Mild Steel (MS)</strong>, <strong>Aluminium</strong>, or <strong>Brass</strong>, 
          get industrial-grade accuracy for sheets, pipes, and structural beams.
        </p>
      </div>

      {/* ✅ THE CALCULATOR TOOL */}
      <div className="mb-20">
        <MetalWeightCalculator />
      </div>

      {/* 📘 Educational Content Section */}
      <div className="grid md:grid-cols-2 gap-12 border-t border-slate-200 pt-16">
        <section className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Engineering Formula Used</h2>
          <p className="text-slate-600">
            Our calculator uses the fundamental physics principle to determine mass:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-center my-4 text-slate-800 border-l-4 border-blue-500">
            Weight = Volume × Density
          </div>
          <p className="text-slate-600">
            The volume is determined by the specific geometric cross-section of the selected shape 
            (Width × Thickness × Length for sheets) [span_2](start_span)multiplied by the material&apos;s standard density.[span_2](end_span)
          </p>
        </section>

        <section className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Use TaskGuru Toolify?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 font-bold">✓</span>
              <span className="text-slate-600"><strong>Privacy-First:</strong> Calculations are done locally in your browser. No data ever leaves your device.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 font-bold">✓</span>
              [span_3](start_span)<span className="text-slate-600"><strong>Shape Diversity:</strong> Supports Sheets, Round Bars, Hollow Pipes, I-Beams, and more.[span_3](end_span)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 font-bold">✓</span>
              [span_4](start_span)[span_5](start_span)<span className="text-slate-600"><strong>Material Accuracy:</strong> Pre-loaded with standard densities for MS, SS, Copper, and Brass.[span_4](end_span)[span_5](end_span)</span>
            </li>
          </ul>
        </section>
      </div>

      {/* 🏭 Material Density Reference Table */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Standard Material Densities</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold text-slate-700">Material Name</th>
                <th className="p-4 font-bold text-slate-700 text-right">Density (g/cm³)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-4 text-slate-600">Mild Steel (MS)</td><td className="p-4 text-right font-mono text-slate-800">7.85</td></tr>
              <tr><td className="p-4 text-slate-600">Stainless Steel (SS)</td><td className="p-4 text-right font-mono text-slate-800">8.00</td></tr>
              <tr><td className="p-4 text-slate-600">Aluminium</td><td className="p-4 text-right font-mono text-slate-800">2.70</td></tr>
              <tr><td className="p-4 text-slate-600">Copper</td><td className="p-4 text-right font-mono text-slate-800">8.96</td></tr>
              <tr><td className="p-4 text-slate-600">Brass</td><td className="p-4 text-right font-mono text-slate-800">8.50</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

