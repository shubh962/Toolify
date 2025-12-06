"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

//
// SAFE CANVAS LOADER – removes EXIF, reduces extreme resolution
//
const loadSafeCanvas = (file: File): Promise<{ preview: string; canvas: HTMLCanvasElement }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        // Maximum safe resolution for browsers
        const MAX = 2000;
        const scale = Math.min(MAX / w, MAX / h, 1);

        w = Math.floor(w * scale);
        h = Math.floor(h * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, w, h);

        resolve({
          preview: canvas.toDataURL("image/jpeg", 0.9),
          canvas,
        });
      };

      img.onerror = () => reject("Image decode failed.");
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject("File read error.");
    reader.readAsDataURL(file);
  });
};

export default function ImageToPdf() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  //
  // FILE UPLOAD
  //
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be under 50MB.");
      return;
    }

    setLoading(true);
    try {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setFileName(baseName);

      const loaded = await loadSafeCanvas(file);
      setPreview(loaded.preview);
      setCanvas(loaded.canvas);

      setPdfUrl(null);
    } catch (err) {
      console.error(err);
      alert("Failed to load image.");
    }
    setLoading(false);
  };

  //
  // CONVERT TO PDF (bulletproof version)
  //
  const convertToPdf = async () => {
    if (!canvas) return;
    setLoading(true);

    try {
      const pdf = await PDFDocument.create();

      const A4_W = 595.28;
      const A4_H = 841.89;

      // Convert canvas → clean JPEG blob
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92)
      );
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const embedded = await pdf.embedJpg(bytes);

      // Fit image inside A4 page
      const iw = canvas.width;
      const ih = canvas.height;
      const scale = Math.min(A4_W / iw, A4_H / ih);
      const fw = iw * scale;
      const fh = ih * scale;

      const page = pdf.addPage([A4_W, A4_H]);
      page.drawImage(embedded, {
        x: (A4_W - fw) / 2,
        y: (A4_H - fh) / 2,
        width: fw,
        height: fh,
      });

      // Save and encode
      const pdfBytes = await pdf.save();
      const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));

      setPdfUrl(`data:application/pdf;base64,${pdfBase64}`);
    } catch (error) {
      console.error(error);
      alert("PDF conversion failed.");
    }

    setLoading(false);
  };

  //
  // RESET
  //
  const resetTool = () => {
    setPreview(null);
    setCanvas(null);
    setPdfUrl(null);
    setFileName("");
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="space-y-12 py-10 text-center">
      <h1 className="text-4xl font-bold">Image to PDF Converter</h1>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Works for all camera photos, screenshots, documents — 100% offline & secure.
      </p>

      <Card className="max-w-3xl mx-auto shadow-xl border">
        <CardContent className="p-10">

          {!preview ? (
            <div
              onClick={() => fileInput.current?.click()}
              className="p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-muted-foreground" />
              <p className="mt-3 font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">JPG, JPEG, PNG • Max 50MB</p>

              <Input type="file" accept="image/*" ref={fileInput} className="hidden" onChange={handleUpload} />
            </div>
          ) : (
            <>
              <img src={preview} className="max-h-96 mx-auto rounded-lg shadow-md object-contain" />

              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={convertToPdf} disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Converting…</> : "Convert to PDF"}
                </Button>

                <Button variant="outline" onClick={resetTool}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download={`${fileName}.pdf`}
                  className="text-primary underline block mt-4 font-semibold"
                >
                  Download {fileName}.pdf
                </a>
              )}
            </>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
