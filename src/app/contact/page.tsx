import Footer from "@/components/landing/Footer/Footer";
import SimpleNav from "@/components/ui/SimpleNav/SimpleNav";
import styles from "../static-pages.module.css";

export default function ContactPage() {
  return (
    <>
      <SimpleNav />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Contact us</div>
            <h1>Reach the CareBridge team.</h1>
            <p>
              Use this placeholder page for support, partnerships, orphanage
              onboarding, and donor questions while official contact channels are
              being finalized.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.split}>
            <div className={styles.panel}>
              <h2>Send a message</h2>
              <p>
                The form is ready for the frontend. Submission will be connected
                when the backend endpoint is available.
              </p>
              <form className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="How can we help?" />
                </div>
                <button className={styles.button} type="button">
                  Submit coming soon
                </button>
              </form>
            </div>

            <div className={styles.card}>
              <h2>What we can help with</h2>
              <ul className={styles.list}>
                <li>Orphanage registration and verification questions.</li>
                <li>Donor support and need fulfillment guidance.</li>
                <li>Partnerships with NGOs, institutions, and local teams.</li>
                <li>Trust, safety, and reporting concerns.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
