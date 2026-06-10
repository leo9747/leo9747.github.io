"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="bg-background">
      <div className="w-full max-w-2xl mx-auto px-6 pt-10 pb-0">

        {/* Title block */}
        <div className="border border-black px-5 py-4 bg-white">
          <Link href="/" className="text-4xl font-semibold tracking-tight hover:opacity-70 transition-opacity" style={{fontFamily:"var(--font-lora)", textDecoration:"none"}}>
            Leo Hyams
          </Link>
        </div>

        {/* Themes block */}
        <div className="border border-black border-t-0 flex divide-x divide-black bg-white" style={{fontFamily: "var(--font-inter)"}}>
          {["Nature", "Humanity", "Technology"].map((t) => (
            <div key={t} className="flex-1 px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-muted">
              {t}
            </div>
          ))}
        </div>

      </div>
    </header>
  );
}
