"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  SlidersIcon,
  SparklesIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export default function CalculatorPage() {
  const { addToCart, formatPrice } = useCart();

  // Inputs
  const [roomType, setRoomType] = useState<"living" | "dining" | "bedroom" | "office">("living");
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [width, setWidth] = useState<number>(16);
  const [length, setLength] = useState<number>(20);
  const [ceilingHeight, setCeilingHeight] = useState<"standard" | "high" | "atrium">("high");
  const [ambiance, setAmbiance] = useState<"candle" | "sunset" | "studio">("sunset");

  // Calculations
  const areaSqFt = unit === "ft" ? width * length : width * length * 10.764;

  // Base lumens per sq ft based on room type
  const baseLumensPerSqFt = {
    living: 15,
    dining: 20,
    bedroom: 12,
    office: 25,
  }[roomType];

  // Ceiling multiplier
  const ceilingMultiplier = {
    standard: 1.0,
    high: 1.25,
    atrium: 1.6,
  }[ceilingHeight];

  // Total required lumens
  const totalLumens = Math.round(areaSqFt * baseLumensPerSqFt * ceilingMultiplier);

  // Suggested layers
  const ambientShare = Math.round(totalLumens * 0.55);
  const taskShare = Math.round(totalLumens * 0.3);
  const accentShare = Math.round(totalLumens * 0.15);

  // Recommended lamps for this configuration
  const recommendedIds = {
    living: ["arcadia-minimal-floor-lamp", "solis-amber-table-lamp", "vesper-brass-wall-sconce"],
    dining: ["aurora-pendant-orb", "helios-linear-chandelier", "solis-amber-table-lamp"],
    bedroom: ["solis-amber-table-lamp", "nimbus-mushroom-accent", "vesper-brass-wall-sconce"],
    office: ["solis-amber-table-lamp", "arcadia-minimal-floor-lamp", "dune-ceramic-monolith"],
  }[roomType];

  const recommendedProducts = PRODUCTS.filter((p) => recommendedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 border border-orange-500/30 p-8 sm:p-14 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-widest font-medium">
            <SlidersIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Architectural Lighting Science</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
            Spatial Lumens & Ambiance Calculator
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Calculate precise luminous flux, ideal Kelvin spectrums, and balanced light layers tailored to your room dimensions.
          </p>
        </div>

        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Grid: Inputs & Live Architecture Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Input Form (6 Cols) */}
        <div className="lg:col-span-6 bg-stone-900/60 rounded-3xl p-6 sm:p-10 border border-orange-500/20 backdrop-blur-md space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
              Step 1: Room Typology
            </span>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              {[
                { id: "living", label: "Living Salon", desc: "Cozy & ambient" },
                { id: "dining", label: "Dining Atrium", desc: "Canopy warmth" },
                { id: "bedroom", label: "Bedside Sanctuary", desc: "Low circadian" },
                { id: "office", label: "Executive Studio", desc: "Focused clarity" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoomType(r.id as "living" | "dining" | "bedroom" | "office")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    roomType === r.id
                      ? "bg-orange-600/25 border-orange-500 text-orange-200"
                      : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <div className="font-medium text-stone-100">{r.label}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="uppercase tracking-widest text-orange-400 font-semibold">
                Step 2: Room Dimensions
              </span>
              <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800">
                <button
                  onClick={() => setUnit("ft")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    unit === "ft" ? "bg-orange-600 text-white" : "text-stone-400"
                  }`}
                >
                  Feet
                </button>
                <button
                  onClick={() => setUnit("m")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    unit === "m" ? "bg-orange-600 text-white" : "text-stone-400"
                  }`}
                >
                  Meters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-stone-300 block mb-1">Width ({unit}):</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-stone-300 block mb-1">Length ({unit}):</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={length}
                  onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold block mb-3">
              Step 3: Ceiling Height
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "standard", label: "Standard", sub: "8–9 ft" },
                { id: "high", label: "High Vault", sub: "10–12 ft" },
                { id: "atrium", label: "Atrium", sub: "14–20 ft" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCeilingHeight(c.id as "standard" | "high" | "atrium")}
                  className={`py-2.5 px-3 rounded-2xl border text-center transition-all ${
                    ceilingHeight === c.id
                      ? "bg-orange-600/25 border-orange-500 text-orange-200"
                      : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <div className="font-medium text-stone-100">{c.label}</div>
                  <div className="text-[10px] text-stone-400">{c.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold block mb-3">
              Step 4: Circadian Mood Tone
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "candle", label: "Candlelight", temp: "2200K" },
                { id: "sunset", label: "Sunset Amber", temp: "2700K" },
                { id: "studio", label: "Warm White", temp: "3000K" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setAmbiance(m.id as "candle" | "sunset" | "studio")}
                  className={`py-2.5 px-3 rounded-2xl border text-center transition-all ${
                    ambiance === m.id
                      ? "bg-orange-600/25 border-orange-500 text-orange-200"
                      : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <div className="font-medium text-stone-100">{m.label}</div>
                  <div className="text-[10px] text-amber-300 font-mono">{m.temp}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Architectural Output (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-br from-orange-950/70 via-stone-900 to-stone-950 rounded-3xl p-6 sm:p-10 border border-orange-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                  Architectural Lighting Blueprint
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-100 mt-1">
                  Optimal Spatial Flux
                </h3>
              </div>
              <span className="text-xs text-stone-400 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
                {Math.round(areaSqFt)} sq. ft
              </span>
            </div>

            {/* Total Lumens Hero Badge */}
            <div className="p-6 rounded-2xl bg-stone-950/70 border border-orange-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 uppercase tracking-wider block">
                  Recommended Total Output
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-amber-300 mt-1">
                  {totalLumens.toLocaleString()} <span className="text-xl text-stone-400 font-sans">lm</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 uppercase tracking-wider block">
                  Color Temperature
                </span>
                <span className="font-serif text-2xl font-light text-orange-300 mt-1 block">
                  {ambiance === "candle" ? "2200K" : ambiance === "sunset" ? "2700K" : "3000K"}
                </span>
              </div>
            </div>

            {/* 3-Layer Lighting Distribution */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold block">
                Recommended 3-Layer Distribution:
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-stone-200">Ambient Canopy (Pendants & Chandeliers)</span>
                  </div>
                  <strong className="text-amber-200 font-mono">{ambientShare} lm (55%)</strong>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-stone-200">Focused Task Lighting (Table & Reading Arcs)</span>
                  </div>
                  <strong className="text-amber-200 font-mono">{taskShare} lm (30%)</strong>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                    <span className="text-stone-200">Perimeter Accent (Wall Halos & Sconces)</span>
                  </div>
                  <strong className="text-amber-200 font-mono">{accentShare} lm (15%)</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-400 leading-relaxed border-t border-stone-800">
              <p>
                This configuration provides comfortable, glare-free circadian lighting designed to soften stress hormones while honoring architectural materials and textures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Curated Ensemble */}
      <div className="space-y-8 pt-8 border-t border-orange-500/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-amber-400" />
            <span>Curated Ensemble Recommendation</span>
          </span>
          <h2 className="font-serif text-3xl font-light text-stone-100 mt-2">
            Luminaires Matching This Specification
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-stone-900/90 rounded-3xl border border-orange-500/20 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-orange-500/50 transition-all"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="400px"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-orange-500/30 text-[10px] uppercase tracking-wider text-orange-300 font-medium">
                    {p.lumens} output
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">
                    {p.category}
                  </span>
                  <Link href={`/products/${p.id}`} className="block mt-1">
                    <h3 className="font-serif text-lg text-stone-100 hover:text-orange-300 transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="font-serif text-lg font-semibold text-amber-200">
                    {formatPrice(p.price)}
                  </span>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="py-2 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-orange-600/30 transition-all cursor-pointer"
                  >
                    <ShoppingBagIcon className="w-3.5 h-3.5" />
                    <span>Commission</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Architectural Layout Request */}
        <div className="p-8 rounded-3xl bg-stone-950/70 border border-orange-500/30 text-center max-w-2xl mx-auto space-y-4">
          <h4 className="font-serif text-xl text-stone-100">
            Need a Detailed AutoCAD or Dialux Lighting Study?
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Our lighting architects provide complimentary 3D photometrics and fixture schedules for architects and custom home commissions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-orange-300 border border-orange-500/30 text-xs uppercase tracking-wider font-medium transition-colors"
          >
            <span>Request Bespoke Photometric Schedule</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
