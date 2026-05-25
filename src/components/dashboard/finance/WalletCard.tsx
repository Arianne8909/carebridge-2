import styles from './WalletCard.module.css';

export default function WalletCard() {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <p>Wallet Balance</p>
          <h1>₦3,100,000</h1>
        </div>

        <button>Fund Wallet</button>
      </div>

      <div className={styles.bottom}>
        <div>
          <p>Total Deployed</p>
          <h3>₦1,900,000</h3>
        </div>

        <div>
          <p>Monthly Budget</p>
          <h3>₦5,000,000</h3>
        </div>
      </div>
    </div>
  );
}
