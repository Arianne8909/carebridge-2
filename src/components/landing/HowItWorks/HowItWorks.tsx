import styles from "./HowItWorks.module.css";
import { FaSearch, FaDonate, FaBoxOpen } from "react-icons/fa";

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FaSearch />,
    title: "Discover Verified Needs",
    description:
      "Browse real, verified requests from hospitals, homes, and communities across Africa.",
  },
  {
    icon: <FaDonate />,
    title: "Donate Directly",
    description:
      "Send support directly to verified recipients — no middlemen, full transparency.",
  },
  {
    icon: <FaBoxOpen />,
    title: "See Impact Delivered",
    description:
      "Track deliveries and see proof that your contribution made a real difference.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>How It Works</h2>
        <p className={styles.subtitle}>
          Simple. Transparent. Direct impact in 3 steps.
        </p>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconCircle}>{step.icon}</div>

              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardText}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}