"use client";

import { useRef } from "react";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import TLink from "@/components/TLink";
import { darkTheme, money, perfumes, sizeFactor, type Perfume } from "@/lib/data";
import { useReveal, useTheme } from "@/lib/hooks";
import { useStore } from "@/lib/store";

const notes = ["Peony", "Bergamot", "Amber", "Vanilla", "Sandalwood", "Sea salt", "Juniper", "White musk"];

function Tile({ p, wide }: { p: Perfume; wide?: boolean }) {
  return (
    <TLink className={`tl${wide ? " w" : ""}`} href={`/perfume/${p.id}`}>
      <b style={{ backgroundImage: `url(${p.img})` }} />
      <span>
        {p.n}
        <small>{p.s}</small>
      </span>
    </TLink>
  );
}

export default function Home2() {
  useReveal();
  useTheme(darkTheme);
  const { setSeason, add, notify } = useStore();
  const track = useRef<HTMLDivElement>(null);

  return (
    <main>
      <section className="h2h">
        <div className="acc" onMouseLeave={() => setSeason(-1)}>
          {perfumes.map((p, i) => (
            <TLink key={p.id} className="ac-p" href={`/perfume/${p.id}`} aria-label={p.n} onMouseEnter={() => setSeason(i)} onFocus={() => setSeason(i)}>
              <b style={{ backgroundImage: `url(${p.img})` }} />
              <span className="sn">{p.s}</span>
              <div className="ai">
                <h3>{p.n}</h3>
                <p>{p.tag}</p>
                <span className="btn">Discover</span>
              </div>
            </TLink>
          ))}
        </div>
        <div className="h2t">
          <h1>Choose your season.</h1>
        </div>
      </section>

      <div className="mq" aria-hidden="true">
        <div>
          {notes.concat(notes).map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <section>
        <div className="bn">
          <Tile p={perfumes[0]} wide />
          <div className="tx w" style={{ background: "#d9b48f", color: "#14101a" }}>
            <p className="quote" style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)" }}>“Perfume is the only art that travels with you.”</p>
            <p>The founders, Quatréa</p>
          </div>
          <div className="tx" style={{ background: perfumes[2].ac, color: "#2a1507" }}>
            <h3 style={{ fontSize: "3.4rem" }}>90 days</h3>
            <p>Each blend rests before it is bottled.</p>
          </div>
          <div className="tx" style={{ background: perfumes[3].ac, color: "#0e1a35" }}>
            <h3 style={{ fontSize: "2.2rem" }}>Refillable glass</h3>
            <p>Weighted bottles made to last for years.</p>
          </div>
          <Tile p={perfumes[2]} wide />
          <Tile p={perfumes[1]} />
          <Tile p={perfumes[3]} />
        </div>
      </section>

      <section>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", marginBottom: "2.5rem", textAlign: "center" }}>
          <h2 className="rv">Wear the season</h2>
          <div className="qty carnav">
            <button aria-label="Scroll left" onClick={() => track.current?.scrollBy({ left: -340, behavior: "smooth" })}>‹</button>
            <button aria-label="Scroll right" onClick={() => track.current?.scrollBy({ left: 340, behavior: "smooth" })}>›</button>
          </div>
        </div>
        <div className="car" ref={track}>
          {perfumes.map((p) => (
            <div className="cd" key={p.id} style={{ background: p.bg, color: p.ink }}>
              <TLink href={`/perfume/${p.id}`}>
                <Photo p={p} sizes="(max-width: 820px) 78vw, 320px" />
              </TLink>
              <h3>{p.n}</h3>
              <p>{p.s}</p>
              <div className="cb">
                <span className="serif" style={{ fontSize: "1.5rem" }}>{money(p.price * sizeFactor[50])}</span>
                <button
                  className="btn"
                  onClick={() => {
                    add(p.id, 50, 1);
                    notify(`${p.n} added to your bag`);
                  }}
                >
                  Add 50 ml
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stm">
        <h2 className="rv">
          Four seasons.
          <br />
          One signature.
        </h2>
        <p className="rv" style={{ margin: "2rem 0" }}>Explore every fragrance and find the one that feels like you.</p>
        <TLink className="btn" href="/collections">
          View all collections
        </TLink>
      </section>
      <Footer />
    </main>
  );
}
