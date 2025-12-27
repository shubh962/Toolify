'use client';

import { useState } from 'react';

const METALS: Record<string, number> = {
  ms: 7.85,    // Mild Steel
  ss: 8.0,     // Stainless Steel
  al: 2.7,     // Aluminium
  iron: 7.87,  // Iron
  copper: 8.96, // Copper
  brass: 8.5,   // Brass
  bronze: 8.8   // Bronze
};

const SHAPES = [
  { id: 'round', label: 'Round' },
  { id: 'roundPipe', label: 'Round Pipe' },
  { id: 'hexBar', label: 'Round (Hex)' },
  { id: 'sphere', label: 'Sphere / Ball' },
  { id: 'square', label: 'Square' },
  { id: 'squarePipe', label: 'Square Pipe' },
  { id: 'rect', label: 'Rectangle / Sheet' },
  { id: 'rectPipe', label: 'Rectangle Pipe' },
  { id: 'hex', label: 'Hex' },
  { id: 'octagonal', label: 'Octagonal' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'trapezoid', label: 'Trapezoid' },
  { id: 'angle', label: 'Angle' },
  { id: 'channel', label: 'Channel' },
  { id: 'tbar', label: 'T Bar' },
  { id: 'ibeam', label: 'I Beam' },
  { id: 'cshape', label: 'C Shape' },
  { id: 'eshape', label: 'E Shape' },
];

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState('ms');
  const [shape, setShape] = useState('round');
  const [inputs, setInputs] = useState({
    w: '', h: '', l: '', t: '', d: '', qty: '1'
  });
  const [result, setResult] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const { w, h, l, t, d, qty } = inputs;
    const W = parseFloat(w) || 0;
    const H = parseFloat(h) || 0;
    const L = parseFloat(l) || 0;
    const T = parseFloat(t) || 0;
    const D = parseFloat(d) || 0;
    const Q = parseFloat(qty) || 1;
    const density = METALS[metal];

    let volumeCm3 = 0;
    const lengthCm = L / 10; // Convert mm to cm

    switch (shape) {
      case 'round':
        volumeCm3 = Math.PI * Math.pow(D / 20, 2) * lengthCm;
        break;
      case 'roundPipe':
        volumeCm3 = Math.PI * (Math.pow(D / 20, 2) - Math.pow((D - 2 * T) / 20, 2)) * lengthCm;
        break;
      case 'square':
        volumeCm3 = Math.pow(W / 10, 2) * lengthCm;
        break;
      case 'squarePipe':
        volumeCm3 = (Math.pow(W / 10, 2) - Math.pow((W - 2 * T) / 10, 2)) * lengthCm;
        break;
      case 'rect':
        volumeCm3 = (W / 10) * (H / 10) * lengthCm;
        break;
      case 'rectPipe':
        volumeCm3 = ((W / 10) * (H / 10) - ((W - 2 * T) / 10) * ((H - 2 * T) / 10)) * lengthCm;
        break;
      case 'hex':
      case 'hexBar':
        volumeCm3 = (Math.sqrt(3) * 2 * Math.pow(D / 20, 2)) * lengthCm;
        break;
      case 'sphere':
        volumeCm3 = (4 / 3) * Math.PI * Math.pow(D / 20, 3);
        break;
      case 'angle':
        volumeCm3 = ((W + H - T) * T / 100) * lengthCm;
        break;
      case 'ibeam':
        volumeCm3 = ((2 * W * T + (H - 2 * T) * T) / 100) * lengthCm;
        break;
      case 'channel':
      case 'cshape':
        volumeCm3 = ((2 * W * T + (H - 2 * T) * T) / 100) * lengthCm;
        break;
      default:
        volumeCm3 = (W / 10) * (H / 10) * lengthCm;
    }

    const weightKg = (volumeCm3 * density * Q) / 1000;
    setResult(weightKg.toFixed(3));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl shadow-xl border">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <select className="p-3 border rounded-xl bg-gray-50 font-semibold" value={metal} onChange={e => setMetal(e.target.value)}>
          <option value="ms">Mild Steel (MS)</option>
          <option value="ss">Stainless Steel</option>
          <option value="al">Aluminium</option>
          <option value="iron">Iron</option>
          <option value="copper">Copper</option>
          <option value="brass">Brass</option>
        </select>
        <div className="p-3 bg-blue-50 text-blue-700 rounded-xl font-bold flex items-center justify-center">
          Density: {METALS[metal]} g/cm³
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-8">
        {SHAPES.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={`p-2 border rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center justify-center h-16 ${shape === s.id ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' : 'bg-gray-50 text-gray-600 hover:border-blue-300'}`}
          >
            <div className="w-6 h-6 mb-1 bg-current opacity-20 rounded-sm"></div>
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {(shape.includes('round') || shape === 'hex' || shape === 'sphere' || shape === 'hexBar') && (
          <input name="d" type="number" placeholder="Diameter (mm)" className="p-4 border rounded-xl" onChange={handleInput} />
        )}
        {(shape.includes('square') || shape.includes('rect') || ['angle', 'ibeam', 'channel', 'cshape', 'tbar'].includes(shape)) && (
          <input name="w" type="number" placeholder="Width / Side (mm)" className="p-4 border rounded-xl" onChange={handleInput} />
        )}
        {(shape.includes('rect') || ['angle', 'ibeam', 'channel', 'cshape', 'tbar'].includes(shape)) && (
          <input name="h" type="number" placeholder="Height (mm)" className="p-4 border rounded-xl" onChange={handleInput} />
        )}
        {(shape.includes('Pipe') || ['angle', 'ibeam', 'channel', 'cshape', 'tbar'].includes(shape)) && (
          <input name="t" type="number" placeholder="Thickness (mm)" className="p-4 border rounded-xl" onChange={handleInput} />
        )}
        <input name="l" type="number" placeholder="Length (mm)" className="p-4 border rounded-xl" onChange={handleInput} />
        <input name="qty" type="number" placeholder="Quantity" className="p-4 border rounded-xl" value={inputs.qty} onChange={handleInput} />
      </div>

      <button onClick={calculate} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-xl hover:bg-blue-700 shadow-lg transition-all active:scale-95">
        CALCULATE WEIGHT
      </button>

      {result && (
        <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-center">
          <p className="text-green-700 font-bold uppercase text-sm mb-1">Estimated Total Weight</p>
          <h2 className="text-5xl font-black text-green-600">{result} <span className="text-2xl">KG</span></h2>
        </div>
      )}
      
      <p className="mt-4 text-[10px] text-gray-400 text-center">
        All calculations performed client-side in your browser. No API calls are made.
      </p>
    </div>
  );
}

