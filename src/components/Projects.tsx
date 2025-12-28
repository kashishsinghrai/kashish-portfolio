"use client";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="portfolio" className="max-w-5xl px-6 py-24 mx-auto">
      <h2 className="mb-12 text-3xl font-bold tracking-tighter">
        Featured Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="relative p-6 overflow-hidden border group rounded-2xl border-zinc-800 bg-zinc-900/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Github size={20} />
              </div>
              <ExternalLink
                size={18}
                className="transition text-muted group-hover:text-white"
              />
            </div>
            <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-zinc-800 text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
