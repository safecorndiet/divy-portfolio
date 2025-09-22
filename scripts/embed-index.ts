import { db } from "@/lib/db";
import { documents, projects as projectsTable } from "@/drizzle/schema";
import { allPosts } from "contentlayer/generated";

async function embed(text: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY) return text.split(/\s+/).slice(0, 256).map((_, i) => Math.sin(i));
  const { OpenAI } = await import("openai");
  const client = new OpenAI();
  const res = await client.embeddings.create({ model: "text-embedding-3-small", input: text });
  return res.data[0].embedding;
}

async function run() {
  // Projects
  const projs = await db.select().from(projectsTable);
  for (const p of projs) {
    const content = `${p.title}\n${p.blurb}\nStack: ${p.stack.join(", ")}`;
    const vector = await embed(content);
    await db.insert(documents).values({ kind: "project", slug: p.slug, title: p.title, content, embedding: JSON.stringify(vector) });
  }
  // Posts
  for (const post of allPosts) {
    const content = `${post.title}\n${post.body.raw}`;
    const vector = await embed(content);
    await db.insert(documents).values({ kind: "post", slug: post.slug, title: post.title, content, embedding: JSON.stringify(vector) });
  }
  console.log("Embedded documents ✓");
}
run();