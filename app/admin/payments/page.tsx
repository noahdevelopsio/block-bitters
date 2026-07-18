import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  // Query all orders with payment details
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      total: true,
      paymentMethod: true,
      paymentStatus: true,
      flutterwaveRef: true,
      flutterwaveTxId: true,
      createdAt: true,
    },
  });

  const formatPrice = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments Log</h1>
        <p className="text-sm text-ink-900/60 mt-1">Reconcile online Flutterwave payments and Cash collections.</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-forest-800/5 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-cream-100/50 border-b border-forest-800/5 text-ink-900/60 font-semibold uppercase tracking-wider text-xs">
              <th className="p-4">Tx Reference</th>
              <th className="p-4">Order #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Billing Channel</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4">Transaction Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-800/5">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-ink-900/50">
                  No payment logs found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream-100/10">
                  <td className="p-4 font-semibold text-forest-950">
                    {o.paymentMethod === "FLUTTERWAVE" 
                      ? (o.flutterwaveRef || "Pending FLW Ref") 
                      : `POD-${o.orderNumber.split("-")[1] || "COLLECT"}`}
                  </td>
                  <td className="p-4 font-bold">
                    <Link href={`/admin/orders?orderId=${o.id}`} className="text-forest-800 hover:text-gold-700 underline">
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="p-4 text-ink-900/80">{o.customerName}</td>
                  <td className="p-4">
                    <span className="text-xs font-semibold text-ink-900/60 uppercase">
                      {o.paymentMethod}
                    </span>
                    {o.flutterwaveTxId && (
                      <span className="block text-[10px] text-ink-900/40">ID: {o.flutterwaveTxId}</span>
                    )}
                  </td>
                  <td className="p-4 text-gold-700 font-bold">{formatPrice(o.total)}</td>
                  <td className="p-4">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      o.paymentStatus === 'PAID'
                        ? 'bg-[#25D366]/10 text-[#20ba5a]'
                        : 'bg-yellow-500/10 text-yellow-700'
                    }`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-ink-900/55">{formatDate(o.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
