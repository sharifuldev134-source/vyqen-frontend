"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { StarIcon, ShoppingBagIcon, HeartIcon, EyeIcon } from "./Icons";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, formatPrice } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const isWish = isInWishlist(product.id);

  return (
    <div
      className="group relative flex flex-col bg-stone-900/90 rounded-3xl border border-orange-500/20 overflow-hidden shadow-xl shadow-stone-950/40 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-950/30 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950">
        <Image
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Ambient warm light glow effect behind the lamp */}
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[10px] uppercase font-semibold tracking-widest px-3 py-1 rounded-full shadow-lg shadow-orange-950/50">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isWish
              ? "bg-orange-600 text-white shadow-lg shadow-orange-600/40"
              : "bg-stone-950/60 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-700/50"
          }`}
          aria-label="Save to Wishlist"
        >
          <HeartIcon className="w-4 h-4 fill-current" />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-stone-950/80 backdrop-blur-md hover:bg-stone-900 text-stone-200 border border-stone-700/80 text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <EyeIcon className="w-4 h-4 text-orange-400" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => addToCart(product)}
            className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/40 text-xs font-medium flex items-center justify-center transition-all cursor-pointer"
            aria-label="Add to bag"
          >
            <ShoppingBagIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-orange-400 font-medium">
            <span>{product.category}</span>
            <span className="text-stone-400">{product.designer}</span>
          </div>

          <Link href={`/products/${product.id}`} className="block group/link mt-1.5">
            <h3 className="font-serif text-lg font-normal text-stone-100 group-hover/link:text-orange-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Bottom meta & Price */}
        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-semibold text-amber-200">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
              <div className="flex text-amber-400">
                <StarIcon className="w-3 h-3" />
              </div>
              <span className="font-medium text-stone-300">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="text-xs font-medium text-orange-400 hover:text-orange-300 tracking-wide underline underline-offset-4 decoration-orange-500/40"
          >
            Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

