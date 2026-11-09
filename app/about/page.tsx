import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SparklesIcon,
  ArrowRightIcon,
  MapPinIcon,
  CheckIcon,
} from "@/components/Icons";

export const metadata = {
  title: "About Us | VYQEN Luminaire Atelier",
  description:
    "The genesis and philosophy behind Vyqen Atelier. Sculpting warm orange luminescence through mouth-blown crystal, spun brass, and circadian calm.",
};

export default function AboutPage() {
  const masterArtisans = [
    {
      name: "Elena Rostova",
      role: "Principal Lighting Sculptor",
      origin: "Prague / Dhaka",
      bio: "Trained in Bohemian glassworks, Elena explores the refractions of amber and cognac optic glass under dim candle spectra.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Mathias Lindqvist",
      role: "Architectural Suspensions Director",
      origin: "Stockholm",
      bio: "Specializing in balanced cantilevered floor lamps and linear chandeliers that appear weightless in mid-air.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Noor Al-Mansoor",
      role: "Ceramic & Terracotta Master",
      origin: "Fez / London",
      bio: "Fusing ancient earthen pottery techniques with rechargeable lithium micro-circuits for cordless outdoor beacons.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/50 to-stone-950 border border-orange-500/30 p-8 sm:p-20 text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <span className="text-xs uppercase tracking-[0.3em] text-orange-400 font-semibold inline-flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span>The Atelier Genesis</span>
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-100 leading-tight">
              We Don&apos;t Just Light Spaces. <br />
              <span className="italic font-normal bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                We Create Evening Peace.
              </span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Vyqen was founded to counteract the harsh, cold glare of modern digital life. We sculpt architectural luminaires that bathe spaces in the ancient, soothing warmth of sunset amber and glowing terracotta.
            </p>
          </div>

          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 2. PHILOSOPHY: THE ART OF WARM LUMINESCENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-900 border border-orange-500/20 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier Molten Glass"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-orange-500/30 text-xs">
              <span className="text-orange-400 block font-semibold mb-0.5">Atelier Note #04</span>
              <p className="text-stone-300">
                Molten silica at 1,400°C hand-gathered on the blowpipe, infused with iron and sulfur oxides for deep amber clarity.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              The Orange Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 leading-snug">
              Why We Chose Warm Amber & Terracotta
            </h2>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              For hundreds of thousands of years, the human mind transitioned from the active daylight hunt to restorative rest around the amber glow of evening embers. Cold blue-white 5000K lights trick our neurology into endless stress.
            </p>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              Every Vyqen lamp is tuned between 2200K (Candlelight) and 2700K (Sunset Warmth). It gently relaxes the ocular nerves, lowers heart rate variability, and casts flattering, poetic shadows across interior architectures.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-orange-500/20">
                <span className="font-serif text-2xl font-light text-amber-300">2200K</span>
                <p className="text-xs text-stone-400 mt-1">
                  Candlelight warmth for deep bedtime relaxation
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-orange-500/20">
                <span className="font-serif text-2xl font-light text-amber-300">95+ CRI</span>
                <p className="text-xs text-stone-400 mt-1">
                  Color rendering index that honors natural wood & marble
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR STAGES OF ATELIER CRAFT */}
      <section className="bg-stone-900/60 border-y border-orange-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
              Artisan Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
              From Raw Ore to Living Luminaire
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Mouth-Blown Shaping",
                desc: "Liquid optical glass is gathered and blown by breath into custom carved graphite and fruitwood molds.",
              },
              {
                num: "02",
                title: "Lathe-Turned Brass",
                desc: "Solid brass ingots are spun on high-precision lathes and brushed with microscopic abrasive wool for velvet luster.",
              },
              {
                num: "03",
                title: "Earthen Terracotta",
                desc: "Mineral-rich clay is thrown on wheels and low-fired in kilns, leaving an organic sand texture that warms the hand.",
              },
              {
                num: "04",
                title: "Circadian LED Calibration",
                desc: "Every proprietary LED engine is spectrally mapped to guarantee zero perceptible stroboscopic flicker.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-stone-950/80 p-8 rounded-3xl border border-orange-500/20 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-3xl font-light text-orange-400/80">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-lg text-stone-100 font-normal mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-1.5 text-[11px] text-orange-400">
                  <CheckIcon className="w-3.5 h-3.5" /> Hand-inspected standard
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MASTER ARTISANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-semibold">
            Human Creators
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-2">
            The Hands Behind The Light
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {masterArtisans.map((art) => (
            <div
              key={art.name}
              className="bg-stone-950/80 rounded-3xl overflow-hidden border border-orange-500/20 shadow-xl group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-900">
                <Image
                  src={art.image}
                  alt={art.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">
                    {art.origin}
                  </span>
                  <h3 className="font-serif text-xl text-stone-100">{art.name}</h3>
                  <p className="text-xs text-stone-400">{art.role}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-stone-300 leading-relaxed font-light">{art.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ATELIER NUMBERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-950 via-stone-900 to-orange-950 rounded-3xl border border-orange-500/30 p-8 sm:p-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-light text-amber-300">
                4,800+
              </div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mt-2">
                Residences Lit
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-light text-amber-300">
                14
              </div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mt-2">
                Design Awards
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-light text-amber-300">
                100%
              </div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mt-2">
                Plastic-Free Packaging
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-light text-amber-300">
                5-Year
              </div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mt-2">
                Atelier Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SHOWROOM INVITATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              city: "Dhaka Atelier & Gallery",
              address: "Road 11, Banani / Gulshan 2, Dhaka",
              hours: "Mon – Sat: 11:00 AM – 8:00 PM",
              phone: "+880 1700-VYQEN",
            },
            {
              city: "Paris Studio",
              address: "Rue du Faubourg Saint-Honoré, 75008 Paris",
              hours: "Tue – Sat: 10:00 AM – 7:00 PM",
              phone: "+33 1 42 68 00 00",
            },
            {
              city: "New York Showroom",
              address: "Crosby Street, SoHo, NY 10012",
              hours: "Mon – Fri: 10:00 AM – 6:00 PM",
              phone: "+1 212 555 0192",
            },
          ].map((loc) => (
            <div
              key={loc.city}
              className="bg-stone-900/60 p-8 rounded-3xl border border-orange-500/20 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-orange-400 font-semibold">
                <MapPinIcon className="w-4 h-4" />
                <span>{loc.city}</span>
              </div>
              <p className="text-sm text-stone-200">{loc.address}</p>
              <div className="text-xs text-stone-400 space-y-1 pt-2">
                <div>Hours: {loc.hours}</div>
                <div>Direct: {loc.phone}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-widest shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
          >
            <span>Schedule Private Showroom Walkthrough</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
