"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import TLink from "@/components/TLink";
import { money, perfumes, sizeFactor, sizes, type Perfume } from "@/lib/data";
import { useReveal, useSeasonOnMount, useTheme } from "@/lib/hooks";
import { useStore } from "@/lib/store";

export default function ProductView({ p }: { p: Perfume }) {
  useReveal();
  useTheme(p);
  useSeasonOnMount(perfumes.indexOf(p));
  const { add, notify } = useStore();
  const [sz, setSz] = useState(50);
  const [q, setQ] = useState(1);

  return (
    <main>
      <section className="pdp">
        <div className="bt">
          <div className="halo" />
          <Photo p={p} sizes="(max-width: 820px) 90vw, 520px" priority />
        </div>
        <div>
          <p>{p.s} collection</p>
          <h1 style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}>{p.n}</h1>
          <p style={{ marginTop: "1.2rem", maxWidth: "40ch" }}>{p.story}</p>
          <div className="price">{money(p.price * sizeFactor[sz] * q)}</div>
          <div className="sizes" role="group" aria-label="Bottle size">
            {sizes.map((s) => (
              <button key={s} aria-pressed={s === sz} onClick={() => setSz(s)}>
                {s} ml
              </button>
            ))}
          </div>
          <div className="qty">
            <button aria-label="Decrease quantity" onClick={() => setQ(Math.max(1, q - 1))}>−</button>
            <output>{q}</output>
            <button aria-label="Increase quantity" onClick={() => setQ(Math.min(9, q + 1))}>+</button>
          </div>
          <button
            className="btn"
            onClick={() => {
              add(p.id, sz, q);
              notify(`${q} × ${p.n} added to your bag`);
            }}
          >
            Add to bag
          </button>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <h2 className="rv">The notes</h2>
        <div className="notes rv">
          <div><b>Top</b>{p.top.join(", ")}</div>
          <div><b>Heart</b>{p.heart.join(", ")}</div>
          <div><b>Base</b>{p.base.join(", ")}</div>
        </div>
        <h3 style={{ marginTop: "5rem" }}>Related fragrances</h3>
        <div className="rel">
          {perfumes
            .filter((x) => x.id !== p.id)
            .map((x) => (
              <TLink key={x.id} href={`/perfume/${x.id}`} style={{ background: x.bg, color: x.ink }}>
                <Photo p={x} sizes="56px" />
                <span>
                  <b className="serif" style={{ fontSize: "1.4rem", fontWeight: 500 }}>{x.n}</b>
                  <br />
                  {x.s}
                </span>
              </TLink>
            ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
