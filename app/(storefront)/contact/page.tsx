import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* LocalBusiness JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Block Bitters",
            "image": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-mono.svg`,
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/contact`,
            "telephone": "+2348121250431",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Shop 20A, Igando Multipurpose Market, Igando, Alimosho",
              "addressLocality": "Lagos",
              "addressRegion": "Lagos State",
              "addressCountry": "NG",
            },
          }),
        }}
      />
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-gold-300">
            Block Bitters
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wider uppercase">
            <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
            <Link href="/product" className="hover:text-gold-300 transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-gold-300 transition-colors">Our Story</Link>
            <Link href="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-gold-300 transition-colors">Contact</Link>
          </nav>
          <Link
            href="/product"
            className="bg-gold-500 hover:bg-gold-300 text-forest-950 px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            Order Now
          </Link>
        </div>
      </header>

      {/* Contact Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <span className="text-gold-700 text-xs font-semibold tracking-widest uppercase block">Get In Touch</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Block Bitters</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Contact details */}
            <div className="bg-white border border-forest-800/5 p-8 rounded-xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold">Block Media Resources</h3>
                <p className="text-sm text-ink-900/70">
                  Feel free to reach out to us for bulk orders, wholesale inquiries, or general product questions.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-forest-800/5 text-sm">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gold-500" />
                  <a href="mailto:dblockentertainer@gmail.com" className="hover:text-gold-700 transition-colors">
                    dblockentertainer@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <a href="tel:+2348121250431" className="hover:text-gold-700 transition-colors">
                    +234 812 125 0431
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                  <span>
                    Shop 20A, Igando Multipurpose Market,<br />
                    Igando, Alimosho, Lagos, Nigeria
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://wa.me/2348121250431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-lg font-bold text-center block tracking-wide text-sm uppercase transition-colors"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-forest-800/5 p-8 rounded-xl shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Name</label>
                  <input type="text" required className="w-full border border-forest-800/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Email / Phone</label>
                  <input type="text" required className="w-full border border-forest-800/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Message</label>
                  <textarea rows={4} required className="w-full border border-forest-800/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
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
