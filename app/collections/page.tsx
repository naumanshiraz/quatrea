import type { Metadata } from "next";
import Collections from "@/components/pages/Collections";

export const metadata: Metadata = { title: "Collections" };

export default function Page() {
  return <Collections />;
}
