"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

export default function BentoGrid() {
  return (
    <section id="innovation-lab" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Navojit <span className="text-accent-orange">Innovation Lab</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl text-lg">
            A showcase of the product-first startups and enterprise architecture
            systems engineered under the Navojit umbrella.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          
          {/* Large Box: Navojit Ecosystem */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-panel md:col-span-2 lg:col-span-2 row-span-2 p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent-orange/20 rounded-full blur-3xl group-hover:bg-accent-orange/30 transition-all duration-500" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2">Oraysen & Udyti</h3>
              <p className="text-foreground/70 mb-6 max-w-md">
                Hyperlocal marketplaces bridging digital logic and physical infrastructure. 
                Integrating UPI automation and zero-friction user onboarding.
              </p>
              <div className="flex gap-3 mt-auto">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/5">
                  React Native
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/5">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/5">
                  PostgreSQL
                </span>
              </div>
            </div>
          </motion.div>

          {/* Wide Box: navojit-auth */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-panel md:col-span-2 lg:col-span-2 p-8 flex flex-col justify-center group overflow-hidden relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent-blue/20 rounded-full blur-3xl group-hover:bg-accent-blue/30 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-accent-blue">Users (navojit-auth)</h3>
              <p className="text-foreground/70">
                Enterprise identity & access platform. A multi-tenant, zero-trust security architecture 
                built for high-performance applications.
              </p>
            </div>
          </motion.div>

          {/* Small Box: Live Stats / GitHub */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-panel p-6 flex flex-col items-center justify-center text-center group"
          >
            <FaGithub className="text-5xl mb-4 text-white/80 group-hover:text-white transition-colors" />
            <h4 className="font-bold text-lg">Open Source</h4>
            <p className="text-sm text-foreground/60">Architecting in public.</p>
          </motion.div>

          {/* Small Box: Tech Stack */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-panel p-6 flex flex-col items-center justify-center gap-4"
          >
            <div className="flex justify-center gap-4 text-2xl text-white/70">
              <SiNextdotjs className="hover:text-white transition-colors" />
              <FaReact className="hover:text-[#61dafb] transition-colors" />
              <SiTypescript className="hover:text-[#3178c6] transition-colors" />
            </div>
            <div className="flex justify-center gap-4 text-2xl text-white/70">
              <SiTailwindcss className="hover:text-[#38bdf8] transition-colors" />
              <FaNodeJs className="hover:text-[#339933] transition-colors" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
