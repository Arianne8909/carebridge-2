import styles from './finances.module.css';

import Sidebar from '@/components/dashboard/layout/Sidebar';
import Topbar from '@/components/dashboard/layout/Topbar';

import WalletCard from '@/components/dashboard/finance/WalletCard';
import QuickActions from '@/components/dashboard/finance/QuickActions';
import Transactions from '@/components/dashboard/finance/Transactions';

export default function FinancesPage() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <Topbar />

        <div className={styles.header}>
          <h1>Finances</h1>
          <p>Manage your organization wallet and track transactions</p>
        </div>

        <div className={styles.topSection}>
          <WalletCard />
          <QuickActions />
        </div>

        <Transactions />
      </div>
    </div>
  );
}