"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

interface SplitPage {
  pageNumber: number;
  url: string;
}

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState<SplitPage[]>([]);
  const [status, setStatus] = useState("");

  async function handleSplit() {
    if (!file) return;

    try {
      setLoading(true);
      setPages([]);
      setStatus("Analyzing PDF content...");
      
      const buffer = await file.arrayBuffer(); [cite: 25]
      const pdfDoc = await PDFDocument.load(buffer); [cite: 26]
      const totalPages = pdfDoc.getPageCount(); [cite: 26]
      const generatedPages: SplitPage[] = [];

      for (let i = 0; i < totalPages; i++) {
        setStatus(`Preparing page ${i + 1} of ${totalPages}...`);
        setProgress(Math.round(((i + 1) / totalPages) * 100));

        const newPdf = await PDFDocument.create(); [cite: 26]
        const [page] = await newPdf.copyPages(pdfDoc, [i]); [cite: 27]
        newPdf.addPage(page); [cite: 27]

        const bytes = await newPdf.save(); [cite: 27]
        const blob = new Blob([bytes], { type: "application/pdf" }); [cite: 28]
        const url = URL.createObjectURL(blob); [cite: 28]
        
        generatedPages.push({
          pageNumber: i + 1,
          url: url
        });
      }
      
      setPages(generatedPages);
      setStatus(`Success! Document split into ${totalPages} individual pages.`);
    } catch (error) {
      console.error(error);
      setStatus("Error: Could not process this PDF file.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="p-8 border-4 border-dashed border-gray-200 rounded-3xl bg-white shadow-sm text-center">
        <div className="flex flex-col items-center space-y-6">
          <input
            type="file"
            accept="application/pdf" [cite: 30]
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setPages([]);
              setStatus("");
            }}
          />

          <button
            onClick={handleSplit}
            disabled={!file || loading} [cite: 31]
            className="w-full max-w-md py-4 bg-black text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? `Processing (${progress}%)...` : "Split PDF"} [cite: 31]
          </button>

          {status && (
            <p className={`text-sm font-medium ${status.includes("Error") ? "text-red-600" : "text-blue-600"}`}>
              {status}
            </p>
          )}
        </div>
      </div>

      {pages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Download Individual Pages:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pages.map((page) => (
              <a
                key={page.pageNumber}
                href={page.url} [cite: 28]
                download={`page-${page.pageNumber}.pdf`} [cite: 29]
                className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition shadow-sm"
              >
                <span className="text-sm font-bold">Page {page.pageNumber}</span>
                <span className="text-xs text-blue-600 font-semibold mt-1 underline">Download PDF</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
