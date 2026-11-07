import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="bag">
        <h1 style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>Page not found</h1>
        <p className="quote" style={{ margin: "3rem 0 2rem" }}>This page has drifted away with the season.</p>
        <Link className="btn" href="/">Back to home</Link>
      </section>
    </main>
  );
}
