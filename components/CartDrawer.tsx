"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { XIcon, ShoppingBagIcon, PlusIcon, MinusIcon, ArrowRightIcon, TruckIcon, SparklesIcon } from "./Icons";

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    discount,
    couponCode,
    applyCoupon,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    formatPrice,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const total = Math.max(0, cartSubtotal - discount);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-orange-500/20 text-stone-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-800/80 bg-gradient-to-r from-stone-900 via-orange-950/30 to-stone-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                <ShoppingBagIcon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-medium text-stone-100">
                  Your Atelier Bag
                </h3>
                <p className="text-xs text-orange-300/80">
                  {cartCount} {cartCount === 1 ? "luminaire piece" : "luminaire pieces"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Fee Notice */}
          <div className="px-6 py-3 bg-orange-950/40 border-b border-orange-500/20 flex items-center justify-between text-xs text-stone-300">
            <span className="flex items-center gap-2">
              <TruckIcon className="w-4 h-4 text-orange-400 shrink-0" />
              <span>
                ডেলিভারি চার্জ: <strong className="text-amber-300">ঢাকার ভেতরে ৬০ টাকা</strong> | <strong className="text-amber-300">ঢাকার বাইরে ১২০ টাকা</strong>
              </span>
            </span>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-stone-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-orange-950/40 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
                  <ShoppingBagIcon className="w-9 h-9" />
                </div>
                <h4 className="font-serif text-xl font-medium text-stone-200 mb-2">
                  Your bag is silent
                </h4>
                <p className="text-sm text-stone-400 max-w-xs mb-6">
                  No lamps chosen yet. Discover our sculptural lighting pieces to shape your space, your story.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-orange-600/30 transition-all"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-stone-700/60">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-sm text-stone-100 hover:text-orange-400 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-400 text-xs transition-colors"
                          aria-label="Remove item"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-orange-300/80 mt-0.5">
                        {item.selectedTemp || item.product.colorTemperature}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-700 rounded-lg bg-stone-800/80">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:text-orange-400 text-stone-400 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-stone-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:text-orange-400 text-stone-400 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-amber-200">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-stone-400">
                            {formatPrice(item.product.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800/80 bg-stone-900/90 space-y-4">
              {/* Voucher form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. ORANGE15)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 bg-stone-800/80 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => {
                    if (inputCode) {
                      applyCoupon(inputCode);
                      setInputCode("");
                    }
                  }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-orange-300 border border-orange-500/30 rounded-xl text-xs font-medium transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    Code {couponCode} (-15%)
                  </span>
                  <span>-${discount.toFixed(0)}</span>
                </div>
              )}

              {/* Subtotal calculation */}
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-medium">{formatPrice(cartSubtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Member Savings</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-amber-300">
                    Dhaka: 60 Tk | Outside: 120 Tk
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-base font-serif font-medium text-stone-100">
                  <span>Subtotal</span>
                  <span className="text-amber-300">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-sm shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-500">
                Guaranteed safe checkout & 5-year atelier warranty included.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

