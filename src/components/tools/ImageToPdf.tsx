"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ImageToPdf() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetAll = () => {
    setImage(null);
    setPreviewUrl(null);
    setPdfUrl(null);
  };

  const generatePDF = async () => {
    if (!image) return;

    const img = await createImageBitmap(image);
    const canvas = document.createElement("canvas");

    canvas.width = 595; // A4 width
    canvas.height = 842; // A4 height

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);

    const w = img.width * ratio;
    const h = img.height * ratio;

    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);

    canvas.toBlob((blob) => {
      if (blob) {
        setPdfUrl(URL.createObjectURL(blob));
      }
    }, "application/pdf");
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-xl border rounded-xl">
      <CardContent className="p-8 space-y-6">

        {/* Upload Section */}
        {!image && (
          <div className="border-2 border-dashed p-10 rounded-xl text-center hover:border-primary transition">
            <p className="text-lg font-semibold">Upload Image</p>
            <p className="text-sm text-muted-foreground mb-4">JPG, PNG • Max 50MB</p>

            <input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={handleFile}
            />
          </div>
        )}

        {/* Preview + Convert Section */}
        {image && (
          <div className="space-y-6">

            {/* Image Preview */}
            <div className="text-center space-y-4">
              <h3 className="font-bold text-lg">Preview – {image.name}</h3>
              <img
                src={previewUrl!}
                alt="Preview"
                className="max-h-96 mx-auto rounded-lg shadow"
              />
            </div>

            {/* Convert Button */}
            {!pdfUrl && (
              <Button onClick={generatePDF} className="w-full">
                Convert to PDF
              </Button>
            )}

            {/* Conversion Details + Download */}
            {pdfUrl && (
              <div className="bg-muted p-5 rounded-xl space-y-3">

                <h3 className="font-bold text-xl">Conversion Details</h3>

                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Output: A4 PDF</li>
                  <li>• Fully private — processed on your device</li>
                  <li>• No watermark — free forever</li>
                </ul>

                <div className="flex gap-4 mt-4">
                  <a
                    href={pdfUrl}
                    download="converted.pdf"
                    className="flex-1 text-center bg-primary text-white py-2 rounded-md"
                  >
                    Download PDF
                  </a>

                  <Button variant="outline" onClick={resetAll} className="flex-1">
                    Reset
                  </Button>
                </div>

              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
