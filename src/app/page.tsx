import Hero from "@/components/Hero/Hero";
import BlogList from "@/components/BlogList/BlogList";
import DeepDives from "@/components/DeepDives/DeepDives";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="blog" className="py-16">
        <BlogList 
          posts={[]} 
          compact={true} 
          icon="" 
          title="Blog" 
          subtitle="Guides, references, and tutorials on programming and web architecture." 
        />
      </section>

      <section id="notes" className="py-16">
        <BlogList 
          posts={[]} 
          compact={true} 
          icon="" 
          title="Notes" 
          subtitle="Shorter thoughts, server setups, and yearly reviews." 
        />
      </section>

      <section id="deep-dives" className="py-16">
        <h2 className="text-2xl font-semibold text-white mb-2">Deep Dives</h2>
        <p className="text-zinc-400 mb-8">
          Core topics and technologies I frequently write about.
        </p>
        <DeepDives items={[]} />
      </section>

      <Footer />
    </>
  );
}
