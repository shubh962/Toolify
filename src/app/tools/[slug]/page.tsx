import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import BackgroundRemover from '@/components/tools/BackgroundRemover';
import ImageToText from '@/components/tools/ImageToText';
import TextParaphraser from '@/components/tools/TextParaphraser';
import PlaceholderTool from '@/components/tools/PlaceholderTool';
import PdfToWord from '@/components/tools/PdfToWord';
import MergePdf from '@/components/tools/MergePdf';
import ImageCompressor from '@/components/tools/ImageCompressor';
import Script from 'next/script';

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }
  return {
    title: `${tool.title} | Toolify`,
    description: tool.description,
  };
}

const toolComponentMap: { [key: string]: React.ComponentType<any> } = {
  'background-remover': BackgroundRemover,
  'image-to-text': ImageToText,
  'text-paraphraser': TextParaphraser,
  'pdf-to-word': PdfToWord,
  'merge-pdf': MergePdf,
  'image-compressor': ImageCompressor,
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.isPlaceholder ? PlaceholderTool : toolComponentMap[tool.slug];

  return (
    <main className="flex-1 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground">{tool.title}</h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">{tool.description}</p>
        </div>
        
        {ToolComponent ? (
          <ToolComponent title={tool.title} description={tool.description} />
        ) : (
          <PlaceholderTool title={tool.title} />
        )}

        <div className="mt-16">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div>
              <Script id="ad-script-3-config">
                {`
                  atOptions = {
                    'key' : '8264ae6a7e43a03596b991bae2a4f902',
                    'format' : 'iframe',
                    'height' : 300,
                    'width' : 160,
                    'params' : {}
                  };
                `}
              </Script>
              <Script
                id="ad-script-3-src"
                src="//www.highperformanceformat.com/8264ae6a7e43a03596b991bae2a4f902/invoke.js"
              />
            </div>
             <div>
              <Script id="ad-script-4-config">
                {`
                  atOptions = {
                    'key' : '8264ae6a7e43a03596b991bae2a4f902',
                    'format' : 'iframe',
                    'height' : 300,
                    'width' : 160,
                    'params' : {}
                  };
                `}
              </Script>
              <Script
                id="ad-script-4-src"
                src="//www.highperformanceformat.com/8264ae6a7e43a03596b991bae2a4f902/invoke.js"
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
