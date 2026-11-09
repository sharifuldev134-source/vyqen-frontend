"use client";

import React, { useState } from "react";
import { useCart, Currency, Ambiance } from "@/context/CartContext";
import { SunIcon, SparklesIcon, XIcon, CheckIcon } from "./Icons";

export function AtmosphereTuner() {
  const { currency, setCurrency, ambiance, setAmbiance } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const ambiances: { id: Ambiance; label: string; kelvin: string; desc: string }[] = [
    {
      id: "candle",
      label: "Candlelight Twilight",
      kelvin: "2200K",
      desc: "Deep terracotta dusk & resting calm",
    },
    {
      id: "sunset",
      label: "Sunset Amber (Atelier Default)",
      kelvin: "2700K",
      desc: "Balanced warm orange & golden glow",
    },
    {
      id: "golden",
      label: "Golden Horizon",
      kelvin: "3200K",
      desc: "Warm daylight apricot luster",
    },
  ];

  const currencies: { code: Currency; symbol: string; label: string }[] = [
    { code: "USD", symbol: "$", label: "USD ($)" },
    { code: "BDT", symbol: "৳", label: "BDT (৳ BDT)" },
    { code: "EUR", symbol: "€", label: "EUR (€)" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      {/* Floating Trigger Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-stone-950/80 backdrop-blur-xl border border-orange-500/30 text-stone-200 hover:text-white shadow-xl shadow-stone-950/60 hover:border-orange-500/60 transition-all cursor-pointer group"
          title="Adjust atmosphere & currency"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
          </span>
          <span className="text-[11px] font-medium tracking-wide">
            {ambiance === "candle" ? "2200K Candle" : ambiance === "sunset" ? "2700K Sunset" : "3200K Golden"} &bull; {currency}
          </span>
          <SunIcon className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-45 transition-transform" />
        </button>
      ) : (
        /* Expanded Glassmorphic Dial */
        <div className="w-80 bg-stone-950/95 backdrop-blur-2xl border border-orange-500/40 rounded-3xl p-5 shadow-2xl text-stone-100 space-y-4 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                <SparklesIcon className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-serif text-sm font-medium text-stone-100">
                  Atelier Atmosphere Dial
                </h4>
                <p className="text-[10px] text-orange-300/80">Customize warmth & pricing currency</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Ambiance Mood Selection */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-orange-400 font-semibold block mb-2">
              Website Lighting Ambiance
            </label>
            <div className="space-y-1.5">
              {ambiances.map((item) => {
                const isSelected = ambiance === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAmbiance(item.id)}
                    className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-orange-600/25 border-orange-500 text-stone-100 shadow-md shadow-orange-950/40"
                        : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium text-stone-200 flex items-center gap-2">
                        <span>{item.label}</span>
                        <span className="text-[10px] font-mono text-amber-300 bg-stone-950 px-1.5 py-0.5 rounded">
                          {item.kelvin}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{item.desc}</div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Currency Selector */}
          <div className="pt-2 border-t border-stone-800/80">
            <label className="text-[11px] uppercase tracking-wider text-orange-400 font-semibold block mb-2">
              Currency
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {currencies.map((curr) => {
                const isSelected = currency === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                      isSelected
                        ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/30"
                        : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {curr.code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

