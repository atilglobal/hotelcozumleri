import { query, getPool } from "@/lib/db";
import { createNotification } from "@/lib/notifications";
import { notifyAdmin } from "@/lib/mailer";

export async function saveFormSubmission({ formType, fullName, email, phone, hotelName, city, subject, message, payload }) {
  if (!getPool()) return null;
  const result = await query(
    `INSERT INTO form_submissions (form_type, full_name, email, phone, hotel_name, city, subject, message, payload, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [formType, fullName || null, email || null, phone || null, hotelName || null, city || null, subject || null, message || null, payload ? JSON.stringify(payload) : null]
  );
  await createNotification({ type: "form", entityId: result.insertId, title: `Yeni ${formType} formu` });
  await notifyAdmin(`Yeni form: ${formType}`, `<p>${fullName} — ${email}</p>`);
  return result.insertId;
}

export async function saveHotelioDemo(data) {
  if (!getPool()) return null;
  const result = await query(
    `INSERT INTO hotelio_demo_requests (full_name, hotel_name, city, room_count, phone, email, position, modules, note, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [data.fullName, data.hotelName, data.city, data.roomCount ? Number(data.roomCount) : null, data.phone, data.email, data.position || null, data.modules ? JSON.stringify(data.modules) : null, data.note || null]
  );
  await createNotification({ type: "hotelio_demo", entityId: result.insertId, title: "Yeni Hotelio demo talebi" });
  await notifyAdmin("Yeni Hotelio Demo Talebi", `<p>${data.hotelName} — ${data.fullName}</p>`);
  return result.insertId;
}
