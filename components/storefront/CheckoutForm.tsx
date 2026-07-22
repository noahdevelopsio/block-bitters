"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeliveryZone {
  state: string;
  fee: number; // in kobo
}

interface ProductVariant {
  id: string;
  name: string;
  price: number; // in kobo
  sizeLabel: string;
}

interface CheckoutFormProps {
  variant: ProductVariant;
  quantity: number;
  deliveryZones: DeliveryZone[];
}

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export default function CheckoutForm({
  variant,
  quantity,
  deliveryZones,
}: CheckoutFormProps) {
  const router = useRouter();

  // Form fields state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [lga, setLga] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"PAY_ON_DELIVERY" | "FLUTTERWAVE">(
    "PAY_ON_DELIVERY"
  );
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Subtotal in kobo
  const subtotal = variant.price * quantity;

  // Dynamic delivery fee based on state zone configuration
  const matchedZone = deliveryZones.find(
    (z) => z.state.toLowerCase() === selectedState.toLowerCase()
  );
  // Default fee if state not explicitly seeded is ₦3,000 (300000 kobo)
  const deliveryFee = selectedState ? (matchedZone ? matchedZone.fee : 300000) : 0;
  const total = subtotal + deliveryFee;

  const formatPrice = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple phone number validation (must be standard Nigerian formats)
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!/^(0|(\+?234))[789][01]\d{8}$/.test(cleanPhone)) {
      setError("Please enter a valid Nigerian phone number (e.g. 08123456789)");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          phone: cleanPhone,
          altPhone: altPhone || null,
          email: email || null,
          address,
          state: selectedState,
          lga,
          variantId: variant.id,
          quantity,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed. Please try again.");
      }

      // Redirect either to confirmation (POD) or Flutterwave Hosted Page (Online)
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        throw new Error("Missing redirect link in server response.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-700 text-sm rounded-xl flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Customer details */}
        <div className="bg-white border border-forest-800/5 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold border-b border-forest-800/5 pb-3">
            1. Your Details
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-cream-100/10"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-cream-100/10"
                  placeholder="e.g. 08123456789"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  Alternative Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-cream-100/10"
                  placeholder="e.g. 08012345678"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-cream-100/10"
                placeholder="john@example.com (For order notifications)"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Shipping details */}
        <div className="bg-white border border-forest-800/5 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold border-b border-forest-800/5 pb-3">
            2. Delivery Address
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-cream-100/10"
                placeholder="No. 12, Street Name, Estate or Area"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  State
                </label>
                <select
                  required
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                >
                  <option value="">Select State</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">
                  LGA / City
                </label>
                <input
                  type="text"
                  required
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-cream-100/10"
                  placeholder="e.g. Alimosho"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Payment details */}
        <div className="bg-white border border-forest-800/5 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold border-b border-forest-800/5 pb-3">
            3. Payment Method
          </h3>
          <div className="space-y-3">
            <label className={`flex items-start p-4 border rounded-xl cursor-pointer hover:bg-cream-100/40 transition-colors ${
              paymentMethod === "PAY_ON_DELIVERY"
                ? "border-gold-500 bg-gold-500/5"
                : "border-forest-800/10"
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="PAY_ON_DELIVERY"
                checked={paymentMethod === "PAY_ON_DELIVERY"}
                onChange={() => setPaymentMethod("PAY_ON_DELIVERY")}
                className="mt-1 text-gold-500 focus:ring-gold-500 h-4 w-4"
              />
              <span className="ml-3">
                <span className="block text-sm font-semibold text-forest-950">
                  Pay on Delivery
                </span>
                <span className="block text-xs text-ink-900/60 mt-0.5">
                  Pay cash or transfer when your order arrives.
                </span>
              </span>
            </label>
            <label className={`flex items-start p-4 border rounded-xl cursor-pointer hover:bg-cream-100/40 transition-colors ${
              paymentMethod === "FLUTTERWAVE"
                ? "border-gold-500 bg-gold-500/5"
                : "border-forest-800/10"
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="FLUTTERWAVE"
                checked={paymentMethod === "FLUTTERWAVE"}
                onChange={() => setPaymentMethod("FLUTTERWAVE")}
                className="mt-1 text-gold-500 focus:ring-gold-500 h-4 w-4"
              />
              <span className="ml-3">
                <span className="block text-sm font-semibold text-forest-950">
                  Pay Now with Flutterwave
                </span>
                <span className="block text-xs text-ink-900/60 mt-0.5">
                  Pay securely using card, bank transfer, or USSD code.
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Summary Sidebar */}
      <div className="space-y-6">
        <div className="bg-white border border-forest-800/5 p-6 rounded-xl space-y-4 shadow-sm sticky top-6">
          <h3 className="font-serif text-base font-bold border-b border-forest-800/5 pb-2">
            Order Summary
          </h3>
          <div className="space-y-1 text-sm text-ink-900/80">
            <span className="font-bold text-forest-950 block">{variant.name}</span>
            <span className="text-xs text-ink-900/60 block">
              Qty: {quantity} · Size: {variant.sizeLabel}
            </span>
          </div>
          <div className="border-t border-forest-800/5 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-ink-900/60">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-900/60">
              <span>Delivery Fee</span>
              <span>{selectedState ? formatPrice(deliveryFee) : "Select state"}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-forest-800/5 pt-3">
              <span>Total</span>
              <span className="text-gold-700">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors shadow-lg disabled:opacity-50 mt-4 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                <span>Processing Order...</span>
              </>
            ) : (
              <span>Confirm Order ({formatPrice(total)})</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
