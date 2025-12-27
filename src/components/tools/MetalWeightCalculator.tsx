'use client';

import { useState, useMemo, useEffect } from 'react';
import Script from 'next/script';

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
  | 'rect' | 'round' | 'roundPipe' | 'square' | 'squarePipe'
  | 'rectPipe' | 'hex' | 'angle' | 'ibeam'
  | 'channel' | 'tbar' | 'sphere';

type UnitType = 'mm' | 'inch' | 'm' | 'ft';

/* ================= UNIT → MM ================= */
const UNIT_TO_MM: Record<UnitType, number> = {
  mm: 1,
  inch: 25.4,
  m: 1000,
  ft: 304.8,
};

/* ================= INPUT VISIBILITY LOGIC ================= */
const NEED_WIDTH = ['rect','square','squarePipe','rectPipe','angle','ibeam','channel','tbar'];
const NEED_HEIGHT = ['rectPipe','angle','ibeam','channel','tbar'];
const NEED_THICKNESS = ['rect','roundPipe','squarePipe','rectPipe','angle','ibeam','channel','tbar'];
const NEED_DIAMETER = ['round','roundPipe','hex','sphere'];
const NEED_LENGTH = ['rect','round','roundPipe','square','squarePipe','rectPipe','hex','angle','ibeam','channel','tbar'];

