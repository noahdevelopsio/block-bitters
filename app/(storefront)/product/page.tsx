import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductSelector from "@/components/storefront/ProductSelector";

export default async function ProductPage() {
  const variants = await prisma.productVariant.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Product JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Licor Amargo",
            "image": [`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/icon.svg`],
            "description": "Premium herbal supplement crafted for men to support strength, stamina, energy, and confidence.",
            "sku": "LA-HERBAL",
            "brand": {
              "@type": "Brand",
              "name": "Licor Amargo",
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "NGN",
              "lowPrice": variants.length > 0 ? Math.min(...variants.map((v) => v.price)) / 100 : 1500,
              "highPrice": variants.length > 0 ? Math.max(...variants.map((v) => v.price)) / 100 : 7500,
              "offerCount": variants.length,
              "offers": variants.map((v) => ({
                "@type": "Offer",
                "name": v.name,
                "price": v.price / 100,
                "priceCurrency": "NGN",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/product`,
              })),
            },
          }),
        }}
      />
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-horizontal-dark.svg"
              alt="Licor Amargo"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wider uppercase">
            <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
            <Link href="/product" className="text-gold-300 transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-gold-300 transition-colors">Our Story</Link>
            <Link href="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-gold-300 transition-colors">Contact</Link>
          </nav>
          <Link
            href="/product"
            className="bg-gold-500 hover:bg-gold-300 text-forest-950 px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            Order Now
          </Link>
        </div>
      </header>

      {/* Main product area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="bg-forest-950 border border-gold-500/20 aspect-square rounded-2xl flex items-center justify-center p-8 relative overflow-hidden">
              <Image
                src="/block-bitters-bottle-transparent-1600w.png"
                alt="Licor Amargo Bottle"
                fill
                priority
                className="object-contain p-4 drop-shadow-[0_20px_50px_rgba(199,154,62,0.15)]"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-gold-700 text-xs font-semibold tracking-widest uppercase block">Premium Herbal Supplement</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Licor Amargo</h1>
            </div>

            <div className="prose prose-sm text-ink-900/80">
              <p>
                Licor Amargo is a premium herbal supplement crafted for men who want to support strength, stamina, energy and confidence. Formulated with carefully sourced natural botanicals, honey, and plum.
              </p>
            </div>

            {/* Dynamic Product Selector Component */}
            <ProductSelector variants={variants} />

            {/* Disclaimer */}
            <p className="text-[11px] text-ink-900/50 leading-relaxed italic">
              * Disclaimer: Licor Amargo is a herbal supplement. It is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use if you have an existing medical condition or are taking medication.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forest-950 text-cream-100/80 py-12 border-t border-gold-500/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-2">
          <p>© {new Date().getFullYear()} Licor Amargo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
