import crypto from "crypto";
import { query } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { markOrderPaid, createPaymentTransaction } from "./shared";

export class IyzicoProvider {
  async getCredentials() {
    const apiKey = (await getSetting("payment", "iyzico_api_key")) || process.env.IYZICO_API_KEY;
    const secretKey = (await getSetting("payment", "iyzico_secret_key")) || process.env.IYZICO_SECRET_KEY;
    const baseUrl = (await getSetting("payment", "iyzico_base_url")) || process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";
    return { apiKey, secretKey, baseUrl };
  }

  async createPayment(order, user, clientIp) {
    const { apiKey, secretKey, baseUrl } = await this.getCredentials();
    if (!apiKey || !secretKey) throw new Error("IYZICO_NOT_CONFIGURED");

    const siteUrl = process.env.SITE_URL || "https://hotelcozumleri.com";
    const conversationId = order.order_number;
    const request = {
      locale: "tr",
      conversationId,
      price: Number(order.grand_total).toFixed(2),
      paidPrice: Number(order.grand_total).toFixed(2),
      currency: "TRY",
      basketId: String(order.id),
      paymentGroup: "PRODUCT",
      callbackUrl: `${siteUrl}/api/payments/iyzico/callback`,
      enabledInstallments: [1],
      buyer: {
        id: String(user.id),
        name: user.name?.split(" ")[0] || "Müşteri",
        surname: user.name?.split(" ").slice(1).join(" ") || "Kullanıcı",
        email: user.email,
        identityNumber: "11111111111",
        registrationAddress: "Türkiye",
        ip: clientIp || "127.0.0.1",
        city: "Istanbul",
        country: "Turkey",
      },
      shippingAddress: { contactName: user.name || "Müşteri", city: "Istanbul", country: "Turkey", address: "Türkiye" },
      billingAddress: { contactName: user.name || "Müşteri", city: "Istanbul", country: "Turkey", address: "Türkiye" },
      basketItems: [{
        id: String(order.id),
        name: `Sipariş ${order.order_number}`,
        category1: "Otel Ürünleri",
        itemType: "PHYSICAL",
        price: Number(order.grand_total).toFixed(2),
      }],
    };

    const uri = "/payment/iyzipos/checkoutform/initialize/auth/ecom";
    const bodyStr = JSON.stringify(request);
    const randomString = crypto.randomBytes(8).toString("hex");
    const signature = crypto.createHmac("sha256", secretKey).update(randomString + uri + bodyStr).digest("hex");
    const authHeader = `IYZWS ${apiKey}:${signature}`;

    const res = await fetch(`${baseUrl}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
        "x-iyzi-rnd": randomString,
      },
      body: bodyStr,
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.errorMessage || "iyzico ödeme başlatılamadı.");

    await createPaymentTransaction({
      orderId: order.id,
      provider: "iyzico",
      amount: order.grand_total,
      requestReference: conversationId,
      providerReference: data.token,
      status: "processing",
    });
    await query("UPDATE orders SET payment_method = 'iyzico', payment_status = 'processing' WHERE id = ?", [order.id]);

    return { type: "redirect", checkoutFormContent: data.checkoutFormContent, token: data.token, provider: "iyzico" };
  }

  async verifyCallback(payload) {
    const { apiKey, secretKey, baseUrl } = await this.getCredentials();
    const token = payload.token;
    if (!token) return { ok: false, error: "MISSING_TOKEN" };

    const uri = "/payment/iyzipos/checkoutform/auth/ecom/detail";
    const body = { locale: "tr", conversationId: payload.conversationId || "", token };
    const bodyStr = JSON.stringify(body);
    const randomString = crypto.randomBytes(8).toString("hex");
    const signature = crypto.createHmac("sha256", secretKey).update(randomString + uri + bodyStr).digest("hex");

    const res = await fetch(`${baseUrl}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `IYZWS ${apiKey}:${signature}`,
        "x-iyzi-rnd": randomString,
      },
      body: bodyStr,
    });
    const data = await res.json();
    if (data.status !== "success" || data.paymentStatus !== "SUCCESS") {
      if (data.basketId) {
        await query("UPDATE orders SET payment_status = 'failed' WHERE id = ?", [data.basketId]);
      }
      return { ok: true, failed: true };
    }

    const orders = await query("SELECT * FROM orders WHERE order_number = ? OR id = ? LIMIT 1", [data.conversationId, data.basketId]);
    if (!orders.length) return { ok: false, error: "ORDER_NOT_FOUND" };
    const order = orders[0];

    if (Number(data.paidPrice) !== Number(order.grand_total)) return { ok: false, error: "AMOUNT_MISMATCH" };

    await markOrderPaid(order.id, "iyzico", data.paymentId, { paymentId: data.paymentId });
    return { ok: true, orderId: order.id, redirect: true };
  }
}
