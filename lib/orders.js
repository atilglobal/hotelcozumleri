import { query, getPool } from "@/lib/db";
import { validateCartItems } from "@/lib/catalog";
import { calculateOrderTotals } from "@/lib/pricing";

function generateOrderNumber() {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `HC${y}${m}${d}${rand}`;
}

export async function createOrder(userId, { items, paymentMethod, customerNote, shippingAddressId, billingAddressId }) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const { items: validated, errors } = await validateCartItems(items);
  if (errors.length) return { errors };
  if (!validated.length) return { errors: [{ message: "Sepetiniz boş." }] };

  const totals = calculateOrderTotals(validated);
  const orderNumber = generateOrderNumber();

  const orderResult = await query(
    `INSERT INTO orders (order_number, user_id, status, payment_status, payment_method, subtotal, vat_total, shipping_total, grand_total, currency, shipping_address_id, billing_address_id, customer_note)
     VALUES (?, ?, 'pending', 'pending', ?, ?, ?, ?, ?, 'TRY', ?, ?, ?)`,
    [orderNumber, userId, paymentMethod || "card", totals.subtotal, totals.vatTotal, totals.shippingTotal, totals.grandTotal, shippingAddressId || null, billingAddressId || null, customerNote || null]
  );
  const orderId = orderResult.insertId;

  for (const item of validated) {
    await query(
      `INSERT INTO order_items (order_id, product_id, variant_id, product_name, sku, quantity, unit_price, vat_rate, line_total, logo_option)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, item.productId, item.variantId, item.productName, item.sku, item.quantity, item.unitPrice, item.vatRate, item.lineSubtotal + item.vatAmount, item.logoOption || null]
    );
  }

  await query(
    "INSERT INTO order_status_history (order_id, old_status, new_status, note) VALUES (?, NULL, 'pending', 'Sipariş oluşturuldu')",
    [orderId]
  );

  return { orderId, orderNumber, totals, grandTotal: totals.grandTotal };
}

export async function getOrdersByUser(userId) {
  if (!getPool()) return [];
  return query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [userId]);
}

export async function getOrderById(orderId, userId) {
  if (!getPool()) return null;
  const orders = await query("SELECT * FROM orders WHERE id = ? AND user_id = ? LIMIT 1", [orderId, userId]);
  if (!orders.length) return null;
  const items = await query("SELECT * FROM order_items WHERE order_id = ?", [orderId]);
  return { ...orders[0], items };
}
