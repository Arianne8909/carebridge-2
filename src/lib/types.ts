export type Need = {
  id: number;
  title: string;
  description: string;
  category: "food" | "education" | "medical" | "clothing";
  urgency: "critical" | "high" | "low";

  total_needed: number;
  total_donated: number;

  location: string;

  facility: {
    id: number;
    name: string;
    city: string;
    country: string;
    verified: boolean;
  };
};