import crypto from "crypto";
import { query } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { markOrderPaid, createPaymentTransaction } from "./shared";

export class PayTRProvider {
  async getCredentials() {
    const merchantId = (await getSetting("payment", "paytr_merchant_id")) || process.env.PAYTR_MERCHANT_ID;
    const merchantKey = (await getSetting("payment", "paytr_merchant_key")) || process.env.PAYTR_MERCHANT_KEY;
    const merchantSalt = (await getSetting("payment", "paytr_merchant_salt")) || process.env.PAYTR_MERCHANT_SALT;
    const testMode = await getSetting("payment", "paytr_test_mode", process.env.PAYTR_TEST_MODE === "1");
    return { merchantId, merchantKey, merchantSalt, testMode: testMode ? "1" : "0" };
  }

  async createPayment(order, user, clientIp) {
    const { merchantId, merchantKey, merchantSalt, testMode } = await this.getCredentials();
    if (!merchantId || !merchantKey || !merchantSalt) throw new Error("PAYTR_NOT_CONFIGURED");

    const amountKurus = Math.round(Number(order.grand_total) * 100);
    const merchantOid = order.order_number;
    const userIp = clientIp || "127.0.0.1";
    const email = user.email;
    const paymentAmount = String(amountKurus);
    const paymentType = "card";
    const installmentCount = "0";
    const currency = "TL";
    const non3d = "0";

    const hashStr = `${merchantId}${userIp}${merchantOid}${email}${paymentAmount}${paymentType}${installmentCount}${currency}${testMode}${non3d}`;
    const paytrToken = crypto
      .createHmac("sha256", merchantKey)
      .update(hashStr + merchantSalt)
      .digest("base64");

    const siteUrl = process.env.SITE_URL || "https://hotelcozumleri.com";
    const body = new URLSearchParams({
      merchant_id: merchantId,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email,
      payment_amount: paymentAmount,
      paytr_token: paytrToken,
      user_basket: JSON.stringify([[order.order_number, paymentAmount, 1]]),
      debug_on: testMode,
      no_installment: "1",
      max_installment: "0",
      user_name: user.name || "Müşteri",
      user_address: "Türkiye",
      user_phone: user.phone || "05000000000",
      merchant_ok_url: `${siteUrl}/odeme/basarili?order=${order.id}`,
      merchant_fail_url: `${siteUrl}/odeme/basarisiz?order=${order.id}`,
      timeout_limit: "30",
      currency,
      test_mode: testMode,
    });

    const res = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.reason || "PayTR token alınamadı.");

    await createPaymentTransaction({
      orderId: order.id,
      provider: "paytr",
      amount: order.grand_total,
      requestReference: merchantOid,
      status: "processing",
    });
    await query("UPDATE orders SET payment_method = 'paytr', payment_status = 'processing' WHERE id = ?", [order.id]);

    return { type: "iframe", token: data.token, provider: "paytr" };
  }

  async verifyCallback(payload) {
    const { merchantId, merchantKey, merchantSalt } = await this.getCredentials();
    const { merchant_oid, status, total_amount, hash } = payload;
    const checkHash = crypto
      .createHmac("sha256", merchantKey)
      .update(merchant_oid + merchantSalt + status + total_amount)
      .digest("base64");

    if (hash !== checkHash) return { ok: false, error: "INVALID_HASH" };

    const orders = await query("SELECT * FROM orders WHERE order_number = ? LIMIT 1", [merchant_oid]);
    if (!orders.length) return { ok: false, error: "ORDER_NOT_FOUND" };
    const order = orders[0];

    const expectedAmount = Math.round(Number(order.grand_total) * 100);
    if (Number(total_amount) !== expectedAmount) return { ok: false, error: "AMOUNT_MISMATCH" };

    if (status === "success") {
      await markOrderPaid(order.id, "paytr", merchant_oid, payload);
      return { ok: true, orderId: order.id };
    }
    await query("UPDATE orders SET payment_status = 'failed' WHERE id = ?", [order.id]);
    await query(
      "UPDATE payment_transactions SET status = 'failed', updated_at = NOW() WHERE order_id = ? AND provider = 'paytr' ORDER BY id DESC LIMIT 1",
      [order.id]
    );
    return { ok: true, failed: true, orderId: order.id };
  }
}
