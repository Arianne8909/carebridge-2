import styles from './Transactions.module.css';

const transactions = [
  {
    title: 'Funded: Graceland Home - Food Need',
    date: '2026-04-28',
    amount: '-₦45,000',
    negative: true,
  },
  {
    title: 'Wallet funding via Mobile Money',
    date: '2026-04-27',
    amount: '+₦1,000,000',
    negative: false,
  },
];

export default function Transactions() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Recent Transactions</h2>
      </div>

      {transactions.map((item, index) => (
        <div key={index} className={styles.transaction}>
          <div>
            <h4>{item.title}</h4>
            <p>{item.date}</p>
          </div>

          <span className={item.negative ? styles.red : styles.green}>
            {item.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
