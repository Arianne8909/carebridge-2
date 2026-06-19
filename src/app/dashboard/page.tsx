import { Download, MoreHorizontal, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { orgPortfolio, orgStats } from "@/data/dashboardData";
import styles from "./page.module.css";

const statusClass: Record<string, string> = { Active: styles.statusActive, Matched: styles.statusMatched, Fulfilled: styles.statusFulfilled };

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div><p className={styles.eyebrow}>Organisation dashboard</p><h1>Funding verified needs with clear proof of impact.</h1><p>Track budgets, active commitments, fulfillment evidence, and ESG-ready reporting from one calm workspace.</p></div>
        <div className={styles.heroPanel}><span>Wallet balance</span><strong>NGN 3,100,000</strong><button>Fund wallet</button></div>
      </section>
      <div className={styles.statGrid}>{orgStats.map((stat) => <article key={stat.label} className={styles.statCard}><span>{stat.label}</span><strong>{stat.value}</strong><p>{stat.sub}</p></article>)}</div>
      <div className={styles.contentGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}><div><h2>Active portfolio</h2><p>14 active | 6 matched | 3 fulfilled</p></div><button className={styles.headerBtn}>View all</button></div>
          <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Facility</th><th>Category</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>{orgPortfolio.map((row) => <tr key={row.facility}><td><strong>{row.facility}</strong><span>{row.location} | {row.children} children</span></td><td><span className={styles.categoryTag}>{row.category}</span></td><td className={styles.amount}>{row.amount}</td><td><span className={`${styles.status} ${statusClass[row.status]}`}>{row.status}</span></td><td><button className={styles.moreBtn} aria-label={`More actions for ${row.facility}`}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div>
        </section>
        <aside className={styles.sideStack}>
          <section className={styles.card}><div className={styles.sideTitle}><SlidersHorizontal size={18} /><h2>Giving parameters</h2></div><dl className={styles.paramList}><div><dt>Annual budget</dt><dd>NGN 5,000,000</dd></div><div><dt>Categories</dt><dd className={styles.tags}><span>Food</span><span>Medical</span><span>Education</span></dd></div><div><dt>Geography</dt><dd>Lagos, Abuja, Rivers</dd></div><div><dt>Transaction fee</dt><dd>1.5% per need</dd></div></dl><button className={styles.outlineBtn}>Edit parameters</button></section>
          <section className={styles.esgCard}><ShieldCheck size={22} /><h2>Q2 2026 ESG report ready</h2><p>Auto-generated report with photo evidence, delivery notes, and impact totals.</p><button><Download size={16} /> Download PDF</button></section>
        </aside>
      </div>
    </div>
  );
}
