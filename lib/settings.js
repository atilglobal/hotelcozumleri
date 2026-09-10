import { query, getPool } from "@/lib/db";

const cache = new Map();
let cacheTime = 0;
const CACHE_TTL = 60_000;

export async function getSetting(group, key, fallback = null) {
  if (!getPool()) {
    return getEnvFallback(group, key, fallback);
  }
  const cacheKey = `${group}:${key}`;
  if (Date.now() - cacheTime < CACHE_TTL && cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const rows = await query("SELECT value, type FROM settings WHERE `group` = ? AND `key` = ? LIMIT 1", [group, key]);
    if (!rows.length) {
      const fb = getEnvFallback(group, key, fallback);
      cache.set(cacheKey, fb);
      return fb;
    }
    const val = parseValue(rows[0].value, rows[0].type);
    cache.set(cacheKey, val);
    cacheTime = Date.now();
    return val;
  } catch {
    return getEnvFallback(group, key, fallback);
  }
}

export async function getPublicSettings() {
  if (!getPool()) return getDefaultPublicSettings();
  try {
    const rows = await query("SELECT `group`, `key`, value, type FROM settings WHERE is_public = 1");
    const out = getDefaultPublicSettings();
    for (const r of rows) {
      if (!out[r.group]) out[r.group] = {};
      out[r.group][r.key] = parseValue(r.value, r.type);
    }
    return out;
  } catch {
    return getDefaultPublicSettings();
  }
}

export async function setSetting(group, key, value, type = "string", isPublic = false) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const strVal = type === "json" ? JSON.stringify(value) : String(value);
  await query(
    `INSERT INTO settings (\`group\`, \`key\`, value, type, is_public) VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE value = VALUES(value), type = VALUES(type), is_public = VALUES(is_public)`,
    [group, key, strVal, type, isPublic ? 1 : 0]
  );
  cache.clear();
}

export async function getSettingsByGroup(group) {
  if (!getPool()) return {};
  const rows = await query("SELECT `key`, value, type, is_public FROM settings WHERE `group` = ?", [group]);
  const out = {};
  for (const r of rows) {
    out[r.key] = { value: parseValue(r.value, r.type), type: r.type, isPublic: Boolean(r.is_public) };
  }
  return out;
}

export async function isPaymentEnabled(provider) {
  const enabled = await getSetting("payment", `${provider}_enabled`, false);
  return Boolean(enabled);
}

function parseValue(value, type) {
  if (value === null || value === undefined) return null;
  if (type === "boolean") return value === "1" || value === "true";
  if (type === "number") return Number(value);
  if (type === "json") {
    try { return JSON.parse(value); } catch { return null; }
  }
  return value;
}

function getEnvFallback(group, key, fallback) {
  const map = {
    "general:site_name": process.env.SITE_NAME,
    "general:contact_email": process.env.CONTACT_EMAIL,
    "general:contact_phone": process.env.CONTACT_PHONE,
    "general:whatsapp_number": process.env.WHATSAPP_NUMBER,
    "payment:paytr_enabled": Boolean(process.env.PAYTR_MERCHANT_ID),
    "payment:iyzico_enabled": Boolean(process.env.IYZICO_API_KEY),
    "payment:bank_transfer_enabled": true,
    "payment:paytr_test_mode": process.env.PAYTR_TEST_MODE === "1",
  };
  return map[`${group}:${key}`] ?? fallback;
}

function getDefaultPublicSettings() {
  return {
    general: {
      site_name: "Hotel Çözümleri",
      contact_email: process.env.CONTACT_EMAIL || "info@hotelcozumleri.com",
      contact_phone: process.env.CONTACT_PHONE || "",
      whatsapp_number: process.env.WHATSAPP_NUMBER || "",
    },
  };
}

export function clearSettingsCache() {
  cache.clear();
  cacheTime = 0;
}
