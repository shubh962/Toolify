import Link from 'next/link';
import { tools } from '@/lib/tools';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomepageAd from '@/components/ads/HomepageAd';
import NewsletterForm from '@/components/NewsletterForm';

export default function Home() {
  return (
    <>
      <section className="py-20 md:py-32 text-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-primary-foreground">
            The Ultimate AI Tools Hub
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
            Discover, review, and master the best free & premium AI tools. Your definitive guide to the world of artificial intelligence, curated for creators, developers, and innovators.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-transform hover:scale-105">
              <Link href="#tools" prefetch={false}>Explore All Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="tools" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Curated AI-Powered Tools</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              From content creation to data analysis, find the perfect tool to elevate your projects.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link href={`/tools/${tool.slug}`} key={tool.slug} className="group flex" prefetch={!tool.isPlaceholder}>
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
                    <CardTitle className="pt-2 text-xl font-semibold">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-base text-muted-foreground">{tool.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      Use Tool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <HomepageAd />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Stay Ahead of the Curve</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Subscribe to our newsletter for the latest AI tool reviews, tutorials, and industry news.
            </p>
            <NewsletterForm />
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. No spam.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}