import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
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
          text: "Yes, Toolify is 100% free to use. All tools work instantly in your browser with no login required.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Toolify never stores files on its servers. All processing is secure and temporary.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No installation needed. Toolify works directly on any device with a browser.",
        },
      },
      {
        "@type": "Question",
        name: "Who can use Toolify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students, professionals, creators, and businesses use Toolify for AI tools, PDF tools, and image utilities.",
        },
      },
    ],
  };

  return (
    <>
      {/* FAQ SCHEMA */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* HERO SECTION */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-primary-foreground">
            Toolify (TaskGuru) – The Ultimate AI Tools Hub
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
            Work smarter with free AI tools for images, PDFs, documents, text, and
            daily productivity. Fast, secure, and built for everyone.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-transform hover:scale-105"
            >
              <Link href="#tools" prefetch={false}>
                Explore All Tools
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section id="tools" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Explore Our Most Popular Tools
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Free tools for PDF conversion, image processing, AI paraphrasing,
              OCR, compression, and more—all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link
                href={`/tools/${tool.slug}`}
                key={tool.slug}
                className="group flex"
                prefetch={!tool.isPlaceholder}
              >
                <Card className="w-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-primary bg-card">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <tool.icon className="w-8 h-8 text-primary" />
                      </div>

                      {tool.isGenAI && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          <Sparkles className="w-3 h-3" />
                          AI-Powered
                        </span>
                      )}
                    </div>

                    <CardTitle className="pt-2 text-xl font-semibold">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-base text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      Use Tool{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Stay Ahead With AI Productivity Tips
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join our newsletter for AI tool updates, productivity secrets, and
              new feature announcements.
            </p>

            <NewsletterForm />

            <p className="mt-3 text-xs text-muted-foreground">
              100% privacy guaranteed. No spam ever.
            </p>
          </div>
        </div>
      </section>

      {/* 🔥 EXTENDED SEO CONTENT – 2000+ WORDS */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto px-6 max-w-4xl space-y-12 text-lg leading-relaxed text-muted-foreground">

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Toolify (TaskGuru) – Your Smart AI Tools Platform
          </h2>

          <p>
            Toolify (TaskGuru) is a modern productivity ecosystem that brings together
            the most essential AI-powered tools for everyday digital tasks. Whether
            you're handling PDFs, rewriting content, extracting text, optimizing
            images, or preparing documents, Toolify gives you fast, secure, and
            reliable tools powered by intelligent algorithms.
          </p>

          <p>
            Most tool websites force users to watch intrusive ads, create accounts, or
            pay subscription fees just to perform simple operations. Toolify is built
            differently—providing a clean, fast, privacy-friendly interface that works
            instantly in your browser without installations or logins.
          </p>

          <h3 className="text-3xl font-bold mt-10">Who Can Use Toolify (TaskGuru)?</h3>

          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Students:</strong> Convert PDFs, paraphrase essays, compress images, extract text.</li>
            <li><strong>Professionals:</strong> Prepare documents, merge PDFs, organize files, optimize resumes.</li>
            <li><strong>Designers:</strong> Remove backgrounds, compress graphics, prepare assets for social media.</li>
            <li><strong>Businesses:</strong> Improve workflows, digitize documents, automate routine tasks.</li>
          </ul>

          <h3 className="text-3xl font-bold mt-10">Why Toolify Stands Out</h3>

          <p>
            With hundreds of online tools available today, very few are fast, free,
            easy-to-use, and privacy-safe. Toolify stands out due to its commitment to
            simplicity, accuracy, and user trust. All processing happens in real-time,
            and files are never saved on the server.
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>✔ 100% free tools</li>
            <li>✔ No login required</li>
            <li>✔ No file storage</li>
            <li>✔ Fast and mobile-friendly</li>
            <li>✔ AI-powered precision</li>
            <li>✔ Minimal, clean design</li>
          </ul>

          <h3 className="text-3xl font-bold mt-10">Our Tools</h3>

          <p>
            Toolify provides a complete suite of digital tools including:
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>PDF to Word Converter</li>
            <li>AI Paraphrasing Tool</li>
            <li>Background Remover</li>
            <li>OCR – Image to Text</li>
            <li>Image Compressor</li>
            <li>Merge PDF</li>
            <li>Image to PDF Converter</li>
            <li>More tools coming soon…</li>
          </ul>

          <h3 className="text-3xl font-bold mt-10">Our Vision</h3>

          <p>
            Toolify aims to become the world’s most trusted free AI tool platform. We
            are continuously expanding our ecosystem with new AI-powered utilities,
            smart automation tools, content generation features, and productivity
            enhancements designed for everyday use.
          </p>

          <p>
            Future tools include AI voiceovers, grammar correction, resume building,
            smart summarization, and more advanced PDF editing utilities.
          </p>

          <h3 className="text-3xl font-bold mt-10">Final Thoughts</h3>

          <p>
            Toolify (TaskGuru) is built for users who want fast, reliable, and smart
            tools without complications. With a focus on usability, privacy, and
            performance, Toolify delivers a premium experience for everyone—students,
            professionals, creators, and businesses.
          </p>

          <p>
            Whether you're converting files, rewriting text, optimizing images, or
            simplifying tasks, Toolify empowers you to work smarter and achieve more.
          </p>

        </div>
      </section>
    </>
  );
}
