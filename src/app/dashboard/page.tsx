// import Link from "next/link";
import styles from "./page.module.css";


const stats = [
  {
    label: "ANNUAL BUDGET",
    value: "₦5M",
    sub: "₦1.9M deployed · ₦3.1M remaining",
    trend: null,
  },
  {
    label: "NEEDS FUNDED",
    value: "23",
    sub: "+8 this quarter",
    trend: "up",
  },
  {
    label: "CHILDREN REACHED",
    value: "847",
    sub: "Across 11 facilities",
    trend: "up",
  },
  {
    label: "FULFILLMENT RATE",
    value: "96%",
    sub: "+4% vs Q1",
    trend: "up",
  },
];

const portfolio = [
  { facility: "Graceland Home, Ibadan", category: "Food", amount: "₦45,000", status: "active" },
  { facility: "House of Hope, Lagos", category: "Medical", amount: "₦22,000", status: "matched" },
  { facility: "Bethel Rest Home, Ibadan", category: "Shelter", amount: "₦180,000", status: "active" },
  { facility: "New Dawn Care Home", category: "Clothing", amount: "₦36,000", status: "fulfilled" },
  { facility: "Covenant Care OVC", category: "Food", amount: "₦28,000", status: "fulfilled" },
];

const statusColor: Record<string, string> = {
  active: styles.statusActive,
  matched: styles.statusMatched,
  fulfilled: styles.statusFulfilled,
};

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      {/* Stat cards */}
      <div className={styles.statGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <p className={styles.statLabel}>{s.label}</p>
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statSub}>
              {s.trend === "up" && <span className={styles.trendUp}>↑ </span>}
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.body}>
        {/* Left — Portfolio table */}
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Active Portfolio</h2>
              <div className={styles.tabs}>
                <span className={`${styles.tab} ${styles.tabActive}`}>14 Active</span>
                <span className={styles.tab}>6 Matched</span>
                <span className={styles.tab}>3 Fulfilled</span>
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>FACILITY</th>
                  <th>CATEGORY</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((row) => (
                  <tr key={row.facility}>
                    <td>{row.facility}</td>
                    <td>
                      <span className={styles.categoryTag}>{row.category}</span>
                    </td>
                    <td className={styles.amount}>{row.amount}</td>
                    <td>
                      <span className={`${styles.status} ${statusColor[row.status]}`}>
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className={styles.moreBtn}>⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — Giving parameters + ESG */}
        <div className={styles.right}>
          <div className={styles.card}>
            <h3 className={styles.sideTitle}>Giving Parameters</h3>

            <div className={styles.paramRow}>
              <span className={styles.paramLabel}>Annual budget</span>
              <span className={styles.paramValue}>₦5,000,000</span>
            </div>

            <div className={styles.paramRow}>
              <span className={styles.paramLabel}>Categories</span>
              <div className={styles.tags}>
                <span className={styles.tag}>Food</span>
                <span className={styles.tag}>Medical</span>
                <span className={styles.tag}>Education</span>
              </div>
            </div>

            <div className={styles.paramRow}>
              <span className={styles.paramLabel}>Geography</span>
              <span className={styles.paramValue}>Ibadan + Lagos</span>
            </div>

            <div className={styles.paramRow}>
              <span className={styles.paramLabel}>Transaction fee</span>
              <span className={styles.paramValue}>1.5% per need</span>
            </div>

            <button className={styles.editBtn}>Edit Parameters</button>
          </div>

          {/* ESG report card */}
          <div className={styles.esgCard}>
            <p className={styles.esgTitle}>Q1 2026 ESG Report Ready</p>
            <p className={styles.esgSub}>Auto-generated · 12 pages · Includes photo evidence</p>
            <div className={styles.esgActions}>
              <button className={styles.esgDownload}>⬇ Download PDF</button>
              <button className={styles.esgPreview}>Preview</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}