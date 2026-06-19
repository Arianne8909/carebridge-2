"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Filter, MapPin, Search, WalletCards, X } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { individualGifts, orgPortfolio } from "@/data/dashboardData";
import styles from "@/app/dashboard/needs/page.module.css";

type Variant = "org" | "individual";
type Urgency = "critical" | "high" | "medium" | "low";

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
  facilityName: string;
  verified: boolean;
  category: string;
  items: string[];
  cashEquivalent: number;
  totalDonated: number;
  urgency: Urgency;
  children: number;
  posted: string;
  location: string;
};

type PortfolioItem = {
  id: string;
  facility: string;
  category: string;
  amount: string;
  status: string;
  location: string;
  children: string;
  description: string;
  items: string[];
};

const API_BASE = "https://carebridge-dxrd.onrender.com/api";
const categories = ["All", "Food", "Medical", "Education", "Shelter", "Clothing"];
const urgencyOrder: Record<Urgency, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const statusClass: Record<string, string> = {
  Active: styles.statusActive,
  Matched: styles.statusMatched,
  Fulfilled: styles.statusFulfilled,
  Delivered: styles.statusFulfilled,
  "In review": styles.statusMatched,
};

function mapNeed(item: ApiNeed): Need {
  return {
    id: String(item.id),
    title: item.title || item.facility_name || "Unknown Need",
    description: item.description || "Verified facility request synced from CareBridge.",
    facilityName: item.facility_name || "Verified Facility",
    verified: item.facility_status === "verified",
    category: (item.category || "Other").trim(),
    items: Array.isArray(item.items) ? item.items : [],
    cashEquivalent: Number(item.cash_equivalent ?? 0),
    totalDonated: Number(item.total_donated ?? 0),
    urgency: (item.urgency as Urgency) || "medium",
    children: Number(item.children_count || 0),
    posted: item.created_at
      ? new Date(item.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
      : "Unknown",
    location: [item.city, item.country].filter(Boolean).join(", ") || "Unknown Location",
  };
}

function getPortfolioItems(variant: Variant): PortfolioItem[] {
  if (variant === "individual") {
    return individualGifts.map((gift, index) => ({
      id: `gift-${index}`,
      facility: gift.facility,
      category: gift.category,
      amount: gift.amount,
      status: gift.status,
      location: gift.date,
      children: "Personal giving record",
      description: `Your ${gift.amount} gift to ${gift.facility} is currently marked as ${gift.status.toLowerCase()}.`,
      items: ["Receipt available", "Delivery proof tracked", "Impact update pending"],
    }));
  }

  return orgPortfolio.map((row, index) => ({
    id: `portfolio-${index}`,
    facility: row.facility,
    category: row.category,
    amount: row.amount,
    status: row.status,
    location: row.location,
    children: `${row.children} children`,
    description: `${row.facility} has an active ${row.category.toLowerCase()} commitment in your CareBridge portfolio.`,
    items: ["Need matched to your giving parameters", "Facility details verified", "Fulfillment evidence will be attached"],
  }));
}

export default function NeedsWorkspace({ variant }: { variant: Variant }) {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [urgency, setUrgency] = useState("All");
  const [showFindNeeds, setShowFindNeeds] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedMode, setSelectedMode] = useState<"details" | "fund">("details");

  const portfolioItems = useMemo(() => getPortfolioItems(variant), [variant]);
  const isIndividual = variant === "individual";

  useEffect(() => {
    async function loadNeeds() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/needs`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.needs ?? [];
        setNeeds(items.map(mapNeed));
      } catch {
        setNeeds([]);
      } finally {
        setLoading(false);
      }
    }

    loadNeeds();
  }, []);

  const filteredNeeds = useMemo(() => {
    const query = search.trim().toLowerCase();

    return needs
      .filter((need) => {
        const matchesSearch =
          !query ||
          need.title.toLowerCase().includes(query) ||
          need.facilityName.toLowerCase().includes(query) ||
          need.items.some((item) => item.toLowerCase().includes(query));
        const matchesCategory = category === "All" || need.category.toLowerCase() === category.toLowerCase();
        const matchesUrgency = urgency === "All" || need.urgency === urgency;

        return matchesSearch && matchesCategory && matchesUrgency;
      })
      .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
  }, [needs, search, category, urgency]);

  function openItem(item: PortfolioItem, mode: "details" | "fund") {
    setSelectedItem(item);
    setSelectedMode(mode);
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p>{isIndividual ? "Needs / giving" : "Needs / opportunities"}</p>
          <h1>{isIndividual ? "Track your active gifts and discover new verified needs." : "Manage current commitments and discover new verified needs."}</h1>
          <span>{isIndividual ? "Review your active giving records before opening the wider list of live needs." : "Keep active portfolio work visible while finding new requests that match your giving parameters."}</span>
        </div>
        <button className={styles.heroAction} onClick={() => setShowFindNeeds((value) => !value)}>
          {showFindNeeds ? "Hide new needs" : "Find new needs"}
        </button>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <p>{isIndividual ? "My giving" : "Portfolio"}</p>
            <h2>{isIndividual ? "Active giving" : "Active portfolio"}</h2>
          </div>
          <div className={styles.tabGroup}>
            <span>{isIndividual ? "4 Gifts" : "14 Active"}</span>
            <span>{isIndividual ? "2 Pending" : "6 Matched"}</span>
            <span>{isIndividual ? "15 Proofs" : "3 Fulfilled"}</span>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{isIndividual ? "Facility" : "Facility"}</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolioItems.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.facility}</strong><span>{row.location} | {row.children}</span></td>
                  <td><span className={styles.categoryPill}>{row.category}</span></td>
                  <td className={styles.amount}>{row.amount}</td>
                  <td><span className={`${styles.status} ${statusClass[row.status] ?? styles.statusActive}`}>{row.status}</span></td>
                  <td>
                    <div className={styles.tableActions}>
                      <button onClick={() => openItem(row, "details")}>Details</button>
                      <button className={styles.tableFund} onClick={() => openItem(row, "fund")}>{isIndividual ? "Give again" : "Fund"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <div className={styles.detailPanel}>
            <div className={styles.detailHeader}>
              <div>
                <p>{selectedMode === "fund" ? "Funding" : "Need details"}</p>
                <h3>{selectedItem.facility}</h3>
              </div>
              <button aria-label="Close details" onClick={() => setSelectedItem(null)}><X size={18} /></button>
            </div>
            <div className={styles.detailGrid}>
              <div>
                <span>Category</span>
                <strong>{selectedItem.category}</strong>
              </div>
              <div>
                <span>Current amount</span>
                <strong>{selectedItem.amount}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedItem.status}</strong>
              </div>
              <div>
                <span>Location / date</span>
                <strong>{selectedItem.location}</strong>
              </div>
            </div>
            <p className={styles.detailCopy}>{selectedItem.description}</p>
            <ul className={styles.detailItems}>{selectedItem.items.map((item) => <li key={item}>{item}</li>)}</ul>
            {selectedMode === "fund" && (
              <div className={styles.fundPanel}>
                <div><WalletCards size={18} /><span>{isIndividual ? "Choose a giving amount" : "Choose a funding amount"}</span></div>
                <div className={styles.amountButtons}><button>NGN 10,000</button><button>NGN 25,000</button><button>NGN 50,000</button><button>Custom</button></div>
                <Link href={isIndividual ? "/individual-dashboard/needs" : "/dashboard/finances"} className={styles.confirmFund}>{isIndividual ? "Continue gift" : "Continue funding"}</Link>
              </div>
            )}
          </div>
        )}
      </section>

      {showFindNeeds && (
        <section id="find-needs" className={styles.card}>
          <div className={styles.sectionHeader}>
            <div>
              <p>Live API</p>
              <h2>Find new needs</h2>
            </div>
            <div className={styles.resultCount}>Showing <strong>{filteredNeeds.length}</strong> of <strong>{needs.length}</strong></div>
          </div>

          <div className={styles.filterBar}>
            <label className={styles.searchBox}>
              <Search size={18} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search needs, items, or facilities" />
            </label>
            <label className={styles.selectBox}>
              <Filter size={17} />
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <select className={styles.select} value={urgency} onChange={(event) => setUrgency(event.target.value)}>
              <option value="All">All urgency</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {loading ? (
            <div className={styles.grid}><div className={styles.skeleton} /><div className={styles.skeleton} /><div className={styles.skeleton} /></div>
          ) : filteredNeeds.length === 0 ? (
            <div className={styles.emptyState}>No needs match your filters.</div>
          ) : (
            <div className={styles.grid}>
              {filteredNeeds.map((need) => (
                <article key={need.id} className={styles.needCard}>
                  <div className={styles.needHead}>
                    <div>
                      <div className={styles.needTitle}><h3>{need.title}</h3>{need.verified && <MdVerified className={styles.verified} />}</div>
                      <p><MapPin size={15} /> {need.location}</p>
                    </div>
                    <span className={`${styles.badge} ${styles[need.urgency]}`}>{need.urgency}</span>
                  </div>
                  <div className={styles.needCategory}>{need.category.toLowerCase()}</div>
                  <p className={styles.needDesc}>{need.description}</p>
                  <ul className={styles.needItems}>{need.items.length > 0 ? need.items.slice(0, 3).map((item) => <li key={item}>{item}</li>) : <li>No items listed</li>}</ul>
                  <div className={styles.needMeta}><span>{need.children} children impacted</span><span>{need.posted}</span></div>
                  <div className={styles.progressTrack}><i style={{ width: `${Math.min((need.totalDonated / Math.max(need.cashEquivalent, 1)) * 100, 100)}%` }} /></div>
                  <div className={styles.needBottom}>
                    <div><span>Cash equivalent</span><strong>NGN {need.cashEquivalent.toLocaleString()}</strong></div>
                    <div className={styles.actions}><Link href={`/needs/${need.id}`} className={styles.fundBtn}>Fund</Link><Link href={`/needs/${need.id}`} className={styles.detailBtn}>Details</Link></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
