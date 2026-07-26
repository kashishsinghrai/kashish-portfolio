import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kashish Singh",
  alternateName: "kashishsinghrai",
  url: "https://kashishsinghrai.vercel.app",
  sameAs: [
    "https://github.com/kashishsinghrai",
    "https://linkedin.com/in/kashishsinghrai",
    "https://navojit.com",
  ],
  jobTitle: "Software Engineer & Founder",
  worksFor: { "@type": "Organization", name: "Navojit" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kashishsinghrai.vercel.app"),
  title: { default: "Kashish Singh | Software Architect", template: "%s | Kashish Singh" },
  description: "Founder of Navojit. Software Architect specializing in MERN stack, Next.js, and AI-driven systems.",
  alternates: { canonical: "https://kashishsinghrai.vercel.app" },
  openGraph: {
    title: "Kashish Singh | Software Architect",
    description: "Building Navojit and enterprise-grade digital ecosystems.",
    url: "https://kashishsinghrai.vercel.app",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-300 antialiased selection:bg-zinc-800 selection:text-white flex flex-col min-h-screen">
        
        <CustomCursor />

        {/* Very soft, faint radial glow for depth */}
        <div className="fixed inset-0 z-[-1] pointer-events-none flex justify-center overflow-hidden">
          <div className="absolute top-[-10%] w-[80vw] h-[50vh] rounded-full bg-white opacity-[0.02] blur-[100px]"></div>
        </div>

        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {children}
        </main>

      </body>
    </html>
  );
}
