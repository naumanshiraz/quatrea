"use client";

import Footer from "@/components/Footer";
import TLink from "@/components/TLink";
import { useReveal, useSeasonOnMount } from "@/lib/hooks";

const lines = [
  ["Philosophy", "Quatréa began with a simple question: what does a season feel like on skin? We believe fragrance should mark time, so each scent is tied to one season and one emotion, never to a trend."],
  ["Spring", "Soft, green and hopeful. The quiet joy of the first warm morning."],
  ["Summer", "Bright and golden. Long light, sea air and the feeling of nowhere to be."],
  ["Autumn", "Warm and grounded. Amber, smoke and the comfort of coming home."],
  ["Winter", "Cool, hushed and luminous. A night where everything slows down."],
  ["Craft", "Our perfumers blend by hand in Grasse, then let each fragrance rest for ninety days. Every bottle is filled, weighted and numbered in our atelier."],
];

export default function About() {
  useReveal();
  useSeasonOnMount(-1);

  return (
    <main>
      <section className="about-h">
        <h1>The House</h1>
        <p className="quote rv" style={{ marginTop: "3rem" }}>
          Perfume is the only art that travels with you. We made four, one for each turn of the year.
        </p>
      </section>
      <section style={{ paddingTop: 0 }}>
        {lines.map(([t, d]) => (
          <div className="line rv" key={t}>
            <h3>{t}</h3>
            <p style={{ maxWidth: "55ch" }}>{d}</p>
          </div>
        ))}
        <p style={{ marginTop: "3rem" }}>
          <TLink className="btn" href="/collections">
            Explore the collections
          </TLink>
        </p>
      </section>
      <Footer />
    </main>
  );
}
