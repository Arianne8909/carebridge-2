import Link from "next/link";
import styles from "./Categories.module.css";

const categories = [
  { icon: "💧", label: "Food & Nutrition", color: "#f97316", bg: "#fff7ed", href: "/needs?category=food" },
  { icon: "🎓", label: "Education & School Fees", color: "#3b82f6", bg: "#eff6ff", href: "/needs?category=education" },
  { icon: "🏥", label: "Healthcare & Medical Support", color: "#ef4444", bg: "#fef2f2", href: "/needs?category=medical" },
  { icon: "🛏️", label: "Shelter & Bedding", color: "#8b5cf6", bg: "#f5f3ff", href: "/needs?category=shelter" },
  { icon: "👕", label: "Clothing & Essentials", color: "#22c55e", bg: "#f0fdf4", href: "/needs?category=clothing" },
  { icon: "🚨", label: "Emergency Support", color: "#f43f5e", bg: "#fff1f2", href: "/needs?category=emergency" },
];

export default function Categories() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Every Need Has a Face.{" "}
          <span className={styles.accent}>Every Gift Changes a Life.</span>
        </h2>
        <p className={styles.sub}>
          Explore real needs from verified organizations across Africa by category
        </p>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={styles.card}
              style={{ "--cat-color": cat.color, "--cat-bg": cat.bg } as React.CSSProperties}
            >
              <span className={styles.icon}>{cat.icon}</span>
              <span className={styles.label}>{cat.label}</span>
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/needs" className={styles.ctaBtn}>
            Browse All Needs 💙
          </Link>
        </div>
      </div>
    </section>
  );
}