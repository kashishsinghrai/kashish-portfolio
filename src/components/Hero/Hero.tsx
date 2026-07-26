"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full flex flex-col items-center text-center py-20 md:py-32">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center w-full max-w-4xl"
      >
        {/* Avatar Image */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-zinc-800 shadow-xl relative overflow-hidden mx-auto">
            <Image 
              src="/me.jpg" 
              alt="Kashish Singh" 
              fill 
              sizes="(max-width: 768px) 112px, 144px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight"
        >
          Kashish Singh
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mt-4 font-medium leading-relaxed"
        >
          Architecting Navojit. Engineering Digital Ecosystems.
        </motion.p>

        {/* Call to Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Explore Projects
          </Link>
          
          <Link 
            href="https://github.com/kashishsinghrai" 
            target="_blank"
            className="w-full sm:w-auto border border-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
          >
            View GitHub
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
