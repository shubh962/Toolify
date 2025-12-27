'use client';

import { useState, useMemo } from 'react';

// Standard Densities (g/cm³)
const METALS: Record<string, { name: string, density: number }> = {
  ms: { name: 'Mild Steel (MS)', density: 7.85 },
  ss: { name: 'Stainless Steel', density: 8.00 },
  al: { name: 'Aluminium', density: 2.70 },
  cu: { name: 'Copper', density: 8.96 },
  br: { name: 'Brass', density: 8.50 },
  iron: { name: 'Iron', density: 7.87 },
};

type ShapeType = 
  | 'rect' | 'round' | 'roundPipe' | 'square' | 'squarePipe' 
  | 'rectPipe' | 'hex' | 'angle' | 'ibeam' | 'channel' | 'sphere' | 'tbar';

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState<string>('ms');
  const [shape, setShape] = useState<ShapeType>('rect');
  const [dims, setDims] = useState({ 
    w: '', // Width / Side
    h: '', // Height
    t: '', // Thickness (Motayi) 
    l: '', // Length (Lambayi)
    d: '', // Diameter (Gholayi)
    qty: '1' 
  });

  const calculateWeight = useMemo(() => {
    const { w, h, t, l, d, qty } = dims;
    const L = parseFloat(l) || 0;
    const W = parseFloat(w) || 0;
    const H = parseFloat(h) || 0;
    const T = parseFloat(t) || 0;
    const D = parseFloat(d) || 0;
    const Q = parseFloat(qty) || 1;
    const density = METALS[metal]?.density || 7.85;

    if (L <= 0 && shape !== 'sphere') return "0.000";

    let volumeMm3 = 0;

    switch (shape) {
      case 'rect': // Sheet / Plate
        volumeMm3 = W * T * L; // Height is not needed for flat sheets
        break;
      case 'round': // Solid Round Bar
        volumeMm3 = Math.PI * Math.pow(D / 2, 2) * L;
        break;
      case 'roundPipe': // Hollow Round Pipe
        volumeMm3 = Math.PI * (Math.pow(D / 2, 2) - Math.pow((D / 2) - T, 2)) * L;
        break;
      case 'square': // Solid Square Bar
        volumeMm3 = W * W * L;
        break;
      case 'squarePipe': // Hollow Square Pipe
        volumeMm3 = (Math.pow(W, 2) - Math.pow(W - 2 * T, 2)) * L;
        break;
      case 'rectPipe': // Hollow Rectangle Pipe
        volumeMm3 = (W * H - (W - 2 * T) * (H - 2 * T)) * L;
        break;
      case 'hex': // Solid Hex Bar
        volumeMm3 = (3 * Math.sqrt(3) / 2) * Math.pow(D / Math.sqrt(3), 2) * L;
        break;
      case 'angle': // L-Angle
        volumeMm3 = (W * T + (H - T) * T) * L;
        break;
      case 'ibeam': // I-Beam
      case 'channel': // C-Channel
        volumeMm3 = (2 * W * T + (H - 2 * T) * T) * L;
        break;
      case 'tbar': // T-Section
        volumeMm3 = (W * T + (H - T) * T) * L;
        break;
      case 'sphere': // Solid Ball
        volumeMm3 = (4/3) * Math.PI * Math.pow(D/2, 3);
        break;
      default:
        volumeMm3 = 0;
    }

    // Convert mm³ to kg: (Volume / 1,000,000) * Density * Quantity
    const weightKg = (volumeMm3 / 1000) * (density / 1000) * Q;
    return weightKg > 0 ? weightKg.toFixed(3) : "0.000";
  }, [dims, shape, metal]);

  const shapes = [
    { id: 'rect', label: 'Sheet / Plate' },
    { id: 'round', label: 'Round Bar' },
    { id: 'roundPipe', label: 'Round Pipe' },
    { id: 'square', label: 'Square Bar' },
    { id: 'squarePipe', label: 'Square Pipe' },
    { id: 'rectPipe', label: 'Rect Pipe' },
    { id: 'hex', label: 'Hex Bar' },
    { id: 'ibeam', label: 'I-Beam' },
    { id: 'channel', label: 'Channel' },
    { id: 'angle', label: 'Angle' },
    { id: 'tbar', label: 'T-Bar' },
    { id: 'sphere', label: 'Sphere' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
      {/* Header Metal Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Select Metal Type</label>
          <select 
            className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 font-black text-slate-800 outline-none focus:border-blue-500 transition-all cursor-pointer"
            value={metal} onChange={(e) => setMetal(e.target.value)}
          >
            {Object.entries(METALS).map(([id, m]) => <option key={id} value={id}>{m.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col justify-center items-center bg-blue-50/50 border-2 border-blue-100 rounded-2xl p-4">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Density Value</span>
          <span className="text-3xl font-black text-blue-700 leading-none">{METALS[metal].density} <span className="text-sm font-bold opacity-60">g/cm³</span></span>
        </div>
      </div>

      {/* Shapes Selection Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-12">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id as ShapeType)}
            className={`py-4 px-2 border-2 rounded-2xl text-[10px] font-black uppercase transition-all flex flex-col items-center justify-center h-20 text-center ${shape === s.id ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100 scale-105 z-10' : 'bg-slate-50/50 text-slate-500 border-slate-100 hover:border-blue-200 hover:bg-white'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Inputs Section with Conditional Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Width Field - (Sheet, Square, Pipes, Beams, Angles) */}
        {['rect', 'square', 'squarePipe', 'rectPipe', 'ibeam', 'channel', 'angle', 'tbar'].includes(shape) && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Width (Chaudayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-black text-xl outline-none focus:bg-white focus:border-blue-400 transition-all" value={dims.w} onChange={(e) => setDims({...dims, w: e.target.value})} />
          </div>
        )}

        {/* Height Field - (Sirf Beams, Channels, Angle aur Rect Pipe ke liye) */}
        {['rectPipe', 'ibeam', 'channel', 'angle', 'tbar'].includes(shape) && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Height (Unchayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-black text-xl outline-none focus:bg-white focus:border-blue-400 transition-all" value={dims.h} onChange={(e) => setDims({...dims, h: e.target.value})} />
          </div>
        )}

        {/* Thickness Field - (Sheet, Pipes, Beams, Angles) */}
        {['rect', 'roundPipe', 'squarePipe', 'rectPipe', 'ibeam', 'channel', 'angle', 'tbar'].includes(shape) && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Thickness (Motayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-black text-xl outline-none focus:bg-white focus:border-blue-400 transition-all" value={dims.t} onChange={(e) => setDims({...dims, t: e.target.value})} />
          </div>
        )}

        {/* Diameter Field - (Round Bars, Pipes, Hex, Sphere) */}
        {['round', 'roundPipe', 'hex', 'sphere'].includes(shape) && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Diameter (Gholayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-black text-xl outline-none focus:bg-white focus:border-blue-400 transition-all" value={dims.d} onChange={(e) => setDims({...dims, d: e.target.value})} />
          </div>
        )}

        {/* Length Field - (Sabke liye except Sphere) */}
        {shape !== 'sphere' && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Length (Lambayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-black text-xl outline-none focus:bg-white focus:border-blue-400 transition-all" value={dims.l} onChange={(e) => setDims({...dims, l: e.target.value})} />
          </div>
        )}

        {/* Quantity Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Quantity (Nag)</label>
          <input type="number" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-black text-xl outline-none focus:bg-white focus:border-blue-400 transition-all" value={dims.qty} onChange={(e) => setDims({...dims, qty: e.target.value})} />
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-100 font-black uppercase text-xs tracking-[0.3em] mb-4">Total Calculated Weight</p>
          <div className="flex items-baseline justify-center gap-4 text-white">
            <h2 className="text-7xl md:text-8xl font-black tracking-tighter tabular-nums">{calculateWeight}</h2>
            <span className="text-3xl font-black opacity-80 uppercase leading-none">KG</span>
          </div>
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>
      </div>
      
      <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center">
        Fast Client-Side Calculation • No API Calls Made
      </p>
    </div>
  );
        }

