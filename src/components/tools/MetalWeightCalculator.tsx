'use client';

import { useState, useMemo } from 'react';

/* ================= METAL DENSITIES (g/cm³) ================= */
const METALS: Record<string, { name: string; density: number }> = {
  ms: { name: 'Mild Steel (MS)', density: 7.85 },
  ss: { name: 'Stainless Steel', density: 8.0 },
  al: { name: 'Aluminium', density: 2.7 },
  cu: { name: 'Copper', density: 8.96 },
  br: { name: 'Brass', density: 8.5 },
  iron: { name: 'Iron', density: 7.87 },
};

type ShapeType =
  | 'rect'
  | 'round'
  | 'roundPipe'
  | 'square'
  | 'squarePipe'
  | 'rectPipe'
  | 'hex'
  | 'angle'
  | 'ibeam'
  | 'channel'
  | 'tbar'
  | 'sphere';

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState('ms');
  const [shape, setShape] = useState<ShapeType>('rect');

  const [dims, setDims] = useState({
    w: '',   // Width / Side A (mm)
    h: '',   // Height / Side B (mm)
    t: '',   // Thickness (mm)
    l: '',   // Length (mm)
    d: '',   // Diameter (mm)
    qty: '1'
  });

  /* ================= WEIGHT CALCULATION ================= */
  const calculateWeight = useMemo(() => {
    const W = parseFloat(dims.w) || 0;
    const H = parseFloat(dims.h) || 0;
    const T = parseFloat(dims.t) || 0;
    const L = parseFloat(dims.l) || 0;
    const D = parseFloat(dims.d) || 0;
    const Q = parseFloat(dims.qty) || 1;

    const density = METALS[metal]?.density || 7.85;

    if (shape !== 'sphere' && L <= 0) return '0.000';

    let volumeMm3 = 0;

    switch (shape) {
      /* ===== SHEET / PLATE ===== */
      case 'rect':
        volumeMm3 = W * T * L;
        break;

      /* ===== ROUND BAR ===== */
      case 'round':
        volumeMm3 = Math.PI * Math.pow(D / 2, 2) * L;
        break;

      /* ===== ROUND PIPE ===== */
      case 'roundPipe':
        volumeMm3 =
          Math.PI *
          (Math.pow(D / 2, 2) - Math.pow(D / 2 - T, 2)) *
          L;
        break;

      /* ===== SQUARE BAR ===== */
      case 'square':
        volumeMm3 = W * W * L;
        break;

      /* ===== SQUARE PIPE ===== */
      case 'squarePipe':
        volumeMm3 = (W * W - Math.pow(W - 2 * T, 2)) * L;
        break;

      /* ===== RECT PIPE ===== */
      case 'rectPipe':
        volumeMm3 = (W * H - (W - 2 * T) * (H - 2 * T)) * L;
        break;

      /* ===== HEX BAR ===== */
      case 'hex':
        volumeMm3 =
          ((3 * Math.sqrt(3)) / 2) *
          Math.pow(D / Math.sqrt(3), 2) *
          L;
        break;

      /* ===== ANGLE (L-SECTION) ===== */
      case 'angle':
        // Area = (A + B − T) × T
        volumeMm3 = (W + H - T) * T * L;
        break;

      /* ===== I-BEAM ===== */
      case 'ibeam':
        volumeMm3 = (2 * W * T + (H - 2 * T) * T) * L;
        break;

      /* ===== CHANNEL ===== */
      case 'channel':
        volumeMm3 = (2 * W * T + (H - 2 * T) * T) * L;
        break;

      /* ===== T-BAR ===== */
      case 'tbar':
        volumeMm3 = (W * T + (H - T) * T) * L;
        break;

      /* ===== SPHERE ===== */
      case 'sphere':
        volumeMm3 = (4 / 3) * Math.PI * Math.pow(D / 2, 3);
        break;

      default:
        volumeMm3 = 0;
    }

    /* ===== UNIT CONVERSION =====
       mm³ × g/cm³ → kg
       kg = volume × density / 1,000,000
    */
    const weightKg = (volumeMm3 * density / 1_000_000) * Q;

    return weightKg > 0 ? weightKg.toFixed(3) : '0.000';
  }, [dims, shape, metal]);

  const shapes = [
    { id: 'rect', label: 'Sheet / Plate' },
    { id: 'round', label: 'Round Bar' },
    { id: 'roundPipe', label: 'Round Pipe' },
    { id: 'square', label: 'Square Bar' },
    { id: 'squarePipe', label: 'Square Pipe' },
    { id: 'rectPipe', label: 'Rect Pipe' },
    { id: 'hex', label: 'Hex Bar' },
    { id: 'angle', label: 'Angle' },
    { id: 'ibeam', label: 'I-Beam' },
    { id: 'channel', label: 'Channel' },
    { id: 'tbar', label: 'T-Bar' },
    { id: 'sphere', label: 'Sphere' },
  ];

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-[2.5rem] shadow-2xl border">
      
      {/* HEADER */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="text-xs font-bold uppercase text-slate-400">
            Select Metal
          </label>
          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            className="w-full mt-2 p-4 rounded-xl border font-bold"
          >
            {Object.entries(METALS).map(([k, m]) => (
              <option key={k} value={k}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center bg-blue-50 rounded-xl">
          <span className="text-3xl font-black text-blue-700">
            {METALS[metal].density} g/cm³
          </span>
        </div>
      </div>

      {/* SHAPES */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id as ShapeType)}
            className={`p-4 rounded-xl text-xs font-black uppercase border
              ${shape === s.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* INPUTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {['rect','square','squarePipe','rectPipe','ibeam','channel','angle','tbar'].includes(shape) && (
          <input placeholder="Width (mm)" type="number"
            value={dims.w}
            onChange={(e)=>setDims({...dims,w:e.target.value})}
            className="p-4 rounded-xl border font-bold" />
        )}

        {['rectPipe','ibeam','channel','angle','tbar'].includes(shape) && (
          <input placeholder="Height (mm)" type="number"
            value={dims.h}
            onChange={(e)=>setDims({...dims,h:e.target.value})}
            className="p-4 rounded-xl border font-bold" />
        )}

        {['rect','roundPipe','squarePipe','rectPipe','ibeam','channel','angle','tbar'].includes(shape) && (
          <input placeholder="Thickness (mm)" type="number"
            value={dims.t}
            onChange={(e)=>setDims({...dims,t:e.target.value})}
            className="p-4 rounded-xl border font-bold" />
        )}

        {['round','roundPipe','hex','sphere'].includes(shape) && (
          <input placeholder="Diameter (mm)" type="number"
            value={dims.d}
            onChange={(e)=>setDims({...dims,d:e.target.value})}
            className="p-4 rounded-xl border font-bold" />
        )}

        {shape !== 'sphere' && (
          <input placeholder="Length (mm)" type="number"
            value={dims.l}
            onChange={(e)=>setDims({...dims,l:e.target.value})}
            className="p-4 rounded-xl border font-bold" />
        )}

        <input placeholder="Quantity" type="number"
          value={dims.qty}
          onChange={(e)=>setDims({...dims,qty:e.target.value})}
          className="p-4 rounded-xl border font-bold" />
      </div>

      {/* RESULT */}
      <div className="bg-emerald-600 text-white rounded-3xl p-10 text-center">
        <p className="text-xs uppercase tracking-widest opacity-80 mb-3">
          Total Weight
        </p>
        <div className="text-7xl font-black">
          {calculateWeight}
          <span className="text-3xl ml-3">KG</span>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400 font-bold uppercase">
        Client-Side Calculation • No API
      </p>
    </div>
  );
}

