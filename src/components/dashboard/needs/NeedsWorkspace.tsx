"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Filter, MapPin, PackageCheck, Search, Truck, WalletCards } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { individualGifts, orgPortfolio } from "@/data/dashboardData";
import styles from "@/app/dashboard/needs/page.module.css";

type Variant = "org" | "individual";
type Urgency = "critical" | "high" | "medium" | "low";
type SupportMode = "fund" | "delivery";

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
  amount: number;
  amountLabel: string;
  status: string;
  location: string;
  children: number;
  description: string;
  contactPerson: string;
  contactPhone: string;
  deliveryAddress: string;
  items: string[];
};

const API_BASE = "https://carebridge-dxrd.onrender.com/api";
const categories = ["All", "Food", "Medical", "Education", "Shelter", "Clothing"];
const urgencies = ["All", "critical", "high", "medium", "low"];
const urgencyOrder: Record<Urgency, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const categoryInitial: Record<string, string> = { Food: "Food", Medical: "Med", Education: "Education", Shelter: "Shelter", Clothing: "Clothing" };
function parseAmount(value: string) {
  return Number(value.replace(/[^0-9]/g, "")) || 0;
}

function formatNaira(value: number) {
  return `NGN ${Number(value || 0).toLocaleString("en-NG")}`;
}

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
      amount: parseAmount(gift.amount),
      amountLabel: gift.amount,
      status: gift.status,
      location: gift.date,
      children: 1,
      description: `Your ${gift.amount} gift to ${gift.facility} is being tracked with receipts and proof updates.`,
      contactPerson: "CareBridge Support",
      contactPhone: "+234 800 000 0000",
      deliveryAddress: "Proof and receipts are attached to this giving record.",
      items: ["Receipt available", "Delivery proof tracked", "Impact update pending"],
    }));
  }

  return orgPortfolio.map((row, index) => ({
    id: `portfolio-${index}`,
    facility: row.facility,
    category: row.category,
    amount: parseAmount(row.amount),
    amountLabel: row.amount,
    status: row.status,
    location: row.location,
    children: row.children,
    description: `${row.facility} has an active ${row.category.toLowerCase()} commitment in your CareBridge portfolio. Track details, funding, and delivery progress here.`,
    contactPerson: index % 2 === 0 ? "Mrs Adaeze Okafor" : "Care Facility Lead",
    contactPhone: "+234 803 123 4567",
    deliveryAddress: `${row.location}, Nigeria`,
    items: ["Need matched to your giving parameters", "Facility details verified", "Fulfillment evidence will be attached"],
  }));
}

