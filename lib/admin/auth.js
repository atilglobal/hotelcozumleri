import bcrypt from "bcryptjs";
import { query, getPool } from "@/lib/db";
import { createAdminSession, destroyAdminSession } from "@/lib/admin/session";

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function loginAdmin({ email, password }) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const rows = await query(
    "SELECT id, name, surname, email, password_hash, role, status FROM admin_users WHERE email = ? LIMIT 1",
    [email.toLowerCase().trim()]
  );
  if (!rows.length) throw new Error("INVALID_CREDENTIALS");
  const admin = rows[0];
  if (admin.status !== "active") throw new Error("ACCOUNT_INACTIVE");
  const valid = await verifyPassword(password, admin.password_hash);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  await query("UPDATE admin_users SET last_login_at = NOW() WHERE id = ?", [admin.id]);
  await createAdminSession({
    adminId: admin.id,
    email: admin.email,
    name: `${admin.name} ${admin.surname}`,
    role: admin.role,
  });
  return { adminId: admin.id, email: admin.email, name: `${admin.name} ${admin.surname}`, role: admin.role };
}

export async function logoutAdmin() {
  await destroyAdminSession();
}

export async function getAdminById(adminId) {
  if (!getPool()) return null;
  const rows = await query(
    "SELECT id, name, surname, email, role, status, last_login_at, created_at FROM admin_users WHERE id = ? LIMIT 1",
    [adminId]
  );
  return rows[0] || null;
}

export async function createAdminUser(data, creatorRole) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  if (data.role === "SUPER_ADMIN" && creatorRole !== "SUPER_ADMIN") {
    throw new Error("FORBIDDEN");
  }
  const existing = await query("SELECT id FROM admin_users WHERE email = ?", [data.email.toLowerCase().trim()]);
  if (existing.length) throw new Error("EMAIL_EXISTS");
  const passwordHash = await hashPassword(data.password);
  const result = await query(
    "INSERT INTO admin_users (name, surname, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?, 'active')",
    [data.name.trim(), data.surname.trim(), data.email.toLowerCase().trim(), passwordHash, data.role || "ADMIN"]
  );
  return { id: result.insertId };
}

export async function changeAdminPassword(adminId, { currentPassword, newPassword }) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const rows = await query("SELECT password_hash FROM admin_users WHERE id = ? LIMIT 1", [adminId]);
  if (!rows.length) throw new Error("NOT_FOUND");
  const valid = await verifyPassword(currentPassword, rows[0].password_hash);
  if (!valid) throw new Error("INVALID_PASSWORD");
  const hash = await hashPassword(newPassword);
  await query("UPDATE admin_users SET password_hash = ? WHERE id = ?", [hash, adminId]);
  return { ok: true };
}
