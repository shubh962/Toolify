// src/app/tools/split-pdf/page.tsx
import SplitPdfWrapper from '@/components/tools/SplitPdfWrapper';
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "https://www.taskguru.online/tools/split-pdf" },
};

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center space-y-6 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Split PDF Files <span className="text-blue-600">Securely</span> &amp; Free
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          The only PDF splitter that works entirely in your browser. No uploads,
          no server storage, and no privacy risks.
        </p>
      </section>

      {/* This component handles the client-only loading */}
      <SplitPdfWrapper />

      <section className="max-w-3xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-6 py-4">
          <strong>Note:</strong> Password-protected or encrypted PDF files cannot
          be split. Please remove the password before using this tool.
        </p>
      </section>
    </div>
  );
}
