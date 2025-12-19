// src/app/blog/anti-subscription-guide-free-ai-tools/page.tsx

import Script from "next/script";
import Link from "next/link";
import { Metadata } from 'next';
import {
    Wallet,
    Scissors,
    Minimize2,
    FileType,
    RefreshCw,
    Layers,
    ScanText,
    PenTool,
    Briefcase,
    CheckCircle2,
    ArrowRight,
    Zap
} from "lucide-react";

// ✅ UNIQUE SEO METADATA
export const metadata: Metadata = {
    title: "The 'Anti-Subscription' Guide: 8 Free AI Tools to Save Your Wallet | TaskGuru",
    description: "Stop paying monthly fees for basic tasks. Discover the 'Anti-Subscription' stack: 8 free tools for PDFs, Images, Resumes, and Text on TaskGuru.",
    robots: "index, follow",
    alternates: {
        canonical: "https://www.taskguru.online/blog/anti-subscription-guide-free-ai-tools",
    },
    openGraph: {
        title: "The 'Anti-Subscription' Guide: 8 Free AI Tools to Save Your Wallet",
        description: "Why rent your productivity? Here are 8 free tools to replace your paid software forever.",
        url: "https://www.taskguru.online/blog/anti-subscription-guide-free-ai-tools",
        type: "article",
        images: [
            {
                url: "https://www.taskguru.online/assets/blog/anti-subscription-cover.png", 
                width: 1200,
                height: 630,
                alt: "Broken subscription chains with free AI tools",
            },
        ],
    },
    keywords: ["free alternative to adobe", "remove background free", "resume maker free", "pdf editor free", "anti-subscription tools", "TaskGuru"],
};

// ✅ JSON-LD Schema
const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "The 'Anti-Subscription' Guide: 8 Free AI Tools to Save Your Wallet",
    image: "https://www.taskguru.online/assets/blog/anti-subscription-cover.png",
    author: {
        "@type": "Person",
        name: "Shubham Gautam",
        url: "https://www.taskguru.online/about"
    },
    publisher: {
        "@type": "Organization",
        name: "TaskGuru",
        logo: {
            "@type": "ImageObject",
            url: "https://www.taskguru.online/logo.png",
        },
    },
    datePublished: "2025-12-19",
    dateModified: "2025-12-19",
    description: "A manifesto for digital freedom. Replace 8 expensive apps with TaskGuru's free, private, and fast AI toolkit.",
    articleBody: "The average professional spends over $100/month on simple software subscriptions. It is time to stop. Here is your free alternative..."
};

