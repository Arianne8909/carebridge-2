// RegistrationFlow.tsx

"use client";

import React, { useState } from "react";
import styles from "./Registration.module.css";
import BackLink from "../ui/BackLink/BackLink";
import Link from "next/link";

const africanLocations = {
  Nigeria: [
    "Lagos",
    "Abuja",
    "Kano",
    "Rivers",
    "Oyo",
    "Kaduna",
  ],

  Kenya: [
    "Nairobi",
    "Mombasa",
    "Kisumu",
  ],

  Ghana: [
    "Accra",
    "Kumasi",
    "Tamale",
  ],

  Uganda: [
    "Kampala",
    "Gulu",
    "Jinja",
  ],

  SouthAfrica: [
    "Johannesburg",
    "Cape Town",
    "Durban",
  ],

  Rwanda: [
    "Kigali",
  ],
};

type FormData = {
  orgName: string;
  email: string;
  password: string;

  budget: string;

  categories: string[];

  walletAmount: string;

  country: string;
  state: string;
  customLocation: string;
};

export default function RegistrationFlow() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    orgName: "",
    email: "",
    password: "",

    budget: "",

    categories: [],

    walletAmount: "",

    country: "Nigeria",
    state: "",
    customLocation: "",
  });

  const next = () => setStep((s) => s + 1);

  const back = () => setStep((s) => s - 1);

  return (
    
    <div className={styles.container}>
   <div className={styles.topBar}>  
    <BackLink href="/"
  text="Back to Home"/>
</div>
  
    
      <div className={styles.card}>
        {/* HEADER */}

        <div className={styles.header}>
          <h1 className={styles.title}>
            Organization Registration
          </h1>

          <div className={styles.stepper}>
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`${styles.stepCircle}
                ${step === s ? styles.stepActive : ""}
                ${step > s ? styles.stepComplete : ""}`}
              >
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(step / 4) * 100}%`,
            }}
          />
        </div>

        {step === 1 && (
          <StepOne
            onNext={next}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 2 && (
          <StepTwo
            onNext={next}
            onBack={back}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 3 && (
          <StepThree
            onNext={next}
            onBack={back}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 4 && (
          <StepFour
            onBack={back}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
}

type StepProps = {
  onNext?: () => void;
  onBack?: () => void;

  formData: FormData;

  setFormData: React.Dispatch<
    React.SetStateAction<FormData>
  >;
};

/* =========================
   STEP 1
========================= */

function StepOne({
  onNext,
  formData,
  setFormData,
}: StepProps) {
  const isValid =
    formData.orgName &&
    formData.email &&
    formData.password;

  return (
    <div>
      <h2 className={styles.stepHeaderTitle}>
        Basic Information
      </h2>

      <p className={styles.stepHeaderSub}>
        Tell us about your organization
      </p>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Organization Name
        </label>

        <input placeholder="GTBank Foundation"
          type="text"
          className={styles.input}
          value={formData.orgName}
          onChange={(e) =>
            setFormData({
              ...formData,
              orgName: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Email Address
        </label>

        <input placeholder="jane@me.com"
          type="email"
          className={styles.input}
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Password
        </label>

        <input
          type="password"
          className={styles.input}
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </div>

      <button
        disabled={!isValid}
        onClick={onNext}
        className={`${styles.btnNext}
        ${styles.btnFull}
        ${!isValid ? styles.btnDisabled : ""}`}
      >
        Continue →
      </button>
    </div>
  );
}

/* =========================
   STEP 2
========================= */

function StepTwo({
  onNext,
  onBack,
  formData,
  setFormData,
}: StepProps) {
  const categories = [
    "Food & Nutrition",
    "Medical & Healthcare",
    "Education & Books",
    "Shelter & Infrastructure",
    "Clothing & Essentials",
    "Recreation & Activities",
  ];

  const isValid =
    formData.budget &&
    formData.categories.length > 0;

  function toggleCategory(category: string) {
    const exists =
      formData.categories.includes(category);

    if (exists) {
      setFormData({
        ...formData,
        categories: formData.categories.filter(
          (c: string) => c !== category
        ),
      });
    } else {
      setFormData({
        ...formData,
        categories: [
          ...formData.categories,
          category,
        ],
      });
    }
  }

  return (
    <div>
      <h2 className={styles.stepHeaderTitle}>
        Support Setup
      </h2>

      <p className={styles.stepHeaderSub}>
        Define your giving parameters
      </p>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Monthly Budget (₦)
        </label>

        <input placeholder="500,000"
          type="number"
          className={styles.input}
          value={formData.budget}
          onChange={(e) =>
            setFormData({
              ...formData,
              budget: e.target.value,
            })
          }
        />

        <p className={styles.helpText}>
          How much do you want to allocate monthly?
        </p>
      </div>

      <label className={styles.label}>
        Categories of Needs to Support
      </label>

      <div className={styles.checkboxGrid}>
        {categories.map((item) => (
          <label
            key={item}
            className={styles.checkboxLabel}
          >
            <input
              type="checkbox"
              checked={formData.categories.includes(
                item
              )}
              onChange={() => toggleCategory(item)}
            />

            {item}
          </label>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={onBack}
          className={styles.btnBack}
        >
          ← Back
        </button>

        <button
          disabled={!isValid}
          onClick={onNext}
          className={`${styles.btnNext}
          ${!isValid ? styles.btnDisabled : ""}`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

/* =========================
   STEP 3
========================= */

function StepThree({
  onNext,
  onBack,
  formData,
  setFormData,
}: StepProps) {
  const amount = Number(
    formData.walletAmount || 0
  );

  const fee = amount * 0.015;

  const isValid = amount >= 10000;

  return (
    <div>
      <h2 className={styles.stepHeaderTitle}>
        Fund Your Wallet
      </h2>

      <p className={styles.stepHeaderSub}>
        Add initial funds to start supporting needs
      </p>

      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>i</div>

        <div>
          <div className={styles.infoTitle}>
            Why fund your wallet?
          </div>

          <div className={styles.infoText}>
            Pre-funding your wallet allows you to
            quickly support needs without payment
            delays.
          </div>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Initial Wallet Amount (₦)
        </label>

        <input placeholder="250,000"
          type="number"
          className={styles.input}
          value={formData.walletAmount}
          onChange={(e) =>
            setFormData({
              ...formData,
              walletAmount: e.target.value,
            })
          }
        />

        <p className={styles.helpText}>
          Minimum: ₦10,000
        </p>
      </div>

      <div className={styles.summaryBox}>
        <div className={styles.summaryRow}>
          <span className={styles.sumLabel}>
            Payment Method
          </span>

          <span className={styles.sumValue}>
            Card / Bank Transfer
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.sumLabel}>
            Transaction Fee (1.5%)
          </span>

          <span className={styles.sumValue}>
            ₦{fee.toLocaleString()}
          </span>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={onBack}
          className={styles.btnBack}
        >
          ← Back
        </button>

        <button
          disabled={!isValid}
          onClick={onNext}
          className={`${styles.btnNext}
          ${!isValid ? styles.btnDisabled : ""}`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

/* =========================
   STEP 4
========================= */

function StepFour({
  onBack,
  formData,
  setFormData,
}: StepProps) {
  return (
    <div>
      <h2 className={styles.stepHeaderTitle}>
        Location Targeting
      </h2>

      <p className={styles.stepHeaderSub}>
        Choose where to focus your support
      </p>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Country
        </label>

        <select
          className={styles.select}
          value={formData.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              country: e.target.value,
              state: "",
            })
          }
        >
          {Object.keys(africanLocations).map(
            (country) => (
              <option
                key={country}
                value={country}
              >
                {country}
              </option>
            )
          )}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          State / Region
        </label>

        <select
          className={styles.select}
          value={formData.state}
          onChange={(e) =>
            setFormData({
              ...formData,
              state: e.target.value,
            })
          }
        >
          <option>Select State</option>

          {africanLocations[
            formData.country as keyof typeof africanLocations
          ]?.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.separator}>OR</div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Custom Location
        </label>

        <input
          type="text"
          placeholder="West Africa, specific district..."
          className={styles.input}
          value={formData.customLocation}
          onChange={(e) =>
            setFormData({
              ...formData,
              customLocation: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={onBack}
          className={styles.btnBack}
        >
          ← Back
        </button>

        <Link href="/dashboard"><button className={styles.btnNext}>
          Complete Registration
        </button></Link>
      </div>
    </div>
  );
}