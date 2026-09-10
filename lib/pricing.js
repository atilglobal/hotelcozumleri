export function calculateOrderTotals(items) {
  let subtotal = 0;
  let vatTotal = 0;
  for (const item of items) {
    subtotal += item.lineSubtotal;
    vatTotal += item.vatAmount;
  }
  return {
    subtotal: round2(subtotal),
    vatTotal: round2(vatTotal),
    shippingTotal: 0,
    grandTotal: round2(subtotal + vatTotal),
  };
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}

export function formatPrice(amount, currency = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export const orderStatusLabels = {
  pending: "Beklemede",
  confirmed: "Onaylandı",
  preparing: "Hazırlanıyor",
  shipped: "Kargoda",
  completed: "Tamamlandı",
  cancelled: "İptal Edildi",
};

export const paymentStatusLabels = {
  pending: "Bekliyor",
  processing: "İşleniyor",
  paid: "Ödendi",
  failed: "Başarısız",
  cancelled: "İptal",
  refunded: "İade Edildi",
};

export const quoteStatusLabels = {
  new: "Yeni",
  reviewing: "İnceleniyor",
  quoted: "Teklif Verildi",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  closed: "Kapatıldı",
};
