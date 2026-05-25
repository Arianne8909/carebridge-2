import type { Metadata } from "next";
import "./globals.css";

import { Sora, DM_Sans } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-head",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CareBridge OVC",
  description: "Connecting donors to verified orphanages with proof-based impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}