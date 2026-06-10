import type { Metadata } from "next";
import Age from "@/components/Age";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Leo Hyams — nationality, location, occupation, education, and the things I do outside of work.",
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-5">
      <dt className="text-sm font-medium text-muted pt-0.5">{label}</dt>
      <dd className="leading-relaxed">{children}</dd>
    </div>
  );
}

export default function About() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted leading-relaxed">A few things about me.</p>
      </header>

      <dl className="border-y border-border divide-y divide-border">
        <Row label="Age">
          <Age /> years old (born 14 November 2001).
        </Row>
        <Row label="Nationality">
          Born in the UK, but I&apos;ve lived in South Africa my whole life.
          I&apos;m in the process of getting my citizenship &mdash; pending the
          mercy of Home Affairs.
        </Row>
        <Row label="Location">
          Based in Cape Town, though I travel quite a lot.
        </Row>
        <Row label="Occupation">
          Executive Director of the{" "}
          <strong className="font-medium">Cape Institute for Safe AI</strong>{" "}
          (CISAI), formerly AI Safety South Africa &mdash; a capacity-building
          and research organisation
          focused on global catastrophic risk from advanced AI. We develop top
          talent to understand AI risk and build the safeguards to prevent it,
          and our research evaluates the risks of increasingly autonomous AI.
        </Row>
        <Row label="Education">
          BSocSci from the University of Cape Town, majoring in Computer Science
          and Psychology.
        </Row>
        <Row label="Hobbies">Camping, exercise, and reading.</Row>
      </dl>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Reading</h2>
        <p className="text-muted leading-relaxed">
          I read widely and keep track of everything on Goodreads. My most recent
          reads and reviews will show up here.
        </p>
        {/* TODO: Wire up Goodreads — pull the latest 3 read books + reviews
            via the Goodreads RSS feed or a build-time fetch (static site). */}
        <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
          Goodreads integration coming soon &mdash; my last three books and
          reviews will appear here.
        </div>
      </section>
    </article>
  );
}
