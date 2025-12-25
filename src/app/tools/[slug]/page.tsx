import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';

import BackgroundRemover from '@/components/tools/BackgroundRemover';
import ImageToText from '@/components/tools/ImageToText';
import TextParaphraser from '@/components/tools/TextParaphraser';
import PdfToWord from '@/components/tools/PdfToWord';
import MergePdf from '@/components/tools/MergePdf';
import ImageCompressor from '@/components/tools/ImageCompressor';
import ImageToPdf from '@/components/tools/ImageToPdf';
import PlaceholderTool from '@/components/tools/PlaceholderTool';
import MoreTools from '@/components/MoreTools';
import ResumeMakerFlow from '@/components/tools/ResumeMakerFlow'; // ✅ IMPORTANT
import AgeCalculator from '@/components/tools/AgeCalculator';

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

// ⭐ UPDATED METADATA FOR GOOGLE + ADSENSE
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

        {/* ✅ SPECIAL FLOW FOR RESUME MAKER */}
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

      {/* More Tools Section */}
      <MoreTools />
    </main>
  );
}

