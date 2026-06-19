"use client";

import { useState } from "react";
import { BadgeCheck, Edit3, Lock, Mail, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ org: "GTCo Foundation", type: "CSR Partner", contact: "giving@gtcofoundation.org", phone: "+234 812 000 0001", country: "Nigeria", city: "Lagos", focus: "Food, Medical, Education", budget: "5,000,000" });
  const update = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value });
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><p>Profile</p><h1>Organisation details and giving preferences.</h1></div>
      <div className={styles.body}>
        <section className={styles.left}>
          <div className={styles.card}><div className={styles.profileTop}><div className={styles.avatar}>GT</div><div><h2>{form.org}</h2><span>{form.type}</span></div><button onClick={() => setEditing(!editing)}><Edit3 size={16} /> {editing ? "Save changes" : "Edit profile"}</button></div><div className={styles.fieldGrid}>{([ ["Organisation name", "org"], ["Account type", "type"], ["Contact email", "contact"], ["Phone number", "phone"], ["Country", "country"], ["City", "city"] ] as const).map(([label, key]) => <label key={key} className={styles.field}><span>{label}</span>{editing ? <input value={form[key]} onChange={(event) => update(key, event.target.value)} /> : <strong>{form[key]}</strong>}</label>)}</div></div>
          <div className={styles.card}><h2>Donation history</h2><div className={styles.historyGrid}>{[{label:"Total donated",value:"NGN 1.9M"},{label:"Needs funded",value:"23"},{label:"Children reached",value:"847"},{label:"Avg per need",value:"NGN 82,608"}].map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></div>
        </section>
        <aside className={styles.right}>
          <div className={styles.card}><h2>Giving preferences</h2><div className={styles.pref}><span>Annual budget</span>{editing ? <input value={form.budget} onChange={(event) => update("budget", event.target.value)} /> : <strong>NGN {form.budget}</strong>}</div><div className={styles.pref}><span>Focus categories</span><div className={styles.tags}>{form.focus.split(",").map((item) => <b key={item}>{item.trim()}</b>)}</div></div><div className={styles.pref}><span>Transaction fee</span><strong>1.5% per need</strong></div></div>
          <div className={styles.card}><h2>Verification status</h2><div className={styles.verify}><BadgeCheck size={24} /><div><strong>Verified partner</strong><span>Verified since January 2026</span></div></div><p><ShieldCheck size={16} /> Organisation documents verified</p><p><Mail size={16} /> Contact details confirmed</p><p><Lock size={16} /> Payment account linked</p></div>
        </aside>
      </div>
    </div>
  );
}
