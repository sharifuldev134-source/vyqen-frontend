"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchIcon, SlidersIcon, SparklesIcon, LampIcon, ArrowRightIcon } from "@/components/Icons";
import Link from "next/link";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [category, setCategory] = useState<string>(initialCategory);
  const [material, setMaterial] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const categories = ["All", "Table Lamp", "Pendant Light", "Floor Lamp", "Wall Sconce", "Ambient Art"];
  const materials = ["All", "Amber Glass", "Brass", "Terracotta", "Oak"];

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      if (category !== "All" && p.category !== category) return false;

      // Material match
      if (material !== "All") {
        const matchesMat = p.materials.some((m) =>
          m.toLowerCase().includes(material.toLowerCase())
        );
        if (!matchesMat) return false;
      }

      // Search match
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesQuery =
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.designer.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [category, material, search, sortBy]);

  const resetFilters = () => {
    setCategory("All");
    setMaterial("All");
    setSearch("");
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 border border-orange-500/30 p-8 sm:p-14 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-widest font-medium">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Lighting Catalog</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
            The Atelier Collection
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Every luminaire is hand-assembled in limited atelier runs. Featuring mouth-blown amber glass, solid turned brass, and flicker-free circadian optics.
          </p>
        </div>

        {/* Ambient halo glow */}
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-6 bg-stone-900/60 p-6 rounded-3xl border border-orange-500/20 backdrop-blur-md">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                category === cat
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 font-semibold"
                  : "bg-stone-950/80 hover:bg-stone-850 text-stone-300 border border-stone-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Material, Search, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center pt-2 border-t border-stone-800/80">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <SearchIcon className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, designer, style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-950/80 border border-stone-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Material Pills */}
          <div className="lg:col-span-5 flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 shrink-0 mr-1">
              Material:
            </span>
            {materials.map((mat) => (
              <button
                key={mat}
                onClick={() => setMaterial(mat)}
                className={`px-3 py-1 rounded-xl text-xs transition-colors shrink-0 ${
                  material === mat
                    ? "bg-orange-600/20 border border-orange-500 text-orange-200"
                    : "bg-stone-950/60 border border-stone-800/80 text-stone-400 hover:text-stone-200"
                }`}
              >
                {mat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="lg:col-span-3 flex items-center justify-end gap-2 text-xs">
            <SlidersIcon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "rating")}
              className="bg-stone-950/80 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-orange-500"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <div>
          Showing <strong className="text-orange-400 font-semibold">{filtered.length}</strong>{" "}
          architectural luminaires
          {(category !== "All" || material !== "All" || search) && (
            <span className="ml-2 text-stone-400">
              filtered by {[category !== "All" && category, material !== "All" && material, search && `"${search}"`].filter(Boolean).join(", ")}
            </span>
          )}
        </div>

        {(category !== "All" || material !== "All" || search) && (
          <button
            onClick={resetFilters}
            className="text-orange-400 hover:text-orange-300 underline underline-offset-2"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center bg-stone-950/60 rounded-3xl border border-stone-800 p-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-950/40 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
            <LampIcon className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl text-stone-200">No luminaires match your criteria</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto mt-2 mb-6">
            Try adjusting your search terms, material selections, or category filter.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs tracking-wider transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Architectural Consultation Footer Banner */}
      <div className="bg-stone-900/60 border border-orange-500/20 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
            Bespoke Architectural Commissions
          </span>
          <h3 className="font-serif text-2xl font-light text-stone-100 mt-1">
            Need Custom Dimensions, Drops, or Brass Patinas?
          </h3>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Our atelier crafts custom-length linear suspensions, wall arrays, and bespoke cord lengths for residential & commercial commissions.
          </p>
        </div>

        <Link
          href="/contact"
          className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-orange-600/30 flex items-center gap-2"
        >
          <span>Consult With Master Architect</span>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-stone-400">Loading luminaire catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
