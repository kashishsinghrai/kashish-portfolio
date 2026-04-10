import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h3 className={styles.newsletterTitle}>Email signup</h3>
        <p className={styles.newsletterDesc}>
          Weekly updates on backend systems and architecture. No spam.
        </p>
      </div>

      <div className={styles.badges}>
        <div className={styles.badge}>⚡ Next.js</div>
        <div className={styles.badge}>🐙 GitHub</div>
        <div className={styles.badge}>🚀 Vercel</div>
      </div>

      <p className={styles.credit}>
        Made with ⚙️ by Kashish Singh &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
