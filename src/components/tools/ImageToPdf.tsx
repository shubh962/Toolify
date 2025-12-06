"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

// ----------------------------
// SAFE IMAGE → CANVAS LOADER
// ----------------------------
const loadImageToCanvas = (file: File): Promise<{ preview: string; canvas: HTMLCanvasElement }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        // Mobile camera images are too large → shrink safely
        const MAX = 2000;
        const factor = Math.min(MAX / w, MAX / h, 1);
        w *= factor;
        h *= factor;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);

        resolve({
          preview: canvas.toDataURL("image/jpeg", 0.9),
          canvas,
        });
      };

      img.onerror = () => reject("Invalid image");
      img.src = ev.target?.result as string;
    };

    reader.onerror = () => reject("File read error");
    reader.readAsDataURL(file);
  });
};

export default function ImageToPdf() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024;

  // ----------------------------
  // FILE UPLOAD
  // ----------------------------
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images are allowed.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Max 50MB allowed.");
      return;
    }

    setLoading(true);

    try {
      const clean = file.name.replace(/\.[^/.]+$/, "");
      setFileName(clean);

      const data = await loadImageToCanvas(file);
      setPreview(data.preview);
      setCanvas(data.canvas);

      setPdfUri(null);
    } catch (e) {
      console.error(e);
      alert("Failed to load image.");
    }

    setLoading(false);
  };

  // ----------------------------
  // FIXED PDF GENERATOR (NO BASE64 atob ISSUES)
  // ----------------------------
  const convertToPdf = async () => {
    if (!canvas) return;

    setLoading(true);

    try {
      const pdfDoc = await PDFDocument.create();

      const A4_W = 595.28;
      const A4_H = 841.89;

      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92)
      );

      const bytes = new Uint8Array(await blob.arrayBuffer());
      const img = await pdfDoc.embedJpg(bytes);

      const iw = canvas.width;
      const ih = canvas.height;

      const scale = Math.min(A4_W / iw, A4_H / ih);
      const fw = iw * scale;
      const fh = ih * scale;

      const page = pdfDoc.addPage([A4_W, A4_H]);
      page.drawImage(img, {
        x: (A4_W - fw) / 2,
        y: (A4_H - fh) / 2,
        width: fw,
        height: fh,
      });

      const pdfBytes = await pdfDoc.save();
      const uri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfUri(uri);
    } catch (err) {
      console.error(err);
      alert("PDF conversion failed.");
    }

    setLoading(false);
  };

  const resetAll = () => {
    setPreview(null);
    setCanvas(null);
    setPdfUri(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
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
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-muted-foreground" />
              <p className="mt-3 font-semibold">Click to upload</p>
              <p className="text-sm text-muted-foreground">JPG, PNG • Max 50MB</p>

              <Input
                type="file"
                accept="image/*"
                ref={inputRef}
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            <>
              <img
                src={preview}
                className="max-h-96 mx-auto rounded-lg shadow-md object-contain"
              />

              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={convertToPdf} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Converting…
                    </>
                  ) : (
                    "Convert to PDF"
                  )}
                </Button>

                <Button variant="outline" onClick={resetAll}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>

              {pdfUri && (
                <a
                  href={pdfUri}
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
