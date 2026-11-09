"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  TruckIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/Icons";

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("VYQ-82914");
  const [searched, setSearched] = useState(true);

  // Simulated Order Details
  const orderData = {
    orderId: "VYQ-82914",
    clientName: "Rifat Miah",
    destination: "Gulshan Avenue, Road 45, Dhaka, Bangladesh",
    placedAt: "Nov 09, 2026",
    estimatedDelivery: "Nov 13, 2026",
    status: "in-transit", // 'confirmed' | 'inspecting' | 'in-transit' | 'delivered'
    courier: "White-Glove Insured Courier #WG-9924-BD",
    items: [
      {
        name: "Solis Amber Luminaire",
        qty: 1,
        temp: "2700K Warm Sunset",
        price: 340,
      },
      {
        name: "Vesper Sunset Sconce",
        qty: 2,
        temp: "2400K Sunset Gold",
        price: 240,
      },
    ],
  };

  const steps = [
    {
      id: "confirmed",
      title: "Commission Confirmed",
      desc: "Order reviewed & atelier serial allocated",
      date: "Nov 09, 10:15 AM",
      completed: true,
    },
    {
      id: "inspecting",
      title: "Artisan Inspection",
      desc: "Crystal glass optical check & dimmer testing",
      date: "Nov 09, 02:45 PM",
      completed: true,
    },
    {
      id: "in-transit",
      title: "White-Glove Transit",
      desc: "Packed in custom foam & handed to climate courier",
      date: "Nov 10, 09:30 AM",
      completed: true,
      current: true,
    },
    {
      id: "delivered",
      title: "White-Glove Delivery",
      desc: "Direct delivery & unboxing placement",
      date: "Est. Nov 13, 2026",
      completed: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 border border-orange-500/30 p-8 sm:p-14 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-widest font-medium">
            <TruckIcon className="w-3.5 h-3.5 text-orange-400" />
            <span>White-Glove Delivery Concierge</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-tight">
            Track Your Luminaire Commission
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Follow the hand-inspection, custom packaging, and padded transit of your bespoke lighting pieces.
          </p>
        </div>

        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(true);
          }}
          className="flex items-center gap-2 bg-stone-900/90 border border-orange-500/30 p-2 rounded-2xl shadow-xl"
        >
          <div className="relative flex-1">
            <SearchIcon className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Enter Order ID (e.g. VYQ-82914)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full bg-transparent pl-10 pr-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-orange-600/30"
          >
            Track
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-stone-400">
          <span>Try demo references:</span>
          {["VYQ-82914", "VYQ-54120"].map((ref) => (
            <button
              key={ref}
              type="button"
              onClick={() => {
                setOrderQuery(ref);
                setSearched(true);
              }}
              className="text-orange-400 hover:underline font-mono"
            >
              {ref}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {searched && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Card */}
          <div className="bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-orange-500/25 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                Commission Order #{orderQuery}
              </span>
              <h3 className="font-serif text-2xl font-light text-stone-100 mt-1">
                En Route to {orderData.destination.split(",")[0]}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Estimated Arrival:{" "}
                <strong className="text-amber-300 font-medium">
                  {orderData.estimatedDelivery}
                </strong>
              </p>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In Padded Transit</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-stone-900/60 rounded-3xl p-6 sm:p-10 border border-orange-500/25 backdrop-blur-md">
            <h4 className="font-serif text-lg font-light text-stone-100 mb-8">
              Transit Progression
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((step, idx) => (
                <div key={step.id} className="relative flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all ${
                        step.completed
                          ? "bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/40"
                          : "bg-stone-950 border border-stone-800 text-stone-500"
                      }`}
                    >
                      {step.completed ? <CheckIcon className="w-4 h-4" /> : idx + 1}
                    </span>
                    <span className="font-serif text-sm text-stone-100 font-medium">
                      {step.title}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed pl-11">{step.desc}</p>
                  <span className="text-[11px] text-orange-400/90 font-mono pl-11">{step.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Items & Courier Meta */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Items Summary (7 Cols) */}
            <div className="md:col-span-7 bg-stone-900/60 rounded-3xl p-6 border border-stone-800 space-y-4">
              <h5 className="font-serif text-sm font-medium text-stone-100 uppercase tracking-wider">
                Commissioned Luminaires
              </h5>

              <div className="divide-y divide-stone-800/80 text-xs">
                {orderData.items.map((item, i) => (
                  <div key={i} className="py-3 first:pt-0 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-100">{item.name}</div>
                      <div className="text-[11px] text-orange-400">{item.temp} &bull; Qty: {item.qty}</div>
                    </div>
                    <span className="font-serif text-sm text-amber-200">
                      ${item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier & Concierge Help (5 Cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-orange-950/40 to-stone-950 rounded-3xl p-6 border border-orange-500/25 space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold block">
                  Carrier Details
                </span>
                <p className="text-stone-200 font-medium mt-1">{orderData.courier}</p>
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-2 text-stone-400">
                <span className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold block">
                  Delivery Inquiries?
                </span>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-3.5 h-3.5 text-orange-400" />
                  <span>+880 1700-VYQEN</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-3.5 h-3.5 text-orange-400" />
                  <span>concierge@vyqen-lighting.com</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1"
                >
                  <span>Reschedule or update address &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
