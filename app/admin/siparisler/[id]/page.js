import OrderDetailAdmin from "@/components/admin/OrderDetailAdmin";

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  return <OrderDetailAdmin orderId={id} />;
}
