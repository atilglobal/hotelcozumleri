/**
 * Run: node scripts/seed-admin.js
 * Creates default SUPER_ADMIN if not exists.
 * Requires DB env vars.
 */
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const email = process.argv[2] || "admin@hotelcozumleri.com";
  const password = process.argv[3];
  if (!password) {
    console.error("Usage: node scripts/seed-admin.js [email] [password]");
    process.exit(1);
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 3306),
  });

  for (const file of ["migration-faz5.sql", "migration-faz6.sql"]) {
    const migration = readFileSync(join(__dirname, `../database/${file}`), "utf8");
    for (const stmt of migration.split(";").filter((s) => s.trim())) {
      try { await db.execute(stmt); } catch { /* ignore existing */ }
    }
  }

  const hash = await bcrypt.hash(password, 12);
  const [existing] = await db.execute("SELECT id FROM admin_users WHERE email = ?", [email]);
  if (existing.length) {
    console.log("Admin already exists:", email);
  } else {
    await db.execute(
      "INSERT INTO admin_users (name, surname, email, password_hash, role, status) VALUES (?, ?, ?, ?, 'SUPER_ADMIN', 'active')",
      ["Sistem", "Yöneticisi", email, hash]
    );
    console.log("Admin created:", email);
  }
  await db.end();
}

main().catch((e) => { console.error(e.message); process.exit(1); });
