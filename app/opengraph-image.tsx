import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Solace — Autonomous data infrastructure for AI teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#172B36",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255,200,1,0.25), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#FFC801",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#172B36",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 28, color: "#F1F6F4", fontWeight: 600 }}>Solace</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 56,
            fontWeight: 600,
            color: "#F1F6F4",
            maxWidth: 880,
            lineHeight: 1.15,
          }}
        >
          Your data infrastructure, running itself.
        </div>
        <div style={{ marginTop: 24, fontSize: 24, color: "#D9E8E2", maxWidth: 760 }}>
          Matrix-driven pricing. Bento-grade platform overview. Built for teams
          that automate, not babysit.
        </div>
      </div>
    ),
    { ...size },
  );
}
