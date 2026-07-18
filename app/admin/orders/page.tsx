export default function AdminOrdersPage() {
  const orders = [
    { number: "BB-0012", name: "Chinedu Okafor", phone: "08123456789", total: "₦17,000", method: "PAY_ON_DELIVERY", pStatus: "UNPAID", status: "PENDING" },
    { number: "BB-0011", name: "Tunde Bakare", phone: "08098765432", total: "₦32,000", method: "FLUTTERWAVE", pStatus: "PAID", status: "CONFIRMED" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-ink-900/60 mt-1">Filter, search, and update order statuses.</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-forest-800/5 rounded-xl shadow-sm overflow-hidden">
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
            {orders.map((o, idx) => (
              <tr key={idx} className="hover:bg-cream-100/10">
                <td className="p-4 font-bold text-forest-950">{o.number}</td>
                <td className="p-4">
                  <span className="block font-medium">{o.name}</span>
                  <span className="block text-xs text-ink-900/60">{o.phone}</span>
                </td>
                <td className="p-4 text-gold-700 font-medium">{o.total}</td>
                <td className="p-4 text-xs font-semibold">{o.method}</td>
                <td className="p-4">
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded ${o.pStatus === 'PAID' ? 'bg-[#25D366]/10 text-[#20ba5a]' : 'bg-yellow-500/10 text-yellow-700'}`}>
                    {o.pStatus}
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded bg-gold-500/10 text-gold-700">
                    {o.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs text-forest-800 hover:text-gold-700 font-semibold">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
