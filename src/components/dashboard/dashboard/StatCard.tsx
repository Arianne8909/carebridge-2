import styles from './StatCard.module.css';

interface Props {
  title: string;
  value: string;
  subtext: string;
}

export default function StatCard({ title, value, subtext }: Props) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <h2>{value}</h2>
      <span>{subtext}</span>
    </div>
  );
}