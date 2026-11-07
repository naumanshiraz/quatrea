import type { Metadata } from "next";
import Bag from "@/components/pages/Bag";

export const metadata: Metadata = { title: "Your bag" };

export default function Page() {
  return <Bag />;
}
