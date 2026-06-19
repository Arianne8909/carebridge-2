import { BadgeCheck, Mail, MapPin, UserRound } from "lucide-react";
import styles from "../page.module.css";

export default function IndividualProfilePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}><div><p>Profile</p><h1>Amina Martins</h1><span>Individual donor | Lagos, Nigeria</span></div></section>
      <section className={styles.card}>
        <div className={styles.needRow}><div><strong><UserRound size={16} /> Full name</strong><span>Amina Martins</span></div></div>
        <div className={styles.needRow}><div><strong><Mail size={16} /> Email</strong><span>amina@example.com</span></div></div>
        <div className={styles.needRow}><div><strong><MapPin size={16} /> Location</strong><span>Lagos, Nigeria</span></div></div>
        <div className={styles.needRow}><div><strong><BadgeCheck size={16} /> Status</strong><span>Verified donor profile</span></div></div>
      </section>
    </div>
  );
}
