"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { handleImageToPdf } from "@/app/actions";

export default function ImageToPdf() {
  const [image, setImage] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 📌 Handle image upload
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 📌 Convert image to PDF (server action)
  const convertToPdf = async () => {
    if (!image) return;

    setLoading(true);
    const result = await handleImageToPdf(image);
    setLoading(false);

    if (result.success) {
      setPdfDataUri(result.pdfDataUri);
    } else {
      alert("Conversion failed. Try again.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardContent>
        <h1 className="text-3xl font-bold mb-4 text-center">Image to PDF Converter</h1>
        <p className="text-muted-foreground text-center mb-6">
          Upload a JPG or PNG image and convert it into a high-quality PDF instantly.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="mb-4"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="rounded-md border mb-4 w-full"
          />
        )}

        <Button
          onClick={convertToPdf}
          disabled={!image || loading}
          className="w-full"
        >
          {loading ? "Converting..." : "Convert to PDF"}
        </Button>

        {pdfDataUri && (
          <a
            href={pdfDataUri}
            download="converted.pdf"
            className="block mt-4 text-center text-primary underline font-medium"
          >
            Download PDF
          </a>
        )}
      </CardContent>
    </Card>
  );
}
