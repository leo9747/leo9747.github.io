"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
    }
  }

  const INPUT = "w-full border border-black px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black font-sans";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={INPUT}
          style={{fontFamily: "var(--font-inter)"}}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={INPUT}
          style={{fontFamily: "var(--font-inter)"}}
        />
      </div>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className={INPUT}
        style={{fontFamily: "var(--font-inter)"}}
      />
      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-black px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          style={{fontFamily: "var(--font-inter)"}}
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        {status === "success" && (
          <p className="text-xs text-green" style={{fontFamily: "var(--font-inter)"}}>Message sent.</p>
        )}
        {status === "error" && (
          <p className="text-xs text-orange" style={{fontFamily: "var(--font-inter)"}}>Something went wrong. Try again.</p>
        )}
      </div>
    </form>
  );
}
