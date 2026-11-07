import Image from "next/image";
import type { Perfume } from "@/lib/data";

type Props = { p: Perfume; sizes?: string; priority?: boolean; className?: string };

export default function Photo({ p, sizes = "(max-width: 820px) 80vw, 440px", priority = false, className = "ph" }: Props) {
  return (
    <Image
      className={className}
      src={p.img}
      alt={`${p.n} perfume, ${p.s.toLowerCase()} collection`}
      width={1080}
      height={1080}
      sizes={sizes}
      priority={priority}
    />
  );
}
