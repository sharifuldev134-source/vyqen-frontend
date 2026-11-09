"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SparklesIcon, ShoppingBagIcon, EyeIcon, ArrowRightIcon } from "./Icons";

interface Hotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  productId: string;
}

export function HotspotLookbook() {
  const { addToCart, setQuickViewProduct } = useCart();
  const [activeSpot, setActiveSpot] = useState<string | null>("solis-amber-table-lamp");

  // Interior Scene with Hotspot coordinates
  const hotspots: Hotspot[] = [
    { x: 32, y: 58, productId: "solis-amber-table-lamp" },
    { x: 50, y: 22, productId: "aurora-pendant-orb" },
    { x: 78, y: 62, productId: "terra-cordless-lantern" },
  ];

  const getProduct = (id: string): Product | undefined => {
    return PRODUCTS.find((p) => p.id === id);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-amber-400" />
            <span>Interactive Editorial Lookbook</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
            The Living Atelier Lookbook
          </h2>
        </div>
        <p className="text-xs text-stone-400 max-w-md">
          Hover or tap the glowing orange nodes in the salon below to discover the exact architectural luminaires crafted for this residence.
        </p>
      </div>

      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-stone-900 border border-orange-500/30 shadow-2xl">
        {/* Main Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
          alt="Architectural Living Salon by Vyqen"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

        {/* Interactive Hotspot Nodes */}
        {hotspots.map((spot) => {
          const product = getProduct(spot.productId);
          if (!product) return null;
          const isActive = activeSpot === spot.productId;

          return (
            <div
              key={spot.productId}
              className="absolute z-20"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              {/* Pulsing Pin Button */}
              <button
                onClick={() => setActiveSpot(isActive ? null : spot.productId)}
                onMouseEnter={() => setActiveSpot(spot.productId)}
                className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
                aria-label={`View ${product.name}`}
              >
                {/* Outer Ring Pulse */}
                <span className="absolute w-8 h-8 rounded-full bg-orange-500/40 animate-ping pointer-events-none" />
                {/* Inner Glow Button */}
                <span className="relative w-7 h-7 rounded-full bg-orange-600 hover:bg-orange-500 border-2 border-white shadow-xl shadow-orange-950/60 flex items-center justify-center text-white text-[11px] font-bold transition-transform group-hover:scale-115">
                  +
                </span>
              </button>

              {/* Floating Product Popover Card */}
              {isActive && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-30 w-64 sm:w-72 bg-stone-950/90 backdrop-blur-xl border border-orange-500/40 rounded-2xl p-4 shadow-2xl animate-fade-in text-left">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-orange-400 font-medium">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-sm font-medium text-stone-100 truncate mt-0.5">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif text-sm font-semibold text-amber-300">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-stone-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-800">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/30 transition-all cursor-pointer"
                    >
                      <ShoppingBagIcon className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                      title="Quick View"
                    >
                      <EyeIcon className="w-4 h-4 text-orange-400" />
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Banner */}
        <div className="absolute bottom-4 left-6 right-6 hidden sm:flex items-center justify-between text-xs text-stone-300">
          <span className="bg-stone-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Residence: Penthouse Atelier 09 &bull; Warm 2700K Sunset Lighting
          </span>
          <span className="bg-stone-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700">
            Tap nodes for details
          </span>
        </div>
      </div>
    </section>
  );
}

