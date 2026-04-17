"use client";

import { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function ESignPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);

  const [mode, setMode] = useState<"draw" | "stamp">("draw");
  const [stampText, setStampText] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Init canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 500 * 2;
    canvas.height = 200 * 2;
    canvas.style.width = "100%";
    canvas.style.height = "200px";

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      contextRef.current = ctx;
    }
  }, []);

  // Cleanup blob URL
  useEffect(() => {
    return () => {
      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    };
  }, [unlockedUrl]);

  // ===== DRAW (Mouse + Touch) =====
  const getXY = (e: any) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const startDrawing = (e: any) => {
    const { x, y } = getXY(e);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const { x, y } = getXY(e);
    contextRef.current?.lineTo(x, y);
    contextRef.current?.stroke();
  };

  const endDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);

    if (canvasRef.current) {
      setSignature(canvasRef.current.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    contextRef.current?.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  // ===== SIGN PDF =====
  const handleSignPdf = async () => {
    if (!file || !isOwner) return;

    if (mode === "draw" && !signature) {
      alert("Please draw your signature");
      return;
    }

    if (mode === "stamp" && !stampText.trim()) {
      alert("Enter stamp text");
      return;
    }

    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const page = pages[pages.length - 1]; // last page

      if (mode === "draw") {
        const image = await pdfDoc.embedPng(signature!);
        const dims = image.scale(0.3);

        page.drawImage(image, {
          x: page.getWidth() - dims.width - 50,
          y: 80,
          width: dims.width,
          height: dims.height,
        });
      }

      if (mode === "stamp") {
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        page.drawText(stampText, {
          x: 50,
          y: 80,
          size: 24,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      setUnlockedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Error signing PDF");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setSignature(null);
    setUnlockedUrl(null);
    setStampText("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {!file && (
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      )}

      {file && !unlockedUrl && (
        <>
          <p>{file.name}</p>

          {/* Mode Switch */}
          <div className="flex gap-4">
            <button onClick={() => setMode("draw")}>Draw</button>
            <button onClick={() => setMode("stamp")}>Stamp</button>
          </div>

          {/* DRAW MODE */}
          {mode === "draw" && (
            <>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={endDrawing}
                className="border w-full h-[200px]"
              />
              <button onClick={clearCanvas}>Clear</button>
            </>
          )}

          {/* STAMP MODE */}
          {mode === "stamp" && (
            <input
              type="text"
              placeholder="Enter name / stamp"
              value={stampText}
              onChange={(e) => setStampText(e.target.value)}
              className="border p-2 w-full"
            />
          )}

          {/* OWNER */}
          <label>
            <input
              type="checkbox"
              checked={isOwner}
              onChange={(e) => setIsOwner(e.target.checked)}
            />
            I am authorized
          </label>

          <button onClick={handleSignPdf} disabled={loading}>
            {loading ? "Signing..." : "Sign PDF"}
          </button>

          <button onClick={reset}>Reset</button>
        </>
      )}

      {unlockedUrl && (
        <a href={unlockedUrl} download="signed.pdf">
          Download Signed PDF
        </a>
      )}
    </div>
  );
}
