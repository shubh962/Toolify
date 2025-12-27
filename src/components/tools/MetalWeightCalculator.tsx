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

type ShapeType = 'round' | 'roundPipe' | 'square' | 'rect' | 'hex' | 'angle' | 'ibeam' | 'channel' | 'sphere';

export default function MetalWeightCalculator() {
  const [metal, setMetal] = useState<string>('ms');
  const [shape, setShape] = useState<ShapeType>('rect'); // Default to Sheet/Plate
  const [dims, setDims] = useState({ 
    w: '', // Width (Chaudayi)
    t: '', // Thickness (Motayi) 
    l: '', // Length (Lambayi)
    d: '', // Diameter (Gholayi)
    h: '', // Height (for beams/channels)
    qty: '1' 
  });

  const calculateWeight = useMemo(() => {
    const { w, t, l, d, h, qty } = dims;
    const L = parseFloat(l) || 0;
    const W = parseFloat(w) || 0;
    const T = parseFloat(t) || 0;
    const D = parseFloat(d) || 0;
    const H = parseFloat(h) || 0;
    const Q = parseFloat(qty) || 1;
    const density = METALS[metal]?.density || 7.85;

    if (L <= 0) return "0.000";

    let volumeMm3 = 0;

    switch (shape) {
      case 'rect': // Sheet / Plate logic
        // Volume = Width * Thickness * Length (all in mm)
        volumeMm3 = W * T * L; 
        break;
      case 'round':
        volumeMm3 = Math.PI * Math.pow(D / 2, 2) * L;
        break;
      case 'roundPipe':
        volumeMm3 = Math.PI * (Math.pow(D / 2, 2) - Math.pow(D / 2 - T, 2)) * L;
        break;
      case 'square':
        volumeMm3 = W * W * L;
        break;
      case 'hex':
        volumeMm3 = (3 * Math.sqrt(3) / 2) * Math.pow(D / Math.sqrt(3), 2) * L;
        break;
      case 'ibeam':
      case 'channel':
        volumeMm3 = ((2 * W * T) + (H - 2 * T) * T) * L;
        break;
      case 'sphere':
        volumeMm3 = (4/3) * Math.PI * Math.pow(D/2, 3);
        break;
      default:
        volumeMm3 = 0;
    }

    // Weight (kg) = (Volume in mm3 / 1,000,000) * Density * Quantity
    // Hum volume ko cm3 me convert karke density se multiply karte hain
    const weightKg = (volumeMm3 / 1000) * density / 1000 * Q;
    return weightKg > 0 ? weightKg.toFixed(3) : "0.000";
  }, [dims, shape, metal]);

  const shapes = [
    { id: 'rect', label: 'Sheet / Plate' },
    { id: 'round', label: 'Round Bar' },
    { id: 'roundPipe', label: 'Round Pipe' },
    { id: 'square', label: 'Square Bar' },
    { id: 'hex', label: 'Hex Bar' },
    { id: 'ibeam', label: 'I-Beam' },
    { id: 'channel', label: 'Channel' },
    { id: 'sphere', label: 'Sphere' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
      {/* Metal & Density Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Select Metal</label>
          <select 
            className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 font-black text-slate-800 focus:border-blue-500 outline-none transition-all"
            value={metal} onChange={(e) => setMetal(e.target.value)}
          >
            {Object.entries(METALS).map(([id, m]) => <option key={id} value={id}>{m.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col justify-center items-center bg-blue-50/50 border-2 border-blue-100 rounded-2xl p-4">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Material Density</span>
          <span className="text-3xl font-black text-blue-700">{METALS[metal].density} <span className="text-sm font-bold">g/cm³</span></span>
        </div>
      </div>

      {/* Shapes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id as ShapeType)}
            className={`py-4 px-2 border-2 rounded-2xl text-[10px] font-black uppercase transition-all flex flex-col items-center justify-center h-20 text-center leading-tight ${shape === s.id ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100 scale-105' : 'bg-slate-50/50 text-slate-500 border-slate-100 hover:border-blue-200 hover:bg-white'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Chaudayi (Width) - Sheets aur Bars ke liye */}
        {(shape === 'rect' || shape === 'square' || shape === 'ibeam' || shape === 'channel') && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Width (Chaudayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-400 outline-none font-black text-xl text-slate-700 transition-all" value={dims.w} onChange={(e) => setDims({...dims, w: e.target.value})} />
          </div>
        )}

        {/* Motayi (Thickness) - Plate, Pipe aur Beams ke liye */}
        {(shape === 'rect' || shape === 'roundPipe' || shape === 'ibeam' || shape === 'channel') && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Thickness (Motayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-400 outline-none font-black text-xl text-slate-700 transition-all" value={dims.t} onChange={(e) => setDims({...dims, t: e.target.value})} />
          </div>
        )}

        {/* Gholayi (Diameter) - Round shapes ke liye */}
        {(shape === 'round' || shape === 'roundPipe' || shape === 'hex' || shape === 'sphere') && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Diameter (Gholayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-400 outline-none font-black text-xl text-slate-700 transition-all" value={dims.d} onChange={(e) => setDims({...dims, d: e.target.value})} />
          </div>
        )}

        {/* Lambayi (Length) - Sabke liye zaroori (except sphere) */}
        {shape !== 'sphere' && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Length (Lambayi) mm</label>
            <input type="number" placeholder="0.00" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-400 outline-none font-black text-xl text-slate-700 transition-all" value={dims.l} onChange={(e) => setDims({...dims, l: e.target.value})} />
          </div>
        )}

        <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Quantity (Nag)</label>
            <input type="number" className="w-full p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-400 outline-none font-black text-xl text-slate-700 transition-all" value={dims.qty} onChange={(e) => setDims({...dims, qty: e.target.value})} />
        </div>
      </div>

      {/* Result Area */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 rounded-[2.5rem] text-center shadow-2xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-100 font-black uppercase text-xs tracking-[0.3em] mb-4">Total Calculated Weight</p>
          <div className="flex items-baseline justify-center gap-4 text-white">
             <h2 className="text-8xl font-black tracking-tighter tabular-nums">{calculateWeight}</h2>
             <span className="text-3xl font-black opacity-80 uppercase">KG</span>
          </div>
        </div>
        {/* Background Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
        No API Calls • 100% Client-Side • Instant Result
      </p>
    </div>
  );
}

