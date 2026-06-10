import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mailing List",
  description:
    "Subscribe for occasional updates from Leo Hyams on AI risk, writing, and what I am building.",
};

export default function MailingList() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Mailing List</h1>
        <p className="text-muted leading-relaxed">
          Occasional updates on my work, writing, and what I&apos;m building. No
          spam, and you can unsubscribe any time.
        </p>
      </header>

      {/* TODO: Wire up to a hosted provider (Buttondown / Mailchimp / ConvertKit).
          Static site — point the form `action` at the provider, or drop in
          their embed, then enable the input + button below. */}
      <form className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          disabled
          placeholder="you@example.com"
          className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted disabled:opacity-60 focus:border-foreground transition-colors"
        />
        <button
          type="submit"
          disabled
          className="rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-muted">Sign-up coming soon.</p>
    </article>
  );
}
