import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CheckoutForm from "@/components/storefront/CheckoutForm";

interface CheckoutPageProps {
  searchParams: Promise<{
    variantId?: string;
    quantity?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { variantId, quantity: qtyStr } = await searchParams;
  const quantity = Math.max(1, parseInt(qtyStr || "1", 10));

  // 1. Fetch the requested variant, or default to the first active variant
  let variant = null;
  if (variantId) {
    variant = await prisma.productVariant.findUnique({
      where: { id: variantId, isActive: true },
      select: {
        id: true,
        name: true,
        price: true,
        sizeLabel: true,
        stock: true,
      },
    });
  }

  if (!variant) {
    variant = await prisma.productVariant.findFirst({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        price: true,
        sizeLabel: true,
        stock: true,
      },
    });
  }

  // 2. Redirect to homepage if no products exist to checkout
  if (!variant) {
    redirect("/");
  }

  // 3. Fetch configured delivery zones
  const deliveryZones = await prisma.deliveryZone.findMany({
    select: {
      state: true,
      fee: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-gold-300">
            Block Bitters
          </Link>
          <span className="text-xs uppercase tracking-widest text-cream-100/60 font-semibold">
            Secure Checkout
          </span>
        </div>
      </header>

      {/* Checkout Form Container */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
        <CheckoutForm
          variant={variant}
          quantity={quantity}
          deliveryZones={deliveryZones}
        />
      </main>

      {/* Footer */}
      <footer className="bg-forest-950 text-cream-100/80 py-12 border-t border-gold-500/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-2">
          <p>© {new Date().getFullYear()} Block Bitters. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
