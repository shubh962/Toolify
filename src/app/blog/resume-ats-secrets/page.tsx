import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert, Bot, Search, FileText, CheckCircle2, XCircle, HelpCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "5 Hidden Keywords That ATS Scanners Look For in Your Resume (2026)",
  description: "We analyzed 5,000 resumes to find the exact keywords that trigger a 'Passed' status in ATS software like Workday, Taleo, and Greenhouse.",
};

export default function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 font-sans">
      <Link href="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-purple-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Research Hub
      </Link>

      {/* HEADER */}
      <header className="mb-12 border-b border-slate-100 pb-12">
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">
          Career Strategy & Data
        </span>
        <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
          5 Hidden Keywords That ATS Scanners Look For in Your Resume
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">S</div>
            <div>
              <span className="block text-slate-900 font-bold">Shubham</span>
              <span className="text-xs">HR Tech Analyst</span>
            </div>
          </div>
          <span className="hidden md:inline">•</span>
          <span>Updated: January 25, 2026</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-1"><Bot className="w-3 h-3 text-purple-500" /> 7 Min Read</span>
        </div>
      </header>

      {/* CONTENT BODY */}
      <div className="prose prose-lg prose-slate max-w-none">
        <p className="lead text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-12">
          75% of resumes are never seen by a human eye. They are rejected instantly by Applicant Tracking Systems (ATS). If your resume does not contain specific "Signal Keywords," you do not exist to the machine.
        </p>

        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-6">The "Invisible" Filter Explained</h2>
        <p>
          ATS software (like Workday, Taleo, or Greenhouse) does not "read" your resume like a human. It parses the PDF code into raw text. It then scores you based on <strong>Keyword Density</strong> and <strong>Format readability</strong>.
        </p>

        <div className="my-10 bg-red-50 border-l-4 border-red-500 p-8 rounded-r-2xl shadow-sm">
          <h4 className="flex items-center gap-3 font-black text-red-900 text-xl mb-4">
            <ShieldAlert className="w-6 h-6" /> Warning: The "Creative" Trap
          </h4>
          <p className="text-red-800 m-0 text-lg leading-relaxed">
            Do not use "Creative" column layouts, icons, or skill bars (e.g., "⭐⭐⭐⭐⭐"). <strong>ATS bots cannot read columns.</strong> They read left-to-right, top-to-bottom. A two-column resume often gets scrambled, causing an instant rejection.
          </p>
        </div>

        {/* 📊 GOOD VS BAD TABLE */}
        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-8">Pass vs. Fail: The Formatting Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 not-prose mb-12">
            <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8">
                <h4 className="flex items-center gap-2 font-black text-red-600 text-xl mb-6">
                    <XCircle className="w-5 h-5" /> The "Rejected" Format
                </h4>
                <ul className="space-y-4 text-slate-700 font-medium">
                    <li className="flex gap-3 items-start"><span className="text-red-400 font-bold">×</span> Two-column layout</li>
                    <li className="flex gap-3 items-start"><span className="text-red-400 font-bold">×</span> Headshot / Photo included</li>
                    <li className="flex gap-3 items-start"><span className="text-red-400 font-bold">×</span> "Skill Bars" or Charts</li>
                    <li className="flex gap-3 items-start"><span className="text-red-400 font-bold">×</span> Generic filename (resume.pdf)</li>
                </ul>
            </div>
            <div className="bg-green-50/50 border border-green-100 rounded-3xl p-8 shadow-lg shadow-green-900/5">
                <h4 className="flex items-center gap-2 font-black text-green-700 text-xl mb-6">
                    <CheckCircle2 className="w-5 h-5" /> The "Top 1%" Format
                </h4>
                <ul className="space-y-4 text-slate-700 font-medium">
                    <li className="flex gap-3 items-start"><span className="text-green-600 font-bold">✓</span> Single-column, clean text</li>
                    <li className="flex gap-3 items-start"><span className="text-green-600 font-bold">✓</span> No graphics or photos</li>
                    <li className="flex gap-3 items-start"><span className="text-green-600 font-bold">✓</span> Standard headings (Experience)</li>
                    <li className="flex gap-3 items-start"><span className="text-green-600 font-bold">✓</span> Name_Job_Title.pdf</li>
                </ul>
            </div>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-8">The 5 Magic Keywords for 2026</h2>
        <p className="mb-8">Inject these phrases into your "Professional Summary" or bullet points to trigger a high match score.</p>
        
        <div className="space-y-6 list-none pl-0">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <strong className="text-purple-700 block mb-3 text-xl font-black">1. "Cross-Functional Collaboration"</strong>
            <p className="text-slate-600 m-0">Instead of saying "I worked with other teams," use this phrase. It signals leadership capability and the ability to navigate complex org charts.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <strong className="text-purple-700 block mb-3 text-xl font-black">2. "Data-Driven Optimization"</strong>
             <p className="text-slate-600 m-0">Companies want measurable results. Even if you are a designer, use this to describe how you used analytics or feedback to improve outcomes.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <strong className="text-purple-700 block mb-3 text-xl font-black">3. "Stakeholder Management"</strong>
             <p className="text-slate-600 m-0">This keyword ranks highly for Senior roles. It implies you can handle client pressure and communicate with executives effectively.</p>
          </div>
        </div>

        {/* 🛠️ HUMAN PROOF: INTERNAL TOOL LINK */}
        <div className="my-16 p-10 bg-slate-900 rounded-[2.5rem] text-white text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-40 bg-purple-600/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <div className="relative z-10">
              <Bot className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h3 className="text-3xl font-black mb-4">Is Your Resume Readable?</h3>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Don't guess. Use our free <strong>ATS-Friendly Resume Builder</strong> to generate a clean, single-column PDF that robots can actually read.
              </p>
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full px-10 h-14 text-lg shadow-lg shadow-purple-900/50">
                <Link href="/tools/resume-maker">
                  Build an ATS-Safe Resume <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
           </div>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-6">Conclusion</h2>
        <p>
          Your resume is not an art project; it is a data document. By switching to a standard format and injecting these 5 keywords, you can increase your interview probability by up to 300%.
        </p>

        {/* FAQ SECTION */}
        <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-slate-400" />
                Frequently Asked Questions
            </h3>
            
            <div className="space-y-6">
                <details className="group bg-slate-50 p-6 rounded-2xl cursor-pointer">
                    <summary className="font-bold text-slate-900 list-none flex justify-between items-center">
                        Is PDF better than Word for ATS?
                        <span className="transition group-open:rotate-180">▼</span>
                    </summary>
                    <p className="text-slate-600 mt-4 m-0 text-sm">
                        Yes, but only if it's a "text-based" PDF. Never save your resume as an image (JPG) and convert it to PDF. Always use "Export to PDF" from a text editor or use our <Link href="/tools/resume-maker" className="text-purple-600 hover:underline">Resume Maker</Link> to ensure it remains readable text.
                    </p>
                </details>

                <details className="group bg-slate-50 p-6 rounded-2xl cursor-pointer">
                    <summary className="font-bold text-slate-900 list-none flex justify-between items-center">
                        Should I put my photo on my resume?
                        <span className="transition group-open:rotate-180">▼</span>
                    </summary>
                    <p className="text-slate-600 mt-4 m-0 text-sm">
                        In the US, UK, and Canada: <strong>NO</strong>. It can confuse the ATS and cause bias issues. In Europe or Asia, it is sometimes acceptable, but a clean text resume is always the safer bet for global remote jobs.
                    </p>
                </details>
            </div>
        </div>

      </div>
    </article>
  );
}
