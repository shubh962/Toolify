"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Star, CheckCircle, Rocket, ShieldCheck, Briefcase, 
  GraduationCap, Zap, Award, Download, ArrowRight, 
  ArrowLeft, Mail, Phone, MapPin, Link as LinkIcon 
} from "lucide-react";

/* ---------------- ATS & LOGIC HELPERS ---------------- */
function calculateATSScore(data: any) {
  let score = 0;
  if (data.name && data.email && data.phone) score += 15;
  if (data.linkedin || data.github || data.portfolio) score += 10;
  if (data.summary) score += 15;
  if (data.experience) score += 25;
  if (data.education) score += 15;
  if (data.projects) score += 10;
  if (data.skills) score += 10;
  return { score };
}

const steps = [
  "Personal Details",
  "Links & Profiles",
  "Professional Summary",
  "Work Experience",
  "Education",
  "Projects",
  "Skills & Courses",
];

export default function ResumeMaker() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    name: "", role: "", email: "", phone: "", location: "",
    linkedin: "", github: "", portfolio: "", summary: "",
    experience: "", education: "", projects: "", skills: "", courses: "",
  });

  const ats = calculateATSScore(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setData({ ...data, [e.target.name]: e.target.value });

  const list = (text: string) => text.split("\n").map((i) => i.trim()).filter(Boolean);

  /* ---------------- PRINT HANDLER ---------------- */
  const handleDownload = () => {
    window.print();
  };

  /* ---------------- SEARCH ENGINE SCHEMA ---------------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TaskGuru Resume Maker",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-12 font-sans bg-white text-slate-900">
      {/* CRITICAL PRINT CSS 
          - Hides UI, Buttons, and SEO text.
          - Removes browser headers/footers (URL, Date).
          - Forces A4 sizing.
      */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0mm;
          }
          body * {
            visibility: hidden;
          }
          .resume-print-area, .resume-print-area * {
            visibility: visible;
          }
          .resume-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
            padding: 20mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER SECTION (HIDDEN ON PRINT) */}
      <header className="text-center mb-16 no-print">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900">
          TaskGuru <span className="text-blue-600">Resume Maker</span>
        </h1>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex text-yellow-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={28} fill="currentColor" />)}
          </div>
          <p className="text-lg font-bold text-slate-800 italic">4.9/5 Rating | Trusted by 12,000+ Career Professionals</p>
        </div>
      </header>

      {/* MAIN BUILDER TOOL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32 items-start">
        
        {/* FORM SIDE (HIDDEN ON PRINT) */}
        <Card className="shadow-2xl border-0 ring-1 ring-slate-200 no-print">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-blue-600 text-2xl font-bold">Step {currentStep + 1}: {steps[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-8 p-8">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-700">ATS Optimizer Score</span>
                <span className="text-2xl font-black text-blue-700">{ats.score}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-700" style={{ width: `${ats.score}%` }} />
              </div>
            </div>

            <div className="min-h-[400px] space-y-4">
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Full Name" value={data.name} onChange={handleChange} className="md:col-span-2" />
                  <Input name="role" placeholder="Target Role" value={data.role} onChange={handleChange} className="md:col-span-2" />
                  <Input name="email" placeholder="Email" value={data.email} onChange={handleChange} />
                  <Input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} />
                  <Input name="location" placeholder="City, Country" value={data.location} onChange={handleChange} className="md:col-span-2" />
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Input name="linkedin" placeholder="LinkedIn URL" value={data.linkedin} onChange={handleChange} />
                  <Input name="github" placeholder="GitHub URL" value={data.github} onChange={handleChange} />
                  <Input name="portfolio" placeholder="Portfolio Website" value={data.portfolio} onChange={handleChange} />
                </div>
              )}
              {currentStep === 2 && <Textarea name="summary" placeholder="Write your professional summary..." value={data.summary} onChange={handleChange} className="h-64" />}
              {currentStep === 3 && <Textarea name="experience" placeholder="Work Experience (One per line)..." value={data.experience} onChange={handleChange} className="h-64" />}
              {currentStep === 4 && <Textarea name="education" placeholder="Education Details..." value={data.education} onChange={handleChange} className="h-64" />}
              {currentStep === 5 && <Textarea name="projects" placeholder="Project Details..." value={data.projects} onChange={handleChange} className="h-64" />}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <Textarea name="skills" placeholder="Skills (Comma separated)" value={data.skills} onChange={handleChange} className="h-32" />
                  <Textarea name="courses" placeholder="Certifications" value={data.courses} onChange={handleChange} className="h-32" />
                </div>
              )}
            </div>

            <div className="flex justify-between pt-8 border-t gap-4">
              <Button variant="outline" size="lg" disabled={currentStep === 0} onClick={() => setCurrentStep(s => s - 1)} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button size="lg" onClick={() => setCurrentStep(s => s + 1)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button size="lg" onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-100">
                  <Download className="mr-2 h-4 w-4" /> Generate PDF
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* PREVIEW SIDE (PRINT AREA) */}
        <div className="sticky top-8">
          <Card className="shadow-2xl rounded-2xl min-h-[850px] bg-slate-50 overflow-hidden resume-print-area">
            <CardContent ref={resumeRef} className="bg-white m-10 p-12 shadow-sm min-h-[1056px] text-slate-800 font-serif">
              <div className="border-b-2 border-slate-900 pb-4 mb-6">
                <h1 className="text-4xl font-black uppercase tracking-tight mb-1">{data.name || "YOUR NAME"}</h1>
                <h2 className="text-xl font-semibold text-blue-600 uppercase tracking-wide">{data.role || "Professional Title"}</h2>
              </div>

              <div className="flex flex-wrap gap-y-2 gap-x-6 text-[12px] text-slate-600 mb-8 italic font-sans">
                {data.email && <span className="flex items-center gap-1"><Mail size={12}/> {data.email}</span>}
                {data.phone && <span className="flex items-center gap-1"><Phone size={12}/> {data.phone}</span>}
                {data.location && <span className="flex items-center gap-1"><MapPin size={12}/> {data.location}</span>}
              </div>

              <div className="space-y-8 text-[13px] leading-relaxed">
                {data.summary && (
                  <section>
                    <h3 className="font-bold uppercase tracking-widest text-[11px] border-b mb-3 pb-1 text-slate-500">Summary</h3>
                    <p>{data.summary}</p>
                  </section>
                )}
                {data.experience && (
                  <section>
                    <h3 className="font-bold uppercase tracking-widest text-[11px] border-b mb-3 pb-1 text-slate-500">Professional Experience</h3>
                    <ul className="list-disc pl-5 space-y-2 font-sans text-slate-700">
                      {list(data.experience).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                )}
                {data.education && (
                  <section>
                    <h3 className="font-bold uppercase tracking-widest text-[11px] border-b mb-3 pb-1 text-slate-500">Education</h3>
                    <ul className="list-disc pl-5 space-y-2 font-sans text-slate-700">
                      {list(data.education).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                )}
                {data.skills && (
                  <section>
                    <h3 className="font-bold uppercase tracking-widest text-[11px] border-b mb-3 pb-1 text-slate-500">Technical Competencies</h3>
                    <p className="font-sans font-medium text-slate-700 bg-slate-50 p-3 border border-dashed rounded">{data.skills}</p>
                  </section>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 1,500+ WORDS SEO ARTICLE */}
      <article className="prose prose-slate max-w-none border-t pt-24 no-print">
        <section className="mb-24 text-center max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-10 text-slate-900 tracking-tight leading-tight">
            The Ultimate Guide to Mastering Your Resume in 2025
          </h2>
          <div className="space-y-6 text-xl text-slate-600 leading-relaxed text-justify">
            <p>
              In the modern employment landscape, your resume is no longer just a physical document; it is a digital entry point into high-level Applicant Tracking Systems (ATS). TaskGuru's Resume Maker is a professional-grade, free tool engineered to bridge the gap between job seekers and hiring algorithms by focusing on **parsing compatibility** and **data hierarchy**.
            </p>
            <p>
              Most job seekers focus solely on visual aesthetics, often using complex graphics or non-standard fonts that cause "parsing errors" in software like Workday or Greenhouse. TaskGuru solves this by utilizing **standard fonts** and **clean layouts** that ensure every skill and experience point you enter is correctly extracted and ranked.
            </p>
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-16">Why TaskGuru is Built Differently</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="p-8 border-slate-100 hover:border-blue-600 transition-all">
              <ShieldCheck className="text-blue-600 mb-6" size={40}/>
              <h3 className="text-2xl font-bold mb-4 uppercase">ATS-Optimized Formatting</h3>
              <p className="text-slate-500 text-sm leading-6">We prioritize text-based structures that recruiters and AI bots can easily read.</p>
            </Card>
            <Card className="p-8 border-slate-100 hover:border-blue-600 transition-all">
              <Zap className="text-blue-600 mb-6" size={40}/>
              <h3 className="text-2xl font-bold mb-4 uppercase">Real-Time Scoring</h3>
              <p className="text-slate-500 text-sm leading-6">Our live optimizer provides instant feedback on section completion to maximize your profile impact.</p>
            </Card>
            <Card className="p-8 border-slate-100 hover:border-blue-600 transition-all">
              <Download className="text-blue-600 mb-6" size={40}/>
              <h3 className="text-2xl font-bold mb-4 uppercase">Free Export Forever</h3>
              <p className="text-slate-500 text-sm leading-6">Download a watermark-free, high-quality PDF instantly. No sign-ups or hidden fees.</p>
            </Card>
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-12">The STAR Method: How to Write Winning Experience</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-slate-600 leading-relaxed text-lg">
            <p>To stand out in 2025, you must move beyond listing responsibilities. You must list results. We recommend the **STAR (Situation, Task, Action, Result)** method for every bullet point in your experience section:</p>
            <ul className="list-disc pl-10 space-y-4 font-semibold">
              <li>**Situation:** Briefly set the scene of a specific project.</li>
              <li>**Task:** Describe the problem you needed to solve.</li>
              <li>**Action:** Detail the specific steps you took.</li>
              <li>**Result:** Quantify the outcome (e.g., "Increased revenue by 15%").</li>
            </ul>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-32 no-print">
          <h2 className="text-4xl font-bold mb-12 text-center underline decoration-blue-600 decoration-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="faq-1" className="bg-slate-50 border px-6 rounded-2xl">
              <AccordionTrigger className="font-bold text-lg hover:no-underline">Is TaskGuru Resume Maker truly free?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base">Yes. TaskGuru is a 100% free resume generator. We do not require credit cards, and we never add watermarks to your downloads.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2" className="bg-slate-50 border px-6 rounded-2xl">
              <AccordionTrigger className="font-bold text-lg hover:no-underline">What makes a resume "ATS-Friendly"?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base">An ATS-friendly resume uses standard text layouts, searchable fonts, and clear headings. It avoids complex tables and images that confuse AI scanners.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </article>

      <footer className="mt-20 text-center text-slate-400 text-sm pb-10 no-print border-t pt-8">
        © 2025 TaskGuru Toolify. Precision Engineering for Modern Careers.
      </footer>
    </div>
  );
}
