import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art",
  description: "Things Leo Hyams makes outside of work.",
};

export default function Art() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Art</h1>
        <p className="text-muted leading-relaxed">
          Things I make outside of work.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-border p-8 text-sm text-muted">
        A gallery is coming soon.
      </div>
    </article>
  );
}
