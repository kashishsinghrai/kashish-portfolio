"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Students Mentored", value: "500+" },
  { label: "Hours of Coding", value: "1000+" },
  { label: "Years Teaching", value: "3+" },
  { label: "Projects Built", value: "10+" },
];

export default function Stats() {
  return (
    <section className="py-16 border-y border-zinc-900 bg-zinc-950/50">
      <div className="grid max-w-5xl grid-cols-2 gap-8 px-6 mx-auto md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-2 text-4xl font-bold text-white"
            >
              {stat.value}
            </motion.h4>
            <p className="text-sm tracking-widest uppercase text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
