"use client";

import { useState } from "react";
import Link from "next/link";
import ResumeStartWizard from "@/components/resume/ResumeStartWizard";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeMaker from "@/components/tools/ResumeMaker";
import { 
  FileText, ShieldCheck, Zap, CheckCircle2, 
  HelpCircle, Sparkles, LayoutTemplate, MousePointerClick 
} from "lucide-react";

type Step = "wizard" | "templates" | "builder";

export default function ResumeMakerFlow() {
  const [step, setStep] = useState<Step>("wizard");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 🟢 THE TOOL INTERFACE */}
      <div className="min-h-[600px]">
        {step === "wizard" && (
          <ResumeStartWizard
            onStartNew={() => setStep("templates")}
            onClose={() => setStep("templates")}
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
          <ResumeMaker template={selectedTemplate} />
        )}
      </div>

      {/* 🚀 SEO CONTENT (MOVED HERE SO GOOGLE SEES IT ON STEP 1) */}
      <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert border-t pt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Free Online Resume Builder 2026
          </h2>
          <p className="text-xl text-muted-foreground">
            Create a professional, ATS-friendly resume in minutes. No sign-up required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900">
             <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-blue-700 dark:text-blue-300">
               <Zap className="w-5 h-5" /> Why Use TaskGuru?
             </h3>
             <p className="text-sm leading-relaxed">
               Most "free" resume builders lock your file behind a paywall at the last second. 
               <strong>TaskGuru is different.</strong> You can build, preview, and download your resume without paying a single cent. 
               Our templates are designed to pass Applicant Tracking Systems (ATS) used by HR departments.
             </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl border border-green-100 dark:border-green-900">
             <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-green-700 dark:text-green-300">
               <ShieldCheck className="w-5 h-5" /> Privacy Guaranteed
             </h3>
             <p className="text-sm leading-relaxed">
               Your career data is sensitive. We use <strong>Client-Side Generation</strong>, 
               meaning your resume is built inside your browser. 
               We do not store your employment history or personal details on our servers.
             </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold">How to Create a Job-Winning Resume</h3>
        <div className="space-y-6 my-8">
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
               <div>
                 <h4 className="font-bold text-lg">Choose a Template</h4>
                 <p className="text-sm text-muted-foreground">Select from our clean, professional designs. Whether you are a creative designer or a corporate executive, we have a layout that fits.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
               <div>
                 <h4 className="font-bold text-lg">Fill in Your Details</h4>
                 <p className="text-sm text-muted-foreground">Use our easy wizard to enter your experience, education, and skills. Our real-time preview shows you exactly how it looks.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">3</div>
               <div>
                 <h4 className="font-bold text-lg">Download PDF</h4>
                 <p className="text-sm text-muted-foreground">Hit download and get a high-quality PDF ready for job applications. No watermarks.</p>
               </div>
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border mt-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-500" /> Frequently Asked Questions
            </h3>
            <div className="space-y-4">
                <details className="group">
                    <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                        Is this resume builder really free?
                        <span className="transition group-open:rotate-180">▼</span>
                    </summary>
                    <p className="text-sm text-muted-foreground mt-2 pl-4 border-l-2 border-purple-200">
                        Yes. Every feature, including the PDF download, is 100% free.
                    </p>
                </details>
                <details className="group">
                    <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                        Are the templates ATS friendly?
                        <span className="transition group-open:rotate-180">▼</span>
                    </summary>
                    <p className="text-sm text-muted-foreground mt-2 pl-4 border-l-2 border-purple-200">
                        Absolutely. We use standard fonts and structures that are easily readable by automated hiring software.
                    </p>
                </details>
            </div>
        </div>

      </article>
    </div>
  );
}
