"use client";

import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import TLink from "@/components/TLink";
import { bySlug, money, sizeFactor } from "@/lib/data";
import { useSeasonOnMount } from "@/lib/hooks";
import { useStore } from "@/lib/store";

export default function Bag() {
  useSeasonOnMount(-1);
  const { lines, ready, step, remove, notify } = useStore();
  const total = lines.reduce((a, l) => a + (bySlug(l.id)?.price ?? 0) * sizeFactor[l.sz] * l.q, 0);

  return (
    <main>
      <section className="bag">
        <h1 style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>Your bag</h1>
        {!ready ? null : lines.length === 0 ? (
          <>
            <p className="quote" style={{ margin: "3rem 0 2rem" }}>Your bag is empty. Choose a season to begin.</p>
            <TLink className="btn" href="/collections">Shop the collections</TLink>
          </>
        ) : (
          <>
            {lines.map((l, i) => {
              const p = bySlug(l.id);
              if (!p) return null;
              const unit = p.price * sizeFactor[l.sz];
              return (
                <div className="bi" key={`${l.id}-${l.sz}`}>
                  <TLink href={`/perfume/${p.id}`} style={{ background: p.bg, borderRadius: "40px 40px 4px 4px" }}>
                    <Photo p={p} sizes="70px" />
                  </TLink>
                  <div>
                    <h3>{p.n}</h3>
                    <p>{l.sz} ml · {money(unit)} each</p>
                    <div className="qty" style={{ margin: ".6rem 0 0" }}>
                      <button aria-label="Decrease quantity" onClick={() => step(i, -1)}>−</button>
                      <output>{l.q}</output>
                      <button aria-label="Increase quantity" onClick={() => step(i, 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="serif" style={{ fontSize: "1.6rem" }}>{money(unit * l.q)}</p>
                    <button className="rm" onClick={() => remove(i)}>Remove</button>
                  </div>
                </div>
              );
            })}
            <div className="tot">
              <div><span>Subtotal</span><span>{money(total)}</span></div>
              <div><span>Shipping</span><span>Complimentary</span></div>
              <div className="t"><span>Total</span><span>{money(total)}</span></div>
              <button className="btn" style={{ width: "100%" }} onClick={() => notify("Checkout is a demo here. Thank you for exploring Quatréa.")}>
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
