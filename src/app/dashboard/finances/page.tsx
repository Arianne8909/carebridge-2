import styles from "./page.module.css";

const transactions = [
  { label: "Funded: Graceland Home - Food Need", date: "2026-04-28 at 14:32", facility: "Graceland Home", amount: -45000, type: "debit" },
  { label: "Wallet funding via Mobile Money", date: "2026-04-27 at 09:15", facility: null, amount: 1000000, type: "credit" },
  { label: "Funded: House of Hope - Medical Need", date: "2026-04-26 at 16:45", facility: "House of Hope", amount: -22000, type: "debit" },
  { label: "Funded: Bethel Rest Home - Shelter Need", date: "2026-04-25 at 11:20", facility: "Bethel Rest Home", amount: -180000, type: "debit" },
  { label: "Wallet funding via Mobile Money", date: "2026-04-20 at 08:30", facility: null, amount: 500000, type: "credit" },
  { label: "Funded: New Dawn Care Home - Clothing Need", date: "2026-04-18 at 10:00", facility: "New Dawn Care Home", amount: -36000, type: "debit" },
];

function formatNaira(amount: number) {
  const abs = Math.abs(amount);
  return `₦${abs.toLocaleString("en-NG")}`;
}

export default function FinancesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>Finances</h1>
        <p>Wallet balance, transactions and spending overview</p>
      </div>

      <div className={styles.body}>
        {/* Left */}
        <div className={styles.left}>
          {/* Wallet card */}
          <div className={styles.walletCard}>
            <div className={styles.walletTop}>
              <div className={styles.walletLabel}>
                <span className={styles.walletIcon}>▣</span>
                Wallet Balance
              </div>
              <button className={styles.fundWalletBtn}>Fund Wallet</button>
            </div>
            <div className={styles.walletAmount}>₦3,100,000</div>
            <div className={styles.walletMeta}>
              <div>
                <p className={styles.metaLabel}>Total Deployed</p>
                <p className={styles.metaValue}>₦1,900,000</p>
              </div>
              <div>
                <p className={styles.metaLabel}>Monthly Budget</p>
                <p className={styles.metaValue}>₦5,000,000</p>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Recent Transactions</h2>
              <button className={styles.exportBtn}>⬇ Export</button>
            </div>

            <div className={styles.txList}>
              {transactions.map((tx, i) => (
                <div key={i} className={styles.txRow}>
                  <div
                    className={`${styles.txIcon} ${
                      tx.type === "credit" ? styles.txIconCredit : styles.txIconDebit
                    }`}
                  >
                    {tx.type === "credit" ? "↑" : "↓"}
                  </div>
                  <div className={styles.txInfo}>
                    <p className={styles.txLabel}>{tx.label}</p>
                    <p className={styles.txMeta}>
                      {tx.date}
                      {tx.facility && ` · ${tx.facility}`}
                    </p>
                  </div>
                  <div
                    className={`${styles.txAmount} ${
                      tx.type === "credit" ? styles.txAmountCredit : styles.txAmountDebit
                    }`}
                  >
                    {tx.type === "credit" ? "+" : ""}
                    {formatNaira(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <div className={styles.card}>
            <h3 className={styles.sideTitle}>Quick Actions</h3>
            <div className={styles.quickActions}>
              <button className={styles.qaPrimary}>▣ Fund Wallet</button>
              <button className={styles.qaSecondary}>⬇ Export Statement</button>
              <button className={styles.qaSecondary}>⬇ Download ESG Report</button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sideTitle}>Spending Summary</h3>
            <div className={styles.summaryList}>
              {[
                { label: "Food", pct: 42, amount: "₦798,000" },
                { label: "Medical", pct: 28, amount: "₦532,000" },
                { label: "Shelter", pct: 18, amount: "₦342,000" },
                { label: "Clothing", pct: 12, amount: "₦228,000" },
              ].map((s) => (
                <div key={s.label} className={styles.summaryRow}>
                  <div className={styles.summaryInfo}>
                    <span>{s.label}</span>
                    <span>{s.amount}</span>
                  </div>
                  <div className={styles.summaryTrack}>
                    <div
                      className={styles.summaryFill}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}