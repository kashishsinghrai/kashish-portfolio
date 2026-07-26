export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { prisma } from "@/lib/db";

// ✅ SEO: Page specific metadata
export const metadata: Metadata = {
  title: "About Kashish Singh | Software Developer & Founder of Navojit",
  description:
    "Learn about Kashish Singh, a Software Developer and the founder of Navojit. Explore my professional journey, technical stack, and contributions to the digital ecosystem.",
  openGraph: {
    title: "About Kashish Singh | Founder of Navojit",
    description: "Software Developer, Mentor, and Tech Innovator.",
    images: ["/me.jpg"],
  },
};

// Static Data for tech stack not modeled in DB
const current = ["Scaling Navojit Auth Engine", "Pursuing B.Tech CSE at Rai University"];
const software = [{ category: "Backend", name: "Next.js, Node.js, Fastify" }];
const hardware = [{ name: "Workstation", detail: "Custom Built Windows Machine" }];

// -----------------------------------------------------------------------------
// ABOUT PAGE (Server Component)
// -----------------------------------------------------------------------------
export default async function AboutPage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="container mx-auto px-6 lg:px-12 py-24 max-w-5xl">
      {/* ── Bio Section with Side Image ── */}
      <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-3">
            <span className="text-3xl bg-white/5 p-2 rounded-lg">💾</span> About Kashish Singh
          </h1>
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed font-sans whitespace-pre-wrap">
            {profile?.bio ? profile.bio : "I am Kashish Singh, a software developer, architect, and the founder of Navojit Technologies. I specialize in building high-performance digital ecosystems.\n\nBridging the gap between mathematical logic and enterprise-grade software."}
          </div>
        </div>
        <div className="w-full md:w-72 shrink-0">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-glass aspect-[3/4]">
            <Image
              src={profile?.avatarUrl || "/me.jpg"}
              alt="Kashish Singh - Software Developer and Founder of Navojit"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── Contact & Professional Links ── */}
      <div className="mb-16 glass-panel p-8">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-3">Contact & Professional Links</h2>
        <ul className="space-y-4 text-foreground/80">
          <li className="flex items-center gap-3">
            <strong className="text-white w-24">Email:</strong>{" "}
            <a href="mailto:kashishsingh124356@gmail.com" className="hover:text-accent-blue transition-colors">
              kashishsingh124356@gmail.com
            </a>
          </li>
          {profile?.resumeUrl && (
            <li className="flex items-center gap-3">
              <strong className="text-white w-24">Resume:</strong>{" "}
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">
                View / Download my CV (PDF)
              </a>
            </li>
          )}
          {profile?.githubUrl && (
            <li className="flex items-center gap-3">
              <strong className="text-white w-24">GitHub:</strong>{" "}
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">
                @kashishsinghrai
              </a>
            </li>
          )}
          {profile?.linkedinUrl && (
            <li className="flex items-center gap-3">
              <strong className="text-white w-24">LinkedIn:</strong>{" "}
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">
                Connect with me
              </a>
            </li>
          )}
          {profile?.twitterUrl && (
            <li className="flex items-center gap-3">
              <strong className="text-white w-24">Twitter / X:</strong>{" "}
              <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">
                Follow me
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* ── What I'm Doing Now ── */}
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-2 text-white">Current Focus</h2>
          <p className="text-xs text-foreground/50 uppercase tracking-widest mb-6">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            {current.map((item, index) => (
              <li key={`current-${index}`}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ── Tools & Gear ── */}
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Technical Stack & Gear</h2>
          
          <h3 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-3">Software Ecosystem</h3>
          <ul className="space-y-2 text-foreground/80 mb-6">
            {software.map((item, index) => (
              <li key={`software-${index}`}>
                <strong className="text-white">{item.category}:</strong> {item.name}
              </li>
            ))}
          </ul>
          
          <h3 className="text-sm font-bold text-accent-orange uppercase tracking-widest mb-3">Hardware Setup</h3>
          <ul className="space-y-2 text-foreground/80">
            {hardware.map((item, index) => (
              <li key={`hardware-${index}`}>
                <strong className="text-white">{item.name}:</strong> {item.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
