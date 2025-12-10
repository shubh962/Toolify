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
        name: "Is Toolify free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Toolify is 100% free to use. All tools work directly in your browser with no login or subscription required.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your files are processed in real-time and never stored on our servers. Privacy and security are a top priority.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats do you support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Toolify supports common formats like JPG, PNG, PDF, DOCX, and TXT. Each tool clearly lists supported formats.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Toolify works fully online in your browser. No downloads or installations are required.",
        },
      },
      {
        "@type": "Question",
        name: "Who can use Toolify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Toolify is designed for students, professionals, content creators, developers, and everyday users who want fast, reliable, and free tools.",
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ FAQ JSON-LD for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ✅ Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-primary-foreground">
            The Ultimate AI Tools Hub
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
            Discover and master the best free AI-powered tools for images, PDFs,
            and text. Curated for creators, students, professionals, and
            innovators who value speed, privacy, and simplicity.
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

      {/* ✅ Tools Grid */}
      <section id="tools" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Curated AI-Powered Tools
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              From content creation to file conversion, find the perfect tool to
              simplify your workflow. Each tool is designed to be fast, free,
              and privacy-first.
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

      {/* ✅ Ad Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <HomepageAd />
        </div>
      </section>

      {/* ✅ Newsletter Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Stay Ahead of the Curve
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Subscribe to our newsletter for the latest AI tool reviews,
              tutorials, SEO tips, and industry news. Learn how to get the most
              out of online productivity tools.
            </p>
            <NewsletterForm />
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Extended Content for SEO */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6 prose max-w-none">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Why Choose Toolify?
          </h2>
          <p>
            Toolify isn’t just another collection of free utilities. It’s a
            carefully designed hub where each tool is optimized to save time,
            protect user privacy, and boost productivity. Unlike many sites that
            slow you down with intrusive ads, Toolify focuses on speed,
            simplicity, and a clean interface. Whether you’re editing images,
            compressing files, or paraphrasing text, Toolify delivers
            professional-grade results in seconds.
          </p>
          <p>
            Toolify is built on modern web technologies, ensuring seamless
            performance on both desktop and mobile. Because tools run directly
            in the browser, there’s no need for software downloads, heavy
            updates, or complicated installations. Our AI-powered utilities give
            creators, students, and businesses the edge they need in today’s
            fast-moving digital world.
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-center">
            Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Students:</strong> Convert PDFs to Word, paraphrase text,
              compress images for assignments, and generate clean study notes.
            </li>
            <li>
              <strong>Professionals:</strong> Merge PDFs, extract text from
              images, format resumes, and create presentations faster.
            </li>
            <li>
              <strong>Designers & Creators:</strong> Remove image backgrounds,
              resize images, and optimize visuals for web publishing.
            </li>
            <li>
              <strong>Businesses:</strong> Improve workflows with secure
              document conversions, image optimizations, and productivity
              boosters.
            </li>
          </ul>

          <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-center">
            Toolify vs Other Tools
          </h2>
          <p>
            Popular alternatives like Canva, TinyPNG, SmallPDF, and Quillbot
            often lock features behind paywalls or require sign-ups. Toolify
            stands out by offering free, no-login, ad-light tools that respect
            your privacy. Every feature is streamlined for quick use so you
            don’t waste time navigating cluttered dashboards. Unlike competitors
            that store files, Toolify processes everything securely with
            temporary handling or in-browser execution.
          </p>
          <p>
            By combining multiple utilities in one place, Toolify eliminates the
            need to jump between different websites. From PDF to Word
            conversion, paraphrasing text, compressing files, to AI-powered
            background removal — everything is accessible in a single, unified
            platform.
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-center">
            Tips to Get the Best Results
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload high-quality images for the best background removal.</li>
            <li>
              For paraphrasing, provide complete sentences for more natural AI
              rewrites.
            </li>
            <li>
              When compressing files, balance size and quality to suit your
              needs.
            </li>
            <li>
              Use PDF conversion for editable content, then format in Word for
              professional results.
            </li>
            <li>
              Bookmark Toolify so your favorite tools are always one click away.
            </li>
          </ul>

          <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Is Toolify really free?</h3>
              <p>
                Yes, all tools are completely free with no hidden charges. You
                don’t need to create an account or install software. Just upload
                your file and get instant results.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Will my files be safe?</h3>
              <p>
                Security is our top priority. Files are processed in-browser or
                on secure servers and are never permanently stored. They are
                automatically discarded after processing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Which devices are supported?</h3>
              <p>
                Toolify works seamlessly on desktops, tablets, and smartphones.
                All you need is a modern browser such as Chrome, Safari, or
                Edge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">What makes Toolify unique?</h3>
              <p>
                Unlike competitors that bombard users with ads, Toolify focuses
                on speed, minimalism, and privacy. Our AI-powered tools evolve
                regularly to meet new user needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Do I need technical knowledge to use Toolify?
              </h3>
              <p>
                No, Toolify is built for everyone — from students to IT
                professionals. The simple design ensures anyone can use it
                instantly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Can Toolify replace paid apps?</h3>
              <p>
                For many everyday tasks like compressing, converting, or
                paraphrasing, Toolify offers features comparable to paid apps
                without subscriptions or limits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Does Toolify support multiple languages?
              </h3>
              <p>
                Yes, many tools work with English, Hindi, and other global
                languages. We are expanding support for more languages soon.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                How often are new tools added?
              </h3>
              <p>
                We continuously expand Toolify by introducing new tools and AI
                features based on user feedback and trending needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
