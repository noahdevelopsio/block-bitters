export default function AdminProductsPage() {
  const variants = [
    { name: "Single Bottle", size: "300ml", price: "₦15,000", stock: 15, active: true },
    { name: "3-Bottle Pack", size: "3-Pack", price: "₦40,500", stock: 45, active: true },
    { name: "6-Bottle Pack", size: "6-Pack", price: "₦76,500", stock: 30, active: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products & Variants</h1>
          <p className="text-sm text-ink-900/60 mt-1">Manage sizes, packages, pricing, and stock.</p>
        </div>
        <button className="bg-forest-950 hover:bg-forest-800 text-cream-100 px-4 py-2 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors">
          Add Variant
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-forest-800/5 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-cream-100/50 border-b border-forest-800/5 text-ink-900/60 font-semibold uppercase tracking-wider text-xs">
              <th className="p-4">Variant Name</th>
              <th className="p-4">Size/Label</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-800/5">
            {variants.map((v, idx) => (
              <tr key={idx} className="hover:bg-cream-100/10">
                <td className="p-4 font-bold text-forest-950">{v.name}</td>
                <td className="p-4 text-ink-900/60">{v.size}</td>
                <td className="p-4 text-gold-700 font-medium">{v.price}</td>
                <td className="p-4">{v.stock}</td>
                <td className="p-4">
                  <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded bg-[#25D366]/10 text-[#20ba5a]">
                    ACTIVE
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-xs text-forest-800 hover:text-gold-700 font-semibold">Edit</button>
                  <button className="text-xs text-red-500 hover:text-red-400 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
