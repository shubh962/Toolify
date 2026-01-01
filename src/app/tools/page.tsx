import { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, FileText, Image, Scissors, FilePlus2, ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Tools – PDF, Image & Calculator Tools | TaskGuru",
  description:
    "Access TaskGuru's free online tools including PDF tools, image utilities, resume maker, calculators and more. No sign-up required.",
  alternates: {
    canonical: "https://www.taskguru.online/tools",
  },
};

const tools = [
  {
    name: "Age Calculator",
    desc: "Calculate your exact age in years, months and days instantly.",
    href: "/tools/age-calculator",
    icon: Calculator,
  },
  {
    name: "Image to Text (OCR)",
    desc: "Extract editable text from images using AI OCR.",
    href: "/tools/image-to-text",
    icon: FileText,
  },
  {
    name: "Image to PDF",
    desc: "Convert images into high-quality PDF files.",
    href: "/tools/image-to-pdf",
    icon: Image,
  },
  {
    name: "Split PDF",
    desc: "Split PDF files into individual pages easily.",
    href: "/tools/split-pdf",
    icon: Scissors,
  },
  {
    name: "Metal Weight Calculator",
    desc: "Calculate accurate metal sheet and rod weight instantly.",
    href: "/tools/metal-weight-calculator",
    icon: Calculator,
  },
  {
    name: "Resume Maker",
    desc: "Create professional ATS-friendly resumes for free.",
    href: "/tools/resume-maker",
    icon: FilePlus2,
  },
];

export default function ToolsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Free Online Tools by TaskGuru
      </h1>

      <p className="text-gray-600 mb-10">
        TaskGuru provides free productivity tools to simplify daily digital tasks.
        All tools run securely in your browser with no sign-up required.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <tool.icon className="w-8 h-8 mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 mb-3">{tool.desc}</p>
            <span className="text-blue-600 inline-flex items-center">
              Open Tool <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
