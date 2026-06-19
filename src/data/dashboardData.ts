export const orgStats = [
  { label: "Annual budget", value: "NGN 5M", sub: "NGN 1.9M deployed | NGN 3.1M remaining" },
  { label: "Needs funded", value: "23", sub: "+8 this quarter" },
  { label: "Children reached", value: "847", sub: "Across 11 facilities" },
  { label: "Fulfillment rate", value: "96%", sub: "+4% vs Q1" },
];

export const orgPortfolio = [
  { facility: "Sunshine Children's Home", category: "Food", amount: "NGN 85,000", status: "Active", location: "Lagos", children: 42 },
  { facility: "New Hope Orphanage", category: "Medical", amount: "NGN 120,000", status: "Matched", location: "Abuja", children: 28 },
  { facility: "Bright Future Academy", category: "Education", amount: "NGN 65,000", status: "Active", location: "Port Harcourt", children: 67 },
  { facility: "Calvary Care Home", category: "Clothing", amount: "NGN 48,000", status: "Fulfilled", location: "Ibadan", children: 35 },
  { facility: "Grace Foundation Home", category: "Shelter", amount: "NGN 250,000", status: "Active", location: "Kano", children: 55 },
];

export const orgNeeds = [
  { id: 1, title: "Nutritious meals for 42 children", facility: "Sunshine Children's Home", category: "Food", urgency: "Critical", amount: 85000, raised: 12000, location: "Lagos, Nigeria", description: "Food stock will run out this week. The home needs rice, protein, oil, and tomato paste for the next 30 days." },
  { id: 2, title: "Malaria and first-aid supplies", facility: "New Hope Orphanage", category: "Medical", urgency: "High", amount: 120000, raised: 45000, location: "Abuja, Nigeria", description: "Urgent need for malaria kits, first-aid supplies, rehydration salts, and basic medication ahead of rainy season." },
  { id: 3, title: "Textbooks and school supplies", facility: "Bright Future Academy", category: "Education", urgency: "High", amount: 65000, raised: 8000, location: "Port Harcourt, Nigeria", description: "New term begins next week and 67 children need textbooks, notebooks, geometry sets, and school bags." },
  { id: 4, title: "Harmattan clothing support", facility: "Calvary Care Home", category: "Clothing", urgency: "Medium", amount: 48000, raised: 0, location: "Ibadan, Nigeria", description: "Children need school uniforms, warm jackets, socks, underwear, and everyday clothing in mixed sizes." },
  { id: 5, title: "Dormitory roof repairs", facility: "Grace Foundation Home", category: "Shelter", urgency: "Medium", amount: 250000, raised: 60000, location: "Kano, Nigeria", description: "Two dormitory sections are leaking badly and need roofing sheets, nails, ceiling boards, and labor support." },
  { id: 6, title: "Monthly food provisions", facility: "Mercy Children's Village", category: "Food", urgency: "Critical", amount: 95000, raised: 25000, location: "Enugu, Nigeria", description: "The home has depleted food stock and needs staples for 60 children and 8 staff members." },
];

export const orgTransactions = [
  { label: "Funded: Sunshine Children's Home - Food Need", date: "2026-06-04 at 10:32", amount: -85000, type: "debit", facility: "Sunshine Children's Home" },
  { label: "Funded: New Hope Orphanage - Medical Need", date: "2026-05-28 at 14:15", amount: -45000, type: "debit", facility: "New Hope Orphanage" },
  { label: "Wallet funding via Mobile Money", date: "2026-05-19 at 09:00", amount: 500000, type: "credit", facility: null },
  { label: "Funded: Bright Future Academy - Education Need", date: "2026-05-12 at 13:20", amount: -65000, type: "debit", facility: "Bright Future Academy" },
  { label: "Wallet funding via Bank Transfer", date: "2026-05-01 at 08:30", amount: 1000000, type: "credit", facility: null },
];

export const spendSummary = [
  { label: "Food", pct: 42, amount: "NGN 798,000" },
  { label: "Medical", pct: 28, amount: "NGN 532,000" },
  { label: "Shelter", pct: 18, amount: "NGN 342,000" },
  { label: "Clothing", pct: 12, amount: "NGN 228,000" },
];

export const individualStats = [
  { label: "Total given", value: "NGN 248K", sub: "18 gifts completed" },
  { label: "Children helped", value: "126", sub: "Across 7 care homes" },
  { label: "Active pledges", value: "4", sub: "NGN 72K committed" },
  { label: "Proof received", value: "15", sub: "Photos and delivery notes" },
];

export const individualGifts = [
  { facility: "Mercy Children's Village", category: "Food", amount: "NGN 25,000", status: "Delivered", date: "Jun 12" },
  { facility: "Bright Future Academy", category: "Education", amount: "NGN 18,000", status: "In review", date: "Jun 08" },
  { facility: "Sunshine Children's Home", category: "Food", amount: "NGN 12,000", status: "Matched", date: "May 31" },
  { facility: "Calvary Care Home", category: "Clothing", amount: "NGN 9,500", status: "Delivered", date: "May 25" },
];

export const individualImpact = [
  { label: "Meals provided", value: "1,420", pct: 82 },
  { label: "School kits funded", value: "38", pct: 64 },
  { label: "Medical kits delivered", value: "21", pct: 48 },
];
