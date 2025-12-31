"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [splitFiles, setSplitFiles] = useState<
    { name: string; bytes: Uint8Array; url: string }[]
  >([]);

  async function handleSplit() {
    if (!file) return;

    try {
      setLoading(true);
      setProgress(0);
      setSplitFiles([]);
      setStatus("Initializing local engine...");

      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const totalPages = pdfDoc.getPageCount();

      const results: { name: string; bytes: Uint8Array; url: string }[] = [];

      for (let i = 0; i < totalPages; i++) {
        setStatus(`Processing page ${i + 1} of ${totalPages}...`);
        setProgress(Math.round(((i + 1) / totalPages) * 100));

        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);

        const bytes = await newPdf.save();
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        results.push({
          name: `${file.name.replace(".pdf", "")}-page-${i + 1}.pdf`,
          bytes,
          url,
        });
      }

      setSplitFiles(results);
      setStatus("PDF split completed. Choose how you want to download.");
    } catch (error) {
      console.error(error);
      setStatus(
        "Error: Could not process this PDF. It may be encrypted or corrupted."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadAll() {
    splitFiles.forEach((file) => {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = file.name;
      a.click();
    });
  }

  async function handleDownloadZip() {
    const zip = new JSZip();

    splitFiles.forEach((file) => {
      zip.file(file.name, file.bytes);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(".pdf", "")}-split-pages.zip`;
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 border-4 border-dashed border-blue-100 rounded-3xl bg-white shadow-xl transition-all hover:border-blue-300">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="p-4 bg-blue-50 rounded-full">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">Ready to Split?</h3>
          <p className="text-gray-500">
            Select your PDF to begin local processing
          </p>
        </div>

        <label className="group relative cursor-pointer w-full">
          <div className="flex items-center justify-center px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl group-hover:bg-blue-50 group-hover:border-blue-200 transition">
            <span className="text-gray-600 font-medium truncate">
              {file ? file.name : "Click to browse files"}
            </span>
          </div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setStatus("");
              setSplitFiles([]);
            }}
          />
        </label>

        <button
          onClick={handleSplit}
          disabled={!file || loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 disabled:bg-gray-300 disabled:shadow-none transition-all active:scale-95"
        >
          {loading ? `Splitting... ${progress}%` : "Split PDF into Pages"}
        </button>

        {splitFiles.length > 0 && (
          <>
            <button
              onClick={handleDownloadAll}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95"
            >
              Download All Pages
            </button>

            <button
              onClick={handleDownloadZip}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              Download as ZIP
            </button>
          </>
        )}

        {status && (
          <div
            className={`p-3 rounded-lg w-full text-sm font-semibold ${
              status.includes("Error")
                ? "bg-red-50 text-red-600"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
