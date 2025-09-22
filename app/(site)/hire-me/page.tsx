export default function HireMe() {
  const subject = encodeURIComponent("Hire Divy Shah — Portfolio Lead");
  const body = encodeURIComponent("Hi Divy,\n\nWe'd like to talk about an opportunity.\n\n—");
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">Hire Me</h1>
      <p className="text-muted-foreground">Let’s build something fast, reliable, and delightful.</p>
      <a className="mt-4 inline-block rounded-xl bg-foreground text-background px-4 py-2"
         href={`mailto:${process.env.ADMIN_EMAIL || "you@example.com"}?subject=${subject}&body=${body}`}>
        One-click Email
      </a>
    </section>
  );
}