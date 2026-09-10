import { query } from "@/lib/db";
import { createPaymentTransaction } from "./shared";

export class BankTransferProvider {
  async createPayment(order) {
    await createPaymentTransaction({
      orderId: order.id,
      provider: "bank_transfer",
      amount: order.grand_total,
      requestReference: order.order_number,
      status: "pending",
    });
    await query(
      "UPDATE orders SET payment_method = 'bank_transfer', payment_status = 'pending', status = 'pending' WHERE id = ?",
      [order.id]
    );
    const accounts = await query(
      "SELECT * FROM bank_accounts WHERE status = 'active' ORDER BY sort_order ASC"
    );
    return { type: "bank_transfer", accounts, provider: "bank_transfer", orderNumber: order.order_number };
  }

  async verifyCallback() {
    return { ok: false, error: "MANUAL_CONFIRMATION" };
  }
}
