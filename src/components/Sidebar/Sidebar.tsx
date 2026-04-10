"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ── Mobile Header Bar ── */}
      <header className={styles.mobileHeader}>
        <Link href="/" className={styles.logo}>
          <span className={styles.navIcon}>💾</span> Kashish Singh
        </Link>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* ── Sidebar Overlay ── */}
      {isOpen && <div className={styles.overlay} onClick={closeMenu} />}

      {/* ── Sidebar / Navigation Drawer ── */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Header - Desktop only or top of mobile drawer */}
        <div className={styles.header}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.navIcon}>💾</span> Kashish Singh
          </Link>
          <div className={styles.themeToggles}>
            <span className={styles.themeDot}></span>
            <span className={styles.sunIcon}>☀️</span>
          </div>
        </div>

        {/* About Me Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>About Me</h3>
          <p className={styles.bio}>
            I&apos;m{" "}
            <Link href="/about" className={styles.bioLink} onClick={closeMenu}>
              Kashish
            </Link>
            , a software developer and architect.
          </p>
        </div>

        {/* Navigation Section */}
        <nav className={styles.section}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/blog" className={styles.navItem} onClick={closeMenu}>
                <span className={styles.navIcon}>📝</span> Blog
              </Link>
            </li>
            <li>
              <Link
                href="/notes"
                className={styles.navItem}
                onClick={closeMenu}
              >
                <span className={styles.navIcon}>📓</span> Notes
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={styles.navItem}
                onClick={closeMenu}
              >
                <span className={styles.navIcon}>👾</span> Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={styles.navItem}
                onClick={closeMenu}
              >
                <span className={styles.navIcon}>💾</span> About Me
              </Link>
            </li>
          </ul>
        </nav>

        {/* Stay Connected Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Stay Connected</h3>
          <ul className={styles.navLinks}>
            <li>
              <a
                href="mailto:kashishsingh124356@gmail.com"
                className={styles.navItem}
              >
                Email signup
              </a>
            </li>
            <li>
              <a
                href="https://bsky.app"
                target="_blank"
                rel="noreferrer"
                className={styles.navItem}
              >
                Bluesky
              </a>
            </li>
            <li>
              <a href="/rss.xml" className={styles.navItem}>
                RSS feed
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
