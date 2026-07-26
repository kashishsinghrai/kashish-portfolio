export const dynamic = "force-dynamic";

import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Knowledge Hub`,
    description: post.content.substring(0, 160) + "...",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post || !post.published) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-24 max-w-4xl animate-in fade-in duration-700 slide-in-from-bottom-8">
      
      <Link href="/blog" className="text-zinc-500 hover:text-white transition-colors mb-12 inline-block font-mono text-sm uppercase tracking-widest font-bold">
        ← Knowledge Hub
      </Link>
      
      <header className="mb-16">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-sm font-mono text-zinc-500">
            {formatDate(post.createdAt)}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            {post.readTime} min read
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight leading-tight mb-8">
          {post.title}
        </h1>
      </header>

      <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 md:p-12 backdrop-blur-xl">
        <article className="prose prose-invert prose-zinc md:prose-lg max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>

    </div>
  );
}
