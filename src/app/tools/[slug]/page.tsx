import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import Link from "next/link";
import YoutubeThumbnail from '@/components/tools/YoutubeThumbnail';
import BackgroundRemover from '@/components/tools/BackgroundRemover';
import ImageToText from '@/components/tools/ImageToText';
import TextParaphraser from '@/components/tools/TextParaphraser';
import PdfToWord from '@/components/tools/PdfToWord';
import MergePdf from '@/components/tools/MergePdf';
import SplitPdf from '@/components/tools/SplitPdf';
import ImageCompressor from '@/components/tools/ImageCompressor';
import ImageToPdf from '@/components/tools/ImageToPdf';
import PlaceholderTool from '@/components/tools/PlaceholderTool';
import MoreTools from '@/components/MoreTools';
import ResumeMakerFlow from '@/components/tools/ResumeMakerFlow';
import AgeCalculator from '@/components/tools/AgeCalculator';
import MetalWeightCalculator from '@/components/tools/MetalWeightCalculator';
import { ShieldCheck, Lock, Zap } from 'lucide-react'; // Icons add kiye

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) {
    return {
      title: "Tool Not Found | Toolify (TaskGuru)",
      description: "The tool you are looking for does not exist on Toolify (TaskGuru).",
    };
  }

  return {
    title: `${tool.title} | Toolify (TaskGuru)`,
    description: tool.description,
    alternates: {
      canonical: `https://www.taskguru.online/tools/${tool.slug}`,
    },
  };
}

const toolComponentMap: { [key: string]: React.ComponentType<any> } = {
  "background-remover": BackgroundRemover,
  "image-to-text": ImageToText,
  "text-paraphraser": TextParaphraser,
  "pdf-to-word": PdfToWord,
  "merge-pdf": MergePdf,
  "image-compressor": ImageCompressor,
  "image-to-pdf": ImageToPdf,
  "age-calculator": AgeCalculator,
  "metal-weight-calculator": MetalWeightCalculator,
  "split-pdf": SplitPdf,
  "youtube-thumbnail-downloader": YoutubeThumbnail,
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) {
    notFound();
  }

  return (
    <main className="flex-1 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground">
            {tool.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>

        {/* ✅ TOOL RENDER SECTION */}
        <div className="min-h-[400px] mb-20">
            {tool.slug === "resume-maker" ? (
            <ResumeMakerFlow />
            ) : (
            (() => {
                const ToolComponent = tool.isPlaceholder
                ? PlaceholderTool
                : toolComponentMap[tool.slug];

                return ToolComponent ? (
                <ToolComponent title={tool.title} description={tool.description} />
                ) : (
                <PlaceholderTool title={tool.title} />
                );
            })()
            )}
        </div>

        {/* 👇 NEW ADSENSE BOOSTER SECTION: Content jo har tool page par dikhega */}
        <div className="max-w-4xl mx-auto py-12 border-t mt-12">
            
            {/* 1. Dynamic Content from tools.ts (Agar aapne add kiya hai) */}
            {/* @ts-ignore - Assuming content field might exist later */}
            {tool.content && (
                <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
                    <div dangerouslySetInnerHTML={{ __html: tool.content }} />
                </article>
            )}

            {/* 2. Static High-Value Content (Safety & Features) */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-green-600" />
                        Privacy & Security
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Your privacy is our priority. When you use our <strong>{tool.title}</strong>, 
                        all processing happens securely. We do not store your files on our servers permanently. 
                        Files are automatically deleted after processing to ensure your data remains private 
                        and confidential.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Why Use This Tool?
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        TaskGuru provides this <strong>{tool.title}</strong> for free to help students, 
                        professionals, and creators work faster. Unlike other paid software, 
                        our tool runs directly in your browser, requiring no installation and 
                        no credit card registration.
                    </p>
                </div>
            </div>

            {/* 3. Generic How-To Guide (AdSense loves Instructions) */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">How to use {tool.title} online?</h2>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">1</span>
                        <p className="text-muted-foreground">Upload your file or enter your data into the {tool.title} box above.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">2</span>
                        <p className="text-muted-foreground">Wait a few moments while our AI algorithm processes your request securely.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">3</span>
                        <p className="text-muted-foreground">Preview the result and click the Download or Copy button to get your output instantly.</p>
                    </div>
                </div>
            </div>

        </div>

      </div>

      {/* More Tools Section */}
      <MoreTools />
    </main>
  );
}
