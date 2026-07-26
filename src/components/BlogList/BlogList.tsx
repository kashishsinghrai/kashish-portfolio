import React from "react";
import Link from "next/link";

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

// -----------------------------------------------------------------------------
// BLOG LIST COMPONENT
// Translated to Tailwind CSS. Displays a list of blog posts or notes.
// -----------------------------------------------------------------------------
export default function BlogList({
  posts,
  compact = false,
  icon = "📝",
  title = "Blog",
  subtitle = "Guides, references, and tutorials.",
}: BlogListProps) {
  
  // Internal helper to render the list rows
  const renderList = (postItems: Post[]) => (
    <ul className="flex flex-col gap-4">
      {postItems.map((post, index) => (
        <li 
          key={index} 
          className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3 border-b border-white/5 hover:border-white/20 transition-colors"
        >
          <span className="text-sm font-mono text-foreground/50 w-24 shrink-0">
            {post.date}
          </span>
          <Link 
            href={post.slug} 
            className="flex-1 text-lg font-medium text-foreground/90 hover:text-accent-blue transition-colors"
          >
            {post.title}
          </Link>
          {post.tag && (
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-foreground/70 uppercase tracking-widest shrink-0">
              {post.tag}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-full max-w-4xl">
      {/* ── Header Section ── */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl bg-white/5 p-2 rounded-lg">{icon}</span>
          {compact ? (
            <h2 className="text-2xl font-bold">{title}</h2>
          ) : (
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          )}
        </div>
        <p className="text-foreground/70">{subtitle}</p>
      </div>

      {/* ── Posts Section ── */}
      {compact
        ? renderList(posts)
        : groupByYear(posts).map(({ year, posts: yearPosts }) => (
            <div key={year} className="mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-4 text-white/90">
                {year}
                <span className="text-sm font-normal text-foreground/50 px-2 py-1 bg-white/5 rounded-full border border-white/10">
                  {yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"}
                </span>
              </h3>
              {renderList(yearPosts)}
            </div>
          ))}
    </div>
  );
}
