import React from "react";
import { Metadata } from "next";
import styles from "./page.module.css";
import { ALL_PROJECTS } from "@/data/user";

// ✅ SEO: Page specific metadata
export const metadata: Metadata = {
  title: "Projects | Kashish Singh - Software Developer & Founder",
  description:
    "Explore a collection of open-source projects by Kashish Singh, founder of Navojit. Featuring scalable MERN stack apps, AI integrations, and backend architectures.",
  keywords: [
    "Kashish Singh Projects",
    "Navojit Startups",
    "Oraysen",
    "GradLink",
    "MERN Stack Portfolio",
    "Kashish Software Developer",
  ],
  openGraph: {
    title: "Technical Projects by Kashish Singh",
    description:
      "Architecting scalable systems and conscious digital ecosystems.",
    url: "https://kashishsinghrai.vercel.app/projects",
    images: ["/og-image.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* ✅ SEO: Descriptive H1 */}
        <h1 className={styles.pageTitle}>
          <span>👾</span> Projects by Kashish Singh
        </h1>
        <p className={styles.subtitle}>
          A collection of open-source projects I&apos;ve built, ranging from
          scalable backend architectures and AI integrations to web applications
          for <strong>Navojit</strong>.
        </p>
      </header>

      <section className={styles.grid}>
        {ALL_PROJECTS.map((project, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.year}>{project.year}</span>
              <span className={styles.stars} title={`${project.stars} status`}>
                {project.stars} <span className={styles.starIcon}>⭐</span>
              </span>
            </div>

            <a
              href={
                project.links.find(
                  (l) => l.name === "Source" || l.name === "Demo",
                )?.url || "#"
              }
              className={styles.projectTitle}
              title={`View ${project.title}`}
            >
              {project.title}
            </a>

            <p className={styles.desc}>{project.description}</p>

            <div className={styles.buttonGroup}>
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className={styles.linkBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${link.name} for ${project.title}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
