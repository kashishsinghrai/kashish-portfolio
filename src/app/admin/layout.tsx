import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Control Panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black">
      <main className="max-w-5xl mx-auto p-4 sm:p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}
