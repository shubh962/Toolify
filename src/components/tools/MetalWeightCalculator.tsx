'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { HelpCircle, Calculator, Hammer, Globe, ArrowRight } from 'lucide-react';

const METALS: Record<string, { name: string; density: number }> = {
  ms:   { name: 'Mild Steel (MS)',      density: 7.85 },
  ss:   { name: 'Stainless Steel (SS)', density: 8.0  },
  al:   { name: 'Aluminium (AL)',       density: 2.7  },
  cu:   { name: 'Copper (CU)',          density: 8.96 },
  br:   { name: 'Brass (BR)',           density: 8.5  },
  iron: { name: 'Iron',                 density: 7.87 },
};

type ShapeType = 'rect'|'round'|'roundPipe'|'square'|'squarePipe'|'rectPipe'|'hex'|'angle'|'ibeam'|'channel'|'tbar'|'sphere';
type UnitType  = 'mm'|'inch'|'m'|'ft';

const UNIT_TO_MM: Record<UnitType,number> = { mm:1, inch:25.4, m:1000, ft:304.8 };

const NEED_WIDTH      = ['rect','square','squarePipe','rectPipe','angle','ibeam','channel','tbar'];
const NEED_HEIGHT     = ['rectPipe','angle','ibeam','channel','tbar'];
const NEED_THICKNESS  = ['rect','roundPipe','squarePipe','rectPipe','angle','ibeam','channel','tbar'];
const NEED_DIAMETER   = ['round','roundPipe','hex','sphere'];
const NEED_LENGTH     = ['rect','round','roundPipe','square','squarePipe','rectPipe','hex','angle','ibeam','channel','tbar'];

const SHAPES = [
  { id:'rect',       label:'Sheet / Plate' },
  { id:'round',      label:'Round Bar'     },
  { id:'roundPipe',  label:'Round Pipe'    },
  { id:'square',     label:'Square Bar'    },
  { id:'squarePipe', label:'Square Pipe'   },
  { id:'rectPipe',   label:'Rect Pipe'     },
  { id:'hex',        label:'Hex Bar'       },
  { id:'angle',      label:'Angle (L)'     },
  { id:'ibeam',      label:'I-Beam'        },
  { id:'channel',    label:'Channel'       },
  { id:'tbar',       label:'T-Bar'         },
  { id:'sphere',     label:'Sphere'        },
];

const softwareSchema = {
  '@context':'https://schema.org','@type':'SoftwareApplication',
  name:'Metal Weight Calculator Online Free — TaskGuru',
  url:'https://www.taskguru.online/tools/metal-weight-calculator',
  applicationCategory:'EngineeringApplication',operatingSystem:'All',
  description:'Free metal weight calculator online — steel, aluminium, copper, brass, iron. 12 shapes, 4 unit systems. Instant results for engineers and fabricators.',
  offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},
  publisher:{'@type':'Organization',name:'TaskGuru',url:'https://www.taskguru.online'},
};

const faqs = [
  { q:'How accurate is this Metal Weight Calculator?', a:'Our calculator uses standard industry density values (g/cm³) for each metal type and applies precise geometric volume formulas for all 12 shapes. Results are accurate to 3 decimal places in kilograms, matching professional engineering standards.' },
  { q:'Which metals does this calculator support?', a:'Supported metals include Mild Steel (MS), Stainless Steel (SS), Aluminium, Copper, Brass, and Iron — covering the most commonly used metals in fabrication, construction, and manufacturing.' },
  { q:'Can I calculate weight in inches or feet instead of millimeters?', a:'Yes. Switch between Millimeter (MM), Inches (IN), Meter (M), and Feet (FT) using the unit selector. All inputs are automatically converted for accurate calculation.' },
  { q:'What shapes are supported?', a:'12 metal shapes: Sheet/Plate, Round Bar, Round Pipe, Square Bar, Square Pipe, Rectangular Pipe, Hex Bar, Angle (L-Section), I-Beam, Channel, T-Bar, and Sphere.' },
  { q:'How do I calculate the weight of a steel round bar?', a:'Select "Mild Steel", choose "Round Bar", enter the diameter and length, set quantity. Formula: Weight = π × (D/2)² × Length × Density. Our calculator handles this automatically in any unit.' },
  { q:'What is the density of mild steel?', a:'Mild steel (MS) density is 7.85 g/cm³. Stainless steel: 8.0, aluminium: 2.7, copper: 8.96, brass: 8.5, iron: 7.87 g/cm³.' },
  { q:'Is this tool free for commercial use?', a:'Yes, completely free. Use it for personal or commercial estimation without any cost or registration.' },
];

