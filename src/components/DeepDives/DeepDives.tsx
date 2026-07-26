import React from "react";

interface Dive {
  title: string;
  icon: string;
}

// -----------------------------------------------------------------------------
// DEEP DIVES COMPONENT
// Translated to Tailwind CSS. Displays a responsive grid of technical topics.
// -----------------------------------------------------------------------------
export default function DeepDives({ items }: { items: Dive[] }) {
  return (
    // Responsive grid container for Deep Dive categories
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        // Glassmorphic card with hover effect for each topic
        <div 
          key={item.title || index} 
          className="bg-background/50 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-glass"
        >
          <span className="text-3xl bg-white/5 p-2 rounded-lg">{item.icon}</span>
          <span className="text-sm font-bold tracking-wide">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
