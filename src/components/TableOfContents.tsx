"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about",   label: "About",   color: "var(--green)",  bg: "var(--green-bg)" },
  { id: "reading", label: "Reading", color: "var(--blue)",   bg: "var(--blue-bg)" },
  { id: "contact", label: "Contact", color: "var(--orange)", bg: "var(--orange-bg)" },
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
    <nav className="hidden lg:block border border-black bg-white" style={{fontFamily:"var(--font-inter)"}}>
      {/* Contents header */}
      <div className="px-4 py-2 border-b border-black text-sm font-bold uppercase tracking-widest bg-white text-foreground">
        Contents
      </div>
      {sections.map(({ id, label, color, bg }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center px-4 py-2 text-sm font-bold uppercase tracking-widest border-b border-black last:border-b-0 hover:opacity-70 transition-opacity"
            style={{
              color,
              background: isActive ? bg : "white",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
