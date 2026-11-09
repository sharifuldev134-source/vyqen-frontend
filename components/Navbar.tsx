"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  LampIcon,
  SearchIcon,
  ShoppingBagIcon,
  HeartIcon,
  MenuIcon,
  XIcon,
  SparklesIcon,
} from "./Icons";

const emptySubscribe = () => () => {};

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/products" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700 text-amber-50 text-[11px] py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-orange-500/30">
        <SparklesIcon className="w-3.5 h-3.5 text-amber-200 shrink-0" />
        <span>
          Bespoke Architectural Lighting &bull; Enjoy 15% Off With Code{" "}
          <strong className="underline underline-offset-2 decoration-amber-200">
            ORANGE15
          </strong>
        </span>
        <SparklesIcon className="w-3.5 h-3.5 text-amber-200 shrink-0" />
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-stone-950/90 backdrop-blur-xl border-b border-orange-500/20 shadow-xl shadow-orange-950/20 py-3.5"
            : "bg-stone-950/60 backdrop-blur-md border-b border-orange-500/10 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-stone-200 hover:text-orange-400 hover:bg-stone-800/60 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
                <LampIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] font-light text-stone-100 group-hover:text-orange-300 transition-colors">
                  VYQEN
                </span>
                <span className="text-[9px] tracking-[0.35em] text-orange-400/90 uppercase font-medium">
                  Atelier Luminaire
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.18em] font-medium transition-all py-1.5 ${
                      isActive
                        ? "text-orange-400 font-semibold"
                        : "text-stone-300 hover:text-orange-300"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Wishlist, Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full text-stone-300 hover:text-orange-300 hover:bg-stone-850 transition-colors"
                title="Search collection"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Wishlist Indicator */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full text-stone-300 hover:text-orange-300 hover:bg-stone-850 transition-colors"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <HeartIcon className="w-5 h-5" />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-gradient-to-r from-orange-600/90 to-amber-600/90 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-medium tracking-wider shadow-lg shadow-orange-600/25 transition-all group cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBagIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-stone-950/60 text-orange-200 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {mounted ? cartCount : 0}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-950 border-b border-orange-500/20 px-6 py-6 space-y-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-widest py-2 px-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-orange-600/20 text-orange-400 font-semibold border border-orange-500/30"
                        : "text-stone-300 hover:bg-stone-900 hover:text-orange-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Bespoke Lighting Atelier</span>
              <span className="text-orange-400">Dhaka &bull; Paris &bull; NYC</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

