"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Search, User, Heart, ShoppingCart } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, wishlistCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-deep-forest/95 backdrop-blur-md border-b border-outline-variant/10 shadow-md"
          : "bg-deep-forest border-b border-outline-variant/10 shadow-sm"
      }`}
    >
      <div className="flex flex-col w-full max-w-container-max mx-auto px-gutter py-4">
        {/* Upper Row: Search, Brand, Actions */}
        <div className="flex items-center justify-between gap-gutter mb-4">
          <div className="flex-1 hidden md:flex">
            <div className="relative w-full max-w-md group">
              <input
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-accent-terracotta focus:border-accent-terracotta transition-all text-sm"
                placeholder="Search for wellness..."
                type="text"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
            </div>
          </div>
          <Link
            className="font-display-lg text-display-lg text-white flex-shrink-0 mx-auto md:mx-0 tracking-tight select-none"
            href="/"
          >
            Ayu<span className="text-accent-terracotta">Planet</span>
          </Link>
          <div className="flex items-center gap-stack-lg flex-1 justify-end text-white">
            <Link
              href="/profile"
              className="flex items-center gap-2 font-label-lg hover:text-accent-terracotta transition-colors duration-300 cursor-pointer"
            >
              <User className="w-5 h-5 text-white hover:text-accent-terracotta transition-colors" />
              <span className="hidden lg:inline">Account</span>
            </Link>
            <Link
              href="/profile?tab=wishlist"
              className="flex items-center gap-2 font-label-lg hover:text-accent-terracotta transition-colors duration-300 cursor-pointer"
            >
              <div className="relative flex items-center">
                <Heart className="w-5 h-5 text-white hover:text-accent-terracotta transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-terracotta text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Wishlist</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 font-label-lg hover:text-accent-terracotta transition-colors duration-300 cursor-pointer"
            >
              <div className="relative flex items-center">
                <ShoppingCart className="w-5 h-5 text-white hover:text-accent-terracotta transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-terracotta text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>
        {/* Lower Row: Desktop Links */}
        <nav className="hidden md:flex items-center justify-center gap-stack-lg">
          <Link
            className="font-label-lg text-label-lg text-white/80 hover:text-accent-terracotta transition-colors duration-300 nav-link-underline"
            href="/shop?category=Diabetes Support"
          >
            Diabetes Support
          </Link>
          <Link
            className="font-label-lg text-label-lg text-white/80 hover:text-accent-terracotta transition-colors duration-300 nav-link-underline"
            href="/shop?category=Digestive Health"
          >
            Digestive Health
          </Link>
          <Link
            className="font-label-lg text-label-lg text-white/80 hover:text-accent-terracotta transition-colors duration-300 nav-link-underline"
            href="/shop?category=Joint Care"
          >
            Joint Care
          </Link>
          <Link
            className="font-label-lg text-label-lg text-white/80 hover:text-accent-terracotta transition-colors duration-300 nav-link-underline"
            href="/shop?category=Piles Relief"
          >
            Piles Relief
          </Link>
          <Link
            className="font-label-lg text-label-lg text-white/80 hover:text-accent-terracotta transition-colors duration-300 nav-link-underline"
            href="/shop"
          >
            Apothecary Shop
          </Link>
        </nav>
      </div>
    </header>
  );
}
