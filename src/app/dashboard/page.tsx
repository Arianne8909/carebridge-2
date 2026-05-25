import styles from './Dashboard.module.css';

import Sidebar from '@/components/dashboard/layout/Sidebar';
import Topbar from '@/components/dashboard/layout/Topbar';

import StatCard from '@/components/dashboard/dashboard/StatCard';
import PortfolioTable from '@/components/dashboard/dashboard/PortfolioTable';
import ParametersCard from '@/components/dashboard/dashboard/ParametersCard';

import { stats } from '@/data/dashboardData';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <Topbar />

        <div className={styles.statsGrid}>
          {stats.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>

        <div className={styles.bottomSection}>
          <PortfolioTable />
          <ParametersCard />
        </div>
      </div>
    </div>
  );
}