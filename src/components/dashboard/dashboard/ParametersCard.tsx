import styles from './ParametersCard.module.css';

export default function ParametersCard() {
  return (
    <div className={styles.card}>
      <h2>Giving Parameters</h2>

      <div className={styles.section}>
        <p>Annual Budget</p>
        <h3>₦5,000,000</h3>
      </div>

      <div className={styles.section}>
        <p>Categories</p>

        <div className={styles.tags}>
          <span>Food</span>
          <span>Medical</span>
          <span>Education</span>
        </div>
      </div>

      <button className={styles.button}>Edit Parameters</button>
    </div>
  );
}
