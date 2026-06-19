import Topbar from "@/components/dashboard/layout/Topbar";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import Footer from "@/components/landing/Footer/Footer";
import styles from "../dashboard/Dashboard.module.css";

export default function IndividualDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Topbar variant="individual" />
      <div className={styles.body}>
        <Sidebar variant="individual" />
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
