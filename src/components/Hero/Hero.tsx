import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* Left Side: Text and Actions */}
        <div className={styles.textSection}>
          {/* ✅ Primary Keyword: Kashish Singh in H1 */}
          <h1 className={styles.title}>
            Hey, I&apos;m{" "}
            <span className={styles.nameGradient}>Kashish Singh</span>!
          </h1>

          <p className={styles.subtitle}>
            I am a <span className={styles.highlight}>Software Developer</span>{" "}
            and startup founder at <strong>Navojit</strong>.
            {/* ✅ Secondary Keyword: "Kashish" naturally included for indexing */}
            People often call me{" "}
            <span className={styles.highlight}>Kashish</span>. I build scalable
            systems and conscious digital ecosystems using Next.js and AI logic.
          </p>

          <div className={styles.buttonGroup}>
            <Link
              href="/about"
              className={styles.btn}
              title="Learn more about Kashish Singh"
            >
              <span className={styles.btnIcon} aria-hidden="true">
                💾
              </span>
              About Me
            </Link>

            <a
              href="mailto:kashishsingh124356@gmail.com"
              className={styles.btn}
              title="Contact Kashish Singh via Email"
            >
              <span className={styles.btnIcon} aria-hidden="true">
                📧
              </span>
              Email Newsletter
            </a>
          </div>
        </div>

        {/* Right Side: Visual Image */}
        <div className={styles.imageWrapper}>
          <Image
            src="/hero-avatar.png"
            /* ✅ Image SEO: Full name and role in alt text */
            alt="Kashish Singh - Software Developer and Founder of Navojit"
            width={300}
            height={300}
            priority
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
}
