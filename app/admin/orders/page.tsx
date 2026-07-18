import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "./actions";

interface AdminOrdersPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const { orderId } = await searchParams;

  // 1. Fetch all orders
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2. Fetch specific order details if requested
  let selectedOrder = null;
  if (orderId) {
    selectedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            variant: true,
          },
        },
      },
    });
  }

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
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-ink-900/60 mt-1">Manage state, details, and dispatch.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Table column */}
        <div className={`lg:col-span-2 bg-white border border-forest-800/5 rounded-xl shadow-sm overflow-hidden`}>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-cream-100/50 border-b border-forest-800/5 text-ink-900/60 font-semibold uppercase tracking-wider text-xs">
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-800/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-ink-900/50">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  const isSelected = o.id === orderId;
                  return (
                    <tr key={o.id} className={`hover:bg-cream-100/10 ${isSelected ? "bg-gold-500/5" : ""}`}>
                      <td className="p-4 font-bold text-forest-950">{o.orderNumber}</td>
                      <td className="p-4">
                        <span className="block font-semibold">{o.customerName}</span>
                        <span className="block text-xs text-ink-900/60">{o.phone}</span>
                      </td>
                      <td className="p-4 text-gold-700 font-semibold">{formatPrice(o.total)}</td>
                      <td className="p-4 text-xs font-medium">{o.paymentMethod}</td>
                      <td className="p-4">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                          o.paymentStatus === 'PAID'
                            ? 'bg-[#25D366]/10 text-[#20ba5a]'
                            : 'bg-yellow-500/10 text-yellow-700'
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-gold-500/10 text-gold-700 uppercase">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/admin/orders?orderId=${o.id}`}
                          className="text-xs text-forest-800 hover:text-gold-700 font-semibold"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Order Detail Sidebar */}
        {selectedOrder ? (
          <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-forest-800/5 pb-3">
              <h3 className="font-serif text-lg font-bold text-forest-950">
                Order {selectedOrder.orderNumber}
              </h3>
              <Link href="/admin/orders" className="text-xs text-ink-900/40 hover:text-ink-900">
                ✕ Close
              </Link>
            </div>

            {/* Customer information */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">Customer</span>
                <span className="font-semibold block mt-0.5">{selectedOrder.customerName}</span>
                <span className="text-ink-900/70 block">{selectedOrder.phone}</span>
                {selectedOrder.email && <span className="text-ink-900/60 block">{selectedOrder.email}</span>}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">Shipping Address</span>
                <span className="text-ink-900/80 block mt-0.5">{selectedOrder.address}</span>
                <span className="text-ink-900/80 block">{selectedOrder.lga}, {selectedOrder.state}</span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">Placed At</span>
                <span className="text-ink-900/80 block mt-0.5">{formatDate(selectedOrder.createdAt)}</span>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-forest-800/5 pt-4 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">Items</span>
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-semibold text-forest-950">{item.variant.name}</span>
                    <span className="text-xs text-ink-900/50 block">
                      Size: {item.variant.sizeLabel} · Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-forest-800/5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink-900/60">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-900/60">
                <span>Delivery Fee</span>
                <span>{formatPrice(selectedOrder.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-forest-800/5 pt-2">
                <span>Total</span>
                <span className="text-gold-700">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Update state Form */}
            <div className="border-t border-forest-800/5 pt-4 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">
                Manage Order Status
              </span>
              <form
                action={async (formData: FormData) => {
                  "use server";
                  const status = formData.get("status") as OrderStatus;
                  const notes = formData.get("notes") as string;
                  await updateOrderStatus(selectedOrder.id, status, notes || null);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                    Order Status
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedOrder.status}
                    className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-white"
                  >
                    {Object.values(OrderStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                    Internal Admin Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    defaultValue={selectedOrder.notes || ""}
                    placeholder="Add delivery tracking, customer notes, or details..."
                    className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors"
                >
                  Update Order
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm text-center py-12 text-ink-900/50 text-sm">
            Select an order to view its full details and manage its dispatch process.
          </div>
        )}
      </div>
    </div>
  );
}
