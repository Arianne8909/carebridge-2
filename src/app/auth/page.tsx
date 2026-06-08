"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import SimpleNav from "@/components/ui/SimpleNav/SimpleNav";
import styles from "@/components/auth/Auth.module.css"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className={styles.page}>

      <SimpleNav />
      <AuthCard mode={mode} setMode={setMode} />
    </div>
  );
}