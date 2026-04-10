import React from "react";
import Link from "next/link";
import styles from "./BlogList.module.css";

interface Post {
  date: string;
  year?: string;
  title: string;
  slug: string;
  tag?: string;
}

interface YearGroup {
  year: string;
  posts: Post[];
}

function groupByYear(posts: Post[]): YearGroup[] {
  const map = new Map<string, Post[]>();
  posts.forEach((post) => {
    const extractedYear =
      post.year || new Date(post.date).getFullYear().toString();
    const finalYear = extractedYear !== "NaN" ? extractedYear : "Archive";
    if (!map.has(finalYear)) map.set(finalYear, []);
    map.get(finalYear)!.push(post);
  });

  return Array.from(map.entries())
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, posts]) => ({ year, posts }));
}

interface BlogListProps {
  posts: Post[];
  compact?: boolean;
  icon?: string;
  title?: string;
  subtitle?: string;
}

export default function BlogList({
  posts,
  compact = false,
  icon = "📝",
  title = "Blog",
  subtitle = "Guides, references, and tutorials.",
}: BlogListProps) {
  // Internal helper to render the list rows
  const renderList = (postItems: Post[]) => (
    <ul className={styles.postList}>
      {postItems.map((post, index) => (
        <li key={index} className={styles.postItem}>
          <span className={styles.postDate}>{post.date}</span>
          <Link href={post.slug} className={styles.postLink}>
            {post.title}
          </Link>
          {post.tag && <span className={styles.tagBadge}>{post.tag}</span>}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.wrapper}>
      {/* ── Header Section ── */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <span className={styles.icon}>{icon}</span>
          {compact ? (
            <h2 className={styles.title}>{title}</h2>
          ) : (
            <h1 className={styles.title}>{title}</h1>
          )}
        </div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* ── Posts Section ── */}
      {compact
        ? renderList(posts)
        : groupByYear(posts).map(({ year, posts: yearPosts }) => (
            <div key={year} className={styles.yearGroup}>
              <h3 className={styles.yearHeading}>
                {year}
                <span className={styles.count}>
                  {yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"}
                </span>
              </h3>
              {renderList(yearPosts)}
            </div>
          ))}
    </div>
  );
}
