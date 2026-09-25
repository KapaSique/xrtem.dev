import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "xrtem.dev — Artem Svinoboev, web and product engineering";

// Latin only: Cyrillic here would mean shipping a font file into the route.
export default async function OpengraphImage() {
  const poster = await readFile(join(process.cwd(), "public/media/glass/x-poster.jpg"));
  const src = `data:image/jpeg;base64,${poster.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000000", color: "#ffffff", fontFamily: "sans-serif" }}>
        <img src={src} width={630} height={630} style={{ position: "absolute", right: 24, top: 0 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "64px 72px" }}>
          <span style={{ fontSize: 32, letterSpacing: "-0.045em" }}>xrtem</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            <span>Web &amp; product</span>
            <span style={{ color: "#A9A7B4" }}>engineering</span>
          </div>
          <span style={{ fontSize: 22, color: "#A9A7B4" }}>xrtem.dev · Artem Svinoboev · Yakutsk</span>
        </div>
      </div>
    ),
    size,
  );
}
