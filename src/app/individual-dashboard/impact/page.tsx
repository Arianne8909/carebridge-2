import { individualImpact, individualStats } from "@/data/dashboardData";
import styles from "../page.module.css";

export default function IndividualImpactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}><div><p>Impact</p><h1>Your completed giving has reached 126 children.</h1><span>Impact totals are calculated from verified deliveries and facility confirmations.</span></div></section>
      <div className={styles.statGrid}>{individualStats.map((stat) => <article key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><p>{stat.sub}</p></article>)}</div>
      <section className={styles.card}>{individualImpact.map((item) => <div key={item.label} className={styles.impactRow}><div><span>{item.label}</span><strong>{item.value}</strong></div><div className={styles.track}><i style={{ width: `${item.pct}%` }} /></div></div>)}</section>
    </div>
  );
}
