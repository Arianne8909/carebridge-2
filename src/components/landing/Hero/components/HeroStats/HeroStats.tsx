import styles from "./HeroStats.module.css";

const stats = [
  { value: "30+", label: "Verified Orphanages" },
  { value: "₦2.4M", label: "Donations Processed" },
  { value: "95%", label: "Fulfillment Rate" },
  { value: "48h", label: "Proof Guaranteed" },
];

export default function HeroStats() {
  return (
    <div className={styles.wrap}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}