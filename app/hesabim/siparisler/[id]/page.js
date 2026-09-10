import { createMetadata } from "@/lib/metadata";
import OrderDetail from "@/components/shop/OrderDetail";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return createMetadata({
    title: `Sipariş #${id}`,
    path: `/hesabim/siparisler/${id}`,
    noIndex: true,
  });
}

export default async function SiparisDetayPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="font-display text-2xl text-navy mb-6">Sipariş Detayı</h1>
      <OrderDetail orderId={id} />
    </div>
  );
}
