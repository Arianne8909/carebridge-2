import styles from "./TrustSection.module.css";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaArrowTrendUp, FaRegClock } from "react-icons/fa6";

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Trust CareBridge?</h2>

        <p className={styles.subtitle}>
          Every donation is transparent, verified, and delivered directly to
          children in need.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <RiVerifiedBadgeFill />
            </div>

            <h3 className={styles.cardTitle}>
              Verified Orphanages
            </h3>

            <p className={styles.cardText}>
              Every orphanage is verified and vetted before joining the
              platform.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <FaArrowTrendUp />
            </div>

            <h3 className={styles.cardTitle}>
              Direct Payments
            </h3>

            <p className={styles.cardText}>
              Your money goes directly to the orphanage with no middlemen.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <FaRegClock />
            </div>

            <h3 className={styles.cardTitle}>
              Proof Within 48 Hours
            </h3>

            <p className={styles.cardText}>
              Receive photo proof of how your donation was used within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}