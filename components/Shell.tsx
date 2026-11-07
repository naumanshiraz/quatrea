"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Nav from "@/components/Nav";
import Particles from "@/components/Particles";
import { StoreProvider, useStore } from "@/lib/store";

function Frame({ children }: { children: ReactNode }) {
  const { toast, phase } = useStore();
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    if (fine && !reduce) {
      let tilted: HTMLElement | null = null;
      let magnet: HTMLElement | null = null;
      const onMove = (e: PointerEvent) => {
        const t = e.target as HTMLElement;
        if (!t.closest) return;
        if (cursor.current) {
          cursor.current.style.transform = `translate(${e.clientX - 7}px,${e.clientY - 7}px)`;
          cursor.current.classList.toggle("h", !!t.closest("a,button"));
        }
        const b = t.closest<HTMLElement>(".bt");
        const m = t.closest<HTMLElement>(".btn");
        if (tilted && tilted !== b) tilted.style.transform = "";
        tilted = b;
        if (b) {
          const r = b.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          b.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
        }
        if (magnet && magnet !== m) magnet.style.transform = "";
        magnet = m;
        if (m) {
          const r = m.getBoundingClientRect();
          m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        }
      };
      addEventListener("pointermove", onMove);
      cleanups.push(() => removeEventListener("pointermove", onMove));
    }

    if (!reduce) {
      let ticking = 0;
      const parallax = () => {
        ticking = 0;
        const vh = innerHeight;
        document.querySelectorAll<HTMLElement>("[data-p]").forEach((e) => {
          const r = e.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          e.style.transform = `translateY(${-(r.top + r.height / 2 - vh / 2) * parseFloat(e.dataset.p || "0")}px)`;
        });
      };
      const onScroll = () => {
        if (!ticking) ticking = requestAnimationFrame(parallax);
      };
      addEventListener("scroll", onScroll, { passive: true });
      let last = scrollY;
      let skew = 0;
      let raf = 0;
      const loop = () => {
        const v = scrollY - last;
        last = scrollY;
        skew += (Math.max(-5, Math.min(5, v * 0.12)) - skew) * 0.12;
        document.documentElement.style.setProperty("--sk", skew.toFixed(2));
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <>
      <Nav />
      <div id="cv" className={phase === "idle" ? "" : phase} aria-hidden="true">
        <span className="logo">
          QUATR<i>É</i>A
        </span>
      </div>
      <Particles />
      <div className="cur" ref={cursor} aria-hidden="true" />
      <div className={`toast${toast ? " on" : ""}`} role="status">
        {toast}
      </div>
      {children}
    </>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <Frame>{children}</Frame>
    </StoreProvider>
  );
}
