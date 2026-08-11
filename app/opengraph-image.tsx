import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Artem Svinoboev — ML, CV and full-stack engineering";

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
          background: "#faf9f7",
          color: "#1a1a18",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#8c877d",
            borderBottom: "1px solid rgba(26,26,24,0.14)",
            paddingBottom: 24,
          }}
        >
          <span>xrtem.dev</span>
          <span>Yakutsk → Jiamusi → Shenzhen</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, letterSpacing: "-0.05em", lineHeight: 1 }}>
            ARTEM
          </div>
          <div style={{ display: "flex", fontSize: 128, letterSpacing: "-0.05em", lineHeight: 1 }}>
            SVINOBOEV
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#55524b",
            borderTop: "1px solid rgba(26,26,24,0.14)",
            paddingTop: 24,
          }}
        >
          <span>Machine learning · Computer vision · Full-stack</span>
          <span style={{ color: "#8c877d" }}>Selected work</span>
        </div>
      </div>
    ),
    size,
  );
}
