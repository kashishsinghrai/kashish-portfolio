import React from "react";

// -----------------------------------------------------------------------------
// FOOTER COMPONENT
// Translated to Tailwind CSS for 100% compliance with the strict dark theme.
// -----------------------------------------------------------------------------
export default function Footer() {
  return (
    // Responsive footer container with glassmorphic top border
    <footer className="mt-20 py-12 border-t border-white/10 text-center container mx-auto px-6 lg:px-12">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-white">Email signup</h3>
        <p className="text-foreground/70 text-sm max-w-md mx-auto">
          Weekly updates on backend systems and architecture. No spam.
        </p>
      </div>

      {/* Responsive flex container for technology badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">⚡ Next.js</div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">🐙 GitHub</div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">🚀 Vercel</div>
      </div>

      <p className="text-foreground/50 text-xs tracking-wider uppercase font-semibold">
        Made with ⚙️ by Kashish Singh &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
