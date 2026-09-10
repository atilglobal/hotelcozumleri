"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="tr">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Bir Sorun Oluştu.</h1>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>Beklenmeyen bir hata oluştu.</p>
        <button type="button" onClick={() => reset()} style={{ padding: "0.75rem 1.5rem", cursor: "pointer" }}>
          Tekrar Dene
        </button>
      </body>
    </html>
  );
}
