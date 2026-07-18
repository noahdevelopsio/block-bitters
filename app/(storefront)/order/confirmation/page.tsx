import Link from "next/link";

interface ConfirmationPageProps {
  searchParams: Promise<{
    orderNumber?: string;
    status?: string;
  }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { orderNumber = "BB-0000", status = "success" } = await searchParams;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-gold-300">
            Block Bitters
          </Link>
        </div>
      </header>

      {/* Confirmation content */}
      <main className="flex-grow max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-8">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-3">Thank you — your order is confirmed!</h1>
        <p className="text-sm text-ink-900/60 mb-8 max-w-md">
          Your order number is <strong className="text-ink-900 font-bold">{orderNumber}</strong>. We've received your details and will reach out via phone or WhatsApp shortly to confirm delivery arrangements.
        </p>

        <div className="bg-white border border-forest-800/5 p-6 rounded-xl w-full text-left space-y-4 shadow-sm mb-8">
          <h3 className="font-bold border-b border-forest-800/5 pb-2 text-sm uppercase tracking-wider text-ink-900/60">What Happens Next?</h3>
          <ul className="space-y-3 text-sm text-ink-900/80">
            <li className="flex items-start">
              <span className="text-gold-500 font-bold mr-2">1.</span>
              <span>Our team will contact you to verify your delivery address.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold-500 font-bold mr-2">2.</span>
              <span>Your order is packed securely and dispatched via our delivery partners.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold-500 font-bold mr-2">3.</span>
              <span>You receive your package (2 to 5 business days depending on location).</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
          <Link
            href="/"
            className="bg-forest-950 hover:bg-forest-800 text-cream-100 px-8 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors"
          >
            Return Home
          </Link>
          <a
            href="https://wa.me/2348121250431"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-forest-800/10 hover:border-gold-500 text-ink-900 px-8 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors flex items-center justify-center"
          >
            Chat with Support
          </a>
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
