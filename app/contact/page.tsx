"use client";

import React, { useState } from "react";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SparklesIcon,
  CheckIcon,
  ShieldCheckIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { useCart } from "@/context/CartContext";

export default function ContactPage() {
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) return;

    setSubmitted(true);
    showToast("Message received. Our team will contact you shortly.");
  };

  const faqs = [
    {
      q: "Are Vyqen luminaires compatible with universal voltages (110V and 220V - 240V)?",
      a: "Yes. All our integrated LED drivers and transformers operate flawlessly across standard 100V–240V international grids. We automatically ship appropriate power cords and regional canopy mounts based on your delivery country.",
    },
    {
      q: "Can I commission bespoke drop lengths for double-height atriums or stairwells?",
      a: "Absolutely. Our standard pendants include 2.5 meters of braided textile cord. For architectural installations requiring 5m to 12m drops, select 'Custom Architectural Project' in the inquiry form and our engineering team will tailor your suspension cables.",
    },
    {
      q: "What is your coverage if a mouth-blown glass shade is damaged during shipping?",
      a: "Every shipment is 100% insured with white-glove courier handling. In the rare event of transit damage, notify us within 48 hours and we immediately dispatch a hand-inspected replacement shade at zero charge.",
    },
    {
      q: "Are the LEDs dimmable with standard wall switches or smart home systems (Lutron, Caseta, DALI)?",
      a: "Yes. Our luminaires are engineered with zero-flicker architectural drivers compatible with standard TRIAC, ELV, and 0-10V dimmers, as well as leading Lutron, Control4, and Crestron smart lighting processors.",
    },
    {
      q: "Do you offer trade discounts for interior designers and architects?",
      a: "We offer dedicated trade pricing, expedited atelier queueing, and 3D Revit/CAD models for accredited design professionals. Please submit your business credentials via the form above.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. HEADER HERO */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-orange-950/40 to-stone-950 border border-orange-500/30 p-8 sm:p-16 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-widest font-medium">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Private Concierge & Trade Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-tight leading-tight">
            Your Space,{" "}
            <span className="italic font-normal bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Your Story.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Whether inquiring about an existing luminaire, commissioning a custom architectural chandelier, or booking an atelier walkthrough, our lighting architects are at your service.
          </p>
        </div>

        {/* Ambient Halo */}
        <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. CONTACT GRID: FORM & DIRECT DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-stone-900/60 rounded-3xl p-6 sm:p-10 border border-orange-500/20 backdrop-blur-md">
          {submitted ? (
            <div className="py-16 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-600/40">
                <CheckIcon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-stone-100">
                Message Received, {formData.name}
              </h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                Thank you for contacting us. We have received your message and will get back to you at <strong className="text-orange-400">{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    description: "",
                  });
                }}
                className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                  Send A Message
                </span>
                <h3 className="font-serif text-2xl text-stone-100 font-light mt-1">
                  Get In Touch
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-stone-300 block mb-1.5 font-medium">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rifat Miah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 block mb-1.5 font-medium">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-300 block mb-1.5 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880 1700-000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1.5 font-medium">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message, inquiries, or requirements here..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-stone-950/80 border border-stone-800 rounded-xl p-3.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>Strict privacy guaranteed. We never share client interior data.</span>
              </div>
            </form>
          )}
        </div>

        {/* Right: Direct Concierge & Showrooms (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-orange-500/20 backdrop-blur-md space-y-5">
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
              Direct Contact
            </span>
            <h3 className="font-serif text-2xl text-stone-100 font-light">
              Atelier Concierge
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-400 block">Phone & WhatsApp</span>
                  <a
                    href="tel:+880170089736"
                    className="text-stone-100 font-medium hover:text-orange-400 transition-colors"
                  >
                    +880 1700-VYQEN (89736)
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Mon–Sat, 10:00 AM – 8:00 PM BST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-400 block">Electronic Mail</span>
                  <a
                    href="mailto:concierge@vyqen-lighting.com"
                    className="text-stone-100 font-medium hover:text-orange-400 transition-colors"
                  >
                    concierge@vyqen-lighting.com
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Average response time: 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-400 block">Flagship Atelier</span>
                  <p className="text-stone-200">
                    Road 11, Banani / Gulshan 2
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Benefits Card */}
          <div className="bg-gradient-to-br from-orange-950/70 via-stone-900 to-stone-950 rounded-3xl p-6 sm:p-8 border border-orange-500/30 space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5 text-orange-400" />
              Trade Program For Architects
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              Are you an architect or interior design firm? Join our trade network for exclusive tier pricing, customized canopy fabrications, photometrics IES files, and finish samples.
            </p>
            <div className="pt-2">
              <a
                href="mailto:trade@vyqen-lighting.com?subject=Trade%20Program%20Application"
                className="text-xs text-orange-400 hover:text-orange-300 font-medium underline underline-offset-4 decoration-orange-500/40 inline-flex items-center gap-1"
              >
                <span>Apply for Trade Credentials &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <div className="space-y-8 pt-8 border-t border-orange-500/20">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl font-light text-stone-100 mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-stone-900/60 rounded-2xl border border-stone-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-sm font-medium text-stone-100">
                    {faq.q}
                  </span>
                  <span className="p-1 rounded-lg bg-stone-800 text-orange-400 shrink-0">
                    {isOpen ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

