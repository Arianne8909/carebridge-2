"use client";
import Link from "next/link";
import styles from "./Donors.module.css";
import Image from "next/image";

const donorBenefits = [
  { icon: "✅", title: "Verified organizations", desc: "Every orphanage completes rigorous verification before joining our platform" },
  { icon: "📋", title: "Real needs", desc: "Browse specific, urgent needs with detailed descriptions and exact costs" },
  { icon: "🔒", title: "Secure donations", desc: "Bank-level security powered by Paystack and CBN licensed partners" },
  { icon: "📊", title: "Transparent reporting", desc: "Track exactly where your money went and who it helped" },
  { icon: "📸", title: "Impact updates", desc: "Receive photo proof within 48 hours of fulfillment" },
  { icon: "🤖", title: "AI-powered recommendations", desc: "Discover needs that match your interests and giving history" },
];

const facilityBenefits = [
  { icon: "📢", title: "Showcase your needs", desc: "Post specific needs with photos and descriptions to reach the right donors" },
  { icon: "🌍", title: "Connect with global donors", desc: "Access donors from across Africa and around the world who want to support your mission" },
  { icon: "💙", title: "Receive support", desc: "Get both cash donations and in-kind deliveries from committed supporters" },
  { icon: "💬", title: "Share impact updates", desc: "Build trust by sharing photos and stories of how donations created change" },
  { icon: "🛡️", title: "Build credibility through verification", desc: "Earn trust badges that show donors you are legitimate and accountable" },
];

export default function Donors() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Donor side */}
        <div className={`${styles.block} ${styles.reverse}`} id="donors">
          <div className={styles.imageWrap}>
            <Image
              src="/media/children.jpg"
              alt="Donors giving with confidence"
              width={500}
              height={600}
              className={styles.img}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/560x400/e8f0fe/0f2a5e?text=Give+With+Confidence";
              }}
            />
          </div>
          <div className={styles.content}>
            <h2>
              Give With <span className={styles.accent}>Confidence</span>
            </h2>
            <p className={styles.sub}>
              Every donation is secure, transparent, and trackable from start to finish
            </p>
            <ul className={styles.benefits}>
              {donorBenefits.map((b) => (
                <li key={b.title}>
                  <span className={styles.benefitIcon}>{b.icon}</span>
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/auth" className={`${styles.btn} ${styles.btnBlue}`}>
              👤 Become a Donor
            </Link>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Facility side */}
        <div className={styles.block} id="orphanages">
          <div className={styles.content}>
            <h2>
              Get Seen.{" "}
              <span className={styles.accentGreen}>Get Supported.</span>
            </h2>
            <p className={styles.sub}>
              Connect your orphanage or community center with a global network of compassionate donors
            </p>
            <ul className={styles.benefits}>
              {facilityBenefits.map((b) => (
                <li key={b.title}>
                  <span className={`${styles.benefitIcon} ${styles.orange}`}>{b.icon}</span>
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/whatsapp" className={`${styles.btn} ${styles.btnGreen}`}>
              🏠 Register Your Orphanage
            </Link>
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/media/grains.jpg"
              alt="Children at an orphanage"
              width={500}
              height={600}
              className={styles.img}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/560x400/f0fdf4/16a34a?text=Get+Supported";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}