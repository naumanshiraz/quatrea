"use client";

import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import TLink from "@/components/TLink";
import { money, perfumes, sizeFactor } from "@/lib/data";
import { useReveal, useSeasonWatch, vars } from "@/lib/hooks";

export default function Collections() {
  useReveal();
  useSeasonWatch();

  return (
    <main>
      <section className="ch">
        <h1>Collections</h1>
        <p className="lead serif">Four seasons, four fragrances. Choose the one that feels like now.</p>
      </section>
      {perfumes.map((p, i) => (
        <article key={p.id} className={`co${i % 2 ? " r" : ""}`} data-s={i} style={vars(p)}>
          <TLink className="cimg" href={`/perfume/${p.id}`} aria-label={p.n}>
            <div className="pw" data-p="-.06">
              <Photo p={p} sizes="(max-width: 820px) 100vw, 50vw" priority={i === 0} />
            </div>
          </TLink>
          <div className="ctx rv">
            <h2>{p.n}</h2>
            <p className="lead">{p.tag}</p>
            <dl className="nt">
              <div><dt>Top</dt><dd>{p.top.join(", ")}</dd></div>
              <div><dt>Heart</dt><dd>{p.heart.join(", ")}</dd></div>
              <div><dt>Base</dt><dd>{p.base.join(", ")}</dd></div>
            </dl>
            <div className="cb">
              <span className="serif">From {money(p.price * sizeFactor[30])}</span>
              <TLink className="btn" href={`/perfume/${p.id}`}>
                Explore {p.n}
              </TLink>
            </div>
          </div>
        </article>
      ))}
      <Footer />
    </main>
  );
}
