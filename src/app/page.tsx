import { prisma } from "@/lib/db";
import Hero from "@/components/Hero/Hero";
import BlogList from "@/components/BlogList/BlogList";
import DeepDives from "@/components/DeepDives/DeepDives";
import Footer from "@/components/Footer/Footer";

// -----------------------------------------------------------------------------
// Home Page — Server Component (no "use client" directive)
// Fetches live data from the database at request time.
// -----------------------------------------------------------------------------

// Map a category string to a relevant emoji icon for Deep Dives display
function categoryIcon(category: string): string {
  const map: Record<string, string> = {
    backend:      "⚙️",
    frontend:     "🎨",
    devops:       "🚀",
    database:     "🗄️",
    auth:         "🔐",
    ai:           "🤖",
    typescript:   "🔷",
    javascript:   "🟨",
    nextjs:       "▲",
    react:        "⚛️",
    node:         "🟢",
    architecture: "🏗️",
    security:     "🛡️",
    performance:  "⚡",
    cloud:        "☁️",
  };
  return map[category.toLowerCase()] ?? "📌";
}

export default async function Home() {
  // ── Parallel DB fetches ─────────────────────────────────────────────────────
  const [blogPosts, notes] = await Promise.all([
    prisma.blogPost.findMany({
      where:   { published: true },
      orderBy: { createdAt: "desc" },
      take:    10,
      select:  { title: true, slug: true, createdAt: true, readTime: true },
    }),
    prisma.note.findMany({
      orderBy: { createdAt: "desc" },
      take:    10,
      select:  { id: true, title: true, category: true, createdAt: true },
    }),
  ]);

  // ── Shape data to match BlogList's Post interface ───────────────────────────
  const blogItems = blogPosts.map((p) => ({
    date:  p.createdAt.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    title: p.title,
    slug:  `/blog/${p.slug}`,
    tag:   `${p.readTime} min read`,
  }));

  const noteItems = notes.map((n) => ({
    date:  n.createdAt.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    title: n.title,
    slug:  `/notes/${n.id}`,
    tag:   n.category ?? undefined,
  }));

  // ── Build Deep Dives from unique Note categories ────────────────────────────
  // Falls back to a curated static set if no categorised notes exist yet.
  const uniqueCategories = [
    ...new Set(notes.map((n) => n.category).filter(Boolean) as string[]),
  ];

  const deepDiveItems =
    uniqueCategories.length > 0
      ? uniqueCategories.slice(0, 8).map((cat) => ({
          title: cat.charAt(0).toUpperCase() + cat.slice(1),
          icon:  categoryIcon(cat),
        }))
      : [
          { title: "Next.js",      icon: "▲" },
          { title: "TypeScript",   icon: "🔷" },
          { title: "Architecture", icon: "🏗️" },
          { title: "Auth",         icon: "🔐" },
          { title: "DevOps",       icon: "🚀" },
          { title: "Databases",    icon: "🗄️" },
          { title: "Performance",  icon: "⚡" },
          { title: "AI",           icon: "🤖" },
        ];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <Hero />

      {/* ── Blog Section ── */}
      <section id="blog" className="py-16">
        {blogItems.length > 0 ? (
          <BlogList
            posts={blogItems}
            compact={true}
            icon="📝"
            title="Blog"
            subtitle="Guides, references, and tutorials on programming and web architecture."
          />
        ) : (
          <div className="w-full max-w-4xl">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl bg-white/5 p-2 rounded-lg">📝</span>
                <h2 className="text-2xl font-bold">Blog</h2>
              </div>
              <p className="text-foreground/70">
                Guides, references, and tutorials on programming and web architecture.
              </p>
            </div>
            <p className="text-foreground/40 italic py-8 border-t border-white/5">
              No posts yet — check back soon.
            </p>
          </div>
        )}
      </section>

      {/* ── Notes Section ── */}
      <section id="notes" className="py-16">
        {noteItems.length > 0 ? (
          <BlogList
            posts={noteItems}
            compact={true}
            icon="🗒️"
            title="Notes"
            subtitle="Shorter thoughts, server setups, and yearly reviews."
          />
        ) : (
          <div className="w-full max-w-4xl">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl bg-white/5 p-2 rounded-lg">🗒️</span>
                <h2 className="text-2xl font-bold">Notes</h2>
              </div>
              <p className="text-foreground/70">
                Shorter thoughts, server setups, and yearly reviews.
              </p>
            </div>
            <p className="text-foreground/40 italic py-8 border-t border-white/5">
              No notes yet — check back soon.
            </p>
          </div>
        )}
      </section>

      {/* ── Deep Dives Section ── */}
      <section id="deep-dives" className="py-16">
        <h2 className="text-2xl font-semibold text-white mb-2">Deep Dives</h2>
        <p className="text-zinc-400 mb-8">
          Core topics and technologies I frequently write about.
        </p>
        <DeepDives items={deepDiveItems} />
      </section>

      <Footer />
    </>
  );
}
