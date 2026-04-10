import React from "react";
import styles from "./ProjectCard.module.css";

interface Props {
  title: string;
  description: string;
  year: string;
  tags: string[];
}

export default function ProjectCard({ title, description, year, tags }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.year}>{year}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
      <div className={styles.tagsGroup}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
