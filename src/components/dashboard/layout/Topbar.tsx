import styles from './Topbar.module.css';

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <button className={styles.secondaryBtn}>
        Download ESG Report
      </button>

      <button className={styles.primaryBtn}>
        Fund New Needs
      </button>
    </div>
  );
}