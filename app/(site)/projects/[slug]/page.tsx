import { db } from "@/lib/db";
import { projects } from "@/drizzle/schema";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const row = await db.query.projects.findFirst({ where: (p) => p.slug.eq(slug) });
  if (!row) return notFound();
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">{row.title}</h1>
      <p className="mt-2 text-muted-foreground">{row.blurb}</p>
      <div className="mt-4 text-sm">
        <strong>Stack:</strong> {row.stack.join(", ")}
      </div>
      {/* Additional project details could be shown here */}
    </section>
  );
}