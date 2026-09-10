import { getSetting } from "@/lib/settings";
import { PayTRProvider } from "./paytr";
import { IyzicoProvider } from "./iyzico";
import { BankTransferProvider } from "./bank-transfer";

export async function getActivePaymentMethods() {
  const methods = [];
  if (await getSetting("payment", "paytr_enabled", Boolean(process.env.PAYTR_MERCHANT_ID))) {
    methods.push({ id: "paytr", label: "Kredi / Banka Kartı", provider: "paytr" });
  }
  if (await getSetting("payment", "iyzico_enabled", Boolean(process.env.IYZICO_API_KEY))) {
    methods.push({ id: "iyzico", label: "Kredi / Banka Kartı", provider: "iyzico" });
  }
  if (await getSetting("payment", "bank_transfer_enabled", true)) {
    methods.push({ id: "bank_transfer", label: "Havale / EFT", provider: "bank_transfer" });
  }
  return methods;
}

export function getProvider(name) {
  switch (name) {
    case "paytr": return new PayTRProvider();
    case "iyzico": return new IyzicoProvider();
    case "bank_transfer": return new BankTransferProvider();
    default: throw new Error("UNKNOWN_PROVIDER");
  }
}

export async function createPayment(order, user, providerName, clientIp) {
  const provider = getProvider(providerName);
  return provider.createPayment(order, user, clientIp);
}

export async function verifyCallback(providerName, payload, headers) {
  const provider = getProvider(providerName);
  return provider.verifyCallback(payload, headers);
}
