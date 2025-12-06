"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument, StandardFonts } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 50 * 1024 * 1024;

  // ------------------------------------------
  // CLEAN + AUTO-RESIZE IMAGE (Camera Fix)
  // ------------------------------------------
  const cleanAndResizeImage = (base64: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = base64;

      img.onload = () => {
        let { width, height } = img;

        const isCameraImage = width > 3000 || height > 3000;
        const MAX_RES = isCameraImage ? 1500 : 2000;

        if (width > MAX_RES || height > MAX_RES) {
          const scale = MAX_RES / Math.max(width, height);
          width *= scale;
          height *= scale;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { alpha: false });

        if (!ctx) return reject("Canvas Error");

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const quality = isCameraImage ? 0.75 : 0.9;
        const cleaned = canvas.toDataURL("image/jpeg", quality);

        resolve(cleaned);
      };

      img.onerror = () => reject("Image Load Failed");
    });
  };

  // ------------------------------------------
  // UPLOAD HANDLER
  // ------------------------------------------
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG and PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE_MB) {
      alert("Max file size is 50 MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const cleaned = await cleanAndResizeImage(base64);
      setImage(cleaned);
    };
    reader.readAsDataURL(file);
  };

  // ------------------------------------------
  // CONVERT TO PDF (Auto-fit into A4)
  // ------------------------------------------
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdfDoc = await PDFDocument.create();
      const a4Width = 595.28;
      const a4Height = 841.89;

      const imgElement = new Image();
      imgElement.src = image;

      await new Promise((resolve) => (imgElement.onload = resolve));

      const imgWidth = imgElement.width;
      const imgHeight = imgElement.height;

      const scale = Math.min(a4Width / imgWidth, a4Height / imgHeight);
      const finalW = imgWidth * scale;
      const finalH = imgHeight * scale;

      const imgBytes = Uint8Array.from(atob(image.split(",")[1]), (c) =>
        c.charCodeAt(0)
      );

      const embedded = await pdfDoc.embedJpg(imgBytes);

      const page = pdfDoc.addPage([a4Width, a4Height]);
      page.drawImage(embedded, {
        x: (a4Width - finalW) / 2,
        y: (a4Height - finalH) / 2,
        width: finalW,
        height: finalH,
      });

      const pdfBytes = await pdfDoc.save();
      const dataUri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(dataUri);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to convert image. Try again.");
      setLoading(false);
    }
  };

  // ------------------------------------------
  // RESET TOOL
  // ------------------------------------------
  const resetTool = () => {
    setImage(null);
    setFileName("");
    setPdfDataUri(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-12 py-10">
      {/* TITLE */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into professional PDF instantly.
        </p>
      </section>

      {/* MAIN UPLOAD CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">
          {!image ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">
                Click to upload image or drag & drop
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, JPEG, PNG • Max 50MB
              </p>

              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={image}
                alt="Preview"
                className="max-h-96 rounded-lg border shadow-md object-contain"
              />
              <p className="text-sm text-muted-foreground">{fileName}</p>

              <div className="flex gap-3">
                <Button
                  onClick={convertToPdf}
                  disabled={loading}
                  className="w-40"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Converting…
                    </>
                  ) : (
                    "Convert to PDF"
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={resetTool}
                  className="w-32 flex items-center gap-2"
                >
                  <RotateCcw size={16} /> Reset
                </Button>
              </div>

              {pdfDataUri && (
                <a
                  href={pdfDataUri}
                  download="converted.pdf"
                  className="text-primary underline font-semibold mt-2"
                >
                  Download PDF
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO CONTENT */}
      <Card className="max-w-4xl mx-auto p-8 shadow-xl border">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Convert Any Image to PDF Easily
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Whether you're converting photos, scanned documents, assignments, or
          receipts — this tool ensures fast and secure PDF conversion inside
          your browser.
        </p>

        <h3 className="text-xl font-semibold mt-6">How to Use</h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload your JPG or PNG image</li>
          <li>Preview instantly</li>
          <li>Click Convert</li>
          <li>Download the generated PDF</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>
        <p><strong>Is it free?</strong> Yes.</p>
        <p><strong>Maximum file size?</strong> 50 MB.</p>
        <p><strong>Supported formats?</strong> JPG, JPEG, PNG.</p>
      </Card>
    </div>
  );
}
