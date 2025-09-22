import { NextResponse } from "next/server";
import { searchDocuments } from "@/lib/ai-search";

export const runtime = "edge";

export async function POST(req: Request) {
  const { query } = await req.json();
  if (!query || typeof query !== "string") return NextResponse.json({ error: "missing query" }, { status: 400 });
  const results = await searchDocuments(query);
  return NextResponse.json({ results });
}