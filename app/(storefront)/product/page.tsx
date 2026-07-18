import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-gold-300">
            Block Bitters
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
            <div className="bg-forest-950 border border-gold-500/20 aspect-square rounded-2xl flex items-center justify-center p-12 relative overflow-hidden">
              <div className="w-48 h-48 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-300 text-6xl font-serif">
                BB
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-gold-700 text-xs font-semibold tracking-widest uppercase block">Premium Herbal Supplement</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Block Bitters</h1>
              <p className="text-2xl font-serif font-bold text-gold-700">₦15,000</p>
            </div>

            <div className="prose prose-sm text-ink-900/80">
              <p>
                Block Bitters is a premium herbal supplement crafted for men who want to support strength, stamina, energy and confidence. Formulated with carefully sourced natural botanicals, honey, and plum.
              </p>
            </div>

            {/* Variants Selector */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/60 block">Select Variant</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button className="border-2 border-gold-500 bg-white p-4 rounded-xl text-left font-medium transition-all">
                  <div className="text-sm font-bold">Single Bottle</div>
                  <div className="text-xs text-ink-900/60">300ml</div>
                  <div className="text-sm text-gold-700 font-bold mt-1">₦15,000</div>
                </button>
                <button className="border border-forest-800/10 bg-white p-4 rounded-xl text-left font-medium transition-all hover:border-gold-500/50">
                  <div className="text-sm font-bold">3-Bottle Pack</div>
                  <div className="text-xs text-ink-900/60">Save 10%</div>
                  <div className="text-sm text-gold-700 font-bold mt-1">₦40,500</div>
                </button>
                <button className="border border-forest-800/10 bg-white p-4 rounded-xl text-left font-medium transition-all hover:border-gold-500/50">
                  <div className="text-sm font-bold">6-Bottle Pack</div>
                  <div className="text-xs text-ink-900/60">Save 15%</div>
                  <div className="text-sm text-gold-700 font-bold mt-1">₦76,500</div>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4 pt-4 border-t border-forest-800/10">
              <Link
                href="/checkout"
                className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 text-center block py-4 rounded-lg font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                Proceed to Checkout
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-ink-900/50 leading-relaxed italic">
              * Disclaimer: Block Bitters is a herbal supplement. It is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use if you have an existing medical condition or are taking medication.
            </p>
          </div>
        </div>
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
