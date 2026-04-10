import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import styles from "./page.module.css";
import { USER_DATA } from "@/data/user";

// ✅ SEO: Page specific metadata
export const metadata: Metadata = {
  title: "About Kashish Singh | Software Developer & Founder of Navojit",
  description:
    "Learn about Kashish Singh, a Software Developer and the founder of Navojit. Explore my professional journey, technical stack, and contributions to the digital ecosystem.",
  openGraph: {
    title: "About Kashish Singh | Founder of Navojit",
    description: "Software Developer, Mentor, and Tech Innovator.",
    images: ["/me.jpg"],
  },
};

export default function AboutPage() {
  const { about } = USER_DATA;

  return (
    <div className={styles.container}>
      {/* ── Bio Section with Side Image ── */}
      <div className={styles.header}>
        <h1>
          <span>💾</span> About Kashish Singh
        </h1>
        <div className={styles.introSection}>
          <div className={styles.introText}>
            {about.bio.map((paragraph, index) => (
              <p key={`bio-${index}`} className={styles.bioParagraph}>
                {/* SEO Tip: Highlight keywords inside bio */}
                {index === 0 ? (
                  <>
                    I am <strong>Kashish Singh</strong>, {paragraph.slice(17)}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/me.jpg"
              /* ✅ SEO: Descriptive ALT text */
              alt="Kashish Singh - Software Developer and Founder of Navojit"
              width={280}
              height={380}
              className={styles.profileImage}
              priority
            />
          </div>
        </div>
      </div>

      {/* ── Contact & Resume ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact & Professional Links</h2>
        <ul className={styles.list}>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:kashishsingh124356@gmail.com"
              className={styles.contactLink}
              title="Send an email to Kashish Singh"
            >
              kashishsingh124356@gmail.com
            </a>
          </li>
          <li>
            <strong>Resume:</strong>{" "}
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
              title="Download Kashish Singh's CV"
            >
              View / Download my CV (PDF)
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/kashishsinghrai"
              className={styles.contactLink}
              title="Kashish Singh on GitHub"
            >
              @kashishsinghrai
            </a>
          </li>
        </ul>
      </div>

      {/* ── What I'm Doing Now ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Current Focus</h2>
        <p className={styles.updateDate}>
          Last Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <ul className={styles.list}>
          {about.current.map((item, index) => (
            <li key={`current-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ── Tools & Gear ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Technical Stack & Gear</h2>
        <h3 className={styles.subHeading}>Software Ecosystem</h3>
        <ul className={styles.list}>
          {about.software.map((item, index) => (
            <li key={`software-${index}`}>
              <strong>{item.category}:</strong> {item.name}
            </li>
          ))}
        </ul>
        <h3 className={styles.subHeading}>Hardware Setup</h3>
        <ul className={styles.list}>
          {about.hardware.map((item, index) => (
            <li key={`hardware-${index}`}>
              <strong>{item.name}:</strong> {item.detail}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Navojit Publications ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Author & Publications</h2>
        <ul className={styles.list}>
          {about.publications.map((pub, index) => (
            <li key={index}>
              <a
                href={pub.url}
                className={styles.contactLink}
                target="_blank"
                rel="noopener"
              >
                {pub.title}
              </a>{" "}
              — {pub.platform}, {pub.year}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Books ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Growth & Reading</h2>
        <ul className={styles.list}>
          {about.books.map((book, index) => (
            <li key={index}>
              <em>{book.title}</em> by {book.author}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Speaking & Interviews ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Public Speaking & Interviews</h2>
        <h3 className={styles.subHeading}>Media Presence</h3>
        <ul className={styles.list}>
          {about.interviews.map((int, index) => (
            <li key={index}>
              {int.title} ({int.platform}, {int.year})
            </li>
          ))}
        </ul>
        <h3 className={styles.subHeading}>Events</h3>
        <ul className={styles.list}>
          {about.speaking.map((talk, index) => (
            <li key={index}>
              <strong>{talk.event}:</strong> {talk.topic} — {talk.location}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Miscellaneous & Startup Links ── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Digital Garden & Ventures</h2>
        <ul className={styles.list}>
          {about.miscellaneous.map((misc, index) => (
            <li key={index}>
              <a
                href={misc.url}
                className={styles.contactLink}
                target="_blank"
                rel="noopener"
              >
                {misc.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
