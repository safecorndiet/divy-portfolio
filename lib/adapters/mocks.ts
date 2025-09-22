import { db } from "@/lib/db";
import { timelineEvents } from "@/drizzle/schema";
import { env } from "@/lib/env";

function normalize(item: { date: string | Date; type: string; title: string; description: string; source: string; tags: string[]; links?: string[] }) {
  return {
    date: new Date(item.date),
    type: item.type,
    title: item.title,
    description: item.description,
    source: item.source,
    tags: item.tags,
    metrics: {},
    links: item.links || []
  };
}

export async function ingestFromAdapters() {
  if (env.ADAPTER_MODE === "mock") return;
  const out: any[] = [];
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}`, "User-Agent": "divy-portfolio" } : { "User-Agent": "divy-portfolio" };
    const gh = await fetch("https://api.github.com/users/safecorndiet/events/public", { headers }).then(r => r.json());
    for (const e of gh.slice(0, 10)) {
      out.push(normalize({
        date: e.created_at,
        type: "commit",
        title: `GitHub ${e.type}`,
        description: e.repo?.name || "",
        source: "github",
        tags: ["FE","BE","DevOps"]
      }));
    }
  } catch {}
  if (out.length) await db.insert(timelineEvents).values(out);
}