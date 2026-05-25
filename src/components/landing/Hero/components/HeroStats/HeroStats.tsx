import styles from "./HeroStats.module.css";

const stats = [
  {
    number: "30+",
    label: "Verified Orphanages",
  },

  {
    number: "₦2.4M",
    label: "Donations Processed",
  },

  {
    number: "95%",
    label: "Fufilment Rate",
  },

  {
    number: "48h",
    label: "Proof Guaranteed",
  },
];

export default function HeroStats() {
  return (
    <div className={styles.heroStats}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.heroStat}>
          <h3 className={styles.heroStatNum}>{stat.number}</h3>

          <p className={styles.heroStatLabel}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}