"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./SimpleNav.module.css";
import Image from "next/image";

export default function SimpleNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
  <Image
    src="/media/logo.png"
    alt="CareBridge OVC"
    width={180}
    height={50}
    priority
  />
</Link>
        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          <Link href="/needs" className={styles.link}>Explore Needs</Link>
          <Link href="/#donors" className={styles.link}>Donors</Link>
          <Link href="/#featured-topics" className={styles.link}>Stories</Link>
        </div>

        <div className={styles.actions}>
          <Link href="/needs" className={styles.donateBtn}>
            💙 Donate
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}