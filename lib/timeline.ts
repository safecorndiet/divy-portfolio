"use server";

import { db } from "@/lib/db";
import { timelineEvents } from "@/drizzle/schema";
import { gte } from "drizzle-orm";
import { env } from "@/lib/env";
import { ingestFromAdapters } from "@/lib/adapters/mocks";

type GetOpts = { tag?: string; range?: "3m" | "6m" | "12m"; source?: string; compare?: boolean };

export async function getTimeline(opts: GetOpts) {
  // ingestion step when on live mode
  if (env.ADAPTER_MODE === "live") {
    await ingestFromAdapters();
  }

  const months = opts.range === "3m" ? 3 : opts.range === "12m" ? 12 : 6;
  const from = new Date();
  from.setMonth(from.getMonth() - months);

  let rows = await db.select().from(timelineEvents).where(gte(timelineEvents.date, from));
  if (opts.tag && opts.tag !== "all") rows = rows.filter(r => (r.tags as any).includes(opts.tag!));
  if (opts.source && opts.source !== "all") rows = rows.filter(r => r.source === opts.source);

  // heatmap aggregation
  const map = new Map<string, number>();
  for (const r of rows) {
    const key = new Date(r.date).toISOString().slice(0,10);
    map.set(key, (map.get(key) || 0) + 1);
  }
  const heatmap = Array.from(map.entries()).map(([date, count]) => ({ date, count }));

  // radar (skill growth per quarter) — mock scores derived from tag counts
  const skills = ["AI", "DevOps", "FE", "BE", "Finance"] as const;
  const tagCount = (tag: string) => rows.filter(r => (r.tags as any).includes(tag)).length;
  const radar = skills.map(skill => ({ skill, score: Math.min(10, tagCount(skill) + 2) }));

  // line chart (stack shifts per quarter)
  const stacks = [
    { q: "Q1", FE: 3, BE: 2, DevOps: 2, AI: 1 },
    { q: "Q2", FE: 4, BE: 3, DevOps: 3, AI: 2 },
    { q: "Q3", FE: 5, BE: 4, DevOps: 4, AI: 3 }
  ];

  return { heatmap, radar, stacks, milestones: rows };
}

export async function generateSummary(range: "week" | "month") {
  const now = new Date();
  const from = new Date(now);
  from.setDate(now.getDate() - (range === "week" ? 7 : 30));
  const rows = await db.select().from(timelineEvents).where(gte(timelineEvents.date, from));
  const plain = rows.map(r => `• ${r.source.toUpperCase()}: ${r.title} — ${r.description}`).join("\n");
  if (!process.env.OPENAI_API_KEY) {
    return `Summary (${range}):\n${plain}\n(Enable OPENAI_API_KEY for AI-polished summaries.)`;
  }
  const { OpenAI } = await import("openai"); const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize concise bullets in first person." },
      { role: "user", content: plain }
    ]
  });
  return res.choices[0]?.message?.content ?? plain;
}