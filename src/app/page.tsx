import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, MousePointer2, CheckCircle2, Lock, Cpu, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import Script from "next/script";

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Toolify (TaskGuru) free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Toolify is 100% free to use. All tools work instantly in your browser with no login or subscription required.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files secure on TaskGuru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. TaskGuru uses a Zero-Storage policy. Files are processed in transient memory and deleted permanently immediately after use.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install software for PDF or Image tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No installation is needed. All TaskGuru tools function directly in any modern web browser across mobile and desktop devices.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* 🚀 HERO SECTION */}
      <section className="relative overflow-hidden py-24 md:py-36 text-center bg-gradient-to-br from-primary via-primary/95 to-indigo-950">
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-bold mb-8 backdrop-blur-md border border-white/20">
            <Zap className="w-4 h-4 text-yellow-400" /> All Tools Now 100% Free
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            Simplify Digital Workflow with <br />
            <span className="text-accent underline decoration-accent/30 italic">TaskGuru AI Suite</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-white/80 leading-relaxed font-medium">
            The ultimate productivity hub. Convert PDFs, compress images, and 
            leverage AI to rewrite content. Private, secure, and lightning fast.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 font-black text-xl px-10 h-16 rounded-full shadow-2xl">
              <Link href="#tools">Explore Free Tools</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white/40 hover:bg-white/10 h-16 rounded-full px-10 font-bold">
              <Link href="/about">Meet the Founder</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 🛠️ TOOLS GRID SECTION */}
      <section id="tools" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b pb-12">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
                Professional Toolkit
              </h2>
              <p className="mt-4 text-xl text-muted-foreground font-medium">
                High-performance utilities engineered for modern creators and businesses.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-black text-primary bg-primary/10 px-6 py-3 rounded-full uppercase tracking-[0.2em] border border-primary/20">
                Live Status: Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tools.map((tool) => (
              <Link
                href={`/tools/${tool.slug}`}
                key={tool.slug}
                className="group flex h-full"
                prefetch={!tool.isPlaceholder}
              >
                <Card className="w-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 border-2 border-muted bg-card overflow-hidden rounded-[2rem]">
                  <CardHeader className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-primary/5 p-5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <tool.icon className="w-10 h-10" />
                      </div>
                      {tool.isGenAI && (
                        <span className="flex items-center gap-1 px-4 py-1.5 rounded-full text-[10px] font-black uppercase bg-accent text-accent-foreground tracking-tighter shadow-sm border border-accent/20">
                          <Sparkles className="w-3 h-3" /> AI Powered
                        </span>
                      )}
                    </div>
                    <CardTitle className="pt-2 text-2xl font-black">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 flex-grow">
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-4">
                    <div className="flex items-center text-sm font-black text-primary group-hover:translate-x-2 transition-transform uppercase tracking-wider">
                      Open Tool <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ TRUST SECTION */}
      <section className="py-24 bg-muted/20 border-y relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-0 transition-transform">
                <ShieldCheck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-black">Privacy Obsessed</h3>
              <p className="text-muted-foreground font-medium">Zero-storage policy. Your files are processed in-memory and wiped instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 -rotate-3 hover:rotate-0 transition-transform">
                <MousePointer2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-black">Friction-Free</h3>
              <p className="text-muted-foreground font-medium">No account creation. No credit cards. No waiting. Just professional tools.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 rotate-6 hover:rotate-0 transition-transform">
                <Globe className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black">Global Access</h3>
              <p className="text-muted-foreground font-medium">Optimized for every device. Access your workspace from any browser worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 DEEP SEO LONG-FORM CONTENT */}
      <section className="py-24 md:py-36 bg-background">
        <article className="container mx-auto px-6 max-w-5xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              TaskGuru AI: The Next Frontier of <br />
              <span className="text-primary italic text-3xl md:text-5xl">Digital Empowerment & Productivity</span>
            </h2>
            <div className="h-1.5 w-32 bg-primary mx-auto rounded-full" />
          </header>

          <div className="prose prose-xl dark:prose-invert max-w-none text-muted-foreground space-y-12 font-medium leading-relaxed">
            
            {/* Intro Section */}
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
                <Rocket className="text-primary h-8 w-8" /> Why We Built TaskGuru
              </h3>
              <p>
                Aaj ke fast-paced digital world mein, productivity tools ki demand skyrocketing hai. Lekin ek problem hamesha rahi hai—ya toh tools bohot mehnge hote hain (Monthly Subscriptions), ya phir unme privacy ka khatra hota hai. <strong>TaskGuru (Toolify)</strong> isi gap ko bharne ke liye banaya gaya hai. Humne ek aisi platform ki kalpana ki jahan ek student se lekar ek high-end developer tak, sabhi ko professional-grade tools milein—wo bhi bilkul muft.
              </p>
              <p>
                Humne TaskGuru ko sirf ek website nahi, balki ek <strong>Productivity Ecosystem</strong> ki tarah develop kiya hai. Yahan aapko PDF manipulation, Advanced AI Content Generation, aur Image Optimization milta hai ek hi chat aur dashboard interface mein. Hamara mission simple hai: Software capability ko democratize karna.
              </p>
            </div>

            {/* Feature Deep Dive Grid */}
            <div className="grid md:grid-cols-2 gap-8 my-16">
              <div className="p-8 rounded-[2rem] bg-muted/50 border-2 border-primary/5 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-green-500 h-6 w-6" />
                  <h4 className="text-xl font-black text-foreground">Advanced PDF Suite</h4>
                </div>
                <p className="text-base">
                  Documents ke sath deal karna kabhi itna asan nahi tha. TaskGuru ka PDF suite aapko high-compression ratios deta hai bina text quality lose kiye. Chahe aapko multiple reports merge karni hon ya kisi PDF se image extract karni ho, hamare algorithm pixel-perfect results deliver karte hain.
                </p>
              </div>
              <div className="p-8 rounded-[2rem] bg-muted/50 border-2 border-primary/5 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="text-primary h-6 w-6" />
                  <h4 className="text-xl font-black text-foreground">Next-Gen AI Writing</h4>
                </div>
                <p className="text-base">
                  Hamara AI Paraphraser aur Rewriter standard "synonym swapping" tools se kafi alag hain. Ye context ko samajhte hain (Semantic Awareness). Jab aap content rewrite karte hain, toh tone aur intent wahi rehta hai jo aap chahte hain, lekin words bilkul fresh aur plagiarism-free hote hain.
                </p>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="relative overflow-hidden p-10 rounded-[3rem] bg-indigo-950 text-white shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <Lock className="text-yellow-400 h-8 w-8" /> Zero-Storage Privacy Policy
                </h3>
                <p className="text-lg text-indigo-100">
                  Sabse bada sawal hota hai: "Is my data safe?" TaskGuru par hamari privacy policy crystal clear hai. Hum <strong>Client-Side Processing</strong> aur transient server execution ka use karte hain. Jaise hi aapka task finish hota hai, hamara system automatic "Memory Wipe" command trigger karta hai. Aapka data hamare servers par ek minute bhi save nahi rehta. No logs, no tracking, no worries.
                </p>
                <div className="mt-8 flex gap-4 flex-wrap">
                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold border border-white/20 tracking-tight">GDPR Compliant Logic</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold border border-white/20 tracking-tight">SSL Encrypted Transfer</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold border border-white/20 tracking-tight">No Hidden Tracking</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>

            {/* Utility Section */}
            <div className="space-y-8 py-12">
              <h3 className="text-3xl font-black text-foreground">How TaskGuru Enhances Every Workflow</h3>
              <p>
                Humne realize kiya ki internet par tools to bohot hain, lekin wo fragmented hain. TaskGuru un sabhi fragmentation ko eliminate karta hai. 
              </p>
              <div className="space-y-8">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h5 className="text-xl font-bold text-foreground">For Content Creators & Bloggers</h5>
                  <p>Hamara Image to Text (OCR) aur AI Summarizer aapke research process ko 10x fast kar deta hai. Boring manual transcription ko bye-bye bole aur direct creation par focus karein.</p>
                </div>
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h5 className="text-xl font-bold text-foreground">For Students & Researchers</h5>
                  <p>Academic pressure mein sahi tools ka milna mushkil hota hai. TaskGuru ke tools se aap assignments ko quickly format kar sakte hain aur PDFs ko manage karna bacho ka khel ban jata hai.</p>
                </div>
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h5 className="text-xl font-bold text-foreground">For Professional Developers</h5>
                  <p>Json formatters, Unit converters, aur asset optimization tools. Ek developer ko jo small utilities chahiye hoti hain, wo yahan bina distract hue milti hain.</p>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="text-center pt-20 border-t">
              <h3 className="text-3xl font-black text-foreground mb-4">Hamesha Free, Hamesha Fast</h3>
              <p className="max-w-3xl mx-auto italic">
                TaskGuru ka evolution rukne wala nahi hai. Hum har mahine naye AI models aur productivity shortcuts add karte rahenge. Aapka support hi hamari taqat hai. Agar aapko hamare tools pasand aayein, toh humein support karein aur is platform ko apne friends ke sath share karein.
              </p>
              <p className="mt-8 font-black text-primary text-xl uppercase tracking-widest">Digital Future Starts Here.</p>
            </div>

          </div>
        </article>
      </section>

      {/* 📬 NEWSLETTER */}
      <section className="py-24 bg-primary text-primary-foreground rounded-[3rem] mx-6 mb-24 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-4 border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Join the Productivity Club</h2>
            <p className="text-xl mb-12 text-primary-foreground/90 font-medium">
              We deploy new AI capabilities every month. Stay updated with the latest 
              automation tips and new tool releases.
            </p>
            <NewsletterForm />
            <p className="mt-8 text-xs font-bold opacity-60 uppercase tracking-widest">
              Zero Spam. Total Privacy. One-Click Unsubscribe.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
