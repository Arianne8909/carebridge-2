'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Sidebar.module.css';

import {
  LayoutDashboard,
  Heart,
  Wallet,
  User,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>GT</div>

        <div>
          <h2>GTCo Foundation</h2>
          <p>CSR Partner • FY2026 Portfolio</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link
          href="/dashboard"
          className={`${styles.link} ${pathname === '/dashboard' ? styles.active : ''}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link href="#" className={styles.link}>
          <Heart size={18} />
          Needs / Opportunities
        </Link>

        <Link
          href="/dashboard/finances"
          className={`${styles.link} ${pathname === '/dashboard/finances' ? styles.active : ''}`}
        >
          <Wallet size={18} />
          Finances
        </Link>

        <Link href="#" className={styles.link}>
          <User size={18} />
          Profile
        </Link>
      </nav>
    </aside>
  );
}