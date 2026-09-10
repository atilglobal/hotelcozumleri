import bcrypt from "bcryptjs";
import crypto from "crypto";
import { query, getPool } from "@/lib/db";
import { createSession, destroySession } from "@/lib/session";

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function registerUser({ name, surname, email, phone, password, companyName, hotelName }) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const existing = await query("SELECT id FROM users WHERE email = ?", [email.toLowerCase().trim()]);
  if (existing.length) throw new Error("EMAIL_EXISTS");

  const passwordHash = await hashPassword(password);
  const result = await query(
    `INSERT INTO users (name, surname, email, phone, password_hash, company_name, hotel_name, role, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'customer', 'active')`,
    [name.trim(), surname.trim(), email.toLowerCase().trim(), phone?.trim() || null, passwordHash, companyName?.trim() || null, hotelName?.trim() || null]
  );

  const userId = result.insertId;
  await createSession({ userId, email: email.toLowerCase().trim(), name: `${name} ${surname}` });
  return { userId, email };
}

export async function loginUser({ email, password, remember = false }) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const rows = await query(
    "SELECT id, name, surname, email, password_hash, status FROM users WHERE email = ? LIMIT 1",
    [email.toLowerCase().trim()]
  );
  if (!rows.length) throw new Error("INVALID_CREDENTIALS");
  const user = rows[0];
  if (user.status !== "active") throw new Error("ACCOUNT_INACTIVE");

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  await createSession({
    userId: user.id,
    email: user.email,
    name: `${user.name} ${user.surname}`,
  });
  return { userId: user.id, email: user.email, name: `${user.name} ${user.surname}` };
}

export async function logoutUser() {
  await destroySession();
}

export async function createPasswordResetToken(email) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const rows = await query("SELECT id FROM users WHERE email = ? LIMIT 1", [email.toLowerCase().trim()]);
  if (!rows.length) return { ok: true }; // don't reveal if email exists
  const userId = rows[0].id;
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await query(
    "INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [userId, tokenHash, expires]
  );
  const siteUrl = process.env.SITE_URL || "https://hotelcozumleri.com";
  const resetUrl = `${siteUrl}/sifremi-unuttum?token=${token}`;
  try {
    const { sendMail } = await import("@/lib/mailer");
    await sendMail({
      to: email.toLowerCase().trim(),
      subject: "Şifre Sıfırlama — Hotel Çözümleri",
      html: `<p>Şifre sıfırlama talebiniz alındı.</p><p><a href="${resetUrl}">Şifrenizi sıfırlamak için tıklayın</a></p><p>Bu bağlantı 1 saat geçerlidir.</p>`,
      text: `Şifre sıfırlama: ${resetUrl}`,
    });
  } catch {
    // mail failure should not block or reveal account status
  }
  return { ok: true };
}

export async function resetPassword(token, newPassword) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const rows = await query(
    `SELECT prt.id, prt.user_id FROM password_reset_tokens prt
     WHERE prt.token_hash = ? AND prt.expires_at > NOW() AND prt.used_at IS NULL LIMIT 1`,
    [tokenHash]
  );
  if (!rows.length) throw new Error("INVALID_TOKEN");
  const passwordHash = await hashPassword(newPassword);
  await query("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, rows[0].user_id]);
  await query("UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?", [rows[0].id]);
  return { ok: true };
}

export async function getUserById(userId) {
  if (!getPool()) return null;
  const rows = await query(
    "SELECT id, name, surname, email, phone, company_name, hotel_name, city, created_at FROM users WHERE id = ? AND status = 'active' LIMIT 1",
    [userId]
  );
  return rows[0] || null;
}
