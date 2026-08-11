import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Artem Svinoboev — product, ML and agentic engineering";

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
          background: "#17181c",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 22% -10%, rgba(198,168,125,0.30) 0%, transparent 62%)",
          color: "#f3f4f6",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 19,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#868b94",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            paddingBottom: 24,
          }}
        >
          <span>xrtem.dev</span>
          <span style={{ color: "#c6a87d" }}>5 projects in production</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            I take it all the way —
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#c6a87d",
            }}
          >
            from the experiment
          </div>
          <div style={{ display: "flex", fontSize: 76, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            to the thing people use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 21,
            color: "#b7bbc3",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
          }}
        >
          <span>Artem Svinoboev · full-stack · ML / computer vision</span>
          <span style={{ color: "#868b94" }}>Yakutsk · UTC+9</span>
        </div>
      </div>
    ),
    size,
  );
}
