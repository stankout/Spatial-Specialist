import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#171a17", color: "#f3f0e8", fontFamily: "serif", fontSize: 27, border: "4px solid #b4894d" }}>AC</div>,
    size,
  );
}
