import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Divy Shah — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 64,
          background: "linear-gradient(135deg,#0ea5e9,#111827)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            color: "#fff",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Divy Shah
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Software · DevOps · AI/ML · Automation
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 20,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          divy-portfolio · Learning Timeline
        </div>
      </div>
    ),
    size
  );
}
