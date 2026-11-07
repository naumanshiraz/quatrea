"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useStore } from "@/lib/store";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export default function TLink({ href, onClick, ...rest }: Props) {
  const { go } = useStore();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(href);
      }}
    />
  );
}
