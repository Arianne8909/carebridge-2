"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NeedDetail.module.css";

const BASE_URL = "https://carebridge-dxrd.onrender.com/api";
const PLATFORM_FEE_RATE = 0.015;
const PRESET_AMOUNTS = [1000, 10000, 25000, 50000];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Need {
  id: number;
  title: string;
  description: string;
  category: string;
  urgency: string;
  cash_equivalent?: number;
  total_donated?: number;
  priority_score?: number;
  facility_name?: string;
  city?: string;
  country?: string;
  contact_email?: string;
  contact_phone?: string;
  verified_since?: string;
  fulfillment?: {
    photo_url?: string;
    caption?: string;
    verified?: boolean;
  } | null;
  facility?: {
    name?: string;
    city?: string;
    country?: string;
    contact_email?: string;
    contact_phone?: string;
    fulfillment_rate?: number;
    needs_fulfilled?: number;
    avg_delivery_hours?: number;
    verified_since?: string;
    contact_person?: string;
    address?: string;
  };
}

interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  token: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────── */
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("carebridge_token");
}

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("carebridge_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ─── Auth Modal ─────────────────────────────────────────────────────── */
function AuthModal({
  onSuccess,
  onClose,
}: {
  onSuccess: (user: AuthUser) => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "signup" && form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { full_name: form.full_name, email: form.email, password: form.password };

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      const user: AuthUser = { ...data.user, token: data.token };
      localStorage.setItem("carebridge_token", data.token);
      localStorage.setItem("carebridge_user", JSON.stringify(user));
      onSuccess(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative" }}
      >
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>
        <p className={styles.modalTitle}>
          {mode === "login" ? "Sign in to donate" : "Create an account"}
        </p>
        <p className={styles.modalSub}>
          {mode === "login"
            ? "Sign in to your CareBridge account to make a donation."
            : "Create a free account to start helping children in need."}
        </p>

        {error && <div className={styles.errorMsg}>{error}</div>}

        {mode === "signup" && (
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        )}
        <input
          className={styles.modalInput}
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={styles.modalInput}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <button
          className={styles.modalCta}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : mode === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>

        <p className={styles.modalSwitch}>
          {mode === "login" ? "No account?" : "Already have one?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── Fund Panel ─────────────────────────────────────────────────────── */
function FundPanel({
  need,
  user,
  onUserChange,
}: {
  need: Need;
  user: AuthUser | null;
  onUserChange: (u: AuthUser | null) => void;
}) {
  const [selectedAmount, setSelectedAmount] = useState<number>(PRESET_AMOUNTS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    amount: number;
    donation: { id: number; status: string };
  } | null>(null);
  const [error, setError] = useState("");

  // Check for payment return (Paystack redirect back)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference");
    if (!ref) return;

    const token = getToken();
    if (!token) return;

    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/payments/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reference: ref }),
        });
        const data = await res.json();
        if (res.ok && data.donation) {
          setSuccess({ amount: data.donation.amount, donation: data.donation });
          // Clean URL
          const clean = window.location.pathname;
          window.history.replaceState({}, "", clean);
        }
      } catch {
        // silent — verification will be done by webhook anyway
      }
    })();
  }, []);

  const effectiveAmount = customAmount
    ? parseInt(customAmount, 10) || 0
    : selectedAmount;
  const platformFee = Math.max(1, Math.round(effectiveAmount * PLATFORM_FEE_RATE));
  const toFacility = effectiveAmount - platformFee;

  async function handleDonate() {
    const authedUser = user || getStoredUser();
    if (!authedUser) {
      setShowAuth(true);
      return;
    }

    if (effectiveAmount < 100) {
      setError("Minimum donation is ₦100.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/payments/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authedUser.token}`,
        },
        body: JSON.stringify({ need_id: need.id, amount: effectiveAmount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not initialize payment.");

      // Use Paystack inline popup if available, else redirect
      if (data.access_code) {
        try {
          // @ts-expect-error – PaystackPop loaded from CDN
          const popup = new window.PaystackPop();
          popup.resumeTransaction(data.access_code);
        } catch {
          window.location.href = data.authorization_url;
        }
      } else {
        window.location.href = data.authorization_url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed. Try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={styles.successPanel}>
        <div className={styles.successIcon}>🎉</div>
        <p className={styles.successTitle}>Donation confirmed!</p>
        <p className={styles.successSub}>
          Thank you! Your generosity is helping children get what they need.
          You will receive photo proof within 48 hours.
        </p>
        <div className={styles.successDonation}>
          <div className={styles.successAmount}>
            {formatNaira(success.amount)}
          </div>
          <div className={styles.successMeta}>
            Ref #{success.donation.id} · Status: {success.donation.status}
          </div>
        </div>
        <Link href="/needs" style={{ textDecoration: "none" }}>
          <button className={styles.ctaBtn}>← Back to needs</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {showAuth && (
        <AuthModal
          onSuccess={(u) => {
            onUserChange(u);
            setShowAuth(false);
          }}
          onClose={() => setShowAuth(false)}
        />
      )}

      <div className={styles.panelBody}>
        <div className={styles.deliveryNote}>
          <strong>💳 Fund This Need</strong>
          Secure payment via Paystack. Photo proof delivered within 48 hours.
          1.5% platform fee keeps CareBridge running.
        </div>

        <p className={styles.amountLabel}>Choose amount</p>
        <div className={styles.amountGrid}>
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              className={`${styles.amountBtn} ${
                !customAmount && selectedAmount === amt
                  ? styles.amountBtnActive
                  : ""
              }`}
              onClick={() => {
                setSelectedAmount(amt);
                setCustomAmount("");
              }}
            >
              {formatNaira(amt)}
            </button>
          ))}
        </div>

        <div className={styles.customAmountWrap}>
          <span className={styles.currencySymbol}>₦</span>
          <input
            className={styles.customInput}
            type="number"
            placeholder="Or enter custom amount"
            value={customAmount}
            min={100}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
        </div>

        {user && (
          <p style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "1rem" }}>
            Donating as <strong>{user.full_name}</strong> ·{" "}
            <button
              style={{
                background: "none",
                border: "none",
                color: "#0d9488",
                cursor: "pointer",
                fontWeight: 600,
                padding: 0,
                fontSize: "inherit",
              }}
              onClick={() => {
                localStorage.removeItem("carebridge_token");
                localStorage.removeItem("carebridge_user");
                onUserChange(null);
              }}
            >
              Sign out
            </button>
          </p>
        )}

        {error && <div className={styles.errorMsg}>{error}</div>}

        <div className={styles.feeBreakdown}>
          <div className={styles.feeLine}>
            <span>Your donation</span>
            <span>{formatNaira(effectiveAmount || 0)}</span>
          </div>
          <div className={styles.feeLine}>
            <span>Platform fee (1.5%)</span>
            <span>-{formatNaira(effectiveAmount ? platformFee : 0)}</span>
          </div>
          <div className={styles.feeLine}>
            <span>To facility</span>
            <span>{formatNaira(effectiveAmount ? toFacility : 0)}</span>
          </div>
        </div>

        <button
          className={styles.ctaBtn}
          onClick={handleDonate}
          disabled={loading || effectiveAmount < 100}
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <>
              💛 Give {effectiveAmount >= 100 ? formatNaira(effectiveAmount) : ""} Now →
            </>
          )}
        </button>

        <p className={styles.secureNote}>
          🔒 Secured by Paystack · CBN licensed
        </p>
      </div>
    </>
  );
}

