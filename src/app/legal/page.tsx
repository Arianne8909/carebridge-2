import Footer from "@/components/landing/Footer/Footer";
import SimpleNav from "@/components/ui/SimpleNav/SimpleNav";
import styles from "../static-pages.module.css";

export default function LegalPage() {
  return (
    <>
      <SimpleNav />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Policies</div>
            <h1>Privacy Policy, Terms of Service, and Cookie Policy.</h1>
            <p>
              These placeholder policies give CareBridge a single public legal
              page until reviewed final documents are supplied.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <article className={styles.section}>
            <h2 id="privacy">Privacy Policy</h2>
            <p>
              CareBridge collects only the information needed to connect donors,
              verified orphanages, and support teams. This may include account
              details, contact information, orphanage registration data, listed
              needs, donation activity, and messages sent through the platform.
            </p>
            <h3>How information is used</h3>
            <p>
              Information is used to verify facilities, coordinate donations,
              improve platform safety, communicate updates, and provide support.
              CareBridge does not sell personal information.
            </p>
            <h3>Data protection</h3>
            <p>
              We use reasonable safeguards to protect user and facility data.
              Final retention, access, and deletion procedures will be added when
              the production policy is approved.
            </p>
          </article>

          <article className={styles.section}>
            <h2 id="terms">Terms of Service</h2>
            <p>
              By using CareBridge, users agree to provide accurate information,
              respect verification processes, and use the platform only for lawful
              charitable and support-related purposes.
            </p>
            <h3>Donations and listings</h3>
            <p>
              Needs, orphanage profiles, and donation workflows may be reviewed,
              changed, paused, or removed to protect children, donors, and partner
              organizations.
            </p>
            <h3>Platform availability</h3>
            <p>
              CareBridge is under active development. Features may change as the
              backend, verification process, and payment workflows are completed.
            </p>
          </article>

          <article className={styles.section}>
            <h2 id="cookies">Cookie Policy</h2>
            <p>
              CareBridge may use essential cookies to keep the site secure,
              remember basic preferences, support authentication, and understand
              how visitors use the platform.
            </p>
            <h3>Cookie choices</h3>
            <p>
              Visitors can manage cookies through their browser settings. A more
              detailed consent experience can be added when analytics and
              production tracking tools are finalized.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
