"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckIcon, SparklesIcon } from "./Icons";

export function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle pointer-events-none">
      <div className="flex items-center gap-3 bg-stone-900/95 backdrop-blur-md text-amber-100 border border-amber-500/30 px-5 py-3.5 rounded-2xl shadow-2xl shadow-amber-950/40">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white shrink-0">
          <CheckIcon className="w-3.5 h-3.5" />
        </span>
        <span className="text-sm font-medium tracking-wide">{toast}</span>
        <SparklesIcon className="w-4 h-4 text-orange-400 shrink-0" />
      </div>
    </div>
  );
}

