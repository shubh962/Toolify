import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, User, Send, Clock, HelpCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact TaskGuru | 24/7 Support for AI Tools",
  description: "Have questions about our AI tools? Get in touch with TaskGuru support. We are dedicated to providing fast, free, and secure assistance for all your productivity needs.",
  alternates: {
    canonical: "https://www.taskguru.online/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          At TaskGuru, your feedback drives our innovation. Whether you found a bug, 
          have a feature request, or need help with a tool, our team is ready to assist.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {/* Left Side: Contact Information */}
        <div className="space-y-6">
          <Card className="h-full border-none shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>
                Reach out to us directly via email or social media.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Email Item */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    For support & business inquiries:
                  </p>
                  <a href="mailto:GautamShubham962@gmail.com" className="text-primary hover:underline font-bold">
                    GautamShubham962@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Support Item */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Social Channels</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect for quick updates and productivity tips.
                  </p>
                  <div className="mt-2 flex gap-3 text-sm font-bold">
                    <a href="https://x.com/Shubham_962" target="_blank" className="text-blue-500 hover:underline">Twitter (X)</a>
                    <span>•</span>
                    <a href="https://www.instagram.com/m_just_shubham" target="_blank" className="text-pink-500 hover:underline">Instagram</a>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Side: Contact Form */}
        <Card className="shadow-lg border-t-4 border-primary">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              We typically respond within 24–48 business hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="Your Name" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="hello@example.com" className="pl-9" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
                <Input id="subject" placeholder="What can we help you with?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea 
                  id="message" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full font-bold h-12">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* 🚀 HIGH-VALUE SUPPORT CONTENT SECTION */}
      <article className="max-w-4xl mx-auto border-t pt-16 prose prose-lg dark:prose-invert">
        <h2 className="text-3xl font-black text-center mb-10">Our Commitment to User Support</h2>
        <p className="text-lg leading-relaxed">
            TaskGuru (Toolify) is more than just a collection of scripts; it is a mission-driven productivity suite developed by **Shubham Gautam**. We understand that when you are in the middle of a project—merging critical PDFs or optimizing images for a launch—you need tools that work flawlessly. 
        </p>

        <div className="grid md:grid-cols-3 gap-8 not-prose my-12">
            <div className="p-6 bg-muted/30 rounded-2xl border text-center">
                <Clock className="w-8 h-8 mx-auto text-primary mb-3" />
                <h4 className="font-bold">Fast Response</h4>
                <p className="text-xs text-muted-foreground">We prioritize technical support queries to get you back to work quickly.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border text-center">
                <ShieldCheck className="w-8 h-8 mx-auto text-green-600 mb-3" />
                <h4 className="font-bold">Privacy First</h4>
                <p className="text-xs text-muted-foreground">Communication via this form is encrypted and never shared with third parties.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border text-center">
                <HelpCircle className="w-8 h-8 mx-auto text-indigo-600 mb-3" />
                <h4 className="font-bold">Expert Advice</h4>
                <p className="text-xs text-muted-foreground">Get direct answers from the developer about tool capabilities.</p>
            </div>
        </div>

        <h3>Common Questions Before Contacting Us</h3>
        <p>
            Before sending a message, you might find an immediate answer in our most frequently discussed topics:
        </p>
        <ul className="space-y-4">
            <li>
                <strong>Are the tools safe for sensitive documents?</strong> Yes. All our tools, including the 
                <Link href="/tools/merge-pdf" className="text-primary font-bold underline mx-1">Merge PDF</Link> and 
                <Link href="/tools/background-remover" className="text-primary font-bold underline mx-1">Background Remover</Link>, 
                use transient memory processing. Your files are never stored on our servers.
            </li>
            <li>
                <strong>Do I need an account to report a bug?</strong> No. We believe in an open web. You can report any issues directly through this form without signing up.
            </li>
            <li>
                <strong>Can I suggest a new tool?</strong> Absolutely! We are constantly expanding the TaskGuru toolkit based on user suggestions.
            </li>
        </ul>

        <footer className="mt-16 pt-8 border-t text-center italic text-muted-foreground">
            Thank you for using TaskGuru. We look forward to hearing from you.
        </footer>
      </article>
    </div>
  );
}

