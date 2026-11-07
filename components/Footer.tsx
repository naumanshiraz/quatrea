"use client";

import { useState, type FormEvent } from "react";
import TLink from "@/components/TLink";
import { useStore } from "@/lib/store";

export default function Footer() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setEmail("");
    notify("Welcome to Quatréa. Your first letter is on its way.");
  };

  return (
    <footer>
      <div>
        <h2 style={{ fontSize: "2.6rem" }}>Letters from the four seasons</h2>
        <form onSubmit={submit}>
          <input type="email" required placeholder="Your email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn" type="submit">
            Subscribe
          </button>
        </form>
      </div>
      <ul>
        <li><TLink href="/collections">Collections</TLink></li>
        <li><TLink href="/about">The House</TLink></li>
        <li><TLink href="/bag">Your bag</TLink></li>
        <li style={{ marginTop: "1rem" }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
          {"  "}
          <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">Pinterest</a>
        </li>
      </ul>
      <p className="copy">© 2026 Quatréa Parfums</p>
    </footer>
  );
}
