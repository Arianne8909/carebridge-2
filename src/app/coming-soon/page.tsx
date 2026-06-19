import Footer from "@/components/landing/Footer/Footer";
import SimpleNav from "@/components/ui/SimpleNav/SimpleNav";
import styles from "../static-pages.module.css";

export default function ComingSoonPage() {
  return (
    <>
      <SimpleNav />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Coming soon</div>
            <h1>CareBridge social channels are being prepared.</h1>
            <p>
              Our official Facebook, Twitter, Instagram, and LinkedIn pages are
              not live yet. This page keeps those links honest while the team gets
              them ready.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Facebook</h3>
              <p>Updates and community stories will appear here once launched.</p>
            </div>
            <div className={styles.card}>
              <h3>Instagram</h3>
              <p>Impact visuals and campaign highlights are coming soon.</p>
            </div>
            <div className={styles.card}>
              <h3>LinkedIn</h3>
              <p>Partner updates and organizational news will be added later.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
