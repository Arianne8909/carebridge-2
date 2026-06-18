'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './BrowseNeeds.module.css';
import Link from 'next/link';
import { MdVerified } from 'react-icons/md';

type Urgency = 'critical' | 'high' | 'medium' | 'low';

type ApiNeed = {
  id: string | number;
  facility_name?: string;
  title?: string;
  facility_status?: string;
  category?: string;
  items?: string[];
  total_donated?: number | string;
  cash_equivalent?: number | string;
  urgency?: Urgency;
  children_count?: number;
  created_at?: string;
  city?: string;
  country?: string;
  description?: string;
};

type Need = {
  id: string;
  title: string;
  description: string;
  facility_name?: string;
  verified: boolean;
  category: string;
  items: string[];
  cash_equivalent: number;
  total_donated: number;
  urgency: Urgency;
  children: number;
  posted: string;
  location: string;
};

const API_BASE = 'https://carebridge-dxrd.onrender.com/api';

const urgencyOrder: Record<Urgency, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

function mapNeed(item: ApiNeed): Need {
  const cash = Number(item.cash_equivalent ?? 0);
  const donated = Number(item.total_donated ?? 0);

  return {
    id: String(item.id),

    title: item.title || item.facility_name || 'Unknown Need',
    description: item.description || '',

    facility_name: item.facility_name,
    verified: item.facility_status === 'verified',

    category: (item.category || 'Other').trim(),
    items: Array.isArray(item.items) ? item.items : [],

    cash_equivalent: cash,
    total_donated: donated,

    urgency: (item.urgency as Urgency) || 'medium',

    children: Number(item.children_count || 0),

    posted: item.created_at
      ? new Date(item.created_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        })
      : 'Unknown',

    location:
      [item.city, item.country].filter(Boolean).join(', ') ||
      'Unknown Location',
  };
}

export default function BrowseNeeds() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [urgency, setUrgency] = useState('All');

 useEffect(() => {
  async function loadNeeds() {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/needs`);
      const data = await res.json();

      console.log("RAW API RESPONSE:", data); // 👈 ADD THIS

      setNeeds(data.map(mapNeed));
    } catch (err) {
      console.error("FAILED:", err);
    } finally {
      setLoading(false);
    }
  }

  loadNeeds();
}, []);

  const filtered = useMemo(() => {
    return needs
      .filter((n) => {
        const q =
          search.trim() === '' ||
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.items.some((i) =>
            i.toLowerCase().includes(search.toLowerCase())
          );

        const c =
          category === 'All' ||
          n.category.toLowerCase() === category.toLowerCase();

        const u =
          urgency === 'All' ||
          n.urgency === urgency;

        return q && c && u;
      })
      .sort(
        (a, b) =>
          urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
      );
  }, [needs, search, category, urgency]);

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.dashHeader}>
        <h1>Browse Live Needs</h1>
        <p>Support verified orphanages across Nigeria with direct impact.</p>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <input
          placeholder="🔍 Search needs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Medical">Medical</option>
          <option value="Education">Education</option>
          <option value="Shelter">Shelter</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option value="All">All</option>
          <option value="critical">🔴 Critical</option>
          <option value="high">🟠 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        <div className={styles.filterCount}>
          Showing <strong>{filtered.length}</strong> of{' '}
          <strong>{needs.length}</strong> needs
        </div>
      </div>

      {/* GRID */}
      <div className={styles.grid3}>

        {/* LOADING */}
        {loading ? (
          <>
            <div className={styles.needCardSkeleton} />
            <div className={styles.needCardSkeleton} />
            <div className={styles.needCardSkeleton} />
          </>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            No needs match your filters.
          </div>
        ) : (
          filtered.map((need) => (
            <div key={need.id} className={styles.needCard}>
              <div className={styles.needCardHead}>
                <div>
                  <div className={styles.needCardTitle}>
                    <h3>{need.title}</h3>
                    {need.verified && (
                      <span className={styles.needVerified}>
                        <MdVerified />
                      </span>
                    )}
                  </div>

                  <div className={styles.needLocation}>
                    📍 {need.location}
                  </div>
                </div>

                <span className={`${styles.badge} ${styles[need.urgency]}`}>
                  {need.urgency.toUpperCase()}
                </span>
              </div>

              <div className={styles.needCategory}>
                {need.category.toLowerCase()}
              </div>

              <ul className={styles.needItems}>
                {need.items?.length > 0 ? (
                  need.items.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>No items listed</li>
                )}
              </ul>

              <div className={styles.needStatRow}>
                <span>{need.children} children impacted</span>
                <span>{need.posted}</span>
              </div>

              <div className={styles.needDivider} />

              <div className={styles.needBottomRow}>
                <div>
                  <div className={styles.needPriceLabel}>
                    Cash equivalent
                  </div>
                  <div className={styles.needPrice}>
                    ₦{need.cash_equivalent.toLocaleString()}
                  </div>
                </div>

                <div className={styles.needCardActions}>
                  <Link href={`/needs/${need.id}`} className={styles.btnFund}>
                    Fund
                  </Link>
                  <Link href={`/needs/${need.id}`} className={styles.btnDetail}>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}