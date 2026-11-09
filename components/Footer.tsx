"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LampIcon, MailIcon, PhoneIcon, MapPinIcon, ShieldCheckIcon, SparklesIcon, CheckIcon } from "./Icons";
import { useCart } from "@/context/CartContext";

export function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast("Welcome to the Atelier. Your 15% VIP code is ORANGE15");
  };

  return (
    <footer className="bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-300 border-t border-orange-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Pillars Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-stone-800/80 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <LampIcon className="w-6 h-6" />
            </span>
            <div>
              <h4 className="font-serif text-sm font-medium text-stone-100">Mouth-Blown Crystal</h4>
              <p className="text-xs text-stone-400 mt-0.5">Artisanal optic glass from historic ateliers</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <SparklesIcon className="w-6 h-6" />
            </span>
            <div>
              <h4 className="font-serif text-sm font-medium text-stone-100">Warm Circadian Glow</h4>
              <p className="text-xs text-stone-400 mt-0.5">2200K to 2700K sunset tones for wellness</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldCheckIcon className="w-6 h-6" />
            </span>
            <div>
              <h4 className="font-serif text-sm font-medium text-stone-100">5-Year Guarantee</h4>
              <p className="text-xs text-stone-400 mt-0.5">Comprehensive warranty & repair concierge</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <MapPinIcon className="w-6 h-6" />
            </span>
            <div>
              <h4 className="font-serif text-sm font-medium text-stone-100">White-Glove Transit</h4>
              <p className="text-xs text-stone-400 mt-0.5">Custom foam-cushioned global courier</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
                <LampIcon className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl tracking-[0.2em] font-light text-stone-100">
                VYQEN
              </span>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              We create architectural luminaires that infuse spaces with amber warmth, sculptural grace, and contemplative peace. Handcrafted from spun brass, smoked glass, and earthy terracotta.
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPinIcon className="w-4 h-4 text-orange-400" />
                <span>Flagship Atelier: Road 11, Banani / Gulshan, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneIcon className="w-4 h-4 text-orange-400" />
                <span>Private Concierge: +880 1700-VYQEN (89736)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MailIcon className="w-4 h-4 text-orange-400" />
                <span>concierge@vyqen-lighting.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="font-serif text-xs uppercase tracking-widest text-orange-400 font-semibold mb-4">
              Luminaires
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products" className="hover:text-orange-300 transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/products?category=Table+Lamp" className="hover:text-orange-300 transition-colors">
                  Table & Desk Lamps
                </Link>
              </li>
              <li>
                <Link href="/products?category=Pendant+Light" className="hover:text-orange-300 transition-colors">
                  Pendant Chandeliers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Floor+Lamp" className="hover:text-orange-300 transition-colors">
                  Sculptural Floor Arcs
                </Link>
              </li>
              <li>
                <Link href="/products?category=Wall+Sconce" className="hover:text-orange-300 transition-colors">
                  Atmospheric Wall Sconces
                </Link>
              </li>
              <li>
                <Link href="/products?category=Ambient+Art" className="hover:text-orange-300 transition-colors">
                  Cordless & Ambient Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Story */}
          <div>
            <h5 className="font-serif text-xs uppercase tracking-widest text-orange-400 font-semibold mb-4">
              The Atelier
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-orange-300 transition-colors">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="hover:text-orange-300 transition-colors">
                  Glassblowing & Metallurgy
                </Link>
              </li>
              <li>
                <Link href="/about#designers" className="hover:text-orange-300 transition-colors">
                  Master Artisans
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-orange-300 transition-colors text-orange-400/90 font-medium">
                  Lumens Calculator
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-orange-300 transition-colors">
                  Private Wishlist Vault
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-orange-300 transition-colors">
                  Track Commission Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-300 transition-colors">
                  Trade & Interior Inquiries
                </Link>
              </li>
              <li>
                <Link href="/contact#consultation" className="hover:text-orange-300 transition-colors">
                  Book Light Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div>
            <h5 className="font-serif text-xs uppercase tracking-widest text-orange-400 font-semibold mb-4">
              Private Circle
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Receive private previews of limited edition releases, architectural lighting monographs, and exclusive private sales.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-orange-950/60 border border-orange-500/30 text-xs text-orange-200 flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>VIP Invitation confirmed. Use code: <strong>ORANGE15</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-800/80 border border-stone-700/80 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs tracking-wider transition-all shadow-md shadow-orange-600/30 cursor-pointer"
                >
                  Join & Claim 15% VIP Pass
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>&copy; {new Date().getFullYear()} VYQEN Luminaire Atelier. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Commission</span>
            <span className="hover:text-stone-300 cursor-pointer">Architectural Trade Program</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

