"use client";
import { DATA } from "@/lib/data";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="max-w-3xl px-6 py-20 mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="pl-4 mb-12 text-2xl font-bold tracking-tighter text-white border-l-4 border-blue-500"
      >
        Professional Journey
      </motion.h2>

      <div className="space-y-12">
        {DATA.experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l border-zinc-800 group"
          >
            {/* Dot Animation - Glow effect on hover */}
            <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-blue-500 group-hover:ring-4 group-hover:ring-blue-500/20 transition-all duration-300" />

            <div className="flex flex-col justify-between gap-1 mb-2 sm:flex-row sm:items-center">
              <h3 className="text-lg font-bold transition-colors text-zinc-100 group-hover:text-blue-400">
                {exp.company}
              </h3>
              <span className="px-2 py-1 font-mono text-xs border rounded text-zinc-500 bg-zinc-900 border-zinc-800">
                {exp.start} — {exp.end}
              </span>
            </div>

            <p className="mb-3 text-sm font-medium tracking-widest uppercase text-blue-500/80">
              {exp.role}
            </p>

            <p className="text-sm font-light leading-relaxed text-zinc-400">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
