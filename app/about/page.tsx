import type { Metadata } from "next";
import About from "@/components/pages/About";

export const metadata: Metadata = { title: "The House" };

export default function Page() {
  return <About />;
}
