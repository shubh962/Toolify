import type { Metadata } from 'next';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

/*
 FILE: src/app/tools/metal-weight-calculator/page.tsx
 PURPOSE:
 - SEO indexable tool page
 - Clean layout
*/

export const metadata: Metadata = {
  title: 'Metal Weight Calculator – Steel, MS, Aluminium | TaskGuru',
  description:
    'Free online metal weight calculator for Steel, Mild Steel (MS), Aluminium, Copper and Brass. Enter size and length to get accurate metal weight instantly.',
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
    <main className="page-container">
      <h1>Metal Weight Calculator</h1>

      <p>
        This metal weight calculator helps you calculate the accurate weight of
        different metals such as Mild Steel (MS), Stainless Steel, Aluminium,
        Copper and Brass. Simply select the metal type, enter size and length,
        and get instant results.
      </p>

      {/* ✅ TOOL */}
      <MetalWeightCalculator />

      <section>
        <h2>How Metal Weight Is Calculated</h2>
        <p>
          Metal weight is calculated using standard engineering formulas based
          on density, cross-sectional area and length. All calculations are done
          instantly in your browser.
        </p>
      </section>

      <section>
        <h2>Supported Metals</h2>
        <ul>
          <li>Aluminium</li>
          <li>Mild Steel (MS)</li>
          <li>Stainless Steel</li>
          <li>Iron</li>
          <li>Copper</li>
          <li>Brass</li>
          <li>Bronze</li>
        </ul>
      </section>
    </main>
  );
}

