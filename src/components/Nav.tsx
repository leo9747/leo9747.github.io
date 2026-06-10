"use client";

import Link from "next/link";

const links = [
  { href: "https://www.linkedin.com/in/leo-hyams-63960a163/", label: "LinkedIn", external: true },
  { href: "https://substack.com/@leonidasaurelius", label: "Substack", external: true },
  { href: "https://www.goodreads.com/user/show/117011949-leo-hyams", label: "Goodreads", external: true },
  { href: "https://www.instagram.com/king.griffon/", label: "Art", external: true },
  { href: "https://x.com/leo_hyams", label: "X", external: true },
];

export default function Nav() {
  return (
    <header className="bg-background">
      <div className="w-full max-w-2xl mx-auto px-6 pt-12 pb-2 flex flex-col gap-4">
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          Leo Hyams
        </Link>
        <ul className="flex items-center gap-5 text-xs tracking-widest uppercase font-bold" style={{fontFamily: "var(--font-inter)", color: "var(--orange)"}}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
