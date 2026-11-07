import { notFound } from "next/navigation";
import ProductView from "@/components/pages/ProductView";
import { bySlug, perfumes } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return perfumes.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const p = bySlug((await params).slug);
  return { title: p?.n };
}

export default async function Page({ params }: Props) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  return <ProductView p={p} />;
}
