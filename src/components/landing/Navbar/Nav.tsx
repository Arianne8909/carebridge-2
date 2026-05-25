import styles from "./Nav.module.css";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        Care<span>Bridge</span> OVC
      </div>

    
      <div className={styles.actions}>
        <Link href="/auth">
  <Button variant="ghost">Login</Button>
</Link>

        <Button variant="primary">Browse Needs</Button>
      </div>
    </nav>
  );
}