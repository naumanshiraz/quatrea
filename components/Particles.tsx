"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";

type Particle = { x: number; y: number; s: number; t: number; a: number; r: number; ph: number };

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { season } = useStore();
  const current = useRef(season);

  useEffect(() => {
    current.current = season;
  }, [season]);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx = cv.getContext("2d");
    if (!cx) return;
    let W = 0;
    let H = 0;
    let wind = 0;
    let raf = 0;
    const resize = () => {
      W = cv.width = innerWidth;
      H = cv.height = innerHeight;
    };
    resize();
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const make = (t: number): Particle => ({ x: rnd(0, W), y: rnd(-60, H), s: rnd(0.6, 1.5), t, a: 0, r: rnd(0, 6.28), ph: rnd(0, 6.28) });
    const pts: Particle[] = Array.from({ length: 70 }, () => make(0));
    const onMove = (e: PointerEvent) => {
      wind += Math.max(-3, Math.min(3, e.movementX * 0.04));
    };
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove);

    const tick = (tm: number) => {
      const S = current.current;
      cx.clearRect(0, 0, W, H);
      wind *= 0.96;
      for (const p of pts) {
        if (p.t !== S) {
          p.a = Math.max(0, p.a - 0.02);
          if (p.a === 0 && S >= 0) Object.assign(p, make(S), { y: -30 });
        } else {
          p.a = Math.min(1, p.a + 0.012);
        }
        if (p.a <= 0) continue;
        const t = p.t;
        const sw = Math.sin((tm / 1000) * 0.9 + p.ph);
        p.y += t === 1 ? -0.45 * p.s : t === 3 ? 0.7 * p.s : t === 0 ? 0.9 * p.s : 1.2 * p.s;
        p.x += sw * 0.6 + wind * p.s + (t === 2 ? 0.5 : 0);
        p.r += sw * 0.02 + (t === 2 ? 0.02 : 0.008);
        if (p.y > H + 30) p.y = -30;
        if (p.y < -30) p.y = H + 30;
        if (p.x > W + 30) p.x = -30;
        if (p.x < -30) p.x = W + 30;
        cx.save();
        cx.translate(p.x, p.y);
        cx.rotate(p.r);
        const s = p.s;
        if (t === 0) {
          cx.fillStyle = `rgba(238,150,170,${0.8 * p.a})`;
          cx.beginPath();
          cx.ellipse(0, 0, 8 * s, 4 * s, 0, 0, 6.28);
          cx.fill();
        } else if (t === 1) {
          const g = cx.createRadialGradient(0, 0, 0, 0, 0, 14 * s);
          const o = (0.55 + 0.45 * Math.sin(tm / 600 + p.ph)) * 0.8 * p.a;
          g.addColorStop(0, `rgba(255,214,100,${o})`);
          g.addColorStop(1, "rgba(255,214,100,0)");
          cx.fillStyle = g;
          cx.beginPath();
          cx.arc(0, 0, 14 * s, 0, 6.28);
          cx.fill();
        } else if (t === 2) {
          cx.fillStyle = `rgba(214,110,30,${0.9 * p.a})`;
          cx.beginPath();
          cx.moveTo(0, -10 * s);
          cx.quadraticCurveTo(8 * s, -2 * s, 0, 10 * s);
          cx.quadraticCurveTo(-8 * s, -2 * s, 0, -10 * s);
          cx.fill();
        } else {
          cx.fillStyle = `rgba(255,255,255,${0.9 * p.a})`;
          cx.beginPath();
          cx.arc(0, 0, 2.4 * s, 0, 6.28);
          cx.fill();
        }
        cx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas id="fx" ref={ref} aria-hidden="true" />;
}
