import { ImageResponse } from "next/og";
export const alt = "Jarvis — Daha az tıkla. Daha fazlasını yap.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0c0e0d",
        color: "#edf0e9",
        padding: "65px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 38, letterSpacing: -2 }}>jarvis.</div>
        <div style={{ fontSize: 14, letterSpacing: 3, color: "#9fae90" }}>
          WINDOWS / TURKCE / AI
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 76, letterSpacing: -4 }}>Daha az tıkla.</div>
        <div style={{ fontSize: 76, letterSpacing: -4, color: "#d3f5b3" }}>Daha fazlasını yap.</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #303b27",
          paddingTop: 24,
          color: "#9fae90",
          fontSize: 18,
        }}
      >
        <span>Bilgisayarınla aynı dili konuş.</span>
        <span>EGE ASSISTANT</span>
      </div>
    </div>,
    size,
  );
}
