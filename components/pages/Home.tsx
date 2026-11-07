"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import TLink from "@/components/TLink";
import { money, perfumes, sizeFactor } from "@/lib/data";
import { useReveal, useSeasonWatch, vars } from "@/lib/hooks";

const words = ["Four", "Seasons.", "Four", "Scents.", "One", "Timeless", "Story."];

const effects: Keyframe[][] = [
  [{ clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0)" }],
  [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0)" }],
  [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0)" }],
  [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)" }],
  [{ clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)" }],
  [{ clipPath: "circle(0% at 0% 100%)" }, { clipPath: "circle(150% at 0% 100%)" }],
  [{ clipPath: "polygon(0 0,0 0,0 0)" }, { clipPath: "polygon(0 0,250% 0,0 250%)" }],
  [{ clipPath: "inset(50% 0 50% 0)" }, { clipPath: "inset(0)" }],
  [{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0)" }],
  [{ opacity: 0, clipPath: "inset(0)" }, { opacity: 1, clipPath: "inset(0)" }],
];

export default function Home() {
  useReveal();
  useSeasonWatch();
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = bg.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>("i"));
    let current = 0;
    let last = -1;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const next = (current + 1) % slides.length;
      const from = slides[current];
      const to = slides[next];
      let k = 0;
      do {
        k = Math.floor(Math.random() * effects.length);
      } while (k === last);
      last = k;
      to.style.zIndex = "2";
      from.style.zIndex = "1";
      const anim = to.animate(effects[k], { duration: 1500, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" });
      anim.onfinish = () => {
        to.style.clipPath = "inset(0)";
        anim.cancel();
        from.style.zIndex = "0";
        from.style.clipPath = "inset(0 0 0 100%)";
        current = next;
      };
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <section className="hero full" data-s="n">
        <div className="hbg" ref={bg} aria-hidden="true">
          {perfumes.map((p, i) => (
            <i key={p.id} style={{ zIndex: i ? 0 : 2, clipPath: i ? "inset(0 0 0 100%)" : "inset(0)" }}>
              <b style={{ backgroundImage: `url(${p.img})` }} />
            </i>
          ))}
        </div>
        <div>
          <h1 aria-label="Four Seasons. Four Scents. One Timeless Story.">
            {words.map((w, i) => (
              <span className="hw" key={i} aria-hidden="true">
                <span style={{ "--i": i } as CSSProperties}>{w}</span>
              </span>
            ))}
          </h1>
          <div className="row">
            {perfumes.map((p, i) => (
              <TLink key={p.id} href={`/perfume/${p.id}`} aria-label={p.n} data-p={`.0${3 + i}`}>
                <Photo p={p} sizes="(max-width: 820px) 40vw, 260px" priority={i < 2} />
              </TLink>
            ))}
          </div>
        </div>
      </section>

      {perfumes.map((p, i) => (
        <section key={p.id} className={`pn${i % 2 ? " r" : ""}`} data-s={i} style={vars(p)}>
          <div className="pn-in">
            <div className="bt">
              <div data-p={(0.03 + i * 0.01).toFixed(2)}>
                <Photo p={p} />
              </div>
            </div>
            <div className="rv">
              <h2>{p.n}</h2>
              <p className="lead">{p.tag}</p>
              <p>{p.story}</p>
              <ul className="chips">
                {p.top.concat(p.heart).slice(0, 4).map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <TLink className="btn" href={`/perfume/${p.id}`}>
                Discover {p.n}
              </TLink>
            </div>
          </div>
        </section>
      ))}

      <section data-s="n">
        <div className="split">
          <h2 className="rv">Made slowly, in small batches</h2>
          <div className="rv">
            <p>
              Each Quatréa fragrance rests for ninety days before it is bottled by hand. We work with growers who harvest flowers at dawn and resins when the season turns, so every bottle carries a real moment of the year.
            </p>
            <p>The result is a perfume that opens quietly and stays with you.</p>
            <p style={{ marginTop: "2rem" }}>
              <TLink className="btn" href="/about">
                Read our story
              </TLink>
            </p>
          </div>
        </div>
        <div className="cols">
          <div className="rv">
            <h3>Harvested at dawn</h3>
            <p>Petals and citrus are picked at first light, when their scent is strongest.</p>
          </div>
          <div className="rv">
            <h3>Rested for 90 days</h3>
            <p>Every blend matures in glass before it is filtered and bottled.</p>
          </div>
          <div className="rv">
            <h3>Refillable glass</h3>
            <p>Our bottles are weighted and made to be refilled for years.</p>
          </div>
        </div>
      </section>

      <section data-s="n">
        <h2 className="rv" style={{ marginBottom: "3rem" }}>
          The collection
        </h2>
        <div className="cards">
          {perfumes.map((p) => (
            <TLink key={p.id} className="card rv" href={`/perfume/${p.id}`} style={{ background: p.bg, color: p.ink }}>
              <Photo p={p} sizes="(max-width: 820px) 45vw, 25vw" />
              <div className="s">{p.s}</div>
              <h3>{p.n}</h3>
              <div className="pr">From {money(p.price * sizeFactor[30])}</div>
            </TLink>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
