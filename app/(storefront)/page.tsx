import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-gold-300">
              Block Bitters
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wider uppercase">
            <Link href="/" className="text-gold-300 transition-colors">Home</Link>
            <Link href="/product" className="hover:text-gold-300 transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-gold-300 transition-colors">Our Story</Link>
            <Link href="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-gold-300 transition-colors">Contact</Link>
          </nav>
          <div>
            <Link
              href="/product"
              className="bg-gold-500 hover:bg-gold-300 text-forest-950 px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg shadow-gold-500/10"
            >
              Order Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-forest-950 text-cream-100 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(23,58,40,0.5),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase block">
              Handcrafted in Lagos
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-cream-100">
              The Power of Nature, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700">
                Bottled for Men
              </span>
            </h1>
            <p className="text-base sm:text-lg text-cream-100/80 leading-relaxed max-w-xl">
              A herbal bitters blend of Tongkat Ali, Maka Root, Korean Red Ginseng, honey, plum, and Gorontula — crafted to support strength, stamina, energy, and confidence, the natural way.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/product"
                className="bg-gold-500 hover:bg-gold-300 text-forest-950 px-8 py-4 rounded-lg font-bold text-center uppercase tracking-wider transition-all duration-300 shadow-xl shadow-gold-500/20"
              >
                Shop Block Bitters
              </Link>
              <Link
                href="/about"
                className="border border-cream-100/20 hover:border-gold-300 text-cream-100 hover:text-gold-300 px-8 py-4 rounded-lg font-bold text-center uppercase tracking-wider transition-all duration-300"
              >
                See What's Inside
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Visual representation card for product mockup */}
            <div className="relative w-80 h-96 rounded-2xl bg-gradient-to-b from-forest-800 to-forest-950 border border-gold-500/20 p-6 flex flex-col justify-between shadow-2xl shadow-forest-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start">
                <span className="bg-gold-500/10 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full border border-gold-500/20 uppercase tracking-wider">
                  Premium Quality
                </span>
                <span className="text-gold-300 text-sm font-medium">300ml</span>
              </div>
              <div className="my-auto text-center space-y-2 relative z-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/30 text-gold-300 text-2xl font-serif">
                  BB
                </div>
                <h3 className="font-serif text-3xl font-bold tracking-wide text-cream-100">Block Bitters</h3>
                <p className="text-xs text-gold-300/80 uppercase tracking-widest font-sans">Handcrafted Herbal Blend</p>
              </div>
              <div className="flex justify-between items-center border-t border-gold-500/10 pt-4">
                <span className="text-cream-100/60 text-xs">Single Bottle</span>
                <span className="text-gold-300 font-serif text-lg font-bold">₦15,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-forest-800 text-cream-100/90 py-4 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-center">
            <span>🌿 100% Natural Ingredients</span>
            <span>🚚 Delivered Nationwide</span>
            <span>💳 Pay on Delivery or Online</span>
            <span>🇳🇬 Made in Lagos</span>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-cream-100 text-ink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why Men Choose Block Bitters</h2>
            <p className="text-base text-ink-900/60">
              Roots, herbs, and honey — crafted responsibly for the modern man.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Boosts Strength & Stamina",
                desc: "Formulated with Tongkat Ali and Korean Red Ginseng, traditionally used to support energy and physical endurance.",
              },
              {
                title: "Supports Blood Circulation",
                desc: "Natural botanicals that help support healthy circulation throughout the body.",
              },
              {
                title: "Revives Energy & Confidence",
                desc: "A daily ritual that helps you feel sharper, stronger, and more like yourself.",
              },
              {
                title: "Crafted for Male Vitality",
                desc: "A blend rooted in traditional herbal knowledge, made for the modern man.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white border border-forest-800/5 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-700 flex items-center justify-center font-bold mb-6">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-ink-900/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 text-cream-100/80 py-16 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-gold-300">Block Bitters</h3>
            <p className="text-sm text-cream-100/60">
              The Power of Nature — Bottled for Men
            </p>
            <p className="text-xs text-cream-100/40">
              © {new Date().getFullYear()} Block Bitters. All rights reserved.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-300">Contact Us</h4>
            <ul className="space-y-2 text-sm text-cream-100/60">
              <li>📧 dblockentertainer@gmail.com</li>
              <li>📞 +234 812 125 0431</li>
              <li>📍 Igando Market, Alimosho, Lagos</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-300">Disclaimer</h4>
            <p className="text-xs text-cream-100/40 leading-relaxed">
              Block Bitters is a herbal supplement and is not evaluated or approved as a treatment for any medical condition. Individual results may vary.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
