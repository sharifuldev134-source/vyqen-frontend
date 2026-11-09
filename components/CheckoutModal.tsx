"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { XIcon, CheckIcon, ShieldCheckIcon, TruckIcon } from "./Icons";

export function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    discount,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    currency,
  } = useCart();

  const [step, setStep] = useState<"form" | "processing" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "Rifat Miah",
    email: "rifat@example.com",
    address: "Gulshan Avenue, Road 45",
    city: "Dhaka",
    country: "Bangladesh",
    phone: "+880 1700-000000",
    description: "",
    deliveryZone: "inside" as "inside" | "outside",
  });
  const [orderId, setOrderId] = useState("");

  if (!isCheckoutOpen) return null;

  const deliveryFee = formData.deliveryZone === "inside" ? 60 : 120;
  const netSubtotal = Math.max(0, cartSubtotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      const generated = "VYQ-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generated);
      setStep("confirmed");
      clearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 md:p-6 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (step !== "processing") setIsCheckoutOpen(false);
        }}
      />

      <div className="relative w-full max-w-lg bg-stone-900 border border-orange-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-stone-100 z-10 max-h-[92vh] flex flex-col my-auto animate-fade-in">
        {/* Header - Fixed & compact */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-medium text-stone-100 leading-tight">
                Atelier Concierge Checkout
              </h3>
              <p className="text-[11px] text-orange-300/80">Secured 256-bit encrypted transaction</p>
            </div>
          </div>
          {step !== "processing" && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body based on step */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-3.5">
            <div>
              <h4 className="text-[11px] uppercase font-semibold tracking-wider text-orange-400 mb-2">
                1. Delivery Destination (ডেলিভারি ঠিকানা)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-stone-300 block mb-1 text-[11px]">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 text-[11px]">Contact Phone</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 text-[11px]">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 text-[11px]">City / Region</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-stone-300 block mb-1 text-[11px]">Street Address</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-stone-300 block mb-1 text-[11px]">
                    Description / Order Notes (অর্ডার বিবরণ বা বিশেষ নির্দেশনা)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add any specific instructions, landmark details, or color preference..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 text-xs resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Charge Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[11px] uppercase font-semibold tracking-wider text-orange-400">
                  2. Delivery Area & Charges (ডেলিভারি চার্জ)
                </h4>
                <span className="text-[10px] text-amber-300 font-medium">
                  ঢাকার ভেতরে ৬০৳ | বাইরে ১২০৳
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryZone: "inside" })}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.deliveryZone === "inside"
                      ? "bg-orange-600/20 border-orange-500 text-orange-200 shadow-md shadow-orange-950/40"
                      : "bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-stone-100">ঢাকার ভেতরে</span>
                    <span className="text-amber-300 font-bold">60 Tk</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Inside Dhaka (24-48h)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryZone: "outside" })}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.deliveryZone === "outside"
                      ? "bg-orange-600/20 border-orange-500 text-orange-200 shadow-md shadow-orange-950/40"
                      : "bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-stone-100">ঢাকার বাইরে</span>
                    <span className="text-amber-300 font-bold">120 Tk</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Outside Dhaka (2-3d)</div>
                </button>
              </div>
            </div>

            {/* Order Brief */}
            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-xs space-y-1.5">
              <div className="flex justify-between text-stone-400">
                <span>Items Subtotal ({cart.length} types)</span>
                <span className="text-stone-200">{formatPrice(cartSubtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Special Member Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-400">
                <span>Delivery Charge</span>
                <span className="text-amber-300 font-medium">
                  {formData.deliveryZone === "inside" ? "60 Tk (ঢাকার ভেতরে)" : "120 Tk (ঢাকার বাইরে)"}
                </span>
              </div>
              <div className="pt-1.5 border-t border-stone-800 flex justify-between font-serif text-sm font-medium text-amber-300">
                <span>Total Amount Due</span>
                <span>
                  {currency === "BDT"
                    ? `৳${(Math.round(netSubtotal * 122) + deliveryFee).toLocaleString()}`
                    : `${formatPrice(netSubtotal)} + ${deliveryFee} Tk`}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs sm:text-sm tracking-wider shadow-xl shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Confirm Order • অর্ডার সম্পন্ন করুন</span>
            </button>
          </form>
        )}

        {step === "processing" && (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
            <h4 className="font-serif text-lg text-stone-100">
              Securing Your Lighting Commission...
            </h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Assigning hand-inspected serial numbers and booking white-glove padded transit.
            </p>
          </div>
        )}

        {step === "confirmed" && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-600/40">
              <CheckIcon className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-orange-400 font-medium">
                Commission Confirmed
              </span>
              <h3 className="font-serif text-2xl text-stone-100 mt-1">
                Thank You, {formData.name}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Your bespoke luminaires have been scheduled for dispatch.
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-2xl border border-stone-800 text-xs text-left space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-stone-400">Order Reference:</span>
                <strong className="text-amber-300 font-mono">{orderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Shipping To:</span>
                <span className="text-stone-200">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Delivery Zone:</span>
                <span className="text-orange-300 font-medium">
                  {formData.deliveryZone === "inside" ? "Inside Dhaka (60 Tk)" : "Outside Dhaka (120 Tk)"}
                </span>
              </div>
              {formData.description && (
                <div className="flex flex-col pt-1 border-t border-stone-800/80">
                  <span className="text-stone-400">Order Description:</span>
                  <span className="text-stone-300 italic mt-0.5">{formData.description}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-stone-800/80">
                <span className="text-stone-400">Estimated Delivery:</span>
                <span className="text-amber-300 font-medium">
                  {formData.deliveryZone === "inside" ? "Within 24-48 Hours (Dhaka)" : "Within 2-3 Days (Courier)"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
              <TruckIcon className="w-4 h-4 text-orange-400" />
              <span>Tracking details sent to {formData.email}</span>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setStep("form");
              }}
              className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-600/30"
            >
              Continue Exploring Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
