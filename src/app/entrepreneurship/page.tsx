import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrepreneurship",
  description:
    "Leo Hyams on building organisations aimed at reducing catastrophic risk from AI.",
};

export default function Entrepreneurship() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Entrepreneurship
        </h1>
        <p className="text-muted leading-relaxed">
          I build organisations from the ground up. Right now that&apos;s the
          Cape Institute for Safe AI (CISAI), formerly AI Safety South Africa
          &mdash; growing the talent and research the field needs.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-border p-8 text-sm text-muted">
        More on what I&apos;m building, and the lessons along the way, coming
        soon.
      </div>
    </article>
  );
}
