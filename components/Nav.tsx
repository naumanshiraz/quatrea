"use client";

import { useEffect } from "react";
import TLink from "@/components/TLink";
import { useStore } from "@/lib/store";

const links = [
  { href: "/", label: "Home" },
  { href: "/home-2", label: "Home 2" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "The House" },
  { href: "/bag", label: "Your bag" },
];

export default function Nav() {
  const { count, menu, setMenu } = useStore();

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menu, setMenu]);

  return (
    <>
      <nav>
        <TLink className="logo" href="/" aria-label="Quatréa home">
          QUATR<i>É</i>A
        </TLink>
        <div className="nr">
          <TLink href="/bag" aria-label={`Bag, ${count} items`}>
            Bag<span className="bagn">{count}</span>
          </TLink>
          <button onClick={() => setMenu(true)} aria-expanded={menu} aria-controls="menu">
            Menu
          </button>
        </div>
      </nav>
      <div id="menu" className={menu ? "on" : ""} role="dialog" aria-label="Menu" aria-hidden={!menu}>
        <button className="x" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
          Close
        </button>
        {links.map((l) => (
          <TLink key={l.href} href={l.href} tabIndex={menu ? 0 : -1}>
            {l.label}
          </TLink>
        ))}
      </div>
    </>
  );
}
