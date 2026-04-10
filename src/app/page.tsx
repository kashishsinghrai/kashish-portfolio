import Hero from "@/components/Hero/Hero";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import BlogList from "@/components/BlogList/BlogList";
import DeepDives from "@/components/DeepDives/DeepDives";
import Footer from "@/components/Footer/Footer";
import { USER_DATA } from "@/data/user";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="blog" className={styles.section}>
        {/* Utilizing the compact mode we built earlier */}
        <BlogList
          posts={USER_DATA.blogPosts}
          compact={true}
          icon="📝"
          title="Blog"
          subtitle="Guides, references, and tutorials on programming and web architecture."
        />
      </section>

      <section id="notes" className={styles.section}>
        <BlogList
          posts={USER_DATA.notes}
          compact={true}
          icon="📓"
          title="Notes"
          subtitle="Shorter thoughts, server setups, and yearly reviews."
        />
      </section>

      <section id="deep-dives" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🧠</span>
          <h2 className={styles.sectionTitle}>Deep Dives</h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Core topics and technologies I frequently write about.
        </p>
        <DeepDives items={USER_DATA.deepDives} />
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🐙</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Open-source tools, templates, and systems I have built.
        </p>

        <div className={styles.projectGrid}>
          {USER_DATA.projects.map((p) => (
            /* Using p.title as a key instead of index to prevent React rendering errors */
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
