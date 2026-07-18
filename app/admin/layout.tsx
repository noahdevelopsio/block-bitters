import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-cream-100 text-ink-900">
      {/* Sidebar */}
      <aside className="w-64 bg-forest-950 text-cream-100 flex flex-col border-r border-gold-500/10">
        <div className="h-20 flex items-center px-6 border-b border-gold-500/10">
          <Link href="/admin" className="font-serif text-xl font-bold text-gold-300">
            BB Control Room
          </Link>
        </div>
        <nav className="flex-grow p-6 space-y-2 text-sm">
          <Link
            href="/admin"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-forest-800 text-gold-300 font-medium transition-colors"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-forest-800 transition-colors"
          >
            <span>📦</span>
            <span>Products</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-forest-800 transition-colors"
          >
            <span>🛒</span>
            <span>Orders</span>
          </Link>
          <Link
            href="/admin/payments"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-forest-800 transition-colors"
          >
            <span>💳</span>
            <span>Payments</span>
          </Link>
        </nav>
        <div className="p-6 border-t border-gold-500/10">
          <button className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 text-sm font-medium transition-colors w-full text-left">
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-forest-800/5 px-8 flex items-center justify-between shadow-sm">
          <h2 className="font-bold text-lg text-forest-950">Management Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Administrator</span>
            <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-700 flex items-center justify-center font-bold text-xs">
              A
            </div>
          </div>
        </header>
        <main className="flex-grow p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
