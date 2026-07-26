export const dynamic = "force-dynamic";

import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const note = await prisma.note.findUnique({ where: { id } });
  
  if (!note) return { title: "Note Not Found" };
  
  return {
    title: `${note.title} | Notes | Kashish Singh`,
    description: note.content.substring(0, 160) + "...",
  };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const note = await prisma.note.findUnique({
    where: { id }
  });

  if (!note) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-24 max-w-3xl animate-in fade-in duration-700 slide-in-from-bottom-8">
      
      <Link href="/notes" className="text-zinc-500 hover:text-white transition-colors mb-12 inline-block font-mono text-sm">
        ← Back to Notes
      </Link>
      
      <header className="mb-12 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-sm font-mono text-zinc-500">
            {formatDate(note.createdAt)}
          </span>
          {note.category && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-900 border border-white/10 text-zinc-400 px-3 py-1 rounded-full">
              {note.category}
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {note.title}
        </h1>
      </header>

      <article className="prose prose-invert prose-zinc prose-lg max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 prose-headings:text-white prose-a:text-accent-blue hover:prose-a:text-blue-400">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </article>

    </div>
  );
}
