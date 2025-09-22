import Link from "next/link";
import { db } from "@/lib/db";
import { projects } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export const revalidate = 120;

export default async function ProjectsPage() {
  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt)).limit(12);
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rows.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="rounded-2xl border p-5 hover:bg-accent transition">
            <h2 className="text-xl font-medium">{p.title}</h2>
            <p className="text-sm text-muted-foreground">{p.blurb}</p>
            <div className="mt-3 text-xs opacity-80">Stack: {p.stack.join(", ")}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}