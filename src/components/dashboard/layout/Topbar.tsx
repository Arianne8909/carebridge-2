"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Download,
  HeartHandshake,
  Plus,
  LogOut,
} from "lucide-react";
import styles from "./Topbar.module.css";

type Variant = "org" | "individual";

export default function Topbar({ variant = "org" }: { variant?: Variant }) {
  const router = useRouter();
  const isOrg = variant === "org";

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.avatar}>{isOrg ? "GT" : "AM"}</div>

        <div className={styles.info}>
          <span className={styles.name}>
            {isOrg ? "GTCo Foundation" : "Amina Martins"}
          </span>
          <span className={styles.role}>
            {isOrg
              ? "CSR Partner | FY2026 Portfolio"
              : "Individual donor | Lagos"}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={18} />
        </button>

        <button className={styles.ghostBtn}>
          <Download size={16} />
          <span>{isOrg ? "ESG Report" : "Giving Receipt"}</span>
        </button>

        <Link
          href={
            isOrg
              ? "/dashboard/needs"
              : "/individual-dashboard/needs"
          }
          className={styles.primaryBtn}
        >
          {isOrg ? <Plus size={17} /> : <HeartHandshake size={17} />}
          <span>{isOrg ? "Fund New Need" : "Give Now"}</span>
        </Link>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className={styles.ghostBtn}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}