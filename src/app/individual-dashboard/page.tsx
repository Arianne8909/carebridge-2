import { Gift, HeartHandshake, ReceiptText } from "lucide-react";
import { individualGifts, individualImpact, individualStats, orgNeeds } from "@/data/dashboardData";
import styles from "./page.module.css";

export default function IndividualDashboardPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}><div><p>Individual dashboard</p><h1>Your giving, proof, and impact in one place.</h1><span>Support verified needs, track pledges, and keep every receipt organized.</span></div><button><HeartHandshake size={18} /> Give now</button></section>
      <div className={styles.statGrid}>{individualStats.map((stat) => <article key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><p>{stat.sub}</p></article>)}</div>
      <div className={styles.grid}>
        <section className={styles.card}><div className={styles.cardHeader}><h2>Recommended needs</h2><Gift size={20} /></div>{orgNeeds.slice(0,3).map((need) => <div key={need.id} className={styles.needRow}><div><strong>{need.title}</strong><span>{need.facility} | {need.location}</span></div><button>Give</button></div>)}</section>
        <section className={styles.card}><div className={styles.cardHeader}><h2>Recent gifts</h2><ReceiptText size={20} /></div>{individualGifts.map((gift) => <div key={`${gift.facility}-${gift.date}`} className={styles.giftRow}><div><strong>{gift.amount}</strong><span>{gift.facility}</span></div><b>{gift.status}</b></div>)}</section>
        <section className={styles.card}><div className={styles.cardHeader}><h2>Impact snapshot</h2></div>{individualImpact.map((item) => <div key={item.label} className={styles.impactRow}><div><span>{item.label}</span><strong>{item.value}</strong></div><div className={styles.track}><i style={{ width: `${item.pct}%` }} /></div></div>)}</section>
      </div>
    </div>
  );
}
