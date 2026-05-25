"use client";

import { useEffect, useState } from "react";
import styles from "./Urgent.module.css";
import { AiFillCheckCircle } from "react-icons/ai";

type Need = {
  id: number;
  facility_name: string;
  city: string;
  country: string;
  urgency: "critical" | "high" | "low";
  category: string;
  children_count: number;
  cash_equivalent: string;
  items: string[];
  created_at: string;
};

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function Urgent() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const res = await fetch(
          "https://carebridge-dxrd.onrender.com/api/needs/urgent"
        );

        const data = await res.json();
        setNeeds(data);
      } catch (err) {
        console.error(err);
        setNeeds([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNeeds();
  }, []);

  return (
    <section className={styles.section}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Urgent Needs</h2>
        <a href="#">View all →</a>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {loading && <p>Loading...</p>}

        {!loading && needs.length === 0 && (
          <p>No urgent needs right now.</p>
        )}

        {needs.map((need) => {
          const location = `${need.city}, ${need.country}`;

          return (
            <div key={need.id} className={styles.card}>
              {/* TOP */}
              <div className={styles.top}>
                <div>
                  <h3 className={styles.title}>
                    {need.facility_name}
                    <span className={styles.verified}><AiFillCheckCircle /></span>
                  </h3>
                  <p className={styles.location}>{location}</p>
                </div>

                <span className={`${styles.badge} ${styles[need.urgency]}`}>
                  {need.urgency}
                </span>
              </div>

              {/* CATEGORY */}
              <span className={styles.category}>{need.category}</span>

              {/* ITEMS */}
              <ul className={styles.items}>
                {need.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* META (THIS WAS MISPLACED BEFORE) */}
              <div className={styles.meta}>
                <span>{need.children_count} children impacted</span>
                <span>{timeAgo(need.created_at)}</span>
              </div>

              {/* FOOTER */}
              <div className={styles.footer}>
                <div>
                  <small>Cash equivalent</small>
                  <strong>${need.cash_equivalent}</strong>
                </div>

                <div className={styles.actions}>
                  <button className={styles.primary}>Fund</button>
                  <button className={styles.secondary}>Details</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}