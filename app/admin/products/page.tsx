import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { upsertVariant, deleteVariant, toggleVariantStatus } from "./actions";

interface AdminProductsPageProps {
  searchParams: Promise<{
    editId?: string;
  }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const { editId } = await searchParams;

  // 1. Fetch all product variants
  const variants = await prisma.productVariant.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  // 2. Fetch editing variant if editId is provided
  let editingVariant = null;
  if (editId) {
    editingVariant = await prisma.productVariant.findUnique({
      where: { id: editId },
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products & Variants</h1>
        <p className="text-sm text-ink-900/60 mt-1">Manage sizes, packages, pricing, and stock.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Table column */}
        <div className="lg:col-span-2 bg-white border border-forest-800/5 rounded-xl shadow-sm overflow-hidden">
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
              {variants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-ink-900/50">
                    No variants added yet. Configure one using the form.
                  </td>
                </tr>
              ) : (
                variants.map((v) => (
                  <tr key={v.id} className="hover:bg-cream-100/10">
                    <td className="p-4 font-bold text-forest-950">{v.name}</td>
                    <td className="p-4 text-ink-900/60">{v.sizeLabel}</td>
                    <td className="p-4 text-gold-700 font-medium">{formatPrice(v.price)}</td>
                    <td className="p-4">{v.stock}</td>
                    <td className="p-4">
                      <form action={toggleVariantStatus.bind(null, v.id, v.isActive)}>
                        <button
                          type="submit"
                          className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded transition-colors ${
                            v.isActive
                              ? "bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#20ba5a]"
                              : "bg-red-500/10 hover:bg-red-500/20 text-red-700"
                          }`}
                        >
                          {v.isActive ? "ACTIVE" : "INACTIVE"}
                        </button>
                      </form>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <Link
                        href={`/admin/products?editId=${v.id}`}
                        className="text-xs text-forest-800 hover:text-gold-700 font-semibold"
                      >
                        Edit
                      </Link>
                      <form
                        action={deleteVariant.bind(null, v.id)}
                        className="inline-block"
                        onSubmit={(e) => {
                          if (!confirm("Are you sure you want to delete this variant?")) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xs text-red-500 hover:text-red-400 font-semibold"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Form column */}
        <div className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold border-b border-forest-800/5 pb-2">
            {editingVariant ? "Edit Product Variant" : "Add Product Variant"}
          </h3>

          <form action={upsertVariant} className="space-y-4">
            {editingVariant && (
              <input type="hidden" name="id" value={editingVariant.id} />
            )}

            <div>
              <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                Variant Name
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={editingVariant?.name || ""}
                placeholder="e.g. Single Bottle"
                className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                Size Label
              </label>
              <input
                type="text"
                name="sizeLabel"
                required
                defaultValue={editingVariant?.sizeLabel || ""}
                placeholder="e.g. 300ml, 3-Pack"
                className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  defaultValue={editingVariant ? (editingVariant.price / 100).toFixed(2) : ""}
                  placeholder="15000"
                  className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  defaultValue={editingVariant?.stock !== undefined ? editingVariant.stock : ""}
                  placeholder="100"
                  className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                defaultValue={editingVariant?.description || ""}
                placeholder="Brief description of package..."
                className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  name="sortOrder"
                  defaultValue={editingVariant?.sortOrder !== undefined ? editingVariant.sortOrder : "0"}
                  className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  Status
                </label>
                <select
                  name="isActive"
                  defaultValue={editingVariant ? String(editingVariant.isActive) : "true"}
                  className="w-full border border-forest-800/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-white"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-grow bg-forest-950 hover:bg-forest-800 text-cream-100 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Save
              </button>
              {editingVariant && (
                <Link
                  href="/admin/products"
                  className="px-4 py-2.5 border border-forest-800/10 hover:bg-cream-100 rounded-lg text-sm font-semibold uppercase tracking-wider text-ink-900 text-center"
                >
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
