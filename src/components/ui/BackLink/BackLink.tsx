"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import styles from "./BackLink.module.css";

interface Props {
  href: string;
  text?: string;
}

export default function BackLink({
  href,
  text = "Back to Home",
}: Props) {
  return (
    <Link href={href} className={styles.backLink}>
      <FaArrowLeft className={styles.icon} />
      {text}
    </Link>
  );
}