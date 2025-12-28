"use client";
import { DATA } from "@/lib/data";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed z-50 -translate-x-1/2 bottom-6 left-1/2">
      <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-2xl bg-zinc-900/80 backdrop-blur-md border-white/10">
        {DATA.socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            className="p-2 transition-all rounded-full text-muted hover:text-white hover:bg-white/5"
          >
            <social.icon size={20} />
          </Link>
        ))}
        <div className="w-[1px] h-4 bg-zinc-800 mx-2" />
        <Link
          href="mailto:kashishsingh124356@gmail.com"
          className="px-2 text-xs font-medium transition hover:text-accent"
        >
          Hire Me
        </Link>
      </div>
    </nav>
  );
}
