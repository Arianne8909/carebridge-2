"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, HeartHandshake, Home, Landmark, LayoutDashboard, UserRound } from "lucide-react";
import styles from "./Sidebar.module.css";

type Variant = "org" | "individual";

const navByVariant = {
  org: [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/needs", icon: HeartHandshake, label: "Needs" },
    { href: "/dashboard/finances", icon: Landmark, label: "Finances" },
    { href: "/dashboard/profile", icon: UserRound, label: "Profile" },
  ],
  individual: [
    { href: "/individual-dashboard", icon: Home, label: "Home" },
    { href: "/individual-dashboard/needs", icon: HeartHandshake, label: "Needs" },
    { href: "/individual-dashboard/impact", icon: BarChart3, label: "Impact" },
    { href: "/individual-dashboard/profile", icon: UserRound, label: "Profile" },
  ],
};

export default function Sidebar({ variant = "org" }: { variant?: Variant }) {
  const pathname = usePathname();
  const navItems = navByVariant[variant];

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <div className={styles.logo}>CB</div>
          <div><p>CareBridge</p><span>{variant === "org" ? "Organisation Portal" : "Individual Portal"}</span></div>
        </div>
        <nav className={styles.nav} aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} className={`${styles.navItem} ${active ? styles.active : ""}`}><Icon size={18} strokeWidth={2.3} /><span>{item.label}</span></Link>;
          })}
        </nav>
      </aside>
      <nav className={styles.mobileNav} aria-label="Dashboard mobile navigation">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return <Link key={item.href} href={item.href} className={`${styles.mobileItem} ${active ? styles.mobileActive : ""}`}><Icon size={19} strokeWidth={2.3} /><span>{item.label}</span></Link>;
        })}
      </nav>
    </>
  );
}
