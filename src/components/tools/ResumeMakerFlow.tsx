"use client";

import { useState } from "react";
import Link from "next/link";
import ResumeStartWizard from "@/components/resume/ResumeStartWizard";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeMaker from "@/components/tools/ResumeMaker";
import {
  ShieldCheck, Zap, HelpCircle, Globe,
  FileText, ArrowRight, CheckCircle,
} from "lucide-react";

// ✅ JSON-LD FAQ Schema — outside component
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this resume builder really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free with no hidden fees, no sign-up required, and no watermarks on the downloaded PDF. Every feature including PDF download is available at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "Are the resume templates ATS-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our Classic ATS template uses single-column layouts, standard fonts, and clean formatting that Applicant Tracking Systems can parse correctly. It scores 100% on our ATS compatibility check and is suitable for corporate, finance, legal, and engineering roles.",
      },
    },
    {
      "@type": "Question",
      name: "Which resume template should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most corporate job applications in the USA, UK, Canada, and Australia, use the Classic ATS template — it has the highest ATS compatibility. The Modern template is better for creative, marketing, design, or startup roles. The Minimal template is ideal for freshers and students.",
      },
    },
    {
      "@type": "Question",
      name: "Is my resume data stored or shared?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your resume data exists only in your browser's memory. Nothing is sent to any server — ever. When you close the tab, your data is gone. We have zero access to your personal details or work history.",
      },
    },
    {
      "@type": "Question",
      name: "Can I edit my resume after downloading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The downloaded file is a PDF — ideal for submitting to employers. If you need an editable version, use our free PDF to Word Converter to turn it into a .docx file you can edit in Microsoft Word or Google Docs.",
      },
    },
    {
      "@type": "Question",
      name: "What resume format is best for freshers in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For freshers and students in India, use the Minimal template with your education and academic projects at the top, followed by skills and any internships. Keep it to one page. Focus on your B.Tech/B.Com/BA degree, relevant certifications, and technical skills. Do not include references.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a CV and a resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the UK and Australia, 'CV' is the standard term for the document you send to employers — equivalent to a resume in the USA. In the USA, a CV specifically refers to a longer academic document. For job applications in the UK, Australia, and India, use 'CV'. For job applications in the USA and Canada, use 'resume'. Both are the same type of document in most contexts.",
      },
    },
  ],
};

type Step = "wizard" | "templates" | "builder";

