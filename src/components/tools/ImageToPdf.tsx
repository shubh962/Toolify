"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG and PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Image too large. Max 50MB allowed.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      // 🟢 BEST FIX → Works for ALL IMAGES (Camera + Screenshot)
      const imgBytes = new Uint8Array(await (await fetch(image)).arrayBuffer());

      const pdfDoc = await PDFDocument.create();

      let imgEmbed;
      if (image.startsWith("data:image/png")) {
        imgEmbed = await pdfDoc.embedPng(imgBytes);
      } else {
        imgEmbed = await pdfDoc.embedJpg(imgBytes);
      }

      const page = pdfDoc.addPage([imgEmbed.width, imgEmbed.height]);
      page.drawImage(imgEmbed, {
        x: 0,
        y: 0,
        width: imgEmbed.width,
        height: imgEmbed.height,
      });

      const pdfBytes = await pdfDoc.save();
      const uri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while converting. Try a smaller image.");
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardContent>
        <h1 className="text-3xl font-bold mb-4 text-center">Image to PDF Converter</h1>

        <input type="file" accept="image/*" onChange={handleUpload} ref={fileInputRef} />

        {image && (
          <>
            <img src={image} className="rounded-md border mt-4" />

            <Button onClick={convertToPdf} disabled={loading} className="w-full mt-4">
              {loading ? "Converting..." : "Convert to PDF"}
            </Button>

            {pdfDataUri && (
              <a
                href={pdfDataUri}
                download={fileName.replace(/\.[^/.]+$/, "") + ".pdf"}
                className="block mt-3 text-center text-primary underline"
              >
                Download PDF
              </a>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