export default function NeedsWorkspace({ variant }: { variant: Variant }) {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [urgency, setUrgency] = useState("All");
  const [showMoreNeeds, setShowMoreNeeds] = useState(false);
  const [autoFundSimilar, setAutoFundSimilar] = useState(false);
  const [hiddenPortfolioIds, setHiddenPortfolioIds] = useState<string[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [supportMode, setSupportMode] = useState<SupportMode>("fund");
  const [customAmount, setCustomAmount] = useState("");

  const isIndividual = variant === "individual";
  const portfolioItems = useMemo(() => getPortfolioItems(variant), [variant]);
  const selectedPortfolio = portfolioItems.find((item) => item.id === selectedPortfolioId) || null;

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

  const filteredPortfolio = useMemo(() => {
    const query = search.trim().toLowerCase();

    return portfolioItems
      .filter((item) => !hiddenPortfolioIds.includes(item.id))
      .filter((item) => category === "All" || item.category.toLowerCase() === category.toLowerCase())
      .filter((item) => !query || [item.facility, item.category, item.location].join(" ").toLowerCase().includes(query));
  }, [category, hiddenPortfolioIds, portfolioItems, search]);

  const filteredNeeds = useMemo(() => {
    const query = search.trim().toLowerCase();

    return needs
      .filter((need) => {
        const matchesSearch =
          !query ||
          [need.title, need.facilityName, need.location, need.description, ...need.items].join(" ").toLowerCase().includes(query);
        const matchesCategory = category === "All" || need.category.toLowerCase() === category.toLowerCase();
        const matchesUrgency = urgency === "All" || need.urgency === urgency;
        return matchesSearch && matchesCategory && matchesUrgency;
      })
      .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
  }, [needs, search, category, urgency]);

  function hidePortfolio(id: string) {
    setHiddenPortfolioIds((current) => [...current, id]);
    if (selectedPortfolioId === id) setSelectedPortfolioId(null);
  }

  if (selectedPortfolio) {
    const selectedAmount = Number(customAmount) || selectedPortfolio.amount;
    const fee = Math.round(selectedAmount * 0.015);

    return (
      <div className={styles.page}>
        <div className={styles.detailTopbar}>
          <div>
            <p>{isIndividual ? "Giving detail" : "Portfolio detail"}</p>
            <h1>{selectedPortfolio.facility}</h1>
          </div>
          <button onClick={() => setSelectedPortfolioId(null)}><ArrowLeft size={17} /> Back to Needs</button>
        </div>

        <div className={styles.detailLayout}>
          <section className={styles.card}>
            <div className={styles.metricGrid}>
              <div><span>Total donated</span><strong>{formatNaira(selectedPortfolio.amount)}</strong></div>
              <div><span>Category</span><strong>{selectedPortfolio.category}</strong></div>
              <div><span>Status</span><strong>{selectedPortfolio.status}</strong></div>
            </div>

            <div className={styles.projectBlock}>
              <h2>Project details</h2>
              <p>{selectedPortfolio.description}</p>
            </div>

            <div className={styles.projectBlock}>
              <h2>{isIndividual ? "Giving information" : "Facility information"}</h2>
              <div className={styles.infoGrid}>
                <div><span>Name</span><strong>{selectedPortfolio.facility}</strong></div>
                <div><span>Contact person</span><strong>{selectedPortfolio.contactPerson}</strong></div>
                <div><span>Phone</span><strong>{selectedPortfolio.contactPhone}</strong></div>
                <div><span>Address</span><strong>{selectedPortfolio.deliveryAddress}</strong></div>
              </div>
            </div>

            <div className={styles.projectBlock}>
              <h2>Tracked requirements</h2>
              <ul className={styles.detailItems}>{selectedPortfolio.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>

          <aside className={styles.card}>
            <h2 className={styles.sideHeading}>{isIndividual ? "Support again" : "Support options"}</h2>
            <div className={styles.modeGrid}>
              <button className={supportMode === "fund" ? styles.modeActive : ""} onClick={() => setSupportMode("fund")}><WalletCards size={18} /> Fund from Wallet</button>
              <button className={supportMode === "delivery" ? styles.modeActive : ""} onClick={() => setSupportMode("delivery")}><Truck size={18} /> Commit to Deliver</button>
            </div>

            {supportMode === "fund" ? (
              <div className={styles.supportPanel}>
                <p>Fund this need from your wallet.</p>
                <div className={styles.amountButtons}>{[1000, 10000, 25000, selectedPortfolio.amount].map((amount) => <button key={amount} onClick={() => setCustomAmount(String(amount))}>{formatNaira(amount)}</button>)}</div>
                <input type="number" value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} placeholder={String(selectedPortfolio.amount)} />
                <div className={styles.paymentSummary}><div><span>Selected</span><strong>{formatNaira(selectedAmount)}</strong></div><div><span>Transaction fee</span><strong>{formatNaira(fee)}</strong></div><div><span>Total</span><strong>{formatNaira(selectedAmount + fee)}</strong></div></div>
                <Link href={isIndividual ? "/individual-dashboard/needs" : "/dashboard/finances"} className={styles.confirmFund}>{isIndividual ? "Continue gift" : "Continue funding"}</Link>
              </div>
            ) : (
              <div className={styles.supportPanel}>
                <p>Commit to deliver the listed items and track progress.</p>
                <div className={styles.deliverySteps}><span><CheckCircle2 size={16} /> Commit</span><span><Truck size={16} /> In transit</span><span><PackageCheck size={16} /> Delivered</span></div>
                <button className={styles.confirmButton}>Confirm delivery commitment</button>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageIntro}>
        <div>
          <h1>{isIndividual ? "Needs / Giving" : "Needs / Opportunities"}</h1>
          <p>{isIndividual ? "Your active giving first, then discover new verified funding opportunities." : "Your active portfolio first, then discover new funding opportunities."}</p>
        </div>
      </div>

      <section className={styles.card}>
        <div className={styles.filterBar}>
          <label className={styles.searchBox}>
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search facility, need, or location" />
          </label>
          <label className={styles.selectBox}>
            <Filter size={17} />
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item}>{item === "All" ? "All Categories" : item}</option>)}
            </select>
          </label>
          <select className={styles.select} value={urgency} onChange={(event) => setUrgency(event.target.value)}>
            {urgencies.map((item) => <option key={item} value={item}>{item === "All" ? "All Urgency Levels" : item}</option>)}
          </select>
        </div>
        <label className={styles.toggleRow}>
          <span>{isIndividual ? "Auto-suggest similar needs" : "Auto-fund matched needs"}</span>
          <input type="checkbox" checked={autoFundSimilar} onChange={(event) => setAutoFundSimilar(event.target.checked)} />
          <b>{autoFundSimilar ? "On" : "Off"}</b>
        </label>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.flowHeader}>
          <div>
            <h2>{isIndividual ? "Active Giving" : "Active Portfolio"}</h2>
            <p>{filteredPortfolio.length} tracked needs visible</p>
          </div>
          {!showMoreNeeds && <button onClick={() => setShowMoreNeeds(true)}>Discover & Support</button>}
        </div>

        {filteredPortfolio.length === 0 ? (
          <div className={styles.emptyState}>No portfolio needs match your current filters.</div>
        ) : (
          <div className={styles.portfolioGrid}>
            {filteredPortfolio.map((item) => (
              <article key={item.id} className={styles.portfolioCard}>
                <div className={styles.portfolioBody}>
                  <div className={styles.cardKicker}>
                    <span className={`${styles.categoryIcon} ${styles[`visual${item.category}`] || ""}`}>{categoryInitial[item.category] || item.category.slice(0, 3)}</span>
                    <p>{item.status}</p>
                  </div>
                  <div><h3>{item.facility}</h3><span>{item.location}</span></div>
                  <p className={styles.portfolioDesc}>{item.description}</p>
                  <div className={styles.amountBox}><span>Amount</span><strong>{formatNaira(item.amount)}</strong></div>
                  <div className={styles.portfolioActions}>
                    <button onClick={() => setSelectedPortfolioId(item.id)}>View</button>
                    <button onClick={() => hidePortfolio(item.id)}>Hide</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {showMoreNeeds && (
        <section className={styles.flowSection}>
          <div className={styles.flowHeader}>
            <div>
              <h2>Discover New Needs</h2>
              <p>Additional verified opportunities outside your current portfolio.</p>
            </div>
            <button className={styles.secondaryButton} onClick={() => setShowMoreNeeds(false)}>Hide discovery</button>
          </div>

          {loading ? (
            <div className={styles.grid}><div className={styles.skeleton} /><div className={styles.skeleton} /><div className={styles.skeleton} /></div>
          ) : filteredNeeds.length === 0 ? (
            <div className={styles.emptyState}>No additional needs match your filters right now.</div>
          ) : (
            <div className={styles.grid}>
              {filteredNeeds.map((need) => (
                <article key={need.id} className={styles.needCard}>
                  <div className={styles.needCardInner}>
                    <div className={styles.cardKicker}>
                      <span className={`${styles.categoryIcon} ${styles[`visual${need.category}`] || ""}`}>{categoryInitial[need.category] || need.category}</span>
                      <p className={styles.urgencyText}>{need.urgency}</p>
                    </div>
                    <div className={styles.needHead}>
                      <div>
                        <div className={styles.needTitle}><h3>{need.title}</h3>{need.verified && <MdVerified className={styles.verified} />}</div>
                        <p><MapPin size={15} /> {need.location} | {need.posted}</p>
                      </div>
                      <span className={`${styles.badge} ${styles[need.urgency]}`}>{need.urgency}</span>
                    </div>
                    <p className={styles.needDesc}>{need.description}</p>
                    <div className={styles.discoveryStats}><div><span>Need value</span><strong>{formatNaira(need.cashEquivalent)}</strong></div><div><span>Children</span><strong>{need.children}</strong></div></div>
                    <Link href={`/needs/${need.id}`} className={styles.fundBtn}>Open need</Link>
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
