'use client';

import { useState } from 'react';

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
    const d = Number(diameter);
    const L = Number(length);
    if (!d || !L) return;

    const dCm = d / 10;
    const lCm = L / 10;

    const area = Math.PI * Math.pow(dCm / 2, 2);
    const result = (area * lCm * METALS[metal]) / 1000;

    setWeight(Number(result.toFixed(3)));
  };

  return (
    <div className="max-w-xl mx-auto bg-card border rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Calculate Metal Weight
      </h2>

      <div className="space-y-4">
        {/* Metal */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Metal Type
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2"
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
        </div>

        {/* Diameter */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Diameter (mm)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 20"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          />
        </div>

        {/* Length */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Length (mm)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 1000"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full bg-primary text-white rounded-lg py-2 font-medium hover:opacity-90 transition"
        >
          Calculate Weight
        </button>

        {/* Result */}
        {weight !== null && (
          <div className="text-center text-lg font-semibold text-green-600">
            Weight: {weight} kg
          </div>
        )}
      </div>
    </div>
  );
}

