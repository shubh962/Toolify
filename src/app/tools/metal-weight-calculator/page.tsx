import type { Metadata } from 'next';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';

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
        Copper and Brass. Just select the metal type, enter the required size and
        length, and get instant results.
      </p>

      {/* 🔧 TOOL COMPONENTS */}
      <MetalWeightCalculator />

      <section>
        <h2>How Metal Weight Is Calculated</h2>
        <p>
          The weight of metal is calculated using standard engineering formulas
          based on metal density, cross-sectional area and length. This tool
          performs all calculations instantly in your browser without sending
          data to any server.
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

      <section>
        <h2>Who Should Use This Tool?</h2>
        <p>
          This calculator is useful for engineers, fabricators, students,
          contractors and anyone who needs quick and accurate metal weight
          calculations without manual formulas.
        </p>
      </section>
    </main>
  );
}
