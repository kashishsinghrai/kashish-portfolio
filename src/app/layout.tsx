import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// JSON-LD Schema Object for SEO Authority
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kashish Singh",
  url: "https://kashishsinghrai.vercel.app",
  sameAs: [
    "https://github.com/kashishsinghrai",
    "https://linkedin.com/in/kashishsinghrai",
    "https://twitter.com/kashishsinghrai",
    "https://kashishsinghrai.blogspot.com",
    "https://instagram.com/kashishsinghrai",
    "https://medium.com/@kashishsinghrai",
    "https://www.facebook.com/kashishsinghraii",
    "https://bsky.app/profile/kashishsinghrai.bsky.social",
  ],
  jobTitle: "Software Engineer",
  alumniOf: "Rai University",
  description:
    "Backend Developer specializing in MERN stack and AI innovations.",
};

export const metadata: Metadata = {
  title: {
    default: "Kashish Singh | Backend Developer & AI Enthusiast",
    template: "%s | Kashish Singh",
  },
  description:
    "Official portfolio of Kashish Singh - B.Tech CSE Student at Rai University. Specialized in MERN Stack, Scalable Backend Systems, and AI Innovations.",

  verification: {
    google: "jXH32nZsr6-iXwgG9OoNQSU5cwCF2pBditdiL7BKXSA",
  },

  keywords: [
    "Kashish Singh",
    "kashishsinghrai",
    "Kashish Singh Rai University",
    "Backend Developer India",
    "MERN Stack Developer",
    "Software Engineer Ahmedabad",
    "GradLink Project",
    "AI Enthusiast Portfolio",
  ],
  authors: [{ name: "Kashish Singh" }],
  creator: "Kashish Singh",
  openGraph: {
    title: "Kashish Singh | Backend Developer & AI Enthusiast",
    description:
      "Building scalable backend systems and community-driven tech solutions like GradLink.",
    url: "https://kashishsinghrai.vercel.app",
    siteName: "Kashish Singh Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kashish Singh Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashish Singh | Backend Developer",
    description: "B.Tech CSE Student at Rai University & AI Enthusiast",
    creator: "@kashishsinghrai",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#030303] text-zinc-400`}
      >
        {/* JSON-LD Structured Data for Google Authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
