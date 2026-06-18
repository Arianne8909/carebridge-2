"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const BASE_URL = "https://carebridge-dxrd.onrender.com/api";

interface Need {
  id: number;
  title: string;
  description: string;
  category: string;
  urgency: string;
  cash_equivalent?: number;
  total_donated?: number;
  facility_name?: string;
  city?: string;
  country?: string;
}

const urgencyColor: Record<string, string> = {
  critical: styles.urgencyCritical,
  high: styles.urgencyHigh,
  low: styles.urgencyLow,
};

const categoryColor: Record<string, string> = {
  food: "#f97316",
  education: "#3b82f6",
  medical: "#ef4444",
  clothing: "#8b5cf6",
  shelter: "#06b6d4",
};

export default function NeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const url =
          filter === "all"
            ? `${BASE_URL}/needs`
            : `${BASE_URL}/needs?category=${filter}`;
        const res = await fetch(url);
        const data = await res.json();
        setNeeds(Array.isArray(data) ? data : data.needs ?? []);
      } catch {
        setNeeds([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNeeds();
  }, [filter]);

  const categories = ["all", "food", "education", "medical", "clothing", "shelter"];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Needs / Opportunities</h1>
          <p>Browse and fund active needs from verified facilities</p>
        </div>
        <Link href="/needs" className={styles.browseBtn}>
          View Full Needs Page →
        </Link>
      </div>

      {/* Filter tabs */}
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ""}`}
            onClick={() => { setFilter(cat); setLoading(true); }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading needs...</p>
        </div>
      )}

      {!loading && needs.length === 0 && (
        <div className={styles.empty}>
          <p>No needs found for this category.</p>
          <Link href="/needs" className={styles.browseBtn}>Browse all needs</Link>
        </div>
      )}

      {!loading && needs.length > 0 && (
        <div className={styles.grid}>
          {needs.map((need) => {
            const progress =
              need.cash_equivalent && need.total_donated
                ? Math.min((need.total_donated / need.cash_equivalent) * 100, 100)
                : 0;
            const catColor = categoryColor[need.category] ?? "#0d9488";

            return (
              <div key={need.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span
                      className={styles.catBadge}
                      style={{ background: `${catColor}18`, color: catColor }}
                    >
                      {need.category}
                    </span>
                    <span className={`${styles.urgencyBadge} ${urgencyColor[need.urgency] ?? styles.urgencyHigh}`}>
                      {need.urgency}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{need.title}</h3>
                  <p className={styles.cardFacility}>
                    📍 {need.facility_name ?? "Verified Facility"}{need.city ? `, ${need.city}` : ""}
                  </p>
                  {need.description && (
                    <p className={styles.cardDesc}>{need.description}</p>
                  )}
                </div>

                {need.cash_equivalent && (
                  <div className={styles.cardProgress}>
                    <div className={styles.progressInfo}>
                      <span>₦{(need.total_donated ?? 0).toLocaleString()} raised</span>
                      <span>of ₦{need.cash_equivalent.toLocaleString()}</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Link href={`/needs/${need.id}`} className={styles.fundBtn}>
                  💛 Fund This Need
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}