"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSplit() {
    if (!file) return;

    setLoading(true);

    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);
    const totalPages = pdfDoc.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(page);

      const bytes = await newPdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `page-${i + 1}.pdf`;
      a.click();
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6 border rounded-xl p-6 bg-white shadow">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSplit}
        disabled={!file || loading}
        className="px-6 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? "Splitting PDF..." : "Split PDF"}
      </button>
    </div>
  );
}
