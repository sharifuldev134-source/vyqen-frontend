"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { HotspotLookbook } from "@/components/HotspotLookbook";
import { PullCordLamp } from "@/components/PullCordLamp";
import {
  LampIcon,
  SparklesIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

export default function HomePage() {
  // Interactive 3D Pull-Cord Lamp Light State
  const [isHeroLightOn, setIsHeroLightOn] = useState(true);

  // Filter tabs for Featured section
  const [activeTab, setActiveTab] = useState<string>("All");

  // Room Visualizer State
  const [activeRoom, setActiveRoom] = useState<"living" | "dining" | "bedside" | "lounge">("living");

  const roomData = {
    living: {
      title: "The Grand Living Salon",
      desc: "Cast low-profile, indirect warm amber light across custom upholstery and textured walls without ceiling glare.",
      recommendedLamp: "Arcadia Minimal Floor Arc & Solis Table Lamp",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    },
    dining: {
      title: "Intimate Dining Atrium",
      desc: "Float a luminous sunset canopy directly above your dinner table to encourage unhurried conversation.",
      recommendedLamp: "Aurora Chandelier Orb & Helios Linear System",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    },
    bedside: {
      title: "Twilight Bedside Sanctuary",
      desc: "Circadian 2200K candle warmth that signals your body to unwind and quiet the evening mind.",
      recommendedLamp: "Vesper Sunset Sconce & Nimbus Mushroom Lamp",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    },
    lounge: {
      title: "Private Library & Lounge",
      desc: "Sculptural cordless ceramics and focused warm beams designed for reading without eye fatigue.",
      recommendedLamp: "Terra Cordless Beacon & Dune Monolith",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    },
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "All") return true;
    if (activeTab === "Best Sellers") return p.badge === "Best Seller";
    if (activeTab === "Pendants") return p.category === "Pendant Light";
    if (activeTab === "Table Lamps") return p.category === "Table Lamp";
    return true;
  });

  return (
    <div className="space-y-28 pb-24">
      {/* 1. HERO SECTION WITH 3D PULL-CORD LAMP */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-orange-500/20">
        {/* Dynamic ambient halo reacting to 3D lamp */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: isHeroLightOn
              ? "radial-gradient(circle at 65% 45%, rgba(255, 106, 26, 0.4) 0%, rgba(20, 10, 4, 0.4) 60%, #140a04 100%)"
              : "radial-gradient(circle at 65% 45%, rgba(20, 10, 4, 0.2) 0%, #0c0704 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-[0.25em] font-medium shadow-lg shadow-orange-950/50">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>2026 Atelier Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-stone-100 tracking-tight leading-[1.08]">
              Sculpting Light, <br />
              <span className="italic font-normal bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Defining Atmosphere.
              </span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
              Bespoke mouth-blown amber crystal and hand-spun solid brass luminaires. Crafted in limited atelier editions to infuse contemporary spaces with serene warmth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-sm tracking-widest uppercase shadow-xl shadow-orange-600/35 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Luminaires</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-stone-900/80 hover:bg-stone-850 text-stone-200 border border-orange-500/30 font-medium text-sm tracking-wider uppercase transition-colors text-center cursor-pointer"
              >
                Atelier Craft Story
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-orange-500/20 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-light text-amber-300">
                  95+
                </div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">
                  Natural CRI
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-light text-amber-300">
                  100%
                </div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">
                  Hand-Spun Brass
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-light text-amber-300">
                  5-Yr
                </div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">
                  Atelier Warranty
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive 3D Luminaire */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <PullCordLamp onLightChange={(isOn) => setIsHeroLightOn(isOn)} />
          </div>
        </div>
      </section>

      {/* 2. CURATED CATEGORY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Curated Typologies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
              Forms of Luminescence
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-widest text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1.5 mt-3 md:mt-0"
          >
            <span>View Full Catalog</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Table Lamps",
              count: "4 Designs",
              img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
              link: "/products?category=Table+Lamp",
            },
            {
              title: "Pendant Chandeliers",
              count: "3 Designs",
              img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80",
              link: "/products?category=Pendant+Light",
            },
            {
              title: "Sculptural Floor Arcs",
              count: "2 Designs",
              img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80",
              link: "/products?category=Floor+Lamp",
            },
            {
              title: "Wall Sconces & Art",
              count: "3 Designs",
              img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=600&q=80",
              link: "/products?category=Wall+Sconce",
            },
          ].map((cat) => (
            <Link
              key={cat.title}
              href={cat.link}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-900 border border-orange-500/20 shadow-xl transition-all hover:border-orange-500/60 hover:shadow-orange-950/40"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-6 inset-x-6">
                <span className="text-[11px] uppercase tracking-wider text-orange-400 font-medium">
                  {cat.count}
                </span>
                <h3 className="font-serif text-xl font-normal text-stone-100 mt-1 group-hover:text-amber-200 transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED MASTERPIECES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Atelier Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
              Featured Lighting Masterpieces
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["All", "Best Sellers", "Table Lamps", "Pendants"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                    : "bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE ROOM MOOD VISUALIZER */}
      <section className="bg-stone-900/60 border-y border-orange-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Atmospheric Living
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
              Your Space, Your Story
            </h2>
            <p className="text-sm text-stone-300 mt-3 font-light">
              Every room carries an emotion. Explore how warm amber luminescence shapes your sanctuary and tells your personal design story.
            </p>
          </div>

          {/* Room Selector Pills */}
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap mb-10">
            {[
              { id: "living", label: "Living Salon" },
              { id: "dining", label: "Dining Atrium" },
              { id: "bedside", label: "Bedside Sanctuary" },
              { id: "lounge", label: "Private Lounge" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRoom(r.id as "living" | "dining" | "bedside" | "lounge")}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                  activeRoom === r.id
                    ? "bg-orange-600 text-white border border-orange-500 shadow-lg shadow-orange-600/30"
                    : "bg-stone-950/60 hover:bg-stone-850 text-stone-300 border border-stone-800"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Visual Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-950/80 rounded-3xl p-6 sm:p-10 border border-orange-500/25 shadow-2xl">
            <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-stone-800">
              <Image
                src={roomData[activeRoom].image}
                alt={roomData[activeRoom].title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
              <div className="absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                Atmosphere Blueprint
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-light">
                {roomData[activeRoom].title}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {roomData[activeRoom].desc}
              </p>

              <div className="p-4 rounded-2xl bg-stone-900/80 border border-orange-500/20 text-xs">
                <span className="text-stone-400 block mb-1">Recommended Configuration:</span>
                <strong className="text-amber-300 font-medium">
                  {roomData[activeRoom].recommendedLamp}
                </strong>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-orange-400 hover:text-orange-300 font-medium"
                >
                  <span>Request Architectural Lighting Layout</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP & MATERIALITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Artisanal Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-100 leading-tight">
              Materials That Age <br />
              <span className="italic font-normal bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                With Dignity & Grace.
              </span>
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              We reject fleeting plastic fixtures. Every Vyqen luminaire is created from raw elements that respond to touch, develop rich patinas, and diffuse a healthy circadian spectrum.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <LampIcon className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-serif text-base text-stone-100">Italian Mouth-Blown Glass</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Free-blown by master artisans. Subtle organic ribs and micro-air bubbles refract evening light like twilight water.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <SparklesIcon className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-serif text-base text-stone-100">Solid Spun & Brushed Brass</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Machined from solid brass billets with protective micro-lacquer that ensures warmth without unsightly oxidation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <ShieldCheckIcon className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-serif text-base text-stone-100">Flicker-Free Warm LEDs</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Proprietary custom phosphor arrays tuned to 2200K - 2700K sunset tones with zero perceptible strobe effect.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 border border-orange-500/40 text-orange-300 hover:text-white hover:bg-orange-600 font-medium text-xs tracking-wider uppercase transition-all"
              >
                <span>Read Full Atelier Dossier</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Imagery Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-900 border border-orange-500/20 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
                alt="Glass Crafting"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-900 border border-orange-500/20 shadow-xl mt-8">
              <Image
                src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
                alt="Spun Brass Metalwork"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL HOTSPOT LOOKBOOK */}
      <HotspotLookbook />

      {/* 7. COLLECTOR REVIEWS & ACCLAIM */}
      <section className="bg-stone-900/40 border-y border-orange-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Collector Acclaim
            </span>
            <h2 className="font-serif text-3xl font-light text-stone-100 mt-2">
              Words From Private Interiors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The Solis Table Lamp is mesmerizing at dusk. Its warm amber glow transforms our penthouse living room into an oasis of calm after hectic corporate days.",
                author: "Sarah H.",
                location: "Gulshan 2, Dhaka",
                lamp: "Solis Amber Luminaire",
              },
              {
                quote:
                  "As an architect, lighting specification is everything. Vyqen’s brass work and zero-flicker dimming outshine European brands at double the commission.",
                author: "Tariq K., Architect",
                location: "London & Manhattan",
                lamp: "Helios Chandelier",
              },
              {
                quote:
                  "The tactile terracotta feel of the Terra beacon is extraordinary. We carry it between our dining room and our outdoor terrace every evening.",
                author: "Camille Laurent",
                location: "Paris, France",
                lamp: "Terra Cordless Lantern",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-stone-950/70 p-8 rounded-3xl border border-orange-500/20 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-800 mt-6">
                  <h4 className="font-serif text-sm font-medium text-stone-100">
                    {t.author}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mt-1">
                    <span>{t.location}</span>
                    <span className="text-orange-400">{t.lamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VIP INNER CIRCLE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-950 via-stone-900 to-amber-950 border border-orange-500/40 p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Private Commission Program
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
              Designing a Luxury Residence or Boutique Hotel?
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              Connect with our master lighting architect for custom dimensioning, bespoke patinas, and trade-tier pricing for complete architectural commissions.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/30 text-center"
              >
                Book Design Consultation
              </Link>
              <Link
                href="/products"
                className="px-8 py-3.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium text-xs uppercase tracking-widest transition-colors text-center"
              >
                Browse All 2026 Pieces
              </Link>
            </div>
          </div>

          {/* Decorative Background Lamp Icon */}
          <div className="absolute right-6 -bottom-10 opacity-10 text-orange-400 pointer-events-none hidden md:block">
            <LampIcon className="w-80 h-80" />
          </div>
        </div>
      </section>
    </div>
  );
}
