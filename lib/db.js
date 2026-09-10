import mysql from "mysql2/promise";

let pool = null;

export function getPool() {
  if (pool) return pool;

  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const port = process.env.DB_PORT || 3306;

  if (!host || !database || !user) {
    return null;
  }

  pool = mysql.createPool({
    host,
    database,
    user,
    password,
    port: Number(port),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

export async function query(sql, params = []) {
  const db = getPool();
  if (!db) {
    throw new Error("Veritabanı bağlantısı yapılandırılmamış.");
  }
  const [rows] = await db.execute(sql, params);
  return rows;
}
