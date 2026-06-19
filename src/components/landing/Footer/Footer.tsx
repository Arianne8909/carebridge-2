import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/media/logo.png"
              alt="CareBridge OVC"
              width={180}
              height={50}
              priority
            />
          </Link>
          <p className={styles.tagline}>Connecting Compassion to Impact</p>
          <p className={styles.desc}>
            Making every child visible. Making every need addressable.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Platform</h4>
          <Link href="/needs">Explore Needs</Link>
          <Link href="/#donors">Donors</Link>
          <Link href="/#featured-topics">Stories</Link>
        </div>

        <div className={styles.col}>
          <h4>Support</h4>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#trust">Trust & Safety</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        <div className={styles.col}>
          <h4>Connect</h4>
          <Link href="/coming-soon">Facebook</Link>
          <Link href="/coming-soon">Twitter</Link>
          <Link href="/coming-soon">Instagram</Link>
          <Link href="/coming-soon">LinkedIn</Link>
          <Link href="/needs" className={styles.donateBtn}>
            Donate
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>(c) 2026 CareBridge OVC. All rights reserved.</p>
        <div className={styles.legal}>
          <Link href="/legal#privacy">Privacy Policy</Link>
          <Link href="/legal#terms">Terms of Service</Link>
          <Link href="/legal#cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
