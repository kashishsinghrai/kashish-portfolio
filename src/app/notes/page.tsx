import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes | Kashish Singh",
  description: "Personal notes about software architecture, side projects, and random thoughts.",
};

export default async function NotesPage() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const groupedNotes = notes.reduce((acc, note) => {
    const year = new Date(note.createdAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(note);
    return acc;
  }, {} as Record<string, typeof notes>);

  const sortedYears = Object.keys(groupedNotes).sort((a, b) => Number(b) - Number(a));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-24 max-w-4xl animate-in fade-in duration-700 slide-in-from-bottom-8">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white flex items-center gap-4">
          <span className="text-zinc-500 font-mono text-3xl opacity-50">/</span> Notes
        </h1>
        <p className="text-zinc-500 text-lg max-w-xl font-mono text-sm leading-relaxed">
          &gt; Stream of consciousness, raw snippets, and unfiltered architectural thoughts.
        </p>
      </div>

      <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
        {sortedYears.length > 0 ? (
          sortedYears.map((year) => (
            <div key={year} className="mb-0">
              <div className="bg-white/5 px-6 py-3 border-y border-white/10 first:border-t-0">
                <h2 className="text-sm font-bold font-mono tracking-widest text-zinc-400">{year}</h2>
              </div>
              
              <ul className="flex flex-col divide-y divide-white/5">
                {groupedNotes[year].map((note) => (
                  <li key={note.id} className="group relative">
                    <Link 
                      href={`/notes/${note.id}`} 
                      className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-6 py-5 hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-xs font-mono font-bold text-zinc-600 w-16 shrink-0">
                        {formatDate(note.createdAt)}
                      </span>
                      
                      <span className="text-base font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                        {note.title}
                      </span>
                      
                      {note.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-900 border border-white/10 text-zinc-500 px-3 py-1 rounded-full ml-0 md:ml-auto truncate max-w-[150px] md:max-w-[200px] shrink-0 group-hover:border-white/20 transition-colors">
                          {note.category}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
             <p className="text-zinc-500 font-mono text-sm">&gt; No records found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
