import NeedDetailClient from "@/components/needs/NeedDetailClient";

const BASE_URL = "https://carebridge-dxrd.onrender.com/api";

async function getNeed(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/needs/${id}`);
    const data = await res.json();
    if (!res.ok) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function NeedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const need = await getNeed(id);

  if (!need) {
    return <div>Need not found</div>;
  }

  return <NeedDetailClient need={need} />;
}