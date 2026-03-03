"use client";

import { useState } from "react";
import Link from "next/link";
import ResumeStartWizard from "@/components/resume/ResumeStartWizard";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeMaker from "@/components/tools/ResumeMaker";
import { ShieldCheck, Zap, HelpCircle } from "lucide-react";

type Step = "wizard" | "templates" | "builder";

export default function ResumeMakerFlow() {
  const [step, setStep] = useState<Step>("wizard");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="space-y-20 pb-20">

      {/* TOOL INTERFACE */}
      <div className="min-h-[600px]">
        {step === "wizard" && (
          <ResumeStartWizard
            onStartNew={() => setStep("templates")}
            // ✅ FIX 3: onClose stays on wizard — don't auto-advance to templates
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
            {/* ✅ FIX 4: Back button so user can change template */}
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

      {/* SEO CONTENT — always visible on step 1, Google indexes it */}
      {/* ✅ FIX 1: Removed prose classes — plain Tailwind throughout */}
      <article className="max-w-4xl mx-auto border-t pt-16 space-y-16 text-gray-600 dark:text-gray-400 leading-relaxed">

        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
            Free Online Resume Builder 2026
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a professional, ATS-friendly resume in minutes. No sign-up required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-blue-700 dark:text-blue-300">
              <Zap className="w-5 h-5" /> Why Use TaskGuru?
            </h3>
            <p className="text-sm leading-relaxed">
              Most &quot;free&quot; resume builders lock your file behind a paywall at the last
              second. <strong>TaskGuru is different.</strong> Build, preview, and download your
              resume without paying a cent. Our templates are designed to pass Applicant Tracking
              Systems (ATS) used by HR departments worldwide.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl border border-green-100 dark:border-green-900">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-green-700 dark:text-green-300">
              <ShieldCheck className="w-5 h-5" /> Privacy Guaranteed
            </h3>
            <p className="text-sm leading-relaxed">
              Your career data is sensitive. We use <strong>Client-Side Generation</strong>,
              meaning your resume is built entirely inside your browser. We do not store your
              employment history or personal details on our servers — ever.
            </p>
          </div>
        </div>

        {/* ✅ FIX 5: h3 "How to Create..." → h2 for correct heading hierarchy */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Create a Job-Winning Resume
          </h2>
          <div className="space-y-6">
            {[
              {
                n: "1",
                title: "Choose a Template",
                desc: "Select from our clean, professional designs. Whether you are a creative designer or a corporate executive, we have a layout that fits your industry.",
              },
              {
                n: "2",
                title: "Fill in Your Details",
                desc: "Use our easy wizard to enter your experience, education, and skills. The real-time ATS score updates as you type so you know exactly what to improve.",
              },
              {
                n: "3",
                title: "Download PDF",
                desc: "Hit download and get a high-quality PDF ready for job applications. No watermarks, no fees, no email required.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {item.n}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ FIX 2: 5 FAQs instead of 2 */}
        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <HelpCircle className="w-5 h-5 text-purple-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is this resume builder really free?",
                a: "Yes. Every feature — including the PDF download — is 100% free. No credit card, no sign-up, no watermarks, ever.",
              },
              {
                q: "Are the templates ATS-friendly?",
                a: "Absolutely. We use standard single-column layouts and fonts that are easily parsed by automated hiring software used by companies worldwide.",
              },
              {
                q: "Which template should I choose — Classic or Modern?",
                a: "Use Classic for corporate, finance, legal, or engineering roles — it has the highest ATS compatibility. Use Modern for creative, marketing, design, or startup roles where visual presentation matters more.",
              },
              {
                q: "Is my resume data stored on TaskGuru's servers?",
                a: "No. Your resume data exists only in your browser's memory. When you close the tab, nothing is saved. We have zero access to your personal details or work history.",
              },
              {
                q: "Can I edit my resume after downloading?",
                a: "The downloaded file is a PDF — ideal for submitting to employers. If you need an editable version, use our PDF to Word Converter to turn it into a .docx file you can edit in Microsoft Word or Google Docs.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 cursor-pointer"
              >
                <summary className="font-bold text-gray-900 dark:text-white list-none flex justify-between items-center">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-gray-400 flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-100 dark:border-gray-800 pt-10 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Related Free Tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "PDF to Word Converter", href: "/tools/pdf-to-word" },
              { label: "AI Text Paraphraser", href: "/tools/text-paraphraser" },
              { label: "Image to Text (OCR)", href: "/tools/image-to-text" },
              { label: "Merge PDF Files", href: "/tools/merge-pdf" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-4 py-2 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold hover:bg-purple-100 transition-colors"
              >
                {tool.label} →
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
