import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, User, Send, Clock, HelpCircle, ShieldCheck, Globe, HeartHandshake } from "lucide-react";
import Link from "next/link";

// ✅ FIX 1: Added openGraph
export const metadata: Metadata = {
  title: "Contact TaskGuru | 24/7 Support for AI Tools",
  description: "Get in touch with TaskGuru support. Founded by Shubham Gautam, we provide fast and secure assistance for PDF, Image, and AI productivity tools.",
  alternates: {
    canonical: "https://www.taskguru.online/contact",
  },
  openGraph: {
    title: "Contact TaskGuru | 24/7 Support for AI Tools",
    description: "Get in touch with TaskGuru support. We provide fast assistance for PDF, Image, and AI productivity tools.",
    type: "website",
    url: "https://www.taskguru.online/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl font-sans">
      {/* 1. HEADER SECTION */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-indigo-700 dark:text-indigo-400">
          Let&apos;s Connect
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
          Your feedback is the engine that drives TaskGuru&apos;s innovation. I personally review every message to ensure our tools remain the best on the web. — Shubham Gautam
        </p>
      </div>

      {/* 2. CONTACT GRID */}
      <div className="grid md:grid-cols-2 gap-10 mb-24">
        {/* Left Side: Professional Identity */}
        <div className="space-y-8">
          <Card className="h-full border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-bold">Contact Identity</CardTitle>
              <CardDescription className="text-indigo-100 text-lg">
                Official communication channels for TaskGuru.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              
              <div className="flex items-start space-x-5">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Direct Email</h3>
                  <p className="text-sm text-indigo-100 mb-2 opacity-80">Support & Business:</p>
                  {/* ✅ FIX 2: Fixed mailto href to lowercase */}
                  <a href="mailto:gautamshubham962@gmail.com" className="text-white hover:underline font-black text-lg">
                    GautamShubham962@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Social Support</h3>
                  <p className="text-sm text-indigo-100 mb-2 opacity-80">Quick updates & tips:</p>
                  <div className="flex gap-4 font-black">
                    {/* ✅ FIX 3: Added rel="noopener noreferrer" to all target="_blank" links */}
                    <a href="https://x.com/Shubham_962" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline underline-offset-4 text-sm uppercase tracking-widest">Twitter</a>
                    <a href="https://www.instagram.com/m_just_shubham" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline underline-offset-4 text-sm uppercase tracking-widest">Instagram</a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-sm text-indigo-200">
                <Globe className="w-4 h-4" /> <span>Operating from Uttar Pradesh, India</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Message Form */}
        <Card className="shadow-2xl border-none rounded-[2.5rem] p-4 bg-white dark:bg-gray-900 border-t-8 border-indigo-600">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Send a Direct Message</CardTitle>
            <CardDescription className="font-medium">
              Response window: 24–48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              action="https://formsubmit.co/GautamShubham962@gmail.com" 
              method="POST" 
              className="space-y-6"
            >
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://www.taskguru.online/contact" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                    <Input name="name" placeholder="Shubham Gautam" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                    <Input name="email" type="email" placeholder="example@mail.com" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inquiry Subject</label>
                <Input name="subject" placeholder="e.g., Bug Report or New Tool Suggestion" className="h-12 rounded-xl" required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Message Details</label>
                <textarea 
                  name="message"
                  className="flex min-h-[150px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="Tell us how we can help you today..."
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full font-black h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-[1.02]">
                <Send className="w-4 h-4 mr-2" /> DISPATCH MESSAGE
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* 3. SUPPORT MANIFESTO — ✅ FIX 4: Removed prose classes, replaced with plain Tailwind */}
      <article className="max-w-4xl mx-auto border-t pt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">Our 24/7 Digital Commitment</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            TaskGuru is more than just a toolkit — it is an ecosystem built on the principles of speed, security, and human-centric engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 my-16">
          <div className="p-8 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl border border-indigo-100 dark:border-indigo-900 text-center">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Clock className="text-indigo-600" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Technical Priority</h4>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">We prioritize bug reports related to PDF and Image processing to ensure 99.9% tool uptime.</p>
          </div>
          <div className="p-8 bg-green-50 dark:bg-green-950/30 rounded-3xl border border-green-100 dark:border-green-900 text-center">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShieldCheck className="text-green-600" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Data Ethics</h4>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">Your messages are encrypted. We never store your personal files or share contact details with advertisers.</p>
          </div>
          <div className="p-8 bg-purple-50 dark:bg-purple-950/30 rounded-3xl border border-purple-100 dark:border-purple-900 text-center">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <HeartHandshake className="text-purple-600" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Human Connect</h4>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">No bots here. You get direct responses from Shubham Gautam or our lead developer team.</p>
          </div>
        </div>

        <section className="space-y-6 mb-16">
          <h3 className="text-3xl font-bold border-l-4 border-indigo-600 pl-6 text-gray-900 dark:text-white">
            Support Infrastructure & Reliability
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            As a developer-led platform, TaskGuru utilizes Vercel Edge Functions to ensure that our contact form and tool responses are processed at lightning speed. We understand that in the modern digital age, every second counts — whether you are converting a critical business PDF or removing a background for a social media launch.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Our &quot;Privacy-First&quot; support model means that we don&apos;t keep logs of your document metadata. When you report a tool error, our team investigates the underlying AI model performance without ever accessing the content of your personal files. This is the TaskGuru guarantee.
          </p>
        </section>

        <section className="space-y-6 mb-16">
          <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <HelpCircle className="text-indigo-600 w-6 h-6" /> Common Support Inquiries
          </h3>
          <div className="space-y-4">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-indigo-600 mb-2 underline underline-offset-4">Security of Documents</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                TaskGuru tools like the{" "}
                <Link href="/tools/merge-pdf" className="font-bold text-indigo-600 hover:underline">Merge PDF</Link>
                {" "}and{" "}
                <Link href="/tools/background-remover" className="font-bold text-indigo-600 hover:underline">Background Remover</Link>
                {" "}operate in transient memory. We do not have a database for your uploads.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-indigo-600 mb-2 underline underline-offset-4">Partnerships & API</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                If you are interested in integrating TaskGuru&apos;s AI logic into your own workflow, please use the subject line &quot;API Inquiry&quot; for faster routing.
              </p>
            </div>
          </div>
        </section>

        <footer className="pt-10 border-t text-center italic text-gray-500 dark:text-gray-400 text-sm">
          Thank you for being a part of the TaskGuru community. We are building the future of productivity together.
        </footer>
      </article>
    </div>
  );
}
