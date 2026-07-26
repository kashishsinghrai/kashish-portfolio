"use client";

import React, { useState } from "react";
import Link from "next/link";
// -----------------------------------------------------------------------------
// SIDEBAR COMPONENT
// Translated to Tailwind CSS. Serves as the primary navigation drawer.
// -----------------------------------------------------------------------------

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ── Mobile Header Bar ── */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
          <span>💾</span> Kashish Singh
        </Link>
        <button
          className="text-2xl p-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* ── Sidebar Overlay ── */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" 
          onClick={closeMenu} 
        />
      )}

      {/* ── Sidebar / Navigation Drawer ── */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-background border-r border-white/10 p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header - Desktop only or top of mobile drawer */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-bold text-xl flex items-center gap-2" onClick={closeMenu}>
            <span>💾</span> Kashish Singh
          </Link>
          <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_theme(colors.accent-blue)]"></span>
            <span className="text-xs">☀️</span>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">About Me</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            I&apos;m{" "}
            <Link href="/about" className="text-accent-blue hover:underline" onClick={closeMenu}>
              Kashish
            </Link>
            , a software developer and architect.
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="mb-10 flex-1">
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Navigation</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/blog" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-foreground/80 hover:text-white transition-colors" onClick={closeMenu}>
                <span>📝</span> Blog
              </Link>
            </li>
            <li>
              <Link href="/notes" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-foreground/80 hover:text-white transition-colors" onClick={closeMenu}>
                <span>📓</span> Notes
              </Link>
            </li>
            <li>
              <Link href="/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-foreground/80 hover:text-white transition-colors" onClick={closeMenu}>
                <span>👾</span> Projects
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-foreground/80 hover:text-white transition-colors" onClick={closeMenu}>
                <span>💾</span> About Me
              </Link>
            </li>
          </ul>
        </nav>

        {/* Stay Connected Section */}
        <div>
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Stay Connected</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="mailto:kashishsingh124356@gmail.com" className="text-sm text-foreground/60 hover:text-accent-blue transition-colors px-3 py-1">
                Email signup
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/kashishsinghrai.bsky.social" target="_blank" rel="noreferrer" className="text-sm text-foreground/60 hover:text-accent-blue transition-colors px-3 py-1">
                Bluesky
              </a>
            </li>
            <li>
              <a href="/rss.xml" className="text-sm text-foreground/60 hover:text-accent-blue transition-colors px-3 py-1">
                RSS feed
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
