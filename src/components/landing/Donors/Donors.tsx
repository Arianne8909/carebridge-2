import styles from "./Donors.module.css";
import Link from "next/link";
import { FaUser, FaBuilding } from "react-icons/fa";

export default function Donors() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ready to make a difference?
        </h2>

        <p className={styles.subtitle}>
          Choose how you want to help children today
        </p>

        <div className={styles.grid}>
          {/* Individual Donors */}
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <FaUser />
            </div>

            <h3 className={styles.cardTitle}>
              Individual Donors
            </h3>

            <p className={styles.cardText}>
              Your money goes directly to the orphanage with no middlemen.
            </p>

            <Link href="/auth" className={styles.primaryBtn}>
              Start Helping Now
            </Link>

            <p className={styles.meta}>
              No signup needed • Donate instantly
            </p>
          </div>

          {/* Organisations */}
          <div className={styles.card}>
            <div className={styles.iconCirclePurple}>
              <FaBuilding />
            </div>

            <h3 className={styles.cardTitle}>
              For Organisations
            </h3>

            <p className={styles.cardText}>
              Create an account to manage recurring donations and track impact.
            </p>

            <Link href="/auth" className={styles.secondaryBtn}>
              Sign Up
            </Link>

            <p className={styles.meta}>
              Custom dashboards • Bulk donations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}