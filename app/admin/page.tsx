import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Fetch dynamic statistics
  const todayOrdersCount = await prisma.order.count({
    where: {
      createdAt: { gte: today },
    },
  });

  const todayRevenueAggregate = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      paymentStatus: "PAID",
      createdAt: { gte: today },
    },
  });
  const todayRevenue = todayRevenueAggregate._sum.total || 0;

  const pendingPodCount = await prisma.order.count({
    where: {
      paymentMethod: "PAY_ON_DELIVERY",
      status: "PENDING",
    },
  });

  const lowStockCount = await prisma.productVariant.count({
    where: {
      stock: { lte: 10 },
      isActive: true,
    },
  });

  // 2. Fetch lists for dashboard widgets
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      total: true,
      createdAt: true,
      status: true,
    },
  });

  const variantsInventory = await prisma.productVariant.findMany({
    orderBy: {
      sortOrder: "asc",
    },
    select: {
      id: true,
      name: true,
      stock: true,
      sizeLabel: true,
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-ink-900/60 mt-1">Real-time stats and metrics for Licor Amargo.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/50 block">
            Today's Orders
          </span>
          <span className="text-2xl font-serif font-bold text-forest-950 block mt-2">
            {todayOrdersCount}
          </span>
          <span className="text-xs text-ink-900/40 block mt-1">
            Created since 12:00 AM
          </span>
        </div>

        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/50 block">
            Revenue (Today)
          </span>
          <span className="text-2xl font-serif font-bold text-forest-950 block mt-2">
            {formatPrice(todayRevenue)}
          </span>
          <span className="text-xs text-ink-900/40 block mt-1">
            Confirmed online payments
          </span>
        </div>

        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/50 block">
            Pending PODs
          </span>
          <span className="text-2xl font-serif font-bold text-forest-950 block mt-2">
            {pendingPodCount}
          </span>
          <span className="text-xs text-yellow-600 font-semibold block mt-1">
            Require phone confirmation
          </span>
        </div>

        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/50 block">
            Low Stock Alerts
          </span>
          <span className="text-2xl font-serif font-bold text-forest-950 block mt-2">
            {lowStockCount}
          </span>
          <span className={`text-xs font-semibold block mt-1 ${lowStockCount > 0 ? "text-red-600" : "text-green-600"}`}>
            {lowStockCount > 0 ? "Reorder variants soon" : "All variants stocked"}
          </span>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders List */}
        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold border-b border-forest-800/5 pb-2">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-ink-900/50 py-8 text-center">No orders placed yet.</p>
          ) : (
            <div className="divide-y divide-forest-800/5">
              {recentOrders.map((order) => (
                <div key={order.id} className="py-3 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold text-forest-950 block">{order.orderNumber}</span>
                    <span className="text-xs text-ink-900/60 block">
                      {order.customerName} · {formatTime(order.createdAt)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-forest-950 block">{formatPrice(order.total)}</span>
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-gold-500/10 text-gold-700 uppercase tracking-wider mt-0.5">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inventory Status List */}
        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold border-b border-forest-800/5 pb-2">Product Inventory</h3>
          {variantsInventory.length === 0 ? (
            <p className="text-sm text-ink-900/50 py-8 text-center">No product variants configured.</p>
          ) : (
            <div className="divide-y divide-forest-800/5">
              {variantsInventory.map((v) => {
                const isLow = v.stock <= 10;
                return (
                  <div key={v.id} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <span className="font-bold text-forest-950 block">{v.name}</span>
                      <span className="text-xs text-ink-900/60 block">Size: {v.sizeLabel}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-forest-950 block">Stock: {v.stock}</span>
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mt-0.5 ${
                        isLow ? "bg-red-500/10 text-red-700" : "bg-green-500/10 text-green-700"
                      }`}>
                        {isLow ? "LOW STOCK" : "IN STOCK"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
