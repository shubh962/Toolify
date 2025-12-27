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
    <main className="page-container max-w-6xl mx-auto py-12 px-6 bg-white text-slate-900">
      
      {/* 🚀 SECTION 1: HERO & TOOL */}
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
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

      {/* 📘 SECTION 2: THE DEEP DIVE (1500+ Word Content Structure) */}
      <article className="prose prose-slate max-w-none border-t pt-16">
        
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Comprehensive Guide to Metal Weight Calculation</h2>
        <p className="text-lg leading-relaxed text-slate-600">
          In the construction and manufacturing industries, accurate material estimation is the difference between profit and loss. 
          Our <strong>Metal Weight Calculator</strong> is designed to provide industrial-grade precision without the need for complex manual 
          mathematical operations. Whether you are dealing with a heavy-duty <strong>I-Beam</strong> for a skyscraper or a thin 
          <strong>Aluminium sheet</strong> for aerospace components, understanding how weight is derived is crucial.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">How is Metal Weight Calculated? (The Science)</h3>
        <p className="text-slate-600">
          The weight of any metal object is fundamentally determined by its volume and the density of the material. 
          The core formula used by our tool is:
        </p>
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center my-8 shadow-xl">
          <p className="text-sm font-bold text-blue-400 uppercase mb-2 tracking-[0.2em]">Primary Formula</p>
          <p className="text-3xl md:text-4xl font-black tracking-tighter">
            Mass (W) = Volume (V) × Density (ρ)
          </p>
        </div>
        
        

        <h4 className="font-bold text-xl mt-8">Calculating Volume for Different Shapes</h4>
        <p className="text-slate-600">Depending on the shape, the volume ($V$) calculation changes:</p>
        <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Flat Sheet/Plate:</strong> $Volume = Length \times Width \times Thickness$
          </li>
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Round Bar:</strong> $Volume = \pi \times Radius^2 \times Length$
          </li>
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Hollow Pipe:</strong> $Volume = \pi \times (OuterRadius^2 - InnerRadius^2) \times Length$
          </li>
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <strong>Hexagonal Bar:</strong> $Volume = \frac{3\sqrt{3}}{2} \times Side^2 \times Length$
          </li>
        </ul>

        {/* 🏢 SECTION 3: MATERIAL DENSITY GUIDE */}
        <h2 className="text-3xl font-black mt-20 mb-8">Understanding Material Densities</h2>
        <p className="text-slate-600 mb-6">
          Density is a measure of how much mass is contained in a given unit of volume. In engineering, 
          it is usually measured in $g/cm^3$ or $kg/m^3$. Different alloys have varying densities:
        </p>
        
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg mb-12">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-6">Material Type</th>
                <th className="p-6">Density ($g/cm^3$)</th>
                <th className="p-6">Common Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="p-6 font-bold text-slate-800">Mild Steel (MS)</td><td className="p-6">7.85</td><td className="p-6 italic text-slate-500 underline decoration-blue-200">General construction, automotive parts</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Stainless Steel (SS 304/316)</td><td className="p-6">8.00</td><td className="p-6 italic text-slate-500 underline decoration-blue-200">Food industry, medical tools</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Aluminium (6061/5052)</td><td className="p-6">2.70</td><td className="p-6 italic text-slate-500 underline decoration-blue-200">Aircraft, window frames, electronics</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Copper</td><td className="p-6">8.96</td><td className="p-6 italic text-slate-500 underline decoration-blue-200">Electrical wiring, heat exchangers</td></tr>
              <tr><td className="p-6 font-bold text-slate-800">Brass</td><td className="p-6">8.50</td><td className="p-6 italic text-slate-500 underline decoration-blue-200">Decorative fittings, plumbing valves</td></tr>
            </tbody>
          </table>
        </div>

        {/* 🏗️ SECTION 4: STRUCTURAL SHAPES */}
        <h2 className="text-3xl font-black mt-20 mb-8">Structural Shapes: I-Beams, Angles & Channels</h2>
        <p className="text-slate-600">
          Structural steel calculation is more complex because of the multiple surfaces. Our tool automates 
          the area calculation for:
        </p>
        <div className="grid md:grid-cols-3 gap-6 my-10">
          <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
            <h4 className="font-black text-emerald-800 mb-2">I-Beams</h4>
            <p className="text-sm text-emerald-700">Calculated by measuring flange width, web height, and uniform thickness across the section.</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
            <h4 className="font-black text-blue-800 mb-2">C-Channels</h4>
            <p className="text-sm text-blue-700">Crucial for secondary structural supports. Measured similarly to beams but with single-sided flanges.</p>
          </div>
          <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
            <h4 className="font-black text-amber-800 mb-2">L-Angles</h4>
            <p className="text-sm text-amber-700">Commonly used in shelving and light frames. Formula considers the overlap at the corner.</p>
          </div>
        </div>

        {/* ❓ SECTION 5: FAQs (SEO GOLD) */}
        <h2 className="text-4xl font-black mt-24 mb-10 text-center uppercase tracking-widest">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-4xl mx-auto mb-24">
          {[
            { q: "How accurate is this weight calculator?", a: "The tool is extremely accurate for standard industrial alloys. However, minor variations (0.5% - 2%) may occur due to manufacturing tolerances and specific alloy compositions." },
            { q: "Can I calculate the weight of a sheet in kg?", a: "Yes. Simply select the 'Sheet/Plate' option, enter the width, length, and thickness in millimeters, and the tool will provide the weight in kilograms instantly." },
            { q: "Does the calculator work offline?", a: "Yes! Once the page is loaded, all calculations happen inside your browser. No API calls are made, meaning your data is private and the tool is lightning fast." },
            { q: "Why is Stainless Steel heavier than Mild Steel?", a: "Stainless steel contains heavier elements like Chromium and Nickel, which increases its density slightly (8.00 g/cm³) compared to Mild Steel (7.85 g/cm³)." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h4 className="font-black text-slate-800 mb-3 text-lg">Q: {item.q}</h4>
              <p className="text-slate-600 leading-relaxed font-medium">A: {item.a}</p>
            </div>
          ))}
        </div>

        {/* 📝 SECTION 6: CONCLUDING CONTENT */}
        <h3 className="text-2xl font-black mb-6">Optimizing Your Fabrication Workflow</h3>
        <p className="text-slate-600 leading-loose">
          Using a digital calculator reduces human error significantly. Manual calculations often lead to under-ordering or over-ordering 
          of materials, which affects project timelines. At <strong>TaskGuru Toolify</strong>, we provide these tools 100% free to empower 
          makers and builders globally. Our <strong>Metal Weight Calculator</strong> is optimized for mobile devices, making it perfect 
          for on-site measurements and quick estimations. 
          <br /><br />
          Explore our other tools like the <strong>Unit Converter</strong> or <strong>Area Calculator</strong> to further streamline your 
          engineering tasks.
        </p>

      </article>

      <footer className="mt-20 py-10 border-t border-slate-100 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Designed for Excellence • TaskGuru Toolify 2025
        </p>
      </footer>
    </main>
  );
}

