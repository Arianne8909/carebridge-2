import Link from "next/link";
import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.avatar}>GT</div>
        <div className={styles.info}>
          <span className={styles.name}>GTCo Foundation</span>
          <span className={styles.role}>CSR Partner · FY2026 Portfolio</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.ghostBtn}>⬇ Download ESG Report</button>
        <Link href="/needs" className={styles.primaryBtn}>
          Fund New Needs
        </Link>
      </div>
    </header>
  );
}