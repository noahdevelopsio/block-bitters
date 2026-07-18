import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is Block Bitters made from?",
      a: "Block Bitters is made from a blend of honey, Tongkat Ali, Maka Root, Korean Red Ginseng, plum, and Gorontula — all-natural botanical ingredients.",
    },
    {
      q: "How do I pay?",
      a: "You can pay online through Flutterwave (card, bank transfer, or USSD) at checkout, or choose Pay on Delivery and pay when your order arrives.",
    },
    {
      q: "Do you deliver nationwide?",
      a: "Yes — we deliver to all 36 states and the FCT. Delivery fees and timelines vary by location.",
    },
    {
      q: "Is Block Bitters safe to use?",
      a: "Block Bitters is made from natural herbal ingredients. As with any supplement, we recommend consulting a healthcare professional if you have an existing medical condition or are on medication.",
    },
    {
      q: "How long does delivery take?",
      a: "Delivery timelines depend on your location — typically 2–5 business days within Nigeria.",
    },
    {
      q: "Can I track my order?",
      a: "Yes — after placing your order, you'll receive an order number you can use to check status, or contact us directly via WhatsApp or phone.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
              },
            })),
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
            <Link href="/faq" className="text-gold-300 transition-colors">FAQ</Link>
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

      {/* FAQ content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <span className="text-gold-700 text-xs font-semibold tracking-widest uppercase block">Got Questions?</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-forest-800/5 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-2"
              >
                <h3 className="font-serif text-lg font-bold text-ink-900">{faq.q}</h3>
                <p className="text-sm text-ink-900/75 leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
