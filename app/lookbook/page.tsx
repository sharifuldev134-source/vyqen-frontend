"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  SparklesIcon,
  ShoppingBagIcon,
  EyeIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "@/components/Icons";

interface EditorialLook {
  id: string;
  title: string;
  category: "Penthouse Salon" | "Dining Atrium" | "Master Sanctuary" | "Private Villa";
  location: string;
  photographer: string;
  image: string;
  description: string;
  hotspots: {
    x: number; // percentage
    y: number; // percentage
    productId: string;
  }[];
}

export default function LookbookPage() {
  const { addToCart, setQuickViewProduct, formatPrice } = useCart();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeHotspot, setActiveHotspot] = useState<{ lookId: string; productId: string } | null>({
    lookId: "penthouse-01",
    productId: "solis-amber-table-lamp",
  });

  const looks: EditorialLook[] = [
    {
      id: "penthouse-01",
      title: "The Sunset Salon at Horizon Tower",
      category: "Penthouse Salon",
      location: "Gulshan 2, Dhaka",
      photographer: "Rashid Chowdhury",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      description:
        "High-ceiling travertine walls paired with double Solis Amber table lamps and an Aurora Chandelier to create intimate conversation zones within an expansive floorplate.",
      hotspots: [
        { x: 30, y: 60, productId: "solis-amber-table-lamp" },
        { x: 52, y: 24, productId: "aurora-pendant-orb" },
        { x: 80, y: 64, productId: "terra-cordless-lantern" },
      ],
    },
    {
      id: "dining-02",
      title: "The Monolithic Walnut Dining Pavilion",
      category: "Dining Atrium",
      location: "Saint-Germain, Paris",
      photographer: "Hélène Moreau",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
      description:
        "A 4-meter solid walnut table anchored by the Helios Architectural Linear Chandelier, diffusing shadowless sunset light across dinnerware.",
      hotspots: [
        { x: 50, y: 35, productId: "helios-linear-chandelier" },
        { x: 82, y: 70, productId: "dune-ceramic-monolith" },
      ],
    },
    {
      id: "sanctuary-03",
      title: "The Twilight Bedroom Suite",
      category: "Master Sanctuary",
      location: "Tribeca, New York",
      photographer: "Marcus Vance",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
      description:
        "Designed strictly around 2200K circadian candlelight principles. Vesper Sunset Wall Sconces cast indirect solar halos behind the custom linen headboard.",
      hotspots: [
        { x: 25, y: 48, productId: "vesper-brass-wall-sconce" },
        { x: 70, y: 65, productId: "nimbus-mushroom-accent" },
      ],
    },
    {
      id: "villa-04",
      title: "The Earthen Courtyard Residence",
      category: "Private Villa",
      location: "Kyoto / Mallorca",
      photographer: "Kenji Sato",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      description:
        "Blending raw terracotta stoneware lamps with cantilevered floor arcs to create tranquil reading spaces overlooking stone gardens.",
      hotspots: [
        { x: 42, y: 55, productId: "arcadia-minimal-floor-lamp" },
        { x: 74, y: 68, productId: "terra-cordless-lantern" },
      ],
    },
  ];

  const filteredLooks = looks.filter((look) => {
    if (activeFilter === "All") return true;
    return look.category === activeFilter;
  });

  const getProduct = (productId: string): Product | undefined => {
    return PRODUCTS.find((p) => p.id === productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 border border-orange-500/30 p-8 sm:p-14 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-widest font-medium">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Architectural Portfolio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-tight">
            The Living Lookbook
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Tour bespoke private residences, penthouses, and atriums sculpted by Vyqen luminaires. Tap the glowing orange markers to discover each fixture.
          </p>
        </div>

        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {["All", "Penthouse Salon", "Dining Atrium", "Master Sanctuary", "Private Villa"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === tab
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                : "bg-stone-900/80 hover:bg-stone-850 text-stone-300 border border-stone-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Editorial Looks Grid */}
      <div className="space-y-16">
        {filteredLooks.map((look) => (
          <div
            key={look.id}
            className="bg-stone-900/60 rounded-3xl border border-orange-500/20 overflow-hidden shadow-2xl backdrop-blur-md"
          >
            {/* Visual Canvas with Interactive Pins */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-950">
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

              {/* Hotspot Markers */}
              {look.hotspots.map((spot) => {
                const product = getProduct(spot.productId);
                if (!product) return null;
                const isActive =
                  activeHotspot?.lookId === look.id && activeHotspot?.productId === spot.productId;

                return (
                  <div
                    key={spot.productId}
                    className="absolute z-20"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <button
                      onClick={() =>
                        setActiveHotspot(
                          isActive ? null : { lookId: look.id, productId: spot.productId }
                        )
                      }
                      className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
                      aria-label={`View ${product.name}`}
                    >
                      <span className="absolute w-8 h-8 rounded-full bg-orange-500/40 animate-ping pointer-events-none" />
                      <span className="relative w-7 h-7 rounded-full bg-orange-600 hover:bg-orange-500 border-2 border-white shadow-xl shadow-orange-950/60 flex items-center justify-center text-white text-[11px] font-bold transition-transform group-hover:scale-115">
                        +
                      </span>
                    </button>

                    {/* Popover Pill */}
                    {isActive && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-30 w-64 sm:w-72 bg-stone-950/95 backdrop-blur-xl border border-orange-500/40 rounded-2xl p-4 shadow-2xl animate-fade-in text-left">
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
                            <span className="font-serif text-sm font-semibold text-amber-300 block mt-1">
                              {formatPrice(product.price)}
                            </span>
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
                            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                            title="Quick View"
                          >
                            <EyeIcon className="w-4 h-4 text-orange-400" />
                          </button>
                          <Link
                            href={`/products/${product.id}`}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                            title="Full Specifications"
                          >
                            <ArrowRightIcon className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Location Tag */}
              <div className="absolute top-4 left-4 bg-stone-950/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-500/30 text-xs text-orange-200 flex items-center gap-2">
                <MapPinIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>{look.location}</span>
              </div>
            </div>

            {/* Look Details Footer */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-orange-400 font-medium">
                  {look.category} &bull; Photo by {look.photographer}
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-100">{look.title}</h3>
                <p className="text-xs text-stone-400 max-w-2xl leading-relaxed pt-1">
                  {look.description}
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-orange-300 border border-orange-500/30 text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Commission Similar Layout</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

