import { getSetting } from "@/lib/settings";

function wrapHtml(body, title) {
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 0;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:100%;">
<tr><td style="background:#0f2347;padding:24px;text-align:center;"><h1 style="margin:0;color:#fff;font-size:20px;">Hotel Çözümleri</h1></td></tr>
<tr><td style="padding:32px 24px;color:#333;line-height:1.6;">${body}</td></tr>
<tr><td style="padding:16px 24px;background:#f8f9fa;text-align:center;font-size:12px;color:#888;">ASK Bilişim iştirakidir. · info@hotelcozumleri.com</td></tr>
</table></td></tr></table></body></html>`;
}

export async function sendMail({ to, subject, html, text }) {
  const host = (await getSetting("smtp", "host")) || process.env.SMTP_HOST;
  if (!host) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mailer] SMTP not configured, skipping:", subject);
    }
    return { ok: true, skipped: true };
  }
  // Production: integrate nodemailer when SMTP credentials are configured
  if (process.env.NODE_ENV !== "production") {
    console.info(`[mailer] Would send to ${to}: ${subject}`);
  }
  return { ok: true, skipped: true };
}

export async function notifyAdmin(subject, html) {
  const adminEmail = (await getSetting("smtp", "admin_notification_email")) || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL;
  if (!adminEmail) return { ok: false };
  return sendMail({ to: adminEmail, subject: `[Admin] ${subject}`, html: wrapHtml(html, subject) });
}

export async function sendOrderConfirmation(order, userEmail) {
  const body = `<p>Siparişiniz alındı.</p><p><strong>Sipariş No:</strong> ${order.order_number}</p><p><strong>Toplam:</strong> ${order.grand_total} TRY</p>`;
  return sendMail({ to: userEmail, subject: `Siparişiniz Alındı — ${order.order_number}`, html: wrapHtml(body, "Sipariş Alındı"), text: body });
}

export async function sendPaymentConfirmation(order, userEmail) {
  const body = `<p>Ödemeniz başarıyla alındı.</p><p><strong>Sipariş No:</strong> ${order.order_number}</p>`;
  return sendMail({ to: userEmail, subject: `Ödemeniz Alındı — ${order.order_number}`, html: wrapHtml(body, "Ödeme Alındı"), text: body });
}

export async function sendBankTransferInfo(order, userEmail, accounts) {
  const accountsHtml = (accounts || []).map((a) => `<li>${a.bank_name} — ${a.iban}</li>`).join("");
  const body = `<p>Havale/EFT ile ödeme talimatınız alındı.</p><p><strong>Sipariş No:</strong> ${order.order_number}</p><p><strong>Tutar:</strong> ${order.grand_total} TRY</p><ul>${accountsHtml}</ul>`;
  return sendMail({ to: userEmail, subject: `Havale Bilgileri — ${order.order_number}`, html: wrapHtml(body, "Havale Bilgileri"), text: body });
}

export async function sendOrderStatusUpdate(order, userEmail, newStatus) {
  const body = `<p>Sipariş durumunuz güncellendi.</p><p><strong>Sipariş No:</strong> ${order.order_number}</p><p><strong>Yeni Durum:</strong> ${newStatus}</p>`;
  return sendMail({ to: userEmail, subject: `Sipariş Durumu — ${order.order_number}`, html: wrapHtml(body, "Sipariş Durumu"), text: body });
}

export async function sendQuoteReceived(email, quoteNumber) {
  const body = `<p>Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>${quoteNumber ? `<p><strong>Teklif No:</strong> ${quoteNumber}</p>` : ""}`;
  return sendMail({ to: email, subject: "Teklif Talebiniz Alındı", html: wrapHtml(body, "Teklif Talebi"), text: body });
}

export async function sendHotelioDemoReceived(email) {
  const body = `<p>Hotelio demo talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>`;
  return sendMail({ to: email, subject: "Hotelio Demo Talebiniz Alındı", html: wrapHtml(body, "Demo Talebi"), text: body });
}
