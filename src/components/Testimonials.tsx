"use client";
import { TESTIMONIALS } from "@/lib/data";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="max-w-5xl px-6 py-24 mx-auto">
      <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center">
        What People Say
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="p-8 border rounded-3xl border-zinc-800 bg-gradient-to-br from-zinc-900 to-black"
          >
            <div className="flex gap-1 mb-4 text-yellow-500">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="mb-6 italic font-light text-zinc-300">"{t.text}"</p>
            <div>
              <p className="font-bold text-white">{t.name}</p>
              <p className="text-xs text-muted">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
