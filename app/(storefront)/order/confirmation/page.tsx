import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";

interface ConfirmationPageProps {
  searchParams: Promise<{
    orderNumber?: string;
  }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { orderNumber } = await searchParams;

  if (!orderNumber) {
    redirect("/");
  }

  // Fetch the order from the database
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          variant: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-cream-100">
        <div className="max-w-md w-full bg-white border border-forest-800/5 p-8 rounded-2xl shadow-md text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-gold-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold tracking-tight text-forest-950">Order Not Found</h1>
          <p className="text-sm text-ink-900/60">
            We couldn't locate an order with the reference <strong className="text-ink-900 font-bold">{orderNumber}</strong>.
          </p>
          <Link
            href="/"
            className="inline-block bg-forest-950 hover:bg-forest-800 text-cream-100 px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  };

  const isPaid = order.paymentStatus === "PAID";

  return (
    <div className="flex flex-col min-h-screen">
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
        </div>
      </header>

      {/* Confirmation content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center w-full">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 border ${
          isPaid 
            ? "bg-[#25D366]/10 border-[#25D366]/30 text-[#20ba5a]" 
            : "bg-gold-500/10 border-gold-500/30 text-gold-700"
        }`}>
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {isPaid ? "Payment Successful!" : "Order Placed Successfully!"}
        </h1>
        <p className="text-sm text-ink-900/60 mb-8 max-w-md">
          Your order number is <strong className="text-ink-900 font-bold">{order.orderNumber}</strong>. We've captured your details and will call or message you shortly to confirm delivery.
        </p>

        {/* Invoice Summary */}
        <div className="bg-white border border-forest-800/5 p-6 sm:p-8 rounded-2xl w-full text-left shadow-sm mb-8 space-y-6">
          <div className="flex justify-between items-center border-b border-forest-800/5 pb-4">
            <h3 className="font-serif text-lg font-bold">Summary Invoice</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isPaid
                ? "bg-[#25D366]/10 border-[#25D366]/20 text-[#20ba5a]"
                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-700"
            }`}>
              {order.paymentStatus}
            </span>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">Delivery Address</span>
              <span className="font-medium text-forest-950 block mt-1">{order.customerName}</span>
              <span className="text-ink-900/80 block mt-0.5">{order.address}</span>
              <span className="text-ink-900/80 block mt-0.5">{order.lga}, {order.state}</span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block">Contact Info</span>
              <span className="font-medium text-ink-900/80 block mt-1">{order.phone}</span>
              {order.altPhone && <span className="text-ink-900/80 block mt-0.5">{order.altPhone}</span>}
              {order.email && <span className="text-ink-900/60 block mt-0.5">{order.email}</span>}
            </div>
          </div>

          {/* Items Table */}
          <div className="border-t border-forest-800/5 pt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/40 block mb-3">Items Ordered</span>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold text-forest-950">{item.variant.name}</span>
                    <span className="text-xs text-ink-900/50 ml-2">Qty: {item.quantity} · Size: {item.variant.sizeLabel}</span>
                  </div>
                  <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-forest-800/5 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-900/60">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-900/60">
              <span>Delivery Fee</span>
              <span>{formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-forest-800/5 pt-3">
              <span>Total Paid</span>
              <span className="text-gold-700">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
          <Link
            href="/"
            className="bg-forest-950 hover:bg-forest-800 text-cream-100 px-8 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors shadow-lg"
          >
            Return Home
          </Link>
          <a
            href="https://wa.me/2348037127939"
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
          <p>© {new Date().getFullYear()} Licor Amargo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
