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

export const metadata: Metadata = {
  title: {
    default: "Kashish Singh | Backend Developer & AI Enthusiast",
    template: "%s | Kashish Singh",
  },
  description:
    "Official portfolio of Kashish Singh - B.Tech CSE Student at Rai University. Specialized in MERN Stack, Scalable Backend Systems, and AI Innovations.",
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
    url: "https://kashishsinghrai.vercel.app", // Replace with your actual URL once deployed
    siteName: "Kashish Singh Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Ensure this file exists in your /public folder (1200x630px)
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
        {children}
      </body>
    </html>
  );
}
