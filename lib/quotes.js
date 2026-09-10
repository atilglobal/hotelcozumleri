import { query, getPool } from "@/lib/db";
import { resolveCartItem } from "@/lib/catalog";
import { createNotification } from "@/lib/notifications";

async function generateQuoteNumber() {
  const year = new Date().getFullYear();
  try {
    await query("INSERT IGNORE INTO quote_number_seq (id, last_number) VALUES (1, 0)");
    await query("UPDATE quote_number_seq SET last_number = last_number + 1 WHERE id = 1");
    const rows = await query("SELECT last_number FROM quote_number_seq WHERE id = 1");
    const num = String(rows[0].last_number).padStart(6, "0");
    return `HC-TKL-${year}-${num}`;
  } catch {
    return `HC-TKL-${year}-${Date.now().toString().slice(-6)}`;
  }
}

export async function createQuoteRequest(userId, data) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const { items, hotelName, contactName, email, phone, city, roomCount, position, note } = data;
  if (!items?.length) return { errors: [{ message: "Teklif sepetiniz boş." }] };

  const quoteNumber = await generateQuoteNumber();
  const result = await query(
    `INSERT INTO quote_requests (user_id, quote_number, hotel_name, contact_name, email, phone, city, room_count, position, status, note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
    [userId || null, quoteNumber, hotelName, contactName, email, phone, city, roomCount || null, position || null, note || null]
  );
  const quoteId = result.insertId;

  for (const item of items) {
    const resolved = await resolveCartItem(item.productId, item.variantId);
    if (!resolved) continue;
    await query(
      `INSERT INTO quote_request_items (quote_request_id, product_id, variant_id, product_name, quantity, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [quoteId, item.productId, item.variantId || null, resolved.productName, item.quantity || 1, item.note || null]
    );
  }

  await createNotification({ type: "quote", entityId: quoteId, title: "Yeni teklif talebi" });
  return { quoteId, quoteNumber };
}

export async function getQuotesByUser(userId) {
  if (!getPool()) return [];
  return query("SELECT * FROM quote_requests WHERE user_id = ? ORDER BY created_at DESC", [userId]);
}
