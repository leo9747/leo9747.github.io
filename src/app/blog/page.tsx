import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Leo Hyams on AI risk, technical governance, research, and more.",
};

export default function Blog() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted leading-relaxed">
          Notes on AI risk, technical governance, research, and whatever else is
          on my mind.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-border p-8 text-sm text-muted">
        No posts yet &mdash; check back soon.
      </div>
    </article>
  );
}
