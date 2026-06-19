import styles from "./TrustSection.module.css";
import {
  FaShieldAlt,
  FaClipboardList,
  FaMapMarkerAlt,
  FaChartLine,
  FaSearch,
  FaClock,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

const verificationSteps = [
  {
    title: "Registration Verification",
    desc: "Government registration documents and legal status confirmed",
  },
  {
    title: "Leadership Verification",
    desc: "Background checks on directors and key staff members",
  },
  {
    title: "Location Verification",
    desc: "On-site visits and GPS coordinates confirmed",
  },
  {
    title: "Community References",
    desc: "Local leaders and community members vouch for the organization",
  },
  {
    title: "Ongoing Monitoring",
    desc: "Continuous reporting and annual re-verification required",
  },
];

const transparency = [
  {
    icon: <FaShieldAlt />,
    title: "Who they are helping",
    desc: "See the verified facility, location, and children served",
  },
  {
    icon: <FaClipboardList />,
    title: "What they funded",
    desc: "Exact items, quantities, and costs listed for every need",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "How funds were used",
    desc: "Itemized receipts and purchase documentation provided",
  },
  {
    icon: <FaChartLine />,
    title: "Impact created",
    desc: "Photo proof and impact stories within 48 hours of fulfillment",
  },
];

const pillars = [
  {
    icon: <FaShieldAlt />,
    label: "Verified",
    sub: "Organizations",
  },
  {
    icon: <FaSearch />,
    label: "100%",
    sub: "Transparent",
  },
  {
    icon: <FaClock />,
    label: "48 Hours",
    sub: "Photo Proof",
  },
  {
    icon: <FaHeart />,
    label: "Direct",
    sub: "Impact",
  },
];

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Trust Is <span className={styles.accent}>Our Product</span>
        </h2>

        <p className={styles.sub}>
          We verify every organization and track every donation to ensure
          complete transparency
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Our Verification Process</h3>

            <ul className={styles.list}>
              {verificationSteps.map((s) => (
                <li key={s.title} className={styles.listItem}>
                  <span className={styles.check}>
                    <FaCheckCircle />
                  </span>

                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Donor Transparency</h3>

            <ul className={styles.list}>
              {transparency.map((t) => (
                <li key={t.title} className={styles.listItem}>
                  <span className={styles.tIcon}>{t.icon}</span>

                  <div>
                    <strong>{t.title}</strong>
                    <p>{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.highlight}>
              <div className={styles.highlightPct}>100%</div>
              <p>of your intended donation reaches the facility</p>
              <span>Platform fee (1.5%) is added on top</span>
            </div>
          </div>
        </div>

        <div className={styles.pillars}>
          {pillars.map((p) => (
            <div key={p.label} className={styles.pillar}>
              <span className={styles.pillarIcon}>{p.icon}</span>
              <strong>{p.label}</strong>
              <span>{p.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}