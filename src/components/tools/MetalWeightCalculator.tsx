'use client';

import { useState } from 'react';

type Shape = 'round' | 'square' | 'rect' | 'roundPipe' | 'squarePipe';

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
  const [shape, setShape] = useState<Shape>('round');
  const [a, setA] = useState(''); // diameter / width
  const [b, setB] = useState(''); // height / thickness
  const [t, setT] = useState(''); // pipe thickness
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState<number | null>(null);

  const toCm = (mm: number) => mm / 10;

  const calcVolumeCm3 = () => {
    const L = toCm(Number(length));
    if (!L) return 0;

    if (shape === 'round') {
      const d = toCm(Number(a));
      return Math.PI * (d / 2) ** 2 * L;
    }

    if (shape === 'square') {
      const s = toCm(Number(a));
      return s * s * L;
    }

    if (shape === 'rect') {
      const w = toCm(Number(a));
      const h = toCm(Number(b));
      return w * h * L;
    }

    if (shape === 'roundPipe') {
      const od = toCm(Number(a));
      const th = toCm(Number(t));
      const id = od - 2 * th;
      if (id <= 0) return 0;
      return Math.PI * ((od / 2) ** 2 - (id / 2) ** 2) * L;
    }

    if (shape === 'squarePipe') {
      const os = toCm(Number(a));
      const th = toCm(Number(t));
      const is = os - 2 * th;
      if (is <= 0) return 0;
      return (os * os - is * is) * L;
    }

    return 0;
  };

  const calculate = () => {
    const vol = calcVolumeCm3();
    if (!vol) return;
    const kg = (vol * METALS[metal]) / 1000;
    setWeight(Number(kg.toFixed(3)));
  };

  return (
    <div className="max-w-xl mx-auto bg-card border rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Calculate Metal Weight</h2>

      {/* Shape Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          ['round','Round'],
          ['square','Square'],
          ['rect','Rectangle'],
          ['roundPipe','Round Pipe'],
          ['squarePipe','Square Pipe'],
        ].map(([k,label]) => (
          <button
            key={k}
            onClick={() => setShape(k as Shape)}
            className={`border rounded-lg py-2 text-sm ${
              shape===k ? 'bg-primary text-white' : 'bg-background'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Metal</label>
        <select className="w-full border rounded-lg px-3 py-2"
          value={metal} onChange={e=>setMetal(e.target.value)}>
          <option value="aluminium">Aluminium</option>
          <option value="ms">Mild Steel (MS)</option>
          <option value="steel">Stainless Steel</option>
          <option value="iron">Iron</option>
          <option value="copper">Copper</option>
          <option value="brass">Brass</option>
        </select>

        {/* Dynamic inputs */}
        {(shape==='round' || shape==='roundPipe') && (
          <input className="w-full border rounded-lg px-3 py-2"
            placeholder="Outer Diameter (mm)"
            value={a} onChange={e=>setA(e.target.value)} />
        )}

        {(shape==='square' || shape==='squarePipe') && (
          <input className="w-full border rounded-lg px-3 py-2"
            placeholder="Side (mm)"
            value={a} onChange={e=>setA(e.target.value)} />
        )}

        {shape==='rect' && (
          <>
            <input className="w-full border rounded-lg px-3 py-2"
              placeholder="Width (mm)"
              value={a} onChange={e=>setA(e.target.value)} />
            <input className="w-full border rounded-lg px-3 py-2"
              placeholder="Height (mm)"
              value={b} onChange={e=>setB(e.target.value)} />
          </>
        )}

        {(shape==='roundPipe' || shape==='squarePipe') && (
          <input className="w-full border rounded-lg px-3 py-2"
            placeholder="Thickness (mm)"
            value={t} onChange={e=>setT(e.target.value)} />
        )}

        <input className="w-full border rounded-lg px-3 py-2"
          placeholder="Length (mm)"
          value={length} onChange={e=>setLength(e.target.value)} />

        <button onClick={calculate}
          className="w-full bg-primary text-white rounded-lg py-2 font-medium">
          Calculate Weight
        </button>

        {weight!==null && (
          <div className="text-center text-lg font-semibold text-green-600">
            Weight: {weight} kg
          </div>
        )}
      </div>
    </div>
  );
}

