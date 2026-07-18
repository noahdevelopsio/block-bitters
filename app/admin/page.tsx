export default function AdminPage() {
  const stats = [
    { label: "Today's Orders", value: "12", change: "+4 since yesterday" },
    { label: "Revenue (Today)", value: "₦180,000", change: "+12% since yesterday" },
    { label: "Pending POD Confirmation", value: "3", change: "Requires callback" },
    { label: "Low Stock Alerts", value: "1 variant", change: "300ml Variant" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-ink-900/60 mt-1">Real-time stats and metrics for Block Bitters.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/50 block">
              {stat.label}
            </span>
            <span className="text-2xl font-serif font-bold text-forest-950 block mt-2">
              {stat.value}
            </span>
            <span className="text-xs text-[#25D366] font-medium block mt-1">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Activity Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold border-b border-forest-800/5 pb-2 text-base">Recent Orders</h3>
          <div className="divide-y divide-forest-800/5">
            {[
              { id: "BB-0012", name: "Chinedu Okafor", total: "₦17,000", date: "Just now", status: "PENDING" },
              { id: "BB-0011", name: "Tunde Bakare", total: "₦32,000", date: "10 mins ago", status: "CONFIRMED" },
              { id: "BB-0010", name: "Emeka Obi", total: "₦17,000", date: "1 hour ago", status: "DELIVERED" },
            ].map((order, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-forest-950 block">{order.id}</span>
                  <span className="text-xs text-ink-900/60 block">{order.name} · {order.date}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-forest-950 block">{order.total}</span>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-gold-500/10 text-gold-700">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold border-b border-forest-800/5 pb-2 text-base">Product Inventory Status</h3>
          <div className="divide-y divide-forest-800/5">
            {[
              { name: "Single Bottle (300ml)", stock: "15 bottles", status: "LOW STOCK" },
              { name: "3-Bottle Pack", stock: "45 packs", status: "IN STOCK" },
              { name: "6-Bottle Pack", stock: "30 packs", status: "IN STOCK" },
            ].map((prod, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-forest-950 block">{prod.name}</span>
                  <span className="text-xs text-ink-900/60 block">Remaining Stock: {prod.stock}</span>
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-700">
                    {prod.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
