import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-horizontal-dark.svg"
              alt="Block Bitters"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wider uppercase">
            <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
            <Link href="/product" className="hover:text-gold-300 transition-colors">Shop</Link>
            <Link href="/about" className="text-gold-300 transition-colors">Our Story</Link>
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

      {/* Main content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-gold-700 text-xs font-semibold tracking-widest uppercase block">Our Heritage</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Made in Lagos, For Men Who Demand More</h1>
          </div>

          <div className="bg-white border border-forest-800/5 p-8 sm:p-12 rounded-2xl shadow-sm space-y-6 text-base text-ink-900/80 leading-relaxed">
            <p>
              Block Bitters is produced by Block Media Resources in Igando, Lagos, a herbal bitters blend built on traditional botanical knowledge and modern quality standards. We started Block Bitters because we believe men deserve natural, honest alternatives - no synthetic shortcuts, just nature, bottled with care.
            </p>
            <p>
              Every bottle is a careful curation of premium botanicals like Tongkat Ali, Maka Root, Korean Red Ginseng, plum, honey, and Gorontula. We do not compromise on sourcing, ensuring that the strength and properties of nature are preserved for your wellness.
            </p>
            <h3 className="font-serif text-xl font-bold text-ink-900 pt-4">Our Manufacturing Philosophy</h3>
            <p>
              We believe in full transparency and meticulous manufacturing. Grounded in herbal traditions and processed right here in Lagos, Nigeria, our products represent purity and strength. We verify all ingredients at source to ensure they contain no heavy metals or artificial stimulants.
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
