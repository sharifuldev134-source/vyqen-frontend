"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { XIcon, StarIcon, ShoppingBagIcon, HeartIcon, SparklesIcon, ShieldCheckIcon, TruckIcon } from "./Icons";

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
  } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedTemp, setSelectedTemp] = useState("2700K Warm Sunset");
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative w-full max-w-3xl bg-stone-900 border border-orange-500/30 rounded-3xl shadow-2xl overflow-hidden text-stone-100 z-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border border-stone-700/60"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Gallery */}
          <div className="p-6 bg-gradient-to-b from-stone-950/70 to-stone-900 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-800/80 border border-stone-700/50 shadow-inner">
              <Image
                src={product.gallery[activeImg] || product.image}
                alt={product.name}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2.5 mt-4 justify-center">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === idx
                      ? "border-orange-500 scale-105 shadow-md shadow-orange-500/20"
                      : "border-stone-700 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumbnail" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Options */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-orange-400 font-medium tracking-wider uppercase">
                <span>{product.category}</span>
                <span className="text-stone-400">By {product.designer}</span>
              </div>

              <h2 className="font-serif text-2xl font-normal text-stone-100 mt-1">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <span className="text-xs text-stone-300 font-medium">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewsCount} atelier reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-2xl font-semibold text-amber-300">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-stone-400 line-through text-sm">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-medium ml-auto">
                  In Stock (Ready to dispatch)
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mt-3 border-t border-stone-800/80 pt-3">
                {product.description}
              </p>

              {/* Color Temperature Selector */}
              <div className="mt-4">
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-2">
                  <SparklesIcon className="w-3.5 h-3.5 text-orange-400" />
                  Atmosphere Temperature:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["2200K Candlelight", "2700K Warm Sunset"].map((temp) => (
                    <button
                      key={temp}
                      onClick={() => setSelectedTemp(temp)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        selectedTemp === temp
                          ? "bg-orange-600/20 border-orange-500 text-orange-200 font-medium"
                          : "bg-stone-800/60 border-stone-700/80 text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      {temp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs chips */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-stone-400 bg-stone-950/40 p-3 rounded-xl border border-stone-800">
                <div>
                  <strong className="text-stone-300">Output:</strong> {product.lumens}
                </div>
                <div>
                  <strong className="text-stone-300">Power:</strong> {product.wattage}
                </div>
                <div className="col-span-2 line-clamp-1">
                  <strong className="text-stone-300">Craft:</strong> {product.materials.join(", ")}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-700 rounded-xl bg-stone-800 px-2 py-1.5">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1 hover:text-orange-400 text-stone-400"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-stone-100">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1 hover:text-orange-400 text-stone-400"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => {
                    addToCart(product, qty, selectedTemp);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs tracking-wide shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
                >
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span>Add to Bag • ${(product.price * qty).toFixed(0)}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWish
                      ? "bg-orange-600/20 border-orange-500 text-orange-400"
                      : "bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200"
                  }`}
                  aria-label="Wishlist"
                >
                  <HeartIcon className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <Link
                  href={`/products/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-orange-400 hover:underline inline-flex items-center gap-1"
                >
                  View full specifications & lookbook &rarr;
                </Link>
                <div className="flex items-center gap-2 text-stone-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheckIcon className="w-3.5 h-3.5 text-orange-400" /> 5y Warranty
                  </span>
                  <span className="flex items-center gap-1">
                    <TruckIcon className="w-3.5 h-3.5 text-orange-400" /> Insured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

