import Topbar from "@/components/dashboard/layout/Topbar";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import styles from "./Dashboard.module.css";
import Footer from "@/components/landing/Footer/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className={styles.root}>
      <Topbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
    <Footer />
    </>
  );
}