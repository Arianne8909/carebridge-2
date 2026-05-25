import styles from './QuickActions.module.css';

export default function QuickActions() {
  return (
    <div className={styles.card}>
      <h2>Quick Actions</h2>

      <button className={styles.primary}>Fund Wallet</button>
      <button>Export Statement</button>
      <button>Download ESG Report</button>
    </div>
  );
}