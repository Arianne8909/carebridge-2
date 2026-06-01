import { Metadata } from "next";
import { notFound } from "next/navigation";
import NeedDetailClient from "@/components/needs/NeedDetailClient";

const BASE_URL = "https://carebridge-dxrd.onrender.com/api";

async function getNeed(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/needs/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const need = await getNeed(params.id);
  return {
    title: need ? `${need.title} | CareBridge OVC` : "Need | CareBridge OVC",
    description: need?.description ?? "Help a child in need.",
  };
}

export default async function NeedDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const need = await getNeed(params.id);

  if (!need) notFound();

  return <NeedDetailClient need={need} />;
}