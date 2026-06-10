"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/entrepreneurship", label: "Entrepreneurship" },
  { href: "/blog", label: "Blog" },
  { href: "/art", label: "Art" },
  { href: "/mailing-list", label: "Mailing List" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border">
      <nav className="w-full max-w-2xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Link
          href="/"
          className="font-medium tracking-tight hover:opacity-70 transition-opacity"
        >
          Leo Hyams
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`hover:text-foreground transition-colors ${
                    active ? "text-foreground" : ""
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
