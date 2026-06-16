"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "detail", label: "Detail" },
  { id: "reading", label: "Reading" },
  { id: "contact", label: "Contact" },
];

export default function TableOfContents() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="hidden lg:flex flex-col gap-1 sticky top-16 pt-2">
      <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3" style={{fontFamily:"var(--font-inter)"}}>
        Contents
      </p>
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:opacity-70"
            style={{
              fontFamily: "var(--font-inter)",
              color: isActive ? "var(--orange)" : "var(--muted)",
              textDecoration: "none",
            }}
          >
            <span
              className="inline-block w-0.5 h-4 transition-all"
              style={{ background: isActive ? "var(--orange)" : "transparent" }}
            />
            {label}
          </a>
        );
      })}
    </nav>
  );
}
