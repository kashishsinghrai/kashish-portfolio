import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Sirf Inter rakhein
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ── SEO AUTHORITY DATA (Sab kuch safe hai) ──
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kashish Singh",
  otherName: "kashish singh rai",
  alternateName: "kashishsinghrai",
  url: "https://kashishsinghrai.vercel.app",
  image: "https://kashishsinghrai.vercel.app/hero-avatar.png",
  sameAs: [
    "https://github.com/kashishsinghrai",
    "https://linkedin.com/in/kashishsinghrai",
    "https://twitter.com/kashishsinghrai",
    "https://kashishsinghrai.blogspot.com",
    "https://bsky.app/profile/kashishsinghrai.bsky.social",
    "https://navojit.com",
  ],
  jobTitle: "Software Engineer & Founder",
  worksFor: {
    "@type": "Organization",
    name: "Navojit",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Rai University" },
    {
      "@type": "CollegeOrUniversity",
      name: "Prof. Rajendra Singh (Rajju Bhaiya) University, Prayagraj",
    },
  ],
  description:
    "Kashish Singh is a Software Developer and the founder of Navojit, specializing in MERN stack, AI innovations, and scalable backend systems.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kashishsinghrai.vercel.app"),
  title: {
    default: "Kashish Singh | Software Developer & Founder of Navojit",
    template: "%s | Kashish Singh",
  },
  description:
    "Official portfolio of Kashish Singh. Founder of Navojit, specializing in MERN stack, Next.js architecture, and AI-driven solutions. Student at Rai University.",

  keywords: [
    "Kashish Singh",
    "Kashish",
    "kashishsinghrai",
    " kashish singh rai",
    "kashish singh raipur",
    "kashish singh uttar pradesh",
    "Kashish Singh Navojit",
    "Software Developer uttar pradesh",
    "Backend Engineer India",
    "GradLink project",
  ],

  verification: {
    google: "jXH32nZsr6-iXwgG9OoNQSU5cwCF2pBditdiL7BKXSA",
  },

  alternates: {
    canonical: "https://kashishsinghrai.vercel.app",
  },

  other: {
    "google-adsense-account": "ca-pub-5483559036529536",
  },

  openGraph: {
    title: "Kashish Singh | Software Developer & Architect",
    description:
      "Kashish Singh's digital garden. Building Navojit and scalable AI systems.",
    url: "https://kashishsinghrai.vercel.app",
    siteName: "Kashish Singh",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kashish Singh Portfolio Banner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kashish Singh (@kashishsinghrai)",
    creator: "@kashishsinghrai",
    // ✅ ADDED THIS: Twitter/X preview ke liye
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* font-georgia ki zaroorat nahi kyunki globals.css mein body par pehle se apply hai */}
      <body className="antialiased">
        <div className="layoutWrapper">
          <Sidebar />
          <main className="mainContent">{children}</main>
        </div>
      </body>
    </html>
  );
}
