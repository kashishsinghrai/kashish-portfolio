import React from "react";
import Link from "next/link"; 
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Hub | Kashish Singh",
  description: "Tutorials, technical notes, and architectural deep dives.",
};

export default async function BlogArchive() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  const groupedPosts = posts.reduce((acc, post) => {
    const year = new Date(post.createdAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const sortedYears = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-24 max-w-4xl animate-in fade-in duration-700 slide-in-from-bottom-8">
      <div className="mb-20 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
          Knowledge Hub.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Deep dives into software architecture, backend engineering, and building resilient systems.
        </p>
      </div>

      <div className="space-y-24">
        {sortedYears.length > 0 ? (
          sortedYears.map((year) => (
            <div key={`blog-year-${year}`} className="relative">
              <div className="sticky top-24 z-10 hidden md:block w-32 absolute -left-32 h-full">
                <h2 className="text-6xl font-black text-white/5 opacity-50 tracking-tighter transform -rotate-90 origin-bottom-left absolute bottom-0">{year}</h2>
              </div>
              <h2 className="text-3xl font-extrabold mb-8 text-white md:hidden tracking-tight">{year}</h2>
              
              <div className="flex flex-col gap-6">
                {groupedPosts[year].map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-white/20 hover:bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] hover:-translate-y-1"
                  >
                    <div className="flex flex-col mb-4 md:mb-0">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3 group-hover:text-zinc-400 transition-colors">
                        {formatDate(post.createdAt)}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                        {post.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center self-start md:self-auto bg-black/40 border border-white/10 px-4 py-2 rounded-full">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 whitespace-nowrap">
                        {post.readTime} min read
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="h-64 flex items-center justify-center bg-zinc-900/30 rounded-3xl border border-white/5 backdrop-blur-xl">
            <p className="text-zinc-500 italic">No articles published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