export default function ResumeMakerFlow() {
  const [step, setStep] = useState<Step>("wizard");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <>
      {/* ✅ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-20 pb-20">

        {/* ── TOOL INTERFACE ── */}
        <div className="min-h-[600px]">
          {step === "wizard" && (
            <ResumeStartWizard
              onStartNew={() => setStep("templates")}
              onClose={() => setStep("wizard")}
            />
          )}
          {step === "templates" && (
            <TemplateSelector
              onSelect={(templateId) => {
                setSelectedTemplate(templateId);
                setStep("builder");
              }}
            />
          )}
          {step === "builder" && (
            <div className="space-y-4">
              <button
                onClick={() => setStep("templates")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                ← Change Template
              </button>
              <ResumeMaker template={selectedTemplate} />
            </div>
          )}
        </div>

        {/* ── SEO ARTICLE — always visible, Google indexes this ── */}
        <article className="max-w-4xl mx-auto border-t pt-16 space-y-16 text-gray-600 dark:text-gray-400 leading-relaxed px-4">

          {/* Hero */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
              Free Online Resume Builder 2026
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Create a professional, ATS-friendly resume in minutes. No sign-up. No watermark. No payment.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
              {['🇺🇸 USA', '🇬🇧 UK', '🇦🇺 Australia', '🇨🇦 Canada', '🇮🇳 India', '🌍 Global'].map((c) => (
                <span key={c} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Why TaskGuru */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-7 rounded-3xl border border-blue-100 dark:border-blue-900 space-y-3">
              <Zap className="w-7 h-7 text-blue-600" />
              <h3 className="font-black text-lg text-blue-700 dark:text-blue-300">Why Use TaskGuru?</h3>
              <p className="text-sm leading-relaxed">
                Most &quot;free&quot; resume builders lock your file behind a paywall at
                the last second. <strong>TaskGuru is different.</strong> Build, preview,
                and download your resume without paying a cent. Our templates are designed
                to pass ATS systems used by HR departments in the USA, UK, Canada,
                and Australia.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-7 rounded-3xl border border-green-100 dark:border-green-900 space-y-3">
              <ShieldCheck className="w-7 h-7 text-green-600" />
              <h3 className="font-black text-lg text-green-700 dark:text-green-300">Privacy Guaranteed</h3>
              <p className="text-sm leading-relaxed">
                Your career data is sensitive. We use <strong>client-side generation</strong> —
                your resume is built entirely inside your browser. We do not store your
                employment history or personal details on our servers — ever.
              </p>
            </div>
          </div>

          {/* How to create */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              How to Create a Job-Winning Resume
            </h2>
            <div className="space-y-4">
              {[
                { n: "1", title: "Choose a Template", desc: "Select from Classic ATS, Modern, Minimal, or Executive. The ATS score is shown for each template — use Classic ATS for corporate roles in USA, UK, Canada, and Australia." },
                { n: "2", title: "Fill in Your Details", desc: "Enter your contact info, work experience, education, and skills. The real-time ATS score updates as you type so you know exactly what to improve before applying." },
                { n: "3", title: "Download PDF Free", desc: "Click Download PDF and get a professional resume instantly. No watermarks, no fees, no email address required — download as many times as you need." },
              ].map((item) => (
                <div key={item.n} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-black flex-shrink-0 text-sm">
                    {item.n}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Global audience section */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Resume Formats by Country
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  flag: "🇺🇸",
                  country: "United States",
                  tips: ["1 page for under 10 years experience", "No photo — illegal in many states", "ATS-optimized format essential", "Action verbs: Led, Built, Achieved"],
                },
                {
                  flag: "🇬🇧",
                  country: "United Kingdom",
                  tips: ["Called a 'CV' not resume", "2 pages acceptable", "No photo required", "Personal statement at the top"],
                },
                {
                  flag: "🇦🇺",
                  country: "Australia",
                  tips: ["1-2 pages for most roles", "No photo on CV", "Reverse chronological order", "Include referees or 'Available on request'"],
                },
                {
                  flag: "🇮🇳",
                  country: "India",
                  tips: ["Freshers: 1 page max", "Include career objective", "List B.Tech/MBA specialization clearly", "Add internships and projects"],
                },
              ].map((item) => (
                <div key={item.country} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.flag}</span>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm">{item.country}</h3>
                  </div>
                  <ul className="space-y-1">
                    {item.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ATS Tips */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              How to Write an ATS-Friendly Resume
            </h2>
            <div className="space-y-3">
              {[
                { n: "1", title: "Use a clean single-column layout", desc: "Avoid tables, text boxes, columns, headers/footers, and graphics. ATS parsers read left-to-right, top-to-bottom." },
                { n: "2", title: "Mirror keywords from the job description", desc: "Find 5-10 keywords from the job posting and use them naturally in your summary, skills, and experience sections." },
                { n: "3", title: "Use standard section headings", desc: 'Stick to: Work Experience, Education, Skills, Summary. Avoid creative headings like "My Journey" or "What I Do".' },
                { n: "4", title: "Start bullet points with action verbs", desc: "Led, Built, Managed, Developed, Improved — these signal achievement and are highly weighted by both ATS and human reviewers." },
              ].map((tip) => (
                <div key={tip.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
                    {tip.n}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-gray-50 dark:bg-gray-900 p-7 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2 text-gray-900 dark:text-white">
              <HelpCircle className="w-5 h-5 text-purple-500" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 cursor-pointer"
                >
                  <summary className="font-bold text-gray-900 dark:text-white list-none flex justify-between items-center text-sm">
                    {faq.name}
                    <span className="transition-transform group-open:rotate-180 text-gray-400 flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="border-t border-gray-100 dark:border-gray-800 pt-10 space-y-5">
            <h3 className="text-lg font-black text-gray-900 dark:text-white">Related Free Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "PDF to Word Converter", sub: "Edit any PDF document", href: "/tools/pdf-to-word", color: "hover:border-orange-400" },
                { label: "Word Counter", sub: "Check resume word count", href: "/tools/word-counter", color: "hover:border-blue-400" },
                { label: "AI Text Paraphraser", sub: "Improve your resume summary", href: "/tools/text-paraphraser", color: "hover:border-green-400" },
                { label: "Word to PDF", sub: "Convert resume docx to PDF", href: "/tools/word-to-pdf", color: "hover:border-purple-400" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                    <p className="text-xs text-slate-500">{tool.sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

        </article>
      </div>
    </>
  );
                 }

