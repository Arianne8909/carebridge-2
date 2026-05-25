"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import styles from "@/components/auth/Auth.module.css"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className={styles.page}>

      <AuthCard mode={mode} setMode={setMode} />
    </div>
  );
}