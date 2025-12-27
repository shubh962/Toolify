'use client';

import { useState, useMemo } from 'react';

[span_5](start_span)// Standard Densities (g/cm³)[span_5](end_span)
const METALS = {
  ms: { name: 'Mild Steel (MS)', density: 7.85 },
  ss: { name: 'Stainless Steel', density: 8.00 },
  al: { name: 'Aluminium', density: 2.70 },
  cu: { name: 'Copper', density: 8.96 },
  br: { name: 'Brass', density: 8.50 },
};

type ShapeType = 'round' | 'roundPipe' | 'square' | 'rect' | 'hex' | 'angle' | 'ibeam' | 'channel';

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState<keyof typeof METALS>('ms');
  const [shape, setShape] = useState<ShapeType>('round');
  const [dims, setDims] = useState({ d: '', w: '', h: '', t: '', l: '' });

  const calculateWeight = useMemo(() => {
    const { d, w, h, t, l } = dims;
    const L = parseFloat(l) / 1000; // Convert mm to Meters for easier calculation
    const D = parseFloat(d);
    const W = parseFloat(w);
    const H = parseFloat(h);
    const T = parseFloat(t);
    const density = METALS[metal].density;

    if (!L || isNaN(L)) return 0;

    let areaMm2 = 0;

    switch (shape) {
      [span_6](start_span)case 'round': areaMm2 = Math.PI * (D / 2) ** 2; break;[span_6](end_span)
      [span_7](start_span)case 'roundPipe': areaMm2 = Math.PI * ((D / 2) ** 2 - (D / 2 - T) ** 2); break;[span_7](end_span)
      [span_8](start_span)case 'square': areaMm2 = W * W; break;[span_8](end_span)
      [span_9](start_span)case 'rect': areaMm2 = W * H; break;[span_9](end_span)
      case 'hex': areaMm2 = (3 * Math.sqrt(3) / 2) * (D / Math.sqrt(3)) ** 2; break;
      case 'angle': areaMm2 = (W * T) + (H - T) * T; break;
      case 'ibeam': areaMm2 = (2 * W * T) + (H - 2 * T) * T; break;
      case 'channel': areaMm2 = (2 * W * T) + (H - 2 * T) * T; break;
      default: areaMm2 = 0;
    }

    [span_10](start_span)// Weight (kg) = Area(mm2) * Length(m) * Density / 1000[span_10](end_span)
    const kg = (areaMm2 * L * density) / 1000;
    return kg > 0 ? kg.toFixed(3) : "0.000";
  }, [dims, shape, metal]);

  const shapes = [
    { id: 'round', label: 'Round' },
    { id: 'roundPipe', label: 'Pipe' },
    { id: 'square', label: 'Square' },
    { id: 'rect', label: 'Plate' },
    { id: 'hex', label: 'Hex' },
    { id: 'angle', label: 'Angle' },
    { id: 'ibeam', label: 'I-Beam' },
    { id: 'channel', label: 'Channel' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Metal Type</label>
          <select 
            className="w-full p-2 border rounded-lg bg-gray-50"
            value={metal} onChange={(e) => setMetal(e.target.value as any)}
          >
            {Object.entries(METALS).map(([id, m]) => <option key={id} value={id}>{m.name}</option>)}
          </select>
        </div>
        <div className="flex items-end justify-center bg-blue-50 rounded-lg p-2 text-blue-700 font-bold">
          Density: {METALS[metal].density} g/cm³
        </div>
      </div>

      [span_11](start_span){/* Shapes Grid[span_11](end_span) */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id as ShapeType)}
            className={`p-2 flex flex-col items-center border rounded-xl transition ${shape === s.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <span className="text-xs font-medium mt-1">{s.label}</span>
          </button>
        ))}
      </div>

      [span_12](start_span)[span_13](start_span){/* Dynamic Inputs[span_12](end_span)[span_13](end_span) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {(shape === 'round' || shape === 'roundPipe' || shape === 'hex') && (
          <input type="number" placeholder="Diameter (mm)" className="p-3 border rounded-lg" onChange={(e) => setDims({...dims, d: e.target.value})} />
        )}
        {(shape === 'square' || shape === 'rect' || shape === 'angle' || shape === 'ibeam' || shape === 'channel') && (
          <input type="number" placeholder="Width (mm)" className="p-3 border rounded-lg" onChange={(e) => setDims({...dims, w: e.target.value})} />
        )}
        {(shape === 'rect' || shape === 'angle' || shape === 'ibeam' || shape === 'channel') && (
          <input type="number" placeholder="Height (mm)" className="p-3 border rounded-lg" onChange={(e) => setDims({...dims, h: e.target.value})} />
        )}
        {(shape === 'roundPipe' || shape === 'angle' || shape === 'ibeam' || shape === 'channel') && (
          <input type="number" placeholder="Thickness (mm)" className="p-3 border rounded-lg" onChange={(e) => setDims({...dims, t: e.target.value})} />
        )}
        <input type="number" placeholder="Length (mm)" className="p-3 border rounded-lg col-span-2" onChange={(e) => setDims({...dims, l: e.target.value})} />
      </div>

      <div className="bg-green-50 p-6 rounded-2xl text-center border border-green-100">
        <p className="text-sm text-green-700 font-medium mb-1">Estimated Total Weight</p>
        <h2 className="text-4xl font-black text-green-600">{calculateWeight} <span className="text-lg">kg</span></h2>
      </div>
    </div>
  );
}

