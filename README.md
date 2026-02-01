# Toolify (TaskGuru)

![TaskGuru Banner](public/logo.png)

**The Institutional-Grade AI Toolkit & Tech Publication.**
Toolify (rebranded as TaskGuru) is a Next.js platform that combines high-performance developer utilities with deep-dive technical research. It is designed for speed, privacy, and algorithmic authority.

🔗 **Live URL:** [https://taskguru.online](https://taskguru.online)

---

## 🚀 Key Features

### 🛠️ The Toolkit (100% Client-Side)
Privacy-first architecture. Files are processed locally in the browser via WebAssembly (Wasm) and never uploaded to a server.
* **AI Background Remover:** Neural network-based subject extraction.
* **PDF Engine:** Split, Merge, and Convert PDFs using `pdf-lib`.
* **YouTube Thumbnail Downloader:** Extract 4K/HD assets from YouTube (No API Key required).
* **Image Compression:** Lossy/Lossless compression for JPG/PNG/WebP.
* **Resume Builder:** Real-time ATS-friendly resume generation.
* **OCR System:** Extract text from images using Tesseract.js.

### 📚 The Research Hub (Blog)
A fully optimized Markdown-based CMS for publishing high-authority technical guides.
* **SEO Optimized:** JSON-LD Schema, Semantic HTML, and Dynamic Metadata.
* **Performance:** Static Generation (SSG) for sub-second load times.
* **AdSense Ready:** Structured content designed for high RPM and programmatic approval.

---

## 🏗️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn/UI
* **Animation:** Lucide React + CSS Transitions
* **Deployment:** Vercel Edge Network
* **Analytics:** Google Analytics 4 (GA4)

---

## ⚡ Getting Started

### Prerequisites
* Node.js 18+
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/shubh962/Toolify.git](https://github.com/shubh962/Toolify.git)
    cd Toolify
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open locally**
    Visit `http://localhost:3000` to see the app.

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── blog/          # Markdown-based blog system
│   ├── tools/         # Individual tool pages (Client-side logic)
│   ├── layout.tsx     # Global layout (SEO, Header, Footer)
│   └── page.tsx       # Homepage (Pivoted to "Guide-First" design)
├── components/
│   ├── ui/            # Shadcn UI components
│   ├── Header.tsx     # Responsive Navigation (Mobile/Desktop)
│   └── Footer.tsx     # Legal & Social links
├── config/
│   └── tools.ts       # Centralized configuration for all tools
└── lib/               # Utility functions (CN, Date formatters)
