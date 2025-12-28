"use client";
import {
  DATA,
  PROJECTS,
  SERVICES,
  TESTIMONIALS,
  PUBLICATIONS,
} from "@/lib/data";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  ExternalLink,
  Github,
  Star,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-500 selection:bg-blue-500/20 selection:text-blue-200 antialiased font-sans">
      {/* 1. Subtle Background: Dot Grid & Top Glow */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:40px_40px] opacity-30"></div>
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />

      <div className="max-w-[1100px] px-8 mx-auto">
        {/* 2. HERO SECTION */}
        <section className="pt-48 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-blue-500 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-blue-600 rounded-full"></span>
            </span>
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">
              Architecting Systems & Stories
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-6xl font-bold tracking-tight text-white md:text-8xl"
          >
            Kashish{" "}
            <span className="italic font-medium text-zinc-800">Singh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mb-12 text-lg font-light leading-relaxed md:text-xl text-zinc-400"
          >
            {DATA.description}
          </motion.p>

          <div className="flex items-center gap-8">
            <a
              href="mailto:kashishsingh124356@gmail.com"
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-white uppercase transition-all group"
            >
              Start Conversation{" "}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <div className="h-[1px] w-12 bg-zinc-800" />
            <a
              href="#portfolio"
              className="text-xs font-bold tracking-widest uppercase transition-colors text-zinc-600 hover:text-blue-500"
            >
              View Projects
            </a>
          </div>
        </section>

        {/* 3. CAPABILITIES */}
        <section className="grid grid-cols-1 gap-16 py-24 border-t border-zinc-900 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div key={i} className="flex flex-col">
              <service.icon className="w-5 h-5 mb-5 text-blue-500/80" />
              <h3 className="mb-3 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-100">
                {service.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-zinc-500">
                {service.desc}
              </p>
            </div>
          ))}
        </section>

        {/* 4. PUBLICATIONS & WRITING (Creative X-Factor) */}
        <section className="py-24 border-t border-zinc-900">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-700">
              Publications
            </h2>
            <BookOpen size={16} className="text-zinc-800" />
          </div>
          <div className="max-w-4xl space-y-12">
            {PUBLICATIONS.map((book, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="grid items-start gap-4 pb-8 border-b group md:grid-cols-4 border-zinc-900/50 last:border-0"
              >
                <p className="text-[10px] font-mono text-zinc-800 uppercase pt-1">
                  {book.date}
                </p>
                <div className="md:col-span-3">
                  <a
                    href={book.url}
                    target="_blank"
                    className="flex items-center gap-2 text-lg font-bold text-white transition-colors group-hover:text-blue-500"
                  >
                    {book.title}{" "}
                    <ArrowUpRight
                      size={14}
                      className="transition-opacity opacity-0 group-hover:opacity-100"
                    />
                  </a>
                  <p className="text-zinc-600 text-[10px] mt-1 mb-4 uppercase tracking-widest font-mono">
                    {book.publisher}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-zinc-500">
                    {book.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. PROJECTS (The Archive) */}
        <section id="portfolio" className="py-24 border-t border-zinc-900">
          <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-700 mb-16">
            Selected Work
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="group relative bg-[#080808] border border-zinc-900/50 p-10 rounded-2xl hover:border-zinc-800 transition-all flex flex-col justify-between min-h-[350px]"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[9px] font-mono text-blue-500/70 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {p.status}
                    </span>
                    <a
                      href={p.link}
                      target="_blank"
                      className="transition-colors text-zinc-700 hover:text-white"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="max-w-sm mb-8 text-sm font-light leading-relaxed text-zinc-500">
                    {p.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono uppercase text-zinc-700 tracking-tighter"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. PROFESSIONAL & ACADEMIC (Timeline) */}
        <section className="grid gap-24 py-32 border-t border-zinc-900 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <Briefcase size={14} className="text-zinc-700" />
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-700">
                Experience
              </p>
            </div>
            <div className="space-y-16">
              {DATA.experience.map((exp, i) => (
                <div key={i} className="group">
                  <p className="text-[10px] font-mono text-zinc-800 mb-2 uppercase tracking-widest">
                    {exp.start} — {exp.end}
                  </p>
                  <h3 className="mb-1 text-lg font-bold tracking-tight text-white">
                    {exp.company}
                  </h3>
                  <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-4">
                    {exp.role}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-zinc-600">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-12">
              <GraduationCap size={16} className="text-zinc-700" />
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-700">
                Education
              </p>
            </div>
            <div className="space-y-16">
              {DATA.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-[10px] font-mono text-zinc-800 mb-2 uppercase tracking-widest">
                    {edu.period}
                  </p>
                  <h3 className="mb-1 text-lg font-bold tracking-tight text-white">
                    {edu.school}
                  </h3>
                  <p className="text-sm font-light text-zinc-500">
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SIGNATURE CTA & SOCIALS */}
        <section
          id="contact"
          className="py-40 text-center border-t border-zinc-900"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16 text-4xl font-bold tracking-tighter text-white md:text-6xl"
          >
            kashishsinghrai<span className="text-blue-600">.</span>
          </motion.h2>

          <div className="grid max-w-3xl grid-cols-2 gap-8 pt-16 mx-auto border-t md:grid-cols-6 border-zinc-900">
            {DATA.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                className="flex flex-col items-center gap-3 transition-opacity group opacity-40 hover:opacity-100"
              >
                <s.icon className="w-4 h-4 text-white" />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                  {s.name}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <footer className="py-12 border-t border-zinc-900/50 text-center text-[8px] font-mono uppercase tracking-[0.6em] text-zinc-800">
        Handcrafted by Kashish Singh • Ahmedabad • Raipur • 2025
      </footer>
    </main>
  );
}
