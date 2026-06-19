import { Download, Landmark, Plus } from "lucide-react";
import { orgTransactions, spendSummary } from "@/data/dashboardData";
import styles from "./page.module.css";

function formatNaira(amount: number) { return `NGN ${Math.abs(amount).toLocaleString("en-NG")}`; }

export default function FinancesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><p>Finances</p><h1>Wallet balance, transactions, and spend breakdown.</h1></div>
      <div className={styles.body}>
        <div className={styles.left}>
          <section className={styles.walletCard}><div className={styles.walletTop}><span><Landmark size={18} /> Wallet balance</span><button><Plus size={16} /> Fund wallet</button></div><strong>NGN 3,100,000</strong><div className={styles.walletMeta}><div><span>Total deployed</span><b>NGN 1,900,000</b></div><div><span>Annual budget</span><b>NGN 5,000,000</b></div></div></section>
          <section className={styles.card}><div className={styles.cardHeader}><h2>Recent transactions</h2><button><Download size={16} /> Export</button></div><div className={styles.txList}>{orgTransactions.map((tx) => <div key={`${tx.label}-${tx.date}`} className={styles.txRow}><div className={`${styles.txIcon} ${tx.type === "credit" ? styles.creditIcon : styles.debitIcon}`}>{tx.type === "credit" ? "+" : "-"}</div><div className={styles.txInfo}><p>{tx.label}</p><span>{tx.date}{tx.facility ? ` | ${tx.facility}` : ""}</span></div><strong className={tx.type === "credit" ? styles.credit : styles.debit}>{tx.type === "credit" ? "+" : "-"}{formatNaira(tx.amount)}</strong></div>)}</div></section>
        </div>
        <aside className={styles.right}><section className={styles.card}><h2>Quick actions</h2><div className={styles.actions}><button className={styles.primary}>Fund wallet</button><button>Export statement</button><button>Download ESG report</button></div></section><section className={styles.card}><h2>Spending summary</h2><div className={styles.summaryList}>{spendSummary.map((item) => <div key={item.label} className={styles.summaryRow}><div><span>{item.label}</span><strong>{item.amount}</strong></div><div className={styles.summaryTrack}><span style={{ width: `${item.pct}%` }} /></div></div>)}</div></section></aside>
      </div>
    </div>
  );
}
