"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuGraduationCap, LuRocket, LuBookOpen } from "react-icons/lu";

const timelineData = [
  {
    year: "2024 - 2028",
    title: "B.Tech CSE @ Rai University",
    description: "Deep dive into high-performance computing, advanced algorithms, and system architecture. Bridging academic rigor with practical engineering.",
    icon: <LuGraduationCap className="text-xl" />,
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/30"
  },
  {
    year: "2025",
    title: "Founded Navojit Technologies",
    description: "Established an innovation lab focused on engineering digital ecosystems. Launched Oraysen and architectural auth engines.",
    icon: <LuRocket className="text-xl" />,
    color: "text-accent-orange",
    bg: "bg-accent-orange/10",
    border: "border-accent-orange/30"
  },
  {
    year: "2021 - 2024",
    title: "BSc Mathematics & ADCA",
    description: "Mastered mathematical logic at PRSU. Mentored 500+ students. Acquired ADCA certification as the foundational pillar for computer applications.",
    icon: <LuBookOpen className="text-xl" />,
    color: "text-accent-purple",
    bg: "bg-accent-purple/10",
    border: "border-accent-purple/30"
  }
];

export default function DualTimeline() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Journey</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            From academic foundations in mathematical logic to architecting enterprise-grade digital ecosystems.
          </p>
        </div>

        <div className="relative">
          {/* Glowing Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Panel */}
                <div className={`flex-1 w-full md:w-1/2 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="glass-panel p-6 inline-block w-full hover:bg-white/5 transition-colors">
                    <span className={`text-sm font-bold tracking-widest ${item.color} mb-2 block`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border ${item.bg} ${item.border} ${item.color} shadow-[0_0_20px_rgba(0,0,0,0.2)] z-10`}>
                    {item.icon}
                  </div>
                </div>
                
                {/* Empty Space for layout balancing */}
                <div className="hidden md:block flex-1 w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
