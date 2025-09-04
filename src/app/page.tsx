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
import HomepageAd from "@/components/ads/HomepageAd";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <>
      {/* ✅ Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-primary-foreground">
            The Ultimate AI Tools Hub
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
            Discover and master the best free AI-powered tools for images, PDFs,
            and text. Curated for creators, developers, and innovators.
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
              simplify your workflow.
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
              tutorials, and industry news.
            </p>
            <NewsletterForm />
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. No spam.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Extra Content for SEO (fix thin content + header hierarchy) */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            How Toolify Helps You
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Pick a Tool</h3>
              <p className="text-muted-foreground">
                Choose from tools like Background Remover, Image Compressor, PDF
                to Word, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">2. Upload Your File</h3>
              <p className="text-muted-foreground">
                Process images, PDFs, or text securely in your browser. No login
                needed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">3. Download Results</h3>
              <p className="text-muted-foreground">
                Get optimized outputs instantly, with no data stored on our
                servers.
              </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold">Is Toolify free?</h3>
              <p className="text-muted-foreground">
                Yes, all tools are completely free with no signup required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Are my files safe when I upload them?
              </h3>
              <p className="text-muted-foreground">
                Yes. Files are processed securely in real time and not stored on
                our servers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                What file formats do you support?
              </h3>
              <p className="text-muted-foreground">
                We support popular formats like JPG, PNG, PDF, DOCX, and TXT.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
