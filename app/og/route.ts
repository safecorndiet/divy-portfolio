import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Divy Shah — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full items-start justify-center p-16"
        style={{ background: "linear-gradient(135deg,#0ea5e9,#111827)" }}
      >
        <div tw="text-6xl text-white font-bold">Divy Shah</div>
        <div tw="text-2xl text-white/80 mt-4">Learning Timeline • Software • DevOps • AI</div>
      </div>
    ),
    { ...size }
  );
}