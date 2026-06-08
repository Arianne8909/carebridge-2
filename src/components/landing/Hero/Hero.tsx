import styles from "./Hero.module.css";
import CTAButtons from "./components/CTAButtons/CTAButtons";
import HeroStats from "./components/HeroStats/HeroStats";
import Image from "next/image";

import { FiShield } from "react-icons/fi"
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoVerified } from "react-icons/go";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            No Child Should Be{" "}
            <span className={styles.accent}>Invisible.</span>
          </h1>

          <p className={styles.sub}>
            CareBridge Africa makes real needs visible by connecting verified
            orphanages, vulnerable children, and underserved communities with
            donors who want to create lasting impact.
          </p>

          <CTAButtons />

          <div className={styles.eyebrow}>
            <span className={styles.badge}>
              <GoVerified />
              <p>Trusted Giving</p>
            </span>

            <span className={styles.badge}>
              <FiShield />
              <p>Verified Needs</p>
            </span>

            <span className={styles.badge}>
              <FaArrowTrendUp />
              <p>Transparent Impact</p>
            </span>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <Image
            src="/media/children2.jpg"
            alt="Children smiling"
            width={500}
            height={600}
            className={styles.heroImg}
          />
        </div>
      </div>

      <HeroStats />
    </section>
  );
}