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
          background: "#f1f2f6",
          backgroundImage:
            "radial-gradient(ellipse 85% 90% at 88% 10%, #ffffff 0%, #c8cdd8 34%, #8d95a8 58%, rgba(241,242,246,0) 82%)",
          color: "#08090c",
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
            color: "#7a8194",
            borderBottom: "1px solid rgba(8,9,12,0.14)",
            paddingBottom: 24,
          }}
        >
          <span>xrtem.dev</span>
          <span style={{ color: "#08090c" }}>5 projects in production</span>
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
              color: "#7a8194",
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
            color: "#454b5a",
            borderTop: "1px solid rgba(8,9,12,0.14)",
            paddingTop: 24,
          }}
        >
          <span>Artem Svinoboev · full-stack · ML / computer vision</span>
          <span style={{ color: "#7a8194" }}>Yakutsk · UTC+9</span>
        </div>
      </div>
    ),
    size,
  );
}
