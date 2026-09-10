const REQUIRED_PRODUCTION = [
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "SESSION_SECRET",
  "SITE_URL",
];

let configValidated = false;

export function validateConfig() {
  if (configValidated) return { ok: true, missing: [] };
  configValidated = true;

  const isProd = process.env.NODE_ENV === "production";
  const missing = REQUIRED_PRODUCTION.filter((key) => !process.env[key]?.trim());
  if (isProd && missing.length) {
    console.error("[config] Production ortamında eksik env değişkenleri:", missing.join(", "));
    if (process.env.SESSION_SECRET === "dev-session-secret-change-in-production") {
      console.error("[config] SESSION_SECRET production için güvenli bir değer olmalıdır.");
    }
  }
  return { ok: missing.length === 0, missing };
}

export function getPort() {
  return Number(process.env.PORT || 3000);
}
