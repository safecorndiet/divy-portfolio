import { db } from "@/lib/db";
import { experience } from "@/drizzle/schema";

export default async function ExperiencePage() {
  const rows = await db.select().from(experience);
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">Experience</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <div key={r.id} className="border rounded-2xl p-5">
            <div className="text-sm opacity-70">{r.company}</div>
            <h2 className="text-xl font-medium">{r.role}</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              {r.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
            <div className="mt-2 text-xs opacity-70">Tools: {r.tools.join(", ")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}