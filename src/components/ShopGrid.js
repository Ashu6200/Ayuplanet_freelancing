"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { products } from "@/data/products";
import { ArrowRight, Heart, ShoppingBag, Check } from "lucide-react";

export default function ShopGrid() {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section className="py-section-gap bg-white/50">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-4">
          <div>
            <p className="text-accent-terracotta font-label-lg mb-1 uppercase tracking-widest">
              Natural Supplements
            </p>
            <h2 className="font-display-lg text-display-lg text-deep-forest">
              Shop Clinical Collections
            </h2>
          </div>
          <Link
            className="flex items-center gap-2 text-deep-forest font-label-lg group hover:text-accent-terracotta transition-colors cursor-pointer font-bold"
            href="/shop"
          >
            Explore all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product) => {
            const isInWishlist = wishlistItems.some((item) => item.id === product.id);
            return (
              <Link
                href={`/shop/${product.id}`}
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden border border-outline/10 hover:border-accent-terracotta/30 transition-all duration-500 hover:shadow-xl flex flex-col h-full relative"
              >
                <div className="relative overflow-hidden aspect-square bg-sage-bg/30 w-full">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-accent-terracotta text-white font-label-sm px-2 py-1 rounded shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-deep-forest p-2 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isInWishlist
                          ? "fill-accent-terracotta text-accent-terracotta"
                          : "text-deep-forest"
                      }`}
                    />
                  </button>
                  <Image
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={product.title}
                    src={product.image}
                    width={300}
                    height={300}
                    unoptimized
                  />
                </div>
                <div className="p-stack-md flex flex-col flex-grow">
                  <h3 className="font-headline-md text-deep-forest mb-2 line-clamp-2 min-h-[64px] text-base md:text-lg font-bold">
                    {product.title}
                  </h3>
                  <p className="text-on-surface-variant/75 text-xs mb-3 italic">
                    {product.subtitle}
                  </p>
                  <div className="mt-auto mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-deep-forest font-bold text-lg">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-on-surface-variant/60 line-through text-sm ml-2">
                        ₹{product.oldPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 font-label-sm">
                      {product.discount}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full py-3 font-label-lg transition-all active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2 rounded-lg ${
                      addedId === product.id
                        ? "bg-emerald-600 text-white"
                        : "bg-deep-forest text-white hover:bg-accent-terracotta"
                    }`}
                  >
                    {addedId === product.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                    {addedId === product.id ? "Added!" : "Add to cart"}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
