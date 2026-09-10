import { query, getPool } from "@/lib/db";

export async function getAddressesByUser(userId) {
  if (!getPool()) return [];
  return query("SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC", [userId]);
}

export async function createAddress(userId, data) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  if (data.isDefault) {
    await query("UPDATE addresses SET is_default = 0 WHERE user_id = ?", [userId]);
  }
  const result = await query(
    `INSERT INTO addresses (user_id, title, full_name, company_name, tax_office, tax_number, phone, city, district, address_line, postal_code, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, data.title, data.fullName, data.companyName || null, data.taxOffice || null, data.taxNumber || null, data.phone, data.city, data.district || null, data.addressLine, data.postalCode || null, data.isDefault ? 1 : 0]
  );
  return { id: result.insertId };
}

export async function updateAddress(userId, addressId, data) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const existing = await query("SELECT id FROM addresses WHERE id = ? AND user_id = ? LIMIT 1", [addressId, userId]);
  if (!existing.length) throw new Error("NOT_FOUND");
  if (data.isDefault) {
    await query("UPDATE addresses SET is_default = 0 WHERE user_id = ?", [userId]);
  }
  await query(
    `UPDATE addresses SET title=?, full_name=?, company_name=?, tax_office=?, tax_number=?, phone=?, city=?, district=?, address_line=?, postal_code=?, is_default=? WHERE id=? AND user_id=?`,
    [data.title, data.fullName, data.companyName || null, data.taxOffice || null, data.taxNumber || null, data.phone, data.city, data.district || null, data.addressLine, data.postalCode || null, data.isDefault ? 1 : 0, addressId, userId]
  );
  return { ok: true };
}

export async function deleteAddress(userId, addressId) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  await query("DELETE FROM addresses WHERE id = ? AND user_id = ?", [addressId, userId]);
  return { ok: true };
}
