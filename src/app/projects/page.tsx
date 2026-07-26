import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/db";

// ✅ SEO: Page specific metadata
export const metadata: Metadata = {
  title: "Projects | Kashish Singh - Software Developer & Founder",
  description: "Explore open-source projects by Kashish Singh.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-24 max-w-6xl animate-in fade-in duration-700 slide-in-from-bottom-8">
      <header className="mb-20 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
          Digital Ecosystems.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Architecting scalable backends, full-stack architectures, and AI integrations for <strong className="text-white font-medium">Navojit</strong> and beyond.
        </p>
      </header>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {projects.length === 0 ? (
          <div className="col-span-full h-64 flex items-center justify-center bg-zinc-900/30 rounded-3xl border border-white/5 backdrop-blur-xl">
            <p className="text-zinc-500 italic">No projects deployed yet.</p>
          </div>
        ) : (
          projects.map((project, index) => {
            // Make the first project take up more space for the Bento look
            const isHero = index === 0;
            return (
              <article 
                key={project.id} 
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] p-8 ${
                  isHero ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Subtle Glow inside the card */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-zinc-500 text-sm tracking-widest">{project.year}</span>
                    {project.featured && (
                      <span className="text-black font-bold bg-white px-3 py-1 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Featured
                      </span>
                    )}
                  </div>

                  <a
                    href={project.demoUrl || project.sourceUrl || "#"}
                    className={`font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all block mb-4 ${isHero ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-zinc-300 group-hover:border-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-6 items-center">
                    {project.demoUrl && (
                       <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white hover:text-blue-400 transition-colors flex items-center gap-2">
                         Live Site <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                       </a>
                    )}
                    {project.sourceUrl && (
                       <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                         GitHub
                       </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
