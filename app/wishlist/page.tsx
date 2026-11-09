"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import {
  HeartIcon,
  ShoppingBagIcon,
  XIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@/components/Icons";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, formatPrice } = useCart();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const estimatedTotal = savedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 border border-orange-500/30 p-8 sm:p-14 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-widest font-medium">
            <HeartIcon className="w-3.5 h-3.5 text-orange-400 fill-current" />
            <span>Private Curatorial Vault</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
            Your Saved Luminaires
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            A sanctuary of your favorite architectural light sculptures. Compare silhouettes, review spatial specifications, or commission for your residence.
          </p>
        </div>

        {/* Ambient halo glow */}
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Content */}
      {savedProducts.length === 0 ? (
        <div className="py-20 text-center bg-stone-900/60 rounded-3xl border border-orange-500/20 p-8 max-w-xl mx-auto space-y-5">
          <div className="w-20 h-20 mx-auto rounded-full bg-orange-950/40 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <HeartIcon className="w-9 h-9" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-stone-100 font-light">
              Your Curatorial Vault Is Silent
            </h3>
            <p className="text-xs text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
              You haven&apos;t saved any lighting pieces yet. Explore our 2026 collection and tap the heart icon on pieces that inspire your space.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-600/30"
          >
            <span>Explore Luminaire Collection</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Action & Total Bar */}
          <div className="bg-stone-900/60 p-6 rounded-3xl border border-orange-500/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-400 font-medium">
                Vault Summary
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif text-2xl font-light text-stone-100">
                  {savedProducts.length} {savedProducts.length === 1 ? "Sculptural Piece" : "Sculptural Pieces"}
                </span>
                <span className="text-sm text-stone-400">
                  (Estimated Investment: <strong className="text-amber-300 font-medium">{formatPrice(estimatedTotal)}</strong>)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleAddAllToCart}
                className="flex-1 sm:flex-none py-3 px-6 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-widest shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span>Move All To Atelier Bag</span>
              </button>
            </div>
          </div>

          {/* Saved Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col bg-stone-900/90 rounded-3xl border border-orange-500/20 overflow-hidden shadow-xl hover:border-orange-500/50 transition-all group"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="350px"
                  />
                  <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />

                  {/* Remove button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3.5 right-3.5 p-2 rounded-full bg-stone-950/70 hover:bg-red-950/80 text-stone-300 hover:text-red-400 border border-stone-800 transition-colors"
                    title="Remove from vault"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>

                  {product.badge && (
                    <span className="absolute top-3.5 left-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[10px] uppercase font-semibold tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-orange-400 font-medium">
                      {product.category}
                    </span>
                    <Link href={`/products/${product.id}`} className="block mt-1">
                      <h3 className="font-serif text-lg font-normal text-stone-100 hover:text-orange-300 transition-colors truncate">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{product.tagline}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="font-serif text-lg font-semibold text-amber-200">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="py-2 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-orange-600/30 transition-all cursor-pointer"
                    >
                      <ShoppingBagIcon className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Guarantees */}
          <div className="p-6 rounded-3xl bg-stone-900/40 border border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-400 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <ShieldCheckIcon className="w-5 h-5 text-orange-400 shrink-0" />
              <span>5-Year Comprehensive Atelier Warranty</span>
            </div>
            <div className="flex items-center gap-2.5">
              <TruckIcon className="w-5 h-5 text-orange-400 shrink-0" />
              <span>Insured White-Glove Transit Worldwide</span>
            </div>
            <div className="flex items-center gap-2.5">
              <SparklesIcon className="w-5 h-5 text-orange-400 shrink-0" />
              <span>100% Handcrafted Brass & Crystal Glass</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