/* ─── Deliver Panel ──────────────────────────────────────────────────── */
function DeliverPanel({ need }: { need: Need }) {
  const facility = need.facility;
  const phone = facility?.contact_phone ?? need.contact_phone ?? "";
  const email = facility?.contact_email ?? need.contact_email ?? "";
  const address = facility?.address ?? `${need.city ?? ""}, ${need.country ?? ""}`;
  const contactPerson = facility?.contact_person ?? "";

  return (
    <div className={styles.panelBody}>
      <div className={styles.deliverInfo}>
        <strong>🚚 Direct Delivery</strong>
        Contact the facility to arrange in-kind delivery of items. Estimated
        timeframe: <strong>Within 3–5 days</strong>.
      </div>

      <div className={styles.contactList}>
        {phone && (
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>📞</div>
            <div className={styles.contactText}>
              <span className={styles.contactTextLabel}>Contact number</span>
              <span className={styles.contactTextValue}>{phone}</span>
            </div>
          </div>
        )}
        {address.trim() !== "," && (
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>📍</div>
            <div className={styles.contactText}>
              <span className={styles.contactTextLabel}>Address</span>
              <span className={styles.contactTextValue}>{address}</span>
            </div>
          </div>
        )}
        {contactPerson && (
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>👤</div>
            <div className={styles.contactText}>
              <span className={styles.contactTextLabel}>Contact person</span>
              <span className={styles.contactTextValue}>{contactPerson}</span>
            </div>
          </div>
        )}
        {email && (
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>✉️</div>
            <div className={styles.contactText}>
              <span className={styles.contactTextLabel}>Email</span>
              <span className={styles.contactTextValue}>{email}</span>
            </div>
          </div>
        )}
        <div className={styles.contactItem}>
          <div className={styles.contactIcon}>🕐</div>
          <div className={styles.contactText}>
            <span className={styles.contactTextLabel}>
              Suggested delivery timeframe
            </span>
            <span className={styles.contactTextValue}>Within 3–5 days</span>
          </div>
        </div>
      </div>

      {phone && (
        <a className={styles.callBtn} href={`tel:${phone}`}>
          📞 Call Now
        </a>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function NeedDetailClient({ need }: { need: Need }) {
  const [activeTab, setActiveTab] = useState<"fund" | "deliver">("fund");
  // Lazy initializer runs once on mount — reads localStorage without triggering a second render
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  useEffect(() => {
    // Inject Paystack inline JS (side-effect only, no setState)
    if (!document.getElementById("paystack-js")) {
      const script = document.createElement("script");
      script.id = "paystack-js";
      script.src = "https://js.paystack.co/v2/inline.js";
      document.head.appendChild(script);
    }
  }, []);

  const facility = need.facility;
  const facilityName = facility?.name ?? need.facility_name ?? "Facility";
  const city = facility?.city ?? need.city ?? "";
  const country = facility?.country ?? need.country ?? "";
  const verifiedSince = facility?.verified_since ?? need.verified_since ?? "March 2026";
  const fulfillmentRate = facility?.fulfillment_rate ?? 94;
  const needsFulfilled = facility?.needs_fulfilled ?? 12;
  const avgDeliveryHours = facility?.avg_delivery_hours ?? 28;

  const cashEquivalent = need.cash_equivalent ?? 0;
  const totalDonated = need.total_donated ?? 0;
  const progress = cashEquivalent > 0 ? Math.min((totalDonated / cashEquivalent) * 100, 100) : 0;

  const urgencyLabel = need.urgency === "critical" ? "! Critical" : `! ${need.urgency?.charAt(0).toUpperCase()}${need.urgency?.slice(1) ?? "High"} Urgency`;

  return (
    <div className={styles.page}>
      {/* Topbar */}
      <header className={styles.topbar}>
        <span className={styles.brand}>CareBridge OVC</span>
        <Link href="/" className={styles.backLink}>
          ← Back to Needs
        </Link>
      </header>

      <div className={styles.container}>
        {/* ── Left card ── */}
        <div className={styles.leftCard}>
          {/* Facility header */}
          <div className={styles.facilityHeader}>
            <div className={styles.avatar}>{getInitials(facilityName)}</div>
            <div className={styles.facilityInfo}>
              <h2>
                {facilityName}
                <span className={styles.verifiedBadge} title="Verified facility">
                  ✓
                </span>
              </h2>
              <p className={styles.facilityMeta}>
                {city}{city && country ? ", " : ""}{country}
                {verifiedSince ? ` · Verified since ${verifiedSince}` : ""}
              </p>
            </div>
          </div>

          {/* AI score */}
          {need.priority_score != null && (
            <div className={styles.aiScoreChip}>
              🤖 AI Priority Score: {need.priority_score}
            </div>
          )}

          {/* Title & description */}
          <h1 className={styles.needTitle}>{need.title}</h1>
          <p className={styles.needDescription}>{need.description}</p>

          {/* Tags */}
          <div className={styles.tags}>
            <span className={styles.tagUrgency}>{urgencyLabel}</span>
            {need.category && (
              <span className={styles.tagCategory}>
                {need.category.charAt(0).toUpperCase() + need.category.slice(1)}
              </span>
            )}
            <span className={styles.tagType}>Cash-in-Kind</span>
          </div>

          {/* Progress bar */}
          {cashEquivalent > 0 && (
            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span>
                  {formatNaira(totalDonated)} raised of{" "}
                  {formatNaira(cashEquivalent)} goal
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <hr className={styles.divider} />

          {/* Track record */}
          <div className={styles.trackRecord}>
            <p className={styles.trackTitle}>Facility Track Record</p>
            <div className={styles.trackStats}>
              <div className={styles.trackStat}>
                <strong>{fulfillmentRate}%</strong>
                <span>Fulfillment rate</span>
              </div>
              <div className={styles.trackStat}>
                <strong>{needsFulfilled}</strong>
                <span>Needs fulfilled</span>
              </div>
              <div className={styles.trackStat}>
                <strong>{avgDeliveryHours}h</strong>
                <span>Average time</span>
              </div>
            </div>
          </div>

          {/* Fulfillment proof */}
          {need.fulfillment?.photo_url && need.fulfillment.verified && (
            <div className={styles.proofSection}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={need.fulfillment.photo_url}
                alt="Fulfillment proof"
                className={styles.proofImage}
              />
              {need.fulfillment.caption && (
                <p className={styles.proofCaption}>
                  ✅ {need.fulfillment.caption}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Right panel ── */}
        <div className={styles.rightPanel}>
          <div className={styles.tabRow}>
            <button
              className={`${styles.tab} ${activeTab === "fund" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("fund")}
            >
              💛 Fund This Need
            </button>
            <button
              className={`${styles.tab} ${activeTab === "deliver" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("deliver")}
            >
              🚚 I Will Deliver
            </button>
          </div>

          {activeTab === "fund" ? (
            <FundPanel need={need} user={user} onUserChange={setUser} />
          ) : (
            <DeliverPanel need={need} />
          )}
        </div>
      </div>
    </div>
  );
}