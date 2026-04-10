"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { USER_DATA } from "@/data/user";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Search logic
  const filteredNotes = USER_DATA.notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Group by Year
  const groupedNotes = filteredNotes.reduce(
    (acc, note) => {
      const year = new Date(note.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(note);
      return acc;
    },
    {} as Record<string, typeof USER_DATA.notes>,
  );

  // Sort years
  const sortedYears = Object.keys(groupedNotes).sort(
    (a, b) => Number(b) - Number(a),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  return (
    <>
      <div className={styles.header}>
        <h1>
          <span>📓</span> Notes
        </h1>
        <p>
          Personal notes about software architecture, side projects, and random
          thoughts.
        </p>

        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search notes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        {sortedYears.length > 0 ? (
          sortedYears.map((year) => (
            <div key={year} className={styles.yearGroup}>
              <h2 className={styles.yearHeading}>{year}</h2>
              <ul className={styles.postList}>
                {groupedNotes[year].map((note, index) => (
                  <li key={index} className={styles.postItem}>
                    <span className={styles.postDate}>
                      {formatDate(note.date)}
                    </span>
                    <Link href={note.slug} className={styles.postTitle}>
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p style={{ color: "var(--text-secondary)", marginTop: "2rem" }}>
            No notes found matching &quot;{searchQuery}&quot;.
          </p>
        )}
      </div>
    </>
  );
}
