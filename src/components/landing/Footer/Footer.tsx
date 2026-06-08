import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

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
          <Link href="#donors">Donors</Link>
          <Link href="/registration">Orphanages</Link>
          <Link href="#impact">Impact Stories</Link>
        </div>

        <div className={styles.col}>
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">How It Works</a>
          <a href="#">Trust & Safety</a>
          <a href="#">Contact Us</a>
        </div>

        <div className={styles.col}>
          <h4>Connect</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <Link href="/needs" className={styles.donateBtn}>
            💚 Donate
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 CareBridge Africa. All rights reserved.</p>
        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}