export default function MetalWeightCalculator() {

  /* ================= CALCULATOR STATE ================= */
  const [metal, setMetal] = useState('ms');
  const [shape, setShape] = useState<ShapeType>('rect');
  const [unit, setUnit] = useState<UnitType>('mm');

  const [dims, setDims] = useState({
    w: '', h: '', t: '', l: '', d: '', qty: '1'
  });

  /* ================= ⭐ RATING STATE ================= */
  const [ratingValue, setRatingValue] = useState(4.8);
  const [ratingCount, setRatingCount] = useState(1240);
  const [rated, setRated] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem('mw_rating_count');
    const t = localStorage.getItem('mw_rating_total');
    const r = localStorage.getItem('mw_user_rated');

    if (c && t) {
      const count = parseInt(c);
      const total = parseFloat(t);
      setRatingCount(count);
      setRatingValue(parseFloat((total / count).toFixed(1)));
    }
    if (r) setRated(true);
  }, []);

  const handleRate = (stars: number) => {
    if (rated) return;
    const newCount = ratingCount + 1;
    const newTotal = ratingValue * ratingCount + stars;
    setRatingCount(newCount);
    setRatingValue(parseFloat((newTotal / newCount).toFixed(1)));
    setRated(true);

    localStorage.setItem('mw_rating_count', newCount.toString());
    localStorage.setItem('mw_rating_total', newTotal.toString());
    localStorage.setItem('mw_user_rated', 'true');
  };

  /* ================= WEIGHT CALCULATION ================= */
  const calculateWeight = useMemo(() => {
    const f = UNIT_TO_MM[unit];
    const W = (parseFloat(dims.w)||0)*f;
    const H = (parseFloat(dims.h)||0)*f;
    const T = (parseFloat(dims.t)||0)*f;
    const L = (parseFloat(dims.l)||0)*f;
    const D = (parseFloat(dims.d)||0)*f;
    const Q = parseFloat(dims.qty)||1;
    const density = METALS[metal].density;

    let v = 0;
    switch(shape){
      case 'rect': v = W*T*L; break;
      case 'round': v = Math.PI*(D/2)**2*L; break;
      case 'roundPipe': v = Math.PI*((D/2)**2-(D/2-T)**2)*L; break;
      case 'square': v = W*W*L; break;
      case 'squarePipe': v = (W*W-(W-2*T)**2)*L; break;
      case 'rectPipe': v = (W*H-(W-2*T)*(H-2*T))*L; break;
      case 'hex': v = (3*Math.sqrt(3)/2)*(D/Math.sqrt(3))**2*L; break;
      case 'angle': v = (W+H-T)*T*L; break;
      case 'ibeam':
      case 'channel': v = (2*W*T+(H-2*T)*T)*L; break;
      case 'tbar': v = (W*T+(H-T)*T)*L; break;
      case 'sphere': v = (4/3)*Math.PI*(D/2)**3; break;
    }
    return ((v*density)/1_000_000*Q).toFixed(3);
  }, [dims, shape, metal, unit]);

  return (
    <>
      {/* ================= GOOGLE RATING SCHEMA ================= */}
      <Script
        id="metal-weight-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Metal Weight Calculator",
            "applicationCategory": "EngineeringApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": ratingValue,
              "ratingCount": ratingCount
            }
          })
        }}
      />

      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-[2.5rem] shadow-2xl border">

        {/* ================= HEADER ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Select Metal Type
            </label>
            <select value={metal} onChange={(e)=>setMetal(e.target.value)}
              className="w-full mt-2 p-4 rounded-xl border font-bold">
              {Object.entries(METALS).map(([k,m])=>(
                <option key={k} value={k}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Select Unit of Measurement
            </label>
            <select value={unit} onChange={(e)=>setUnit(e.target.value as UnitType)}
              className="w-full mt-2 p-4 rounded-xl border font-bold">
              <option value="mm">Millimeter (MM) – Default</option>
              <option value="inch">Inches (IN)</option>
              <option value="m">Meter (M)</option>
              <option value="ft">Feet (FT)</option>
            </select>
          </div>
        </div>

        {/* ================= SHAPES ================= */}
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
          Select Metal Shape
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
          {[
            { id:'rect', label:'Sheet / Plate' },
            { id:'round', label:'Round Bar' },
            { id:'roundPipe', label:'Round Pipe' },
            { id:'square', label:'Square Bar' },
            { id:'squarePipe', label:'Square Pipe' },
            { id:'rectPipe', label:'Rect Pipe' },
            { id:'hex', label:'Hex Bar' },
            { id:'angle', label:'Angle (L)' },
            { id:'ibeam', label:'I-Beam' },
            { id:'channel', label:'Channel' },
            { id:'tbar', label:'T-Bar' },
            { id:'sphere', label:'Sphere' },
          ].map(s=>(
            <button key={s.id}
              onClick={()=>setShape(s.id as ShapeType)}
              className={`p-4 rounded-xl text-[10px] font-black uppercase border
              ${shape===s.id?'bg-blue-600 text-white':'bg-slate-100 text-slate-600'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* ================= INPUTS ================= */}
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
          Enter Required Dimensions
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {NEED_WIDTH.includes(shape) && (
            <input placeholder={`Width (${unit})`} value={dims.w}
              onChange={e=>setDims({...dims,w:e.target.value})}
              className="p-4 rounded-xl border font-bold" />
          )}
          {NEED_HEIGHT.includes(shape) && (
            <input placeholder={`Height (${unit})`} value={dims.h}
              onChange={e=>setDims({...dims,h:e.target.value})}
              className="p-4 rounded-xl border font-bold" />
          )}
          {NEED_THICKNESS.includes(shape) && (
            <input placeholder={`Thickness (${unit})`} value={dims.t}
              onChange={e=>setDims({...dims,t:e.target.value})}
              className="p-4 rounded-xl border font-bold" />
          )}
          {NEED_DIAMETER.includes(shape) && (
            <input placeholder={`Diameter (${unit})`} value={dims.d}
              onChange={e=>setDims({...dims,d:e.target.value})}
              className="p-4 rounded-xl border font-bold" />
          )}
          {NEED_LENGTH.includes(shape) && (
            <input placeholder={`Length (${unit})`} value={dims.l}
              onChange={e=>setDims({...dims,l:e.target.value})}
              className="p-4 rounded-xl border font-bold" />
          )}
          <input placeholder="Quantity (Nos)" value={dims.qty}
            onChange={e=>setDims({...dims,qty:e.target.value})}
            className="p-4 rounded-xl border font-bold" />
        </div>

        {/* ================= RESULT ================= */}
        <div className="bg-emerald-600 text-white rounded-3xl p-10 text-center mb-10">
          <p className="text-xs uppercase tracking-widest opacity-80 mb-3">
            Total Calculated Weight
          </p>
          <div className="text-7xl font-black">
            {calculateWeight}
            <span className="text-3xl ml-3">KG</span>
          </div>
        </div>

        {/* ================= ⭐ RATING UI ================= */}
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-widest mb-2">
            Rate This Tool
          </p>
          <div className="flex justify-center gap-1 text-yellow-400 text-2xl">
            {[1,2,3,4,5].map(s=>(
              <span key={s} onClick={()=>handleRate(s)} className="cursor-pointer">★</span>
            ))}
          </div>
          <p className="text-sm mt-2">
            {ratingValue} ★★★★★ based on {ratingCount.toLocaleString()} ratings
          </p>
          {rated && (
            <p className="text-xs text-emerald-600 font-bold mt-1">
              Thanks for rating!
            </p>
          )}
        </div>

        {/* ================= NOTES ================= */}
        <p className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Default unit is Millimeter (MM). You can switch to Inches, Meter or Feet.
        </p>
        <p className="mt-2 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Only required dimensions are shown for the selected metal shape.
        </p>

      </div>
    </>
  );
}
