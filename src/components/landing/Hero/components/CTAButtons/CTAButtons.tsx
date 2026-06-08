import Link from "next/link";
import styles from "./CTAButtons.module.css";

export default function CTAButtons() {
  return (
    <div className={styles.wrap}>
      <Link href="/needs" className={styles.primary}>
        💙 Explore Needs
      </Link>
      <Link href="/whatsapp" className={styles.secondary}>
        🏠 Register Your Orphanage
      </Link>
      <Link href="/auth" className={styles.outline}>
        👤 Become a Donor
      </Link>
    </div>
  );
}