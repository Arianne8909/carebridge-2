"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    org: "GTCo Foundation",
    type: "CSR Partner",
    contact: "giving@gtcofoundation.org",
    phone: "+234 812 000 0001",
    country: "Nigeria",
    city: "Lagos",
    focus: "Food, Medical, Education",
    budget: "5,000,000",
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>Profile</h1>
        <p>Manage your organization details and giving preferences</p>
      </div>

      <div className={styles.body}>
        {/* Left — org details */}
        <div className={styles.left}>
          {/* Avatar + name */}
          <div className={styles.card}>
            <div className={styles.profileTop}>
              <div className={styles.avatar}>GT</div>
              <div>
                <h2 className={styles.orgName}>{form.org}</h2>
                <span className={styles.orgType}>{form.type}</span>
              </div>
              <button
                className={styles.editBtn}
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Save Changes" : "✏ Edit Profile"}
              </button>
            </div>

            <div className={styles.divider} />

            <div className={styles.fieldGrid}>
              {[
                { label: "Organization Name", key: "org" },
                { label: "Account Type", key: "type" },
                { label: "Contact Email", key: "contact" },
                { label: "Phone Number", key: "phone" },
                { label: "Country", key: "country" },
                { label: "City", key: "city" },
              ].map(({ label, key }) => (
                <div key={key} className={styles.field}>
                  <label className={styles.fieldLabel}>{label}</label>
                  {editing ? (
                    <input
                      className={styles.fieldInput}
                      value={form[key as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  ) : (
                    <p className={styles.fieldValue}>
                      {form[key as keyof typeof form]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Donation history summary */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Donation History</h3>
            <div className={styles.historyGrid}>
              {[
                { label: "Total Donated", value: "₦1,900,000" },
                { label: "Needs Funded", value: "23" },
                { label: "Children Reached", value: "847" },
                { label: "Avg per Need", value: "₦82,608" },
              ].map((s) => (
                <div key={s.label} className={styles.historyStat}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — preferences */}
        <div className={styles.right}>
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Giving Preferences</h3>

            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Annual Budget</span>
              {editing ? (
                <input
                  className={styles.fieldInput}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                />
              ) : (
                <span className={styles.prefValue}>₦{form.budget}</span>
              )}
            </div>

            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Focus Categories</span>
              <div className={styles.tags}>
                {form.focus.split(",").map((f) => (
                  <span key={f} className={styles.tag}>{f.trim()}</span>
                ))}
              </div>
            </div>

            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Transaction Fee</span>
              <span className={styles.prefValue}>1.5% per need</span>
            </div>

            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Payment Method</span>
              <span className={styles.prefValue}>Paystack (Mobile Money)</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Verification Status</h3>
            <div className={styles.verifyBadge}>
              <span className={styles.verifyIcon}>✓</span>
              <div>
                <p className={styles.verifyTitle}>Verified Partner</p>
                <p className={styles.verifySub}>Verified since January 2026</p>
              </div>
            </div>
            <div className={styles.verifyList}>
              {[
                "Organization documents verified",
                "Contact details confirmed",
                "Banking details linked",
              ].map((item) => (
                <div key={item} className={styles.verifyItem}>
                  <span>✅</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Account Actions</h3>
            <div className={styles.actionList}>
              <button className={styles.actionBtn}>🔒 Change Password</button>
              <button className={styles.actionBtn}>📧 Update Email</button>
              <button className={styles.actionBtn}>⬇ Download My Data</button>
              <button className={`${styles.actionBtn} ${styles.danger}`}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}