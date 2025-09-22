"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/contact", { method: "POST", body: formData });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) form.reset();
  }

  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="text-muted-foreground mb-6">Say hi — I read every message.</p>
      <form className="max-w-md space-y-3" onSubmit={onSubmit}>
        <input name="name" required placeholder="Your name" className="w-full border rounded-xl p-3" />
        <input name="email" required type="email" placeholder="Email" className="w-full border rounded-xl p-3" />
        {/* Honeypot */}
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
        <textarea name="message" required placeholder="Message" className="w-full border rounded-xl p-3 h-32" />
        <button className="rounded-xl bg-foreground text-background px-4 py-2">Send</button>
        {status === "ok" && <p className="text-sm text-green-600">Sent! I’ll get back soon.</p>}
        {status === "error" && <p className="text-sm text-red-600">Something went wrong.</p>}
      </form>
    </section>
  );
}