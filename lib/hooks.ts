"use client";

import { useEffect, type CSSProperties } from "react";
import { useStore } from "@/lib/store";

type Theme = { bg: string; ink: string; ac: string };

export const vars = (t: Theme) => ({ "--bg": t.bg, "--ink": t.ink, "--ac": t.ac }) as CSSProperties;

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("on");
            io.unobserve(x.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".rv").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export function useTheme(t: Theme | null) {
  useEffect(() => {
    if (!t) return;
    const s = document.body.style;
    s.setProperty("--bg", t.bg);
    s.setProperty("--ink", t.ink);
    s.setProperty("--ac", t.ac);
    return () => {
      ["--bg", "--ink", "--ac"].forEach((k) => s.removeProperty(k));
    };
  }, [t]);
}

export function useSeasonOnMount(n: number) {
  const { setSeason } = useStore();
  useEffect(() => {
    setSeason(n);
  }, [n, setSeason]);
}

export function useSeasonWatch() {
  const { setSeason } = useStore();
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((x) => {
          if (x.isIntersecting) {
            const s = (x.target as HTMLElement).dataset.s;
            setSeason(s === "n" ? -1 : Number(s));
          }
        }),
      { threshold: 0.5 },
    );
    document.querySelectorAll("[data-s]").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [setSeason]);
}
