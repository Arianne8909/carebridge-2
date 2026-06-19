import styles from "./HowItWorks.module.css";

const steps = [
  {
    icon: "🔍",
    title: "Discover Verified Needs",
    desc: "Browse real, verified requests from orphanages and communities across Africa.",
  },
  {
    icon: "💳",
    title: "Donate Directly",
    desc: "Send support directly to verified recipients — no middlemen, full transparency.",
  },
  {
    icon: "📸",
    title: "See Impact Delivered",
    desc: "Receive photo proof within 48 hours that your donation made a real difference.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>How It Works</p>
        <h2 className={styles.heading}>
          Making Giving Simple,{" "}
          <span className={styles.accent}>Transparent and Impactful</span>
        </h2>
        <p className={styles.sub}>Three simple steps connect verified needs with compassionate donors</p>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}