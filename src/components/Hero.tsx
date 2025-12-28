"use client";
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";

export default function Hero() {
  return (
    <section className="flex flex-col items-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-3 py-1 mb-6 text-xs font-medium border rounded-full border-accent/30 bg-accent/10 text-accent"
      >
        Available for Freelance & Roles
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-5xl font-bold tracking-tighter text-transparent md:text-7xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text"
      >
        Building the Logic <br /> Behind the Screen.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-[600px] text-muted text-lg md:text-xl leading-relaxed"
      >
        I&apos;m <span className="font-medium text-white">Kashish</span>, a
        Backend Developer and educator. I specialize in building robust APIs,
        managing databases, and mentoring 500+ students.
      </motion.p>
    </section>
  );
}
