"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Line = { id: string; sz: number; q: number };
type Phase = "idle" | "cover" | "reveal";

type Store = {
  lines: Line[];
  count: number;
  ready: boolean;
  add: (id: string, sz: number, q: number) => void;
  step: (i: number, d: number) => void;
  remove: (i: number) => void;
  toast: string;
  notify: (m: string) => void;
  season: number;
  setSeason: (n: number) => void;
  go: (href: string) => void;
  phase: Phase;
  menu: boolean;
  setMenu: (b: boolean) => void;
};

const Ctx = createContext<Store | null>(null);

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("StoreProvider is missing");
  return c;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const [season, setSeason] = useState(-1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [menu, setMenu] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      const v = localStorage.getItem("quatrea-bag");
      if (v) setLines(JSON.parse(v));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("quatrea-bag", JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const notify = useCallback((m: string) => {
    setToast(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(""), 2600);
  }, []);

  const add = useCallback((id: string, sz: number, q: number) => {
    setLines((ls) => {
      const f = ls.find((l) => l.id === id && l.sz === sz);
      if (f) return ls.map((l) => (l === f ? { ...l, q: Math.min(9, l.q + q) } : l));
      return [...ls, { id, sz, q }];
    });
  }, []);

  const step = useCallback((i: number, d: number) => {
    setLines((ls) => ls.map((l, k) => (k === i ? { ...l, q: Math.min(9, Math.max(1, l.q + d)) } : l)));
  }, []);

  const remove = useCallback((i: number) => setLines((ls) => ls.filter((_, k) => k !== i)), []);

  const go = useCallback(
    (href: string) => {
      setMenu(false);
      if (href === path) return;
      setPhase("cover");
      window.setTimeout(() => router.push(href), 640);
    },
    [path, router],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setPhase((p) => (p === "cover" ? "reveal" : p));
  }, [path]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("idle"), 800);
    return () => window.clearTimeout(t);
  }, [phase]);

  const count = lines.reduce((a, l) => a + l.q, 0);

  return (
    <Ctx.Provider value={{ lines, count, ready, add, step, remove, toast, notify, season, setSeason, go, phase, menu, setMenu }}>
      {children}
    </Ctx.Provider>
  );
}
