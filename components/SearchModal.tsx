"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { SearchIcon, XIcon, ArrowRightIcon } from "./Icons";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative mx-auto max-w-2xl bg-stone-900 border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        {/* Search Input bar */}
        <div className="flex items-center px-5 py-4 border-b border-stone-800 bg-stone-950/40">
          <SearchIcon className="w-5 h-5 text-orange-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search lamps, chandeliers, brass, terracotta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-stone-400 hover:text-stone-200 text-xs px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 ml-2"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 bg-stone-900/60 border-b border-stone-800/80 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-stone-400">Popular:</span>
          {["Amber Table Lamp", "Pendant", "Terracotta", "Floor Arc", "Wall Sconce"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-orange-950/60 text-orange-300 border border-stone-700/60 hover:border-orange-500/40 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-stone-800/60">
          {query.trim() === "" ? (
            <div className="py-10 text-center text-stone-400 text-sm">
              Type keywords above to find lamps, lighting fixtures, and architectural accessories.
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-sm">
              No luminaires found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={() => setIsSearchOpen(false)}
                className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-stone-800/60 transition-colors group"
              >
                <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="60px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-orange-400 font-medium">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] bg-orange-600/30 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-sm font-medium text-stone-100 group-hover:text-orange-300 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-1">{product.tagline}</p>
                </div>
                <div className="text-right shrink-0 flex items-center gap-3">
                  <span className="font-semibold text-sm text-amber-300">${product.price}</span>
                  <ArrowRightIcon className="w-4 h-4 text-stone-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

