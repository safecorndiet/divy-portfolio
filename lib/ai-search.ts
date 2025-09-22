import { db } from "@/lib/db";
import { documents } from "@/drizzle/schema";
import { ilike } from "drizzle-orm";

export async function searchDocuments(query: string) {
  // Fallback keyword search when no OPENAI_API_KEY
  if (!process.env.OPENAI_API_KEY) {
    const rows = await db.select().from(documents).where(ilike(documents.content, `%${query}%`));
    return rows.slice(0, 10);
  }
  const { OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const emb = await client.embeddings.create({ model: "text-embedding-3-small", input: query });
  const vec = emb.data[0].embedding;
  const rows = await db.select().from(documents);
  function cosine(a: number[], b: number[]) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }
  const scored = rows.map(r => ({ ...r, score: cosine(vec, JSON.parse(r.embedding)) })).sort((a,b) => (b as any).score - (a as any).score);
  return scored.slice(0, 10);
}