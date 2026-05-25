const BASE_URL = "https://carebridge-dxrd.onrender.com/api";

export async function fetchUrgentNeeds() {
  const res = await fetch(`${BASE_URL}/needs/urgent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // important for fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch urgent needs");
  }

  return res.json();
}