const faqSchema = {
  '@context':'https://schema.org','@type':'FAQPage',
  mainEntity: faqs.map(f=>({ '@type':'Question', name:f.q, acceptedAnswer:{'@type':'Answer',text:f.a} })),
};

export default function MetalWeightCalculator() {
  const [metal,setMetal] = useState('ms');
  const [shape,setShape] = useState<ShapeType>('rect');
  const [unit,setUnit]   = useState<UnitType>('mm');
  const [dims,setDims]   = useState({w:'',h:'',t:'',l:'',d:'',qty:'1'});

  const setDim = (key:string,val:string) => {
    const n = parseFloat(val);
    if (val!=='' && n<0) return;
    setDims(prev=>({...prev,[key]:val}));
  };

  const calculateWeight = useMemo(()=>{
    const f=UNIT_TO_MM[unit];
    const W=(parseFloat(dims.w)||0)*f, H=(parseFloat(dims.h)||0)*f;
    const T=(parseFloat(dims.t)||0)*f, L=(parseFloat(dims.l)||0)*f;
    const D=(parseFloat(dims.d)||0)*f, Q=parseFloat(dims.qty)||1;
    const density=METALS[metal].density;
    let v=0;
    switch(shape){
      case 'rect':       v=W*T*L; break;
      case 'round':      v=Math.PI*(D/2)**2*L; break;
      case 'roundPipe':  v=Math.PI*((D/2)**2-(D/2-T)**2)*L; break;
      case 'square':     v=W*W*L; break;
      case 'squarePipe': v=(W*W-(W-2*T)**2)*L; break;
      case 'rectPipe':   v=(W*H-(W-2*T)*(H-2*T))*L; break;
      case 'hex':        v=(3*Math.sqrt(3)/2)*(D/Math.sqrt(3))**2*L; break;
      case 'angle':      v=(W+H-T)*T*L; break;
      case 'ibeam':
      case 'channel':    v=(2*W*T+(H-2*T)*T)*L; break;
      case 'tbar':       v=(W*T+(H-T)*T)*L; break;
      case 'sphere':     v=(4/3)*Math.PI*(D/2)**3; break;
    }
    return ((v*density)/1_000_000*Q).toFixed(3);
  },[dims,shape,metal,unit]);

  return (
    <>
      <Script id="metal-weight-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(softwareSchema)}}/>
      <Script id="metal-weight-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>

      <div className="max-w-4xl mx-auto space-y-20 pb-20">

        {/* CALCULATOR */}
        <div className="p-6 md:p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Select Metal Type</label>
              <select value={metal} onChange={e=>setMetal(e.target.value)} className="w-full mt-2 p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white">
                {Object.entries(METALS).map(([k,m])=>(<option key={k} value={k}>{m.name}</option>))}
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Select Unit of Measurement</label>
              <select value={unit} onChange={e=>setUnit(e.target.value as UnitType)} className="w-full mt-2 p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white">
                <option value="mm">Millimeter (MM) — Default</option>
                <option value="inch">Inches (IN)</option>
                <option value="m">Meter (M)</option>
                <option value="ft">Feet (FT)</option>
              </select>
            </div>
          </div>

          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-4">Select Metal Shape</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
            {SHAPES.map(s=>(
              <button key={s.id} onClick={()=>setShape(s.id as ShapeType)}
                className={`p-4 rounded-xl text-[10px] font-black uppercase border transition-colors ${shape===s.id?'bg-blue-600 text-white border-blue-600':'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-700 hover:border-blue-400'}`}>
                {s.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-4">Enter Required Dimensions</p>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {NEED_WIDTH.includes(shape)     && <input type="number" min="0" placeholder={`Width (${unit})`}     value={dims.w} onChange={e=>setDim('w',e.target.value)} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"/>}
            {NEED_HEIGHT.includes(shape)    && <input type="number" min="0" placeholder={`Height (${unit})`}    value={dims.h} onChange={e=>setDim('h',e.target.value)} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"/>}
            {NEED_THICKNESS.includes(shape) && <input type="number" min="0" placeholder={`Thickness (${unit})`} value={dims.t} onChange={e=>setDim('t',e.target.value)} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"/>}
            {NEED_DIAMETER.includes(shape)  && <input type="number" min="0" placeholder={`Diameter (${unit})`}  value={dims.d} onChange={e=>setDim('d',e.target.value)} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"/>}
            {NEED_LENGTH.includes(shape)    && <input type="number" min="0" placeholder={`Length (${unit})`}    value={dims.l} onChange={e=>setDim('l',e.target.value)} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"/>}
            <input type="number" min="1" placeholder="Quantity (Nos)" value={dims.qty} onChange={e=>setDim('qty',e.target.value)} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 font-bold bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"/>
          </div>

          <div className="bg-emerald-600 text-white rounded-3xl p-10 text-center mb-8">
            <p className="text-xs uppercase tracking-widest opacity-80 mb-3">Total Calculated Weight</p>
            <div className="text-7xl font-black">{calculateWeight}<span className="text-3xl ml-3">KG</span></div>
          </div>

          <p className="text-center text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Default unit is Millimeter (MM). Switch to Inches, Meter, or Feet as needed.</p>
          <p className="mt-2 text-center text-[11px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-wider">Only required dimensions are shown for the selected shape.</p>
        </div>

        {/* SEO ARTICLE */}
        <article className="space-y-16 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-16">

          <section className="space-y-5 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Free Online Metal Weight Calculator for Engineers & Fabricators</h2>
            <p className="text-lg">Calculating metal weight accurately is one of the most fundamental tasks in fabrication, construction, and manufacturing. Whether you are estimating material costs, calculating shipping weight, or verifying structural load requirements, having precise numbers is non-negotiable. <strong>TaskGuru&apos;s Metal Weight Calculator</strong> supports 12 metal shapes and 6 metal types, giving you instant, professional-grade results in seconds.</p>
            <p>Unlike basic calculators that only handle round bars or sheets, our tool supports complex structural profiles including I-Beams, Channel sections, T-Bars, and Angle iron — the shapes most commonly used in steel fabrication and civil engineering projects.</p>
          </section>

          <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon:<Calculator className="w-8 h-8 text-blue-600"/>, title:'12 Metal Shapes', desc:'From basic round bars and plates to structural I-Beams, Channel sections, and Hex bars — all common industrial profiles covered.' },
              { icon:<Hammer className="w-8 h-8 text-orange-600"/>, title:'6 Metal Types', desc:'Mild Steel, Stainless Steel, Aluminium, Copper, Brass, and Iron — with accurate industry-standard density values for each.' },
              { icon:<Globe className="w-8 h-8 text-green-600"/>, title:'4 Unit Systems', desc:'Switch seamlessly between Millimeter, Inch, Meter, and Feet. Ideal for both metric and imperial projects worldwide.' },
            ].map(item=>(
              <div key={item.title} className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl space-y-3">
                {item.icon}
                <h3 className="font-black text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          <section className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">How Metal Weight Calculation Works</h2>
            <p>Metal weight is calculated using: <strong>Weight = Volume × Density</strong>. Volume is determined by the geometric dimensions of the shape, and density is the material-specific value in g/cm³.</p>
            <p>For example: a Mild Steel Round Bar with 50mm diameter and 1000mm length — Volume = π × (25)² × 1000 = 1,963,495 mm³. Multiplied by 7.85 g/cm³ = approximately <strong>15.4 kg</strong>.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-zinc-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="p-3 text-left font-bold">Metal</th>
                    <th className="p-3 text-left font-bold">Density (g/cm³)</th>
                    <th className="p-3 text-left font-bold">Common Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  {[['Mild Steel (MS)','7.85','Structural beams, pipes, plates'],['Stainless Steel','8.00','Food equipment, architecture'],['Aluminium','2.70','Aerospace, automotive, roofing'],['Copper','8.96','Electrical wiring, plumbing'],['Brass','8.50','Fittings, valves, decorative'],['Iron','7.87','Casting, heavy machinery']].map(([m,d,u])=>(
                    <tr key={m as string} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-bold text-gray-900 dark:text-white">{m as string}</td>
                      <td className="p-3 text-blue-600 dark:text-blue-400 font-mono">{d as string}</td>
                      <td className="p-3 text-gray-500 dark:text-gray-400 text-xs">{u as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Who Uses This Tool?</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[{title:'Steel Fabricators',desc:'Estimate material weight for quotations and job costing before placing steel orders.'},{title:'Civil Engineers',desc:'Calculate structural member weights for load analysis and design verification.'},{title:'Students & Trainees',desc:'Learn and verify metal weight calculations for engineering coursework and projects.'},{title:'Procurement Teams',desc:'Accurately estimate shipping weight and material costs for purchase orders.'}].map(item=>(
                <div key={item.title} className="flex gap-3 p-5 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"/>
                  <div><h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4><p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-blue-600"/> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq,i)=>(
                <details key={i} className="group border border-gray-200 dark:border-zinc-800 rounded-2xl bg-gray-50 dark:bg-zinc-900 cursor-pointer overflow-hidden">
                  <summary className="flex justify-between items-center px-6 py-5 font-bold text-gray-900 dark:text-white list-none">
                    {faq.q}<span className="text-blue-600 group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <div className="px-6 pb-5 pt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto space-y-5 border-t border-gray-100 dark:border-zinc-800 pt-10">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Related Free Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[{label:'EMI Calculator',desc:'Calculate loan EMI with full amortization schedule',href:'/tools/emi-calculator'},{label:'Age Calculator',desc:'Find exact age in years, months, and days free',href:'/tools/age-calculator'},{label:'Invoice Generator',desc:'Create professional PDF invoices free',href:'/tools/invoice-generator'},{label:'PDF to Word',desc:'Convert PDF to editable Word document free',href:'/tools/pdf-to-word'},{label:'Image Compressor',desc:'Compress images to exact KB size free',href:'/tools/image-compressor'},{label:'Credit Card Eligibility',desc:'Check card eligibility without credit impact',href:'/tools/credit-card-eligibility-checker'}].map(tool=>(
                <Link key={tool.href} href={tool.href} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 hover:border-blue-400 rounded-xl transition-colors group">
                  <div><p className="font-bold text-gray-900 dark:text-white text-sm">{tool.label}</p><p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tool.desc}</p></div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0"/>
                </Link>
              ))}
            </div>
            <div className="mt-4 p-5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 space-y-3">
              <p className="font-bold text-gray-900 dark:text-white text-sm">Related Reading</p>
              <div className="space-y-2">
                {[{href:'/blog/rent-vs-buy-financial-guide',title:'Rent vs Buy — Complete Financial Decision Guide'},{href:'/blog/zero-cost-freelancer-tools',title:'Zero Cost Tools for Freelancers — Complete List'},{href:'/blog/free-online-tools-students-2026-no-login',title:'Free Online Tools for Students 2026'},{href:'/blog/free-productivity-tools-2026',title:'Best Free Productivity Tools 2026'}].map(post=>(
                  <Link key={post.href} href={post.href} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <ArrowRight className="w-3.5 h-3.5 shrink-0"/>{post.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
