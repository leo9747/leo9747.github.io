"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "detail", label: "Detail" },
  { id: "reading", label: "Reading" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  function scrollTo(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-6 pt-10 pb-0">

        <div className="max-w-2xl lg:ml-44 xl:ml-52">
          {/* Title block */}
          <div className="border border-black px-5 py-4 bg-white flex items-center justify-between">
            <Link href="/" className="text-4xl font-semibold tracking-tight hover:opacity-70 transition-opacity" style={{fontFamily:"var(--font-lora)", textDecoration:"none"}}>
              Leo Hyams
            </Link>

            {/* Hamburger — only on mobile/tablet (below lg) */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1 hover:opacity-70 transition-opacity"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-black transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>

          {/* Hamburger dropdown */}
          {open && (
            <div className="lg:hidden border border-black border-t-0 bg-white flex flex-col divide-y divide-black">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                  style={{fontFamily:"var(--font-inter)", color:"var(--orange)", textDecoration:"none"}}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Themes block */}
          <div className="border border-black border-t-0 flex bg-white" style={{fontFamily: "var(--font-inter)"}}>
            {["Nature", "Humanity", "Technology"].map((t, i) => (
              <div key={t} className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-widest text-muted ${i > 0 ? "border-l border-black" : ""}`}>
                {t}
              </div>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
}
