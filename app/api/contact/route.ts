import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "edge";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5)
});

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type");
  const body = contentType?.includes("form") ? Object.fromEntries(await req.formData()) : await req.json();
  // bot/abuse simple protection
  if ("company" in (body as Record<string, unknown>)) return NextResponse.json({ ok: true }, { status: 200 });

  const parsed = schema.safeParse({ name: body.name, email: body.email, message: body.message });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || "noreply@example.com",
      to: [process.env.ADMIN_EMAIL || "you@example.com"],
      subject: `Portfolio Contact — ${parsed.data.name}`,
      text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}