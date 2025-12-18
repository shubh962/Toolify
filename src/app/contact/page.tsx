import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, User, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Toolify (TaskGuru)",
  description: "Have questions or feedback? Get in touch with the TaskGuru team. We are here to help you with our free AI tools.",
  alternates: {
    canonical: "/contact",
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
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question about our tools, found a bug, or just want to say hi? 
          We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
                    For support & inquiries:
                  </p>
                  <a href="mailto:support@taskguru.online" className="text-primary hover:underline font-medium">
                    support@taskguru.online
                  </a>
                </div>
              </div>

              {/* Social Support Item */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Social Support</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    DM us on Twitter or Instagram for quick updates.
                  </p>
                  <div className="mt-2 flex gap-3 text-sm font-medium">
                    <a href="https://x.com/Shubham_962" target="_blank" className="text-blue-500 hover:underline">Twitter (X)</a>
                    <span>•</span>
                    <a href="https://www.instagram.com/fact_fusion_s" target="_blank" className="text-pink-500 hover:underline">Instagram</a>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Side: Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="Your Name" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="hello@example.com" className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                {/* 👇 FIXED: Standard HTML Textarea with styling (No import needed) */}
                <textarea 
                  id="message" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
