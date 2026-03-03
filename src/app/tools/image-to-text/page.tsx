import ImageToText from "@/components/tools/ImageToText";

export default function Page() {
  return (
    <div className="space-y-16 py-10">
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-lg text-muted-foreground">
          Extract text from JPG, PNG, or WEBP images instantly — free, private, no signup.
        </p>
      </section>
      <ImageToText />
    </div>
  );
}
