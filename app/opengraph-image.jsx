import { ImageResponse } from "next/og";

export const alt = "Hotel Çözümleri";
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
          background: "linear-gradient(160deg, #0A1628 0%, #0F2440 100%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#C9A962",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          HOTELIO
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Hotel Çözümleri
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Oteller için yazılım, tedarik ve profesyonel çözümler
        </div>
      </div>
    ),
    { ...size }
  );
}