export default function AntiSubscriptionPost() {
    return (
        <>
            <Script
                id="blog-schema-anti-subscription"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <main className="max-w-5xl mx-auto px-4 py-16">
                <article className="prose prose-lg max-w-none dark:prose-invert">

                    {/* HERO HEADER */}
                    <header className="text-center mb-16 border-b border-slate-200 dark:border-slate-800 pb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-bold mb-6">
                            <Wallet className="w-4 h-4" /> Save $100s Every Month
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
                            The "Anti-Subscription" Guide: <span className="text-primary">8 Free AI Tools to Save Your Wallet</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            You are being charged for things that should be free. It's time to cancel those trials. Here is the ultimate list of 8 free tools to replace your paid apps.
                        </p>
                    </header>

                    {/* INTRODUCTION */}
                    <section className="mb-20">
                        <p className="text-xl leading-relaxed">
                            We live in the era of "Death by a Thousand Subscriptions." You pay for a PDF editor, you pay for a photo tool, you pay for a resume builder. By the end of the month, your bank account is drained by tools you only used once.
                        </p>
                        <p>
                            <strong>TaskGuru</strong> is the rebellion against this model. We believe basic digital utilities should be free, private, and accessible to everyone. No credit cards. No "Pro" plans.
                        </p>
                    </section>

                    {/* SECTION 1: VISUAL TOOLS */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                            <Zap className="w-8 h-8 text-yellow-500" /> Phase 1: Ditch the Design Apps
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Tool 1 */}
                            <div className="p-6 bg-card border rounded-xl hover:border-primary/50 transition">
                                <Scissors className="w-8 h-8 text-purple-600 mb-3" />
                                <h3 className="font-bold text-lg">1. Background Remover</h3>
                                <p className="text-sm text-muted-foreground mb-4">Replace expensive editing software. Isolate subjects instantly for e-commerce or profiles.</p>
                                <Link href="/tools/background-remover" className="text-sm font-bold text-primary hover:underline">Use Tool &rarr;</Link>
                            </div>

                            {/* Tool 2 */}
                            <div className="p-6 bg-card border rounded-xl hover:border-primary/50 transition">
                                <Minimize2 className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-bold text-lg">2. Image Compressor</h3>
                                <p className="text-sm text-muted-foreground mb-4">Don't pay for cloud storage. Shrink your images by 80% and save space instantly.</p>
                                <Link href="/tools/image-compressor" className="text-sm font-bold text-primary hover:underline">Use Tool &rarr;</Link>
                            </div>

                            {/* Tool 3 */}
                            <div className="p-6 bg-card border rounded-xl hover:border-primary/50 transition">
                                <FileType className="w-8 h-8 text-orange-600 mb-3" />
                                <h3 className="font-bold text-lg">3. Image to PDF</h3>
                                <p className="text-sm text-muted-foreground mb-4">Turn scattered screenshots and receipts into a professional PDF document.</p>
                                <Link href="/tools/image-to-pdf" className="text-sm font-bold text-primary hover:underline">Use Tool &rarr;</Link>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: OFFICE TOOLS */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                            <Briefcase className="w-8 h-8 text-blue-500" /> Phase 2: The "Office" Killer
                        </h2>
                        
                        <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-8">
                            <div className="space-y-8">
                                {/* Tool 4 */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <RefreshCw className="w-5 h-5 text-red-500" /> 4. PDF to Word Converter
                                        </h3>
                                        <p className="text-muted-foreground mt-1">Unlock "Read Only" files and edit them in Word. No watermarks.</p>
                                    </div>
                                    <Link href="/tools/pdf-to-word" className="btn-sm px-4 py-2 bg-white dark:bg-slate-800 border rounded-lg font-bold text-sm hover:bg-slate-100">Unlock PDF</Link>
                                </div>

                                {/* Tool 5 */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Layers className="w-5 h-5 text-red-500" /> 5. PDF Merger
                                        </h3>
                                        <p className="text-muted-foreground mt-1">Combine multiple reports or assignments into one single file.</p>
                                    </div>
                                    <Link href="/tools/merge-pdf" className="btn-sm px-4 py-2 bg-white dark:bg-slate-800 border rounded-lg font-bold text-sm hover:bg-slate-100">Merge PDF</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: AI & TEXT */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                            <Zap className="w-8 h-8 text-green-500" /> Phase 3: Smart AI Automation
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tool 6 */}
                            <div className="border-l-4 border-green-500 pl-6">
                                <ScanText className="w-10 h-10 text-green-600 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">6. Image to Text (OCR)</h3>
                                <p className="mb-4 text-muted-foreground">Stop retyping. Extract text from images, books, or screenshots in seconds.</p>
                                <Link href="/tools/image-to-text" className="font-bold text-green-600 hover:underline">Extract Text Now &rarr;</Link>
                            </div>

                            {/* Tool 7 */}
                            <div className="border-l-4 border-green-500 pl-6">
                                <PenTool className="w-10 h-10 text-green-600 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">7. Text Paraphraser</h3>
                                <p className="mb-4 text-muted-foreground">Rewrite essays, emails, or blogs to improve flow and remove plagiarism.</p>
                                <Link href="/tools/text-paraphraser" className="font-bold text-green-600 hover:underline">Rewrite Text Now &rarr;</Link>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: THE BIG FINISH (Resume Maker) */}
                    <section className="mb-16">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">8. The Career Builder</h2>
                            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                                The most important document of your life shouldn't cost $20 to download. Build a professional, ATS-friendly resume for free.
                            </p>
                            <Link href="/tools/resume-maker" className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold text-xl rounded-full hover:bg-indigo-50 transition shadow-xl">
                                Build My Resume Free
                            </Link>
                            <p className="mt-4 text-sm opacity-75">No hidden fees. No "pay to download."</p>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center border-t border-slate-200 dark:border-slate-800 pt-12">
                        <h3 className="text-2xl font-bold mb-6">Join the "Anti-Subscription" Movement</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition">
                                Access All 8 Tools
                            </Link>
                            <Link href="/contact" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-bold hover:opacity-90 transition">
                                Suggest a New Tool
                            </Link>
                        </div>
                    </section>

                </article>
            </main>
        </>
    );
}
