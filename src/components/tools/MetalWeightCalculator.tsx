'use client';

import { useState, useMemo } from 'react';

/* ================= METAL DENSITIES (g/cm³) ================= */
const METALS: Record<string, { name: string; density: number }> = {
  ms: { name: 'Mild Steel (MS)', density: 7.85 },
  ss: { name: 'Stainless Steel (SS)', density: 8.0 },
  al: { name: 'Aluminium (AL)', density: 2.7 },
  cu: { name: 'Copper (CU)', density: 8.96 },
  br: { name: 'Brass (BR)', density: 8.5 },
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

type UnitType = 'mm' | 'inch' | 'm' | 'ft';

/* ================= UNIT → MM CONVERSION ================= */
const UNIT_TO_MM: Record<UnitType, number> = {
  mm: 1,
  inch: 25.4,
  m: 1000,
  ft: 304.8,
};

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState('ms');
  const [shape, setShape] = useState<ShapeType>('rect');

  /* 🔁 UNIT TOGGLE (DEFAULT = MM) */
  const [unit, setUnit] = useState<UnitType>('mm');

  const [dims, setDims] = useState({
    w: '',
    h: '',
    t: '',
    l: '',
    d: '',
    qty: '1',
  });

  /* ================= WEIGHT CALCULATION ================= */
  const calculateWeight = useMemo(() => {
    const factor = UNIT_TO_MM[unit];

    const W = (parseFloat(dims.w) || 0) * factor;
    const H = (parseFloat(dims.h) || 0) * factor;
    const T = (parseFloat(dims.t) || 0) * factor;
    const L = (parseFloat(dims.l) || 0) * factor;
    const D = (parseFloat(dims.d) || 0) * factor;
    const Q = parseFloat(dims.qty) || 1;

    const density = METALS[metal]?.density || 7.85;

    if (shape !== 'sphere' && L <= 0) return '0.000';

    let volumeMm3 = 0;

    switch (shape) {
      case 'rect': // Sheet / Plate
        volumeMm3 = W * T * L;
        break;

      case 'round': // Solid Round Bar
        volumeMm3 = Math.PI * Math.pow(D / 2, 2) * L;
        break;

      case 'roundPipe': // Hollow Round Pipe
        volumeMm3 =
          Math.PI *
          (Math.pow(D / 2, 2) - Math.pow(D / 2 - T, 2)) *
          L;
        break;

      case 'square': // Solid Square Bar
        volumeMm3 = W * W * L;
        break;

      case 'squarePipe': // Hollow Square Pipe
        volumeMm3 = (W * W - Math.pow(W - 2 * T, 2)) * L;
        break;

      case 'rectPipe': // Hollow Rect Pipe
        volumeMm3 = (W * H - (W - 2 * T) * (H - 2 * T)) * L;
        break;

      case 'hex': // Solid Hex Bar
        volumeMm3 =
          ((3 * Math.sqrt(3)) / 2) *
          Math.pow(D / Math.sqrt(3), 2) *
          L;
        break;

      case 'angle': // Angle (L-Section)
        volumeMm3 = (W + H - T) * T * L;
        break;

      case 'ibeam': // I-Beam
      case 'channel': // Channel
        volumeMm3 = (2 * W * T + (H - 2 * T) * T) * L;
        break;

      case 'tbar': // T-Bar
        volumeMm3 = (W * T + (H - T) * T) * L;
        break;

      case 'sphere': // Solid Sphere
        volumeMm3 = (4 / 3) * Math.PI * Math.pow(D / 2, 3);
        break;

      default:
        volumeMm3 = 0;
    }

    /* ===== UNIT CONVERSION =====
       Volume: mm³
       Density: g/cm³
       Weight (kg) = volume × density / 1,000,000
    */
    const weightKg = (volumeMm3 * density / 1_000_000) * Q;

    return weightKg > 0 ? weightKg.toFixed(3) : '0.000';
  }, [dims, shape, metal, unit]);

  const shapes = [
    { id: 'rect', label: 'Sheet / Plate' },
    { id: 'round', label: 'Round Bar' },
    { id: 'roundPipe', label: 'Round Pipe' },
    { id: 'square', label: 'Square Bar' },
    { id: 'squarePipe', label: 'Square Pipe' },
    { id: 'rectPipe', label: 'Rect Pipe' },
    { id: 'hex', label: 'Hex Bar' },
    { id: 'angle', label: 'Angle (L-Section)' },
    { id: 'ibeam', label: 'I-Beam' },
    { id: 'channel', label: 'Channel' },
    { id: 'tbar', label: 'T-Bar' },
    { id: 'sphere', label: 'Sphere / Ball' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-[2.5rem] shadow-2xl border">

      {/* ================= HEADER ================= */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Select Metal Type
          </label>
          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            className="w-full mt-2 p-4 rounded-xl border font-bold"
          >
            {Object.entries(METALS).map(([k, m]) => (
              <option key={k} value={k}>{m.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Select Unit of Measurement
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as UnitType)}
            className="w-full mt-2 p-4 rounded-xl border font-bold"
          >
            <option value="mm">Millimeter (MM) – Default</option>
            <option value="inch">Inches (IN)</option>
            <option value="m">Meter (M)</option>
            <option value="ft">Feet (FT)</option>
          </select>
        </div>
      </div>

      {/* ================= SHAPE SELECTION ================= */}
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
        Select Metal Shape
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id as ShapeType)}
            className={`p-4 rounded-xl text-[10px] font-black uppercase border transition
              ${shape === s.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ================= INPUTS ================= */}
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
        Enter Dimensions
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <input placeholder={`Width / Side A (${unit})`} value={dims.w}
          onChange={(e)=>setDims({...dims,w:e.target.value})}
          className="p-4 rounded-xl border font-bold" />

        <input placeholder={`Height / Side B (${unit})`} value={dims.h}
          onChange={(e)=>setDims({...dims,h:e.target.value})}
          className="p-4 rounded-xl border font-bold" />

        <input placeholder={`Thickness (${unit})`} value={dims.t}
          onChange={(e)=>setDims({...dims,t:e.target.value})}
          className="p-4 rounded-xl border font-bold" />

        <input placeholder={`Diameter (${unit})`} value={dims.d}
          onChange={(e)=>setDims({...dims,d:e.target.value})}
          className="p-4 rounded-xl border font-bold" />

        <input placeholder={`Length (${unit})`} value={dims.l}
          onChange={(e)=>setDims({...dims,l:e.target.value})}
          className="p-4 rounded-xl border font-bold" />

        <input placeholder="Quantity (Nos)" value={dims.qty}
          onChange={(e)=>setDims({...dims,qty:e.target.value})}
          className="p-4 rounded-xl border font-bold" />
      </div>

      {/* ================= RESULT ================= */}
      <div className="bg-emerald-600 text-white rounded-3xl p-10 text-center">
        <p className="text-xs uppercase tracking-widest opacity-80 mb-3">
          Total Calculated Weight
        </p>
        <div className="text-7xl font-black">
          {calculateWeight}
          <span className="text-3xl ml-3">KG</span>
        </div>
      </div>

      {/* ================= NOTES ================= */}
      <p className="mt-6 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        Note: Default unit is Millimeter (MM). You can switch to Inches, Meter or Feet if required.
      </p>

      <p className="mt-2 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        All calculations are performed client-side. No data is stored or shared.
      </p>

    </div>
  );
          }

