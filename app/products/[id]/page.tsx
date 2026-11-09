"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import {
  StarIcon,
  ShoppingBagIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  RotateCcwIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/Icons";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === id);

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedTemp, setSelectedTemp] = useState("2700K Warm Sunset");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "craft" | "shipping">("specs");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl text-stone-100">Luminaire Not Found</h2>
        <p className="text-stone-400 mt-2 text-sm">
          The requested lighting commission may be archived or from a previous collection.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block px-6 py-2.5 rounded-full bg-orange-600 text-white text-xs uppercase tracking-wider"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <Link href="/" className="hover:text-orange-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-orange-400 transition-colors">
          Collection
        </Link>
        <span>/</span>
        <span className="text-stone-200">{product.name}</span>
      </nav>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden bg-stone-900 border border-orange-500/25 shadow-2xl">
            <Image
              src={product.gallery[activeImg] || product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 700px"
            />

            {/* Dynamic warm sunset backlight halo */}
            <div className="absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            {product.badge && (
              <span className="absolute top-5 left-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full shadow-lg">
                {product.badge}
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md transition-all ${
                isWish
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/40"
                  : "bg-stone-950/60 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-700/60"
              }`}
            >
              <HeartIcon className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImg === idx
                    ? "border-orange-500 scale-105 shadow-lg shadow-orange-500/20"
                    : "border-stone-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="preview" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold">
              <span>{product.category}</span>
              <span className="text-stone-400">By {product.designer}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" />
                ))}
              </div>
              <span className="text-xs font-semibold text-stone-200">{product.rating}</span>
              <span className="text-xs text-stone-400">
                ({product.reviewsCount} verified atelier commissions)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mt-4 pt-4 border-t border-stone-800">
              <span className="font-serif text-3xl font-normal text-amber-300">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-stone-400 line-through text-base">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-medium ml-auto flex items-center gap-1">
                <CheckIcon className="w-3.5 h-3.5" /> Hand-inspected & in stock
              </span>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-light mt-4">
              {product.description}
            </p>

            {/* Light Temperature Selection */}
            <div className="mt-6 p-4 rounded-2xl bg-stone-900/80 border border-orange-500/20 space-y-2.5">
              <label className="text-xs font-medium text-stone-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <SparklesIcon className="w-3.5 h-3.5 text-orange-400" />
                  Select Light Spectrum:
                </span>
                <span className="text-amber-300 font-mono text-[11px]">{selectedTemp}</span>
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {["2200K Warm Candle", "2700K Sunset Amber"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTemp(t)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      selectedTemp === t
                        ? "bg-orange-600/30 border-orange-500 text-orange-200 font-semibold shadow-inner"
                        : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Features Bullet Points */}
            <div className="mt-6 space-y-2">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                  <span className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                    <CheckIcon className="w-2.5 h-2.5" />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity & Buy CTA */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-700 rounded-2xl bg-stone-900/90 px-3 py-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-1 hover:text-orange-400 text-stone-400 text-sm"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold text-stone-100">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-1 hover:text-orange-400 text-stone-400 text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={() => addToCart(product, qty, selectedTemp)}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-widest shadow-xl shadow-orange-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span>Commission Luminaire • ${(product.price * qty).toFixed(0)}</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-stone-400">
              <div className="p-2 rounded-xl bg-stone-900/40 border border-stone-800">
                <TruckIcon className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <span>Insured Courier</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-900/40 border border-stone-800">
                <ShieldCheckIcon className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <span>5-Yr Atelier Care</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-900/40 border border-stone-800">
                <RotateCcwIcon className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <span>30-Day Gallery Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Craft Dossier Tabs */}
      <div className="bg-stone-900/60 rounded-3xl p-6 sm:p-10 border border-orange-500/20 backdrop-blur-md">
        <div className="flex border-b border-stone-800 gap-8">
          {[
            { id: "specs", label: "Architectural Specifications" },
            { id: "craft", label: "Materials & Finishing" },
            { id: "shipping", label: "Transit & Warranty" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "specs" | "craft" | "shipping")}
              className={`pb-4 text-xs uppercase tracking-widest font-medium transition-all relative ${
                activeTab === tab.id
                  ? "text-orange-400 font-semibold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
                <span className="text-stone-400 block mb-1">Dimensions:</span>
                <strong className="text-stone-100 font-medium">{product.dimensions}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
                <span className="text-stone-400 block mb-1">Light Output:</span>
                <strong className="text-stone-100 font-medium">{product.lumens}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
                <span className="text-stone-400 block mb-1">Power Consumption:</span>
                <strong className="text-stone-100 font-medium">{product.wattage}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
                <span className="text-stone-400 block mb-1">Dimmer System:</span>
                <strong className="text-stone-100 font-medium">Capacitive Touch / Wall Compatible</strong>
              </div>
            </div>
          )}

          {activeTab === "craft" && (
            <div className="space-y-3 text-xs text-stone-300 max-w-3xl leading-relaxed">
              <p>
                <strong>Handcrafted Components:</strong> {product.materials.join(" • ")}
              </p>
              <p>
                Each shade is shaped by mouth in traditional wooden and graphite molds. Tiny variations in glass thickness, gentle optical fluting, and subtle artisan tool markings are testament to individual human craftsmanship and make every piece singular.
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3 text-xs text-stone-300 max-w-3xl leading-relaxed">
              <p>
                <strong>Insured White-Glove Transit:</strong> Packed in custom-molded recycled shock-absorbing foam. Free on orders above $500.
              </p>
              <p>
                <strong>5-Year Atelier Warranty:</strong> Covers LED array integrity, capacitive dimmer micro-controllers, and glass defects.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="space-y-8 pt-8 border-t border-orange-500/20">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
              Complementary Radiance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-100 mt-1">
              You May Also Admire
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-widest text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
