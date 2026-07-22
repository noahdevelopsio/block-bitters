"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export interface ProductVariant {
  id: string;
  name: string;
  sizeLabel: string;
  price: number; // in kobo
  stock: number;
  isActive: boolean;
  images: string[];
  description: string | null;
}

interface ProductSelectorProps {
  variants: ProductVariant[];
}

export default function ProductSelector({ variants }: ProductSelectorProps) {
  const router = useRouter();
  
  // Set the first active variant as default
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  // Formats price stored in kobo to Naira (e.g. 1500000 -> ₦15,000)
  const formatPrice = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  };

  const handleQuantityChange = (amount: number) => {
    const newQty = quantity + amount;
    if (newQty >= 1 && (!selectedVariant || newQty <= selectedVariant.stock)) {
      setQuantity(newQty);
    }
  };

  const [redirecting, setRedirecting] = useState(false);

  const handleCheckoutRedirect = () => {
    if (!selectedVariantId) return;
    setRedirecting(true);
    router.push(`/checkout?variantId=${selectedVariantId}&quantity=${quantity}`);
  };

  if (variants.length === 0) {
    return (
      <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-700 text-sm rounded-xl text-center">
        No active variants found. Please check back later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Variants Selector */}
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/60 block">
          Select Size / Package
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {variants.map((v) => {
            const isSelected = v.id === selectedVariantId;
            const isOutOfStock = v.stock <= 0;

            return (
              <button
                key={v.id}
                type="button"
                disabled={isOutOfStock}
                onClick={() => {
                  setSelectedVariantId(v.id);
                  setQuantity(1); // Reset quantity to 1 when variant changes
                }}
                className={`border-2 p-4 rounded-xl text-left font-medium transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                    : isOutOfStock
                    ? "border-forest-800/5 bg-gray-100 opacity-50 cursor-not-allowed"
                    : "border-forest-800/10 bg-white hover:border-gold-500/50"
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-forest-950">{v.name}</div>
                  <div className="text-xs text-ink-900/60">{v.sizeLabel}</div>
                </div>
                <div className="text-sm text-gold-700 font-bold mt-2">
                  {isOutOfStock ? "Out of Stock" : formatPrice(v.price)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Adjustment */}
      <div className="flex items-center space-x-6 pt-4 border-t border-forest-800/10">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/60 block">
            Quantity
          </span>
          <div className="flex items-center border border-forest-800/10 rounded-lg bg-white overflow-hidden h-11 w-32 justify-between px-1">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg text-ink-900/60 hover:bg-cream-100 hover:text-ink-900 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              −
            </button>
            <span className="font-semibold text-sm select-none">{quantity}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={selectedVariant ? quantity >= selectedVariant.stock : false}
              className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg text-ink-900/60 hover:bg-cream-100 hover:text-ink-900 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              +
            </button>
          </div>
        </div>

        {/* Dynamic Total display */}
        {selectedVariant && (
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-900/60 block">
              Subtotal
            </span>
            <span className="text-2xl font-serif font-bold text-forest-950 block leading-9">
              {formatPrice(selectedVariant.price * quantity)}
            </span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <button
          type="button"
          disabled={redirecting}
          onClick={handleCheckoutRedirect}
          className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 text-center py-4 rounded-lg font-bold uppercase tracking-wider transition-colors shadow-lg shadow-forest-950/10 hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-75"
        >
          {redirecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-gold-300" />
              <span>Proceeding to Checkout...</span>
            </>
          ) : (
            <span>Proceed to Checkout</span>
          )}
        </button>
      </div>
    </div>
  );
}
