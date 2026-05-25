import styles from "./Hero.module.css";

import CTAButtons from "./components/CTAButtons/CTAButtons";
import HeroStats from "./components/HeroStats/HeroStats";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroTag}>
            <span>🛡️ Verified Homes. Trusted Donations. Real Change.</span>
          </div>

          <h1 className={styles.heroTitle}>
            Support Real Homes. <br/><em>See Real Impact.</em>
          </h1>

          <p className={styles.heroText}>
            CareBridge connects verified orphanages to donors through real-time needs, direct payments, and photo proof of every donation.
          </p>

          <CTAButtons />

          <HeroStats />
        </div>
      </div>
    </section>
  );
}