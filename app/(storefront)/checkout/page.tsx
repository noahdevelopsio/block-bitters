import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-forest-800/10 bg-forest-950 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-gold-300">
            Block Bitters
          </Link>
          <span className="text-xs uppercase tracking-widest text-cream-100/60 font-semibold">Secure Checkout</span>
        </div>
      </header>

      {/* Checkout Form Container */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            
            {/* Steps & Form sections */}
            <form className="space-y-6">
              {/* Step 1: Customer details */}
              <div className="bg-white border border-forest-800/5 p-6 rounded-xl space-y-4 shadow-sm">
                <h3 className="font-bold text-base border-b border-forest-800/5 pb-2">1. Your Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Full Name</label>
                    <input type="text" required className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Phone Number</label>
                      <input type="tel" required className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Alt. Phone (Optional)</label>
                      <input type="tel" className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Email Address (Optional)</label>
                    <input type="email" className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping details */}
              <div className="bg-white border border-forest-800/5 p-6 rounded-xl space-y-4 shadow-sm">
                <h3 className="font-bold text-base border-b border-forest-800/5 pb-2">2. Delivery Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Street Address</label>
                    <input type="text" required className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">State</label>
                      <select required className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold-500">
                        <option value="">Select State</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja (FCT)</option>
                        {/* More states placeholder */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">LGA / City</label>
                      <input type="text" required className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment details */}
              <div className="bg-white border border-forest-800/5 p-6 rounded-xl space-y-4 shadow-sm">
                <h3 className="font-bold text-base border-b border-forest-800/5 pb-2">3. Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-start p-4 border border-forest-800/10 rounded-lg cursor-pointer hover:bg-cream-100/50">
                    <input type="radio" name="paymentMethod" value="PAY_ON_DELIVERY" defaultChecked className="mt-1 text-gold-500 focus:ring-gold-500" />
                    <span className="ml-3">
                      <span className="block text-sm font-semibold">Pay on Delivery</span>
                      <span className="block text-xs text-ink-900/60">Pay cash or transfer when your order arrives</span>
                    </span>
                  </label>
                  <label className="flex items-start p-4 border border-forest-800/10 rounded-lg cursor-pointer hover:bg-cream-100/50">
                    <input type="radio" name="paymentMethod" value="FLUTTERWAVE" className="mt-1 text-gold-500 focus:ring-gold-500" />
                    <span className="ml-3">
                      <span className="block text-sm font-semibold">Pay Now with Flutterwave</span>
                      <span className="block text-xs text-ink-900/60">Pay instantly using card, bank transfer, or USSD</span>
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 py-4 rounded-lg font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                Place Order (₦15,000)
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-forest-800/5 p-6 rounded-xl space-y-4 shadow-sm">
              <h3 className="font-bold text-base border-b border-forest-800/5 pb-2">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Block Bitters (300ml) × 1</span>
                <span className="font-medium">₦15,000</span>
              </div>
              <div className="border-t border-forest-800/5 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-ink-900/60">
                  <span>Subtotal</span>
                  <span>₦15,000</span>
                </div>
                <div className="flex justify-between text-ink-900/60">
                  <span>Delivery Fee</span>
                  <span>₦2,000</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-forest-800/5 pt-3">
                  <span>Total</span>
                  <span className="text-gold-700">₦17,000</span>
                </div>
              </div>
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
