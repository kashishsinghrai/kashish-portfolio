"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LuMenu, 
  LuX, 
  LuUser, 
  LuFolder, 
  LuFileText, 
  LuBook, 
  LuMail,
  LuHouse
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Add subtle shadow/border on scroll for desktop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/", icon: <LuHouse className="w-5 h-5" /> },
    { name: "About", path: "/about", icon: <LuUser className="w-5 h-5" /> },
    { name: "Projects", path: "/projects", icon: <LuFolder className="w-5 h-5" /> },
    { name: "Blog", path: "/blog", icon: <LuFileText className="w-5 h-5" /> },
    { name: "Notes", path: "/notes", icon: <LuBook className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* 
        ================================================================
        DESKTOP NAVBAR (Dynamic Island)
        Hidden on mobile (md:flex)
        ================================================================
      */}
      <div className="hidden md:flex fixed top-0 inset-x-0 z-50 justify-center pt-6 px-4 pointer-events-none">
        <header 
          className={`pointer-events-auto flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-300 ${
            scrolled 
              ? "bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-3xl" 
              : "bg-transparent border border-transparent w-full max-w-4xl"
          }`}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="font-bold text-black text-sm group-hover:scale-110 transition-transform">KS</span>
            </div>
            {!scrolled && (
              <span className="font-semibold text-white tracking-tight">
                Kashish Singh
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-white" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <a 
            href="mailto:kashishsingh124356@gmail.com"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          >
            Hire Me
          </a>
        </header>
      </div>

      {/* 
        ================================================================
        MOBILE FAB (Floating Action Button)
        Hidden on desktop (md:hidden)
        ================================================================
      */}
      
      {/* Background Dimming Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3 pointer-events-none">
        
        {/* Main Toggle FAB */}
        <motion.button
          onClick={toggleMenu}
          // Subtle pulse when closed to invite interaction
          animate={!isOpen ? { scale: [1, 1.05, 1], boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.4)", "0px 0px 0px rgba(255,255,255,0)"] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 relative"
          aria-label="Toggle Navigation"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          >
            {isOpen ? <LuX className="w-7 h-7" /> : <LuMenu className="w-7 h-7" />}
          </motion.div>
        </motion.button>

        {/* Expanding FAB Buttons (Full Pills for readability) */}
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col-reverse items-end gap-3 pointer-events-auto">
              
              {/* Contact Button */}
              <motion.a
                href="mailto:kashishsingh124356@gmail.com"
                initial={{ opacity: 0, y: 20, scale: 0.8, originX: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.05 }}
                className="flex items-center gap-3 bg-white text-black px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
                onClick={closeMenu}
              >
                <span className="text-sm font-bold tracking-wide">Contact</span>
                <LuMail className="w-5 h-5" />
              </motion.a>

              {/* Navigation Items */}
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20, scale: 0.8, originX: 1 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8, transition: { duration: 0.2 } }}
                    // Stagger delay for a highly satisfying spring pop-out effect
                    transition={{ type: "spring", bounce: 0.4, delay: (index + 2) * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-xl border backdrop-blur-md transition-all active:scale-95 ${
                        isActive 
                          ? "bg-zinc-800 border-zinc-600 text-white" 
                          : "bg-zinc-950/90 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      <span className="text-sm font-medium tracking-wide">
                        {item.name}
                      </span>
                      <div className={isActive ? "text-white" : "text-zinc-500"}>
                        {item.icon}
                      </div>
                    </Link>
                  </motion.div>
                );
              }).reverse()}
            </div>
          )}
        </AnimatePresence>
      </div>

    </>
  );
}
