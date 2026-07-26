import React from "react";

interface ProjectLink {
  name: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  year: string;
  stars: number;
  links: ProjectLink[];
}

// -----------------------------------------------------------------------------
// PROJECT CARD COMPONENT
// Restyled to strictly use Tailwind CSS and match the Liquid Glass aesthetic.
// -----------------------------------------------------------------------------
export default function ProjectCard({
  title,
  description,
  year,
  stars,
  links,
}: ProjectCardProps) {
  return (
    // Flex column layout for the card to push links to the bottom
    <article className="glass-panel p-6 flex flex-col justify-between h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
      
      {/* Top Header: Year and Stars */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
        <span className="text-sm font-mono text-foreground/50 tracking-widest">{year}</span>
        <span className="flex items-center gap-1 text-sm text-foreground/80 font-bold bg-white/5 px-2 py-1 rounded-full border border-white/10">
          {stars} <span className="text-yellow-500">⭐</span>
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 mb-6">
        <h3 className="text-xl font-bold text-white hover:text-accent-blue transition-colors mb-3 line-clamp-1">
          {title}
        </h3>
        <p className="text-foreground/70 text-sm leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>

      {/* Links / Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-auto">
        {links?.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-foreground/80 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            title={`${link.name} for ${title}`}
          >
            {link.name}
          </a>
        ))}
      </div>
      
    </article>
  );
}
