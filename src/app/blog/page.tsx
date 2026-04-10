"use client";

import React, { useState } from "react";
import Link from "next/link"; // ✅ Next.js Link imported
import styles from "./page.module.css";
import { ALL_POSTS } from "@/data/user";

export default function BlogArchive() {
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Filter Posts based on Search
  const filteredPosts = ALL_POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. Group Posts by Year (Smart logic applied)
  const groupedPosts = filteredPosts.reduce(
    (acc, post) => {
      // ✅ Handle cases where date might not be perfectly formatted
      const extractedYear = new Date(post.date).getFullYear().toString();
      const year = extractedYear !== "NaN" ? extractedYear : "Archive";

      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof ALL_POSTS>,
  );

  // 3. Sort Years descending
  const sortedYears = Object.keys(groupedPosts).sort(
    (a, b) => Number(b) - Number(a),
  );

  // Helper to format date safely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Fallback if date is invalid
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  return (
    <>
      <div className={styles.header}>
        <h1>
          <span>📝</span> Blog
        </h1>
        <p>Tutorials, technical notes, and architectural deep dives.</p>

        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search articles..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        {sortedYears.length > 0 ? (
          sortedYears.map((year) => (
            <div key={`blog-year-${year}`} className={styles.yearGroup}>
              <h2 className={styles.yearHeading}>{year}</h2>
              <ul className={styles.postList}>
                {groupedPosts[year].map((post, index) => (
                  <li
                    key={`blog-post-${year}-${index}`}
                    className={styles.postItem}
                  >
                    <span className={styles.postDate}>
                      {formatDate(post.date)}
                    </span>
                    {/* ✅ Replaced 'a' with Next.js 'Link' */}
                    <Link href={post.slug} className={styles.postTitle}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>
            {/* ✅ Fixed ESLint quote issue */}
            No articles found matching &quot;{searchQuery}&quot;.
          </p>
        )}
      </div>
    </>
  );
}
