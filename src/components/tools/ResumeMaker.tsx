"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";

/* ================================
   ATS SCORE LOGIC (SIMPLE + REAL)
================================ */
function calculateATSScore(data: any) {
  let score = 0;
  if (data.name && data.email && data.phone) score += 15;
  if (data.summary) score += 20;
  if (data.skills) score += 20;
  if (data.experience) score += 25;
  if (data.education) score += 10;
  if (data.projects) score += 10;
  return { score: Math.min(score, 100) };
}

/* ================================
   STEPS
================================ */
const steps = [
  "Personal Details",
  "Professional Summary",
  "Skills",
  "Experience",
  "Education",
  "Projects",
];

export default function ResumeMaker() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  const ats = calculateATSScore(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const list = (text: string) =>
    text.split("\n").map((i) => i.trim()).filter(Boolean);

  const limitText = (text: string, max = 600) =>
    text.length > max ? text.slice(0, max) : text;

  const handleDownload = () => {
    window.print();
  };

  /* ================================
     SEO SCHEMA
  ================================ */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TaskGuru Resume Maker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white text-slate-900">
      {/* ================= PRINT CSS ================= */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body * {
            visibility: hidden;
          }
          .resume-print-area,
          .resume-print-area * {
            visibility: visible;
          }
          .resume-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            height: 267mm;
            overflow: hidden;
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HEADER ================= */}
      <header className="text-center mb-14 no-print">
        <h1 className="text-5xl font-black tracking-tight">
          TaskGuru <span className="text-blue-600">Resume Maker</span>
        </h1>
        <p className="mt-3 text-slate-600">
          ATS-Optimized • 1-Page • Free PDF
        </p>
        <div className="flex justify-center gap-1 mt-3 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} fill="currentColor" />
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* ================= FORM ================= */}
        <Card className="no-print shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-600">
              Step {currentStep + 1}: {steps[currentStep]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ATS SCORE */}
            <div className="bg-blue-50 p-4 rounded-lg border">
              <div className="flex justify-between font-bold text-blue-700">
                <span>ATS Score</span>
                <span>{ats.score}%</span>
              </div>
              <div className="h-2 bg-blue-200 rounded mt-2">
                <div
                  className="h-full bg-blue-600 rounded"
                  style={{ width: `${ats.score}%` }}
                />
              </div>
            </div>

            {/* FORM STEPS */}
            {currentStep === 0 && (
              <div className="space-y-3">
                <Input name="name" placeholder="Full Name" onChange={handleChange} />
                <Input name="role" placeholder="Target Role" onChange={handleChange} />
                <Input name="email" placeholder="Email" onChange={handleChange} />
                <Input name="phone" placeholder="Phone" onChange={handleChange} />
                <Input
                  name="location"
                  placeholder="City, Country"
                  onChange={handleChange}
                />
              </div>
            )}

            {currentStep === 1 && (
              <>
                <Textarea
                  name="summary"
                  className="h-52"
                  onChange={handleChange}
                  placeholder="Example:
Results-driven Software Engineer with experience in web development, JavaScript frameworks, and problem-solving. Skilled in building responsive applications and optimizing performance. Seeking to contribute technical expertise to a growth-oriented organization."
                />
                <p className="text-xs italic text-slate-500">
                  Tip: Write 3–4 lines. Mention role, skills & career goal.
                </p>
              </>
            )}

            {currentStep === 2 && (
              <Textarea
                name="skills"
                className="h-40"
                onChange={handleChange}
                placeholder="HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB"
              />
            )}

            {currentStep === 3 && (
              <Textarea
                name="experience"
                className="h-52"
                onChange={handleChange}
                placeholder="• Developed responsive web applications using React
• Improved website performance by 30%
• Collaborated with cross-functional teams"
              />
            )}

            {currentStep === 4 && (
              <Textarea
                name="education"
                className="h-40"
                onChange={handleChange}
                placeholder="B.Tech in Information Technology – Axis Institute of Technology (2023)"
              />
            )}

            {currentStep === 5 && (
              <Textarea
                name="projects"
                className="h-40"
                onChange={handleChange}
                placeholder="AI Resume Builder – Next.js based ATS-friendly resume tool"
              />
            )}

            {/* NAV BUTTONS */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((s) => s - 1)}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="flex-1 bg-blue-600"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-green-600"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ================= PREVIEW ================= */}
        <Card className="resume-print-area shadow-xl">
          <CardContent
            ref={resumeRef}
            className="p-10 text-slate-800 font-serif"
            style={{ height: "267mm", overflow: "hidden" }}
          >
            <div className="border-b-2 border-slate-900 pb-3 mb-6">
              <h1 className="text-[32px] font-extrabold uppercase">
                {data.name || "YOUR NAME"}
              </h1>
              <h2 className="text-lg uppercase text-blue-600">
                {data.role || "Professional Title"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-600 mb-6 font-sans">
              {data.email && (
                <span className="flex items-center gap-1">
                  <Mail size={12} /> {data.email}
                </span>
              )}
              {data.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {data.phone}
                </span>
              )}
              {data.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {data.location}
                </span>
              )}
            </div>

            <div className="space-y-6 text-sm leading-relaxed">
              {data.summary && (
                <section>
                  <h3 className="font-bold uppercase text-xs border-b mb-2">
                    Summary
                  </h3>
                  <p>{limitText(data.summary)}</p>
                </section>
              )}

              {data.skills && (
                <section>
                  <h3 className="font-bold uppercase text-xs border-b mb-2">
                    Skills
                  </h3>
                  <p>{data.skills}</p>
                </section>
              )}

              {data.experience && (
                <section>
                  <h3 className="font-bold uppercase text-xs border-b mb-2">
                    Experience
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {list(data.experience).map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </section>
              )}

              {data.projects && (
                <section>
                  <h3 className="font-bold uppercase text-xs border-b mb-2">
                    Projects
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {list(data.projects).map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </section>
              )}

              {data.education && (
                <section>
                  <h3 className="font-bold uppercase text-xs border-b mb-2">
                    Education
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {list(data.education).map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="text-center text-xs text-slate-400 mt-16 no-print">
        © 2025 TaskGuru.online – ATS Resume Builder
      </footer>
    </div>
  );
}
