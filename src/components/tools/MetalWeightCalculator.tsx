'use client';

import { useState } from 'react';

/*
 FILE: src/components/tools/MetalWeightCalculator.tsx
 PURPOSE:
 - Fully styled metal weight calculator
 - Does NOT depend on external wrapper
*/

const METALS: Record<string, number> = {
  aluminium: 2.7,
  ms: 7.85,
  steel: 8.0,
  iron: 7.87,
  copper: 8.96,
  brass: 8.5,
};

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState('ms');
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState<number | null>(null);

  const calculate = () => {
    const d = Number(diameter) / 10; // mm → cm
    const L = Number(length) / 10;

    if (!d || !L) return;

    const area = Math.PI * Math.pow(d / 2, 2);
    const result = (area * L * METALS[metal]) / 1000;

    setWeight(Number(result.toFixed(3)));
  };

  return (
    <div className="tool-card" style={{ maxWidth: 520, margin: '24px auto' }}>
      <h2 className="tool-title">Metal Weight Calculator</h2>

      <div className="tool-form" style={{ display: 'grid', gap: 12 }}>
        <label>
          Metal Type
          <select
            className="tool-input"
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
          >
            <option value="aluminium">Aluminium</option>
            <option value="ms">Mild Steel (MS)</option>
            <option value="steel">Stainless Steel</option>
            <option value="iron">Iron</option>
            <option value="copper">Copper</option>
            <option value="brass">Brass</option>
          </select>
        </label>

        <label>
          Diameter (mm)
          <input
            type="number"
            className="tool-input"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            placeholder="e.g. 20"
          />
        </label>

        <label>
          Length (mm)
          <input
            type="number"
            className="tool-input"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="e.g. 1000"
          />
        </label>

        <button className="tool-btn" onClick={calculate}>
          Calculate Weight
        </button>

        {weight !== null && (
          <div className="tool-result">
            Weight: <strong>{weight} kg</strong>
          </div>
        )}
      </div>
    </div>
  );
}

