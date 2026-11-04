import { ImageResponse } from "next/og";
import { TAGLINE } from "@/content/site";

export const alt = "Future Star Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0d10",
          color: "#ebe7df",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#9d9a92", letterSpacing: 3, textTransform: "uppercase" }}>
          Biological testing · Physics · Materials
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Future Star</span>
          <span style={{ color: "#ff9b45", fontStyle: "italic" }}>Labs</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9d9a92" }}>{TAGLINE}</div>
      </div>
    ),
    size,
  );
}
