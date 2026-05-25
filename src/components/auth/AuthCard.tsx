"use client";

import { useState } from "react";
import styles from "./Auth.module.css";
import { useRouter } from "next/navigation";
import BackLink from "../ui/BackLink/BackLink";
import { FaUser, FaBuilding } from "react-icons/fa";
import Link from "next/link";

const BASE_URL = "https://carebridge-dxrd.onrender.com/api";

interface Props {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}

export default function AuthCard({ mode, setMode }: Props) {
  const router = useRouter();

  const [userType, setUserType] = useState<"individual" | "organisation">(
    "individual"
  );

  const isOrg = userType === "organisation";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* =========================
     LOGIN
  ========================= */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Login failed");

      localStorage.setItem("token", data.token);

      // ✅ ROUTING LOGIC
      if (isOrg) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     SIGNUP
  ========================= */
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Signup failed");

      localStorage.setItem("token", data.token);

      // ✅ ROUTING LOGIC
      if (isOrg) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
    <div className={styles.topBar}>  
    <BackLink href="/"
  text="Back to Home"/>
</div>
    <div className={styles.wrapper} data-theme={isOrg ? "org" : "ind"}>
      {/* HEADER */}
      
      <div className={styles.header}>
        <div className={styles.logo}>
        Care<span>Bridge</span> OVC
      </div>

        <p className={styles.subtitle}>
          {mode === "login" ? "Welcome back" : "Create your account"}
        </p>
      </div>

      {/* CARD */}
      <div className={styles.card}>
        {/* USER TYPE */}
        <div className={styles.userTypeGrid}>
          <div
            className={`${styles.userTypeCard} ${
              !isOrg ? styles.activeBlue : ""
            }`}
            onClick={() => setUserType("individual")}
          >
            <FaUser className={styles.iconBox} />
            <h4>Individual</h4>
            <p>Donate as a personal supporter</p>
          </div>

          <div
            className={`${styles.userTypeCard} ${
              isOrg ? styles.activeGreen : ""
            }`}
            onClick={() => setUserType("organisation")}
          >
            <FaBuilding className={styles.iconBox} />
            <h4>Organisation</h4>
            <p>For NGOs & institutions</p>
          </div>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              mode === "login" ? styles.active : ""
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={`${styles.tab} ${
              mode === "signup" ? styles.active : ""
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <form className={styles.form} onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <button
              disabled={loading}
              className={isOrg ? styles.buttonGreen : styles.buttonBlue}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* SIGNUP */}
        {mode === "signup" && (
          <form className={styles.form} onSubmit={handleSignup}>
            <label>
              {isOrg ? "Organisation Name" : "Full Name"}
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isOrg ? "GTBank Foundation" : "John Doe"}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {isOrg && (
              <div className={styles.infoBox}>
                After signup, you will complete your organisation profile
                including budget, categories, and location preferences.
              </div>
            )}

            <Link href="/registration"> <button
              disabled={loading}
              className={isOrg ? styles.buttonGreen : styles.buttonBlue}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button></Link>
          </form>
        )}
      </div>
    </div>
    </div>
  );
}