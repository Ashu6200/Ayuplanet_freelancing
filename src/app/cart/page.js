"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Check,
  ArrowRight,
  ShieldCheck,
  Leaf,
  FlaskConical,
  Truck,
} from "lucide-react";

const RECOMMENDATIONS = [
  {
    id: "ashwagandha",
    title: "Ashwagandha Pro",
    subtitle: "Stress Relief & Vitality",
    price: 799,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_k63GOwUY2Q0cvBDDiHbBzLdVTCT_lhYiXWAkUHWlvfw52EMr71fGBOMeRYLiEeoJLC_I6a_3ZFmIj5Mka-aHR96npI9ykWeEeS9Y3VW5tJHXl5QLujKwcqGCooO3_Kbr0g_4k-Z5bVBBKwiZWQ0gn_eHsLiNUOKg4EkasffnlHMfSBlTiDL2dBUpqGDFIt0t0w9mWnLG08ZdD9Hr_VD0lk6rOZUbNYwjn0PLmxt07aIpqc-PzW5gwOVUxvtLJRQlAgoDtI27Nzw",
    tags: ["Vitality", "Stress Control"],
  },
  {
    id: "hair_oil",
    title: "Kesh Vitality Oil",
    subtitle: "Advanced Hair Growth",
    price: 1450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATqwIP0mtf-vSuqjqd9533FL01t5RSik084H9v_JZyJf9t7gT22MLqvzyNbP71JZ-wRg39U1vBoJZKLtRHmfxVVSW0U_A43b6wyTXobCYx6un5RSKsrQ-Ln65i5MUOAMcy_LG_qQbGbLdFZzTBgoGxhykodlDMu6-y2A10RTHj1To7kdtry07fPyMUUhvmgzV0xoVIINmW3zHGzpJgwuUX1ChKj4FQqCt3QehJOAK6_z-01cnNWYBNJRPix75TTu4qj-wYmQTdSHY",
    tags: ["Hair Care", "Nourishment"],
  },
  {
    id: "curcumin",
    title: "Curcumin Gold",
    subtitle: "Immunity & Joint Care",
    price: 999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHnpQPX9Ha6CS4WtRr9o2gKacXD8buqHy61bEUZ9yDeGda22uvct7C-0OR1-3zgRkKtPSO_MyAyjg6rdB_gsb283WpvjEhdyvuOz9rN7C0Z2iO2vHZxt7vDqf_1_DdK7mWpeBIIIQ7xt2WxOdwAhmDOH9CdUzj6bLtyKWrKNvZHINKMpt_zniA4aphYae6Vx4fXR8nXpbyYokm3_OFT46wRoXP2KG3ve6BCQByWT4GmqDGH4Llj-ZTdYcC0AErMbOfTur678D3QKI",
    tags: ["Immunity", "Joint Health"],
  },
  {
    id: "aloe_juice",
    title: "Pure Aloe Juice",
    subtitle: "Hydration & Digestion",
    price: 499,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYpCZAqhC0rirlQ3vMQx-kzjbNEiKHlfN6sPTcBppkSZ2Ktfp7MpZfE9vUs_H6p0PaPKNVrDotZ3_7t3A7ZnapYGUlHqC4HzCkT10Q-bKuRzVDrvU7pemGdPclmh6HZEVv5Ve729J9N-BDDBlP3G7bEYHPSD3Tgte_X5BZJ0qYzgWn_TJKW0caOX5QQpEUWPlu0jVQ0_Jn98j813b_K5Lgo9IadjSFbJoD7EwopHwVZfzVZd03LjnBBW4ZomTDSccD0tdtbRfTiPw",
    tags: ["Digestive Support", "Hydration"],
  },
];

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    subtotal,
    discountAmount,
    promoCode,
    gst,
    shipping,
    total,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState({ text: "", isError: false });
  const [addingId, setAddingId] = useState(null);

  const handlePromoApply = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromo(promoInput);
    if (result.success) {
      setPromoMessage({ text: result.message, isError: false });
      setPromoInput("");
    } else {
      setPromoMessage({ text: result.message, isError: true });
    }
  };

  const handleAddRecommendation = (prod) => {
    addToCart(prod);
    setAddingId(prod.id);
    setTimeout(() => {
      setAddingId(null);
    }, 1000);
  };

  if (!isLoaded) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-terracotta"></div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-stack-lg">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 font-label-sm text-label-sm text-on-surface-variant/60">
          <Link href="/" className="hover:text-deep-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-deep-forest font-semibold">Your Cart</span>
        </nav>

        <h1 className="font-headline-lg text-display-lg text-deep-forest mb-stack-lg">
          Your Ayurvedic Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-stack-md">
            {cartItems.length === 0 ? (
              <div className="bg-white border border-outline/10 rounded-xl p-12 text-center flex flex-col items-center justify-center">
                <ShoppingCart className="text-accent-terracotta w-16 h-16 mb-4" />
                <h3 className="font-headline-lg text-headline-lg text-deep-forest mb-2">
                  Your cart is empty
                </h3>
                <p className="font-body-md text-on-surface-variant/70 mb-6 max-w-md">
                  Explore our doctor-formulated Ayurvedic collections and find the perfect match for
                  your wellness goals.
                </p>
                <Link
                  href="/"
                  className="bg-deep-forest text-white px-8 py-3 rounded-lg font-label-lg hover:bg-accent-terracotta transition-colors shadow-md"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-outline/10 rounded-xl p-stack-md flex flex-col sm:flex-row gap-stack-md hover:border-accent-terracotta/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-full sm:w-32 h-32 bg-sage-bg/30 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        className="w-full h-full object-cover"
                        alt={item.title}
                        src={item.image}
                        width={128}
                        height={128}
                        unoptimized
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-headline-md text-headline-md text-deep-forest text-lg md:text-xl font-bold">
                            {item.title}
                          </h3>
                          <span className="font-label-lg text-label-lg text-deep-forest text-lg font-bold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="font-body-md text-on-surface-variant/70 text-sm mt-1">
                          {item.subtitle}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-sage-bg/50 border border-deep-forest/10 rounded-full font-label-sm text-[11px] text-deep-forest"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-stack-md">
                        <div className="flex items-center border border-outline-variant/30 rounded-full px-2 py-1 bg-white">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-deep-forest hover:bg-sage-bg rounded-full transition-all cursor-pointer font-bold"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-label-lg text-label-lg text-deep-forest">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-deep-forest hover:bg-sage-bg rounded-full transition-all cursor-pointer font-bold"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 font-label-lg text-label-lg flex items-center gap-1 hover:underline transition-all cursor-pointer font-bold"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recommended Section */}
            <div className="border-t border-outline/10 pt-12">
              <h2 className="font-display-lg text-headline-lg text-deep-forest mb-6">
                Pairs Well With
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {RECOMMENDATIONS.map((prod) => (
                  <div
                    key={prod.id}
                    className="group bg-white border border-outline/10 rounded-xl p-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square bg-sage-bg/30 rounded-lg mb-4 overflow-hidden relative">
                        <Image
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={prod.title}
                          src={prod.image}
                          width={150}
                          height={150}
                          unoptimized
                        />
                        <div className="absolute bottom-2 right-2">
                          <button
                            onClick={() => handleAddRecommendation(prod)}
                            className="w-10 h-10 bg-deep-forest text-white rounded-full flex items-center justify-center shadow-md hover:bg-accent-terracotta transition-colors active:scale-90 cursor-pointer"
                          >
                            {addingId === prod.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <h4 className="font-label-lg text-label-lg text-deep-forest group-hover:text-accent-terracotta transition-colors truncate font-bold">
                        {prod.title}
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant/70 mb-2 truncate">
                        {prod.subtitle}
                      </p>
                    </div>
                    <span className="font-headline-md text-deep-forest text-lg font-bold">
                      ₹{prod.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          {cartItems.length > 0 && (
            <aside className="lg:col-span-4 bg-white border border-outline/10 rounded-xl p-stack-lg shadow-sm sticky top-28">
              <h2 className="font-headline-md text-headline-md text-deep-forest mb-stack-md border-b border-outline/10 pb-2">
                Order Summary
              </h2>
              <div className="space-y-4 mb-stack-lg">
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant/80">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-body-md text-body-md text-emerald-600">
                    <span className="flex items-center gap-1">
                      Discount ({promoCode})
                      <button
                        onClick={removePromo}
                        className="text-red-500 text-xs hover:underline ml-1"
                      >
                        [Remove]
                      </button>
                    </span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant/80">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant/80">
                  <span>Tax (GST 5%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-outline/10 flex justify-between">
                  <span className="font-headline-md text-headline-md text-deep-forest">Total</span>
                  <span className="font-headline-md text-headline-md text-deep-forest font-bold">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-stack-md">
                <Link
                  href="/shipping"
                  className="w-full bg-deep-forest text-white py-4 rounded-xl font-label-lg text-label-lg hover:bg-accent-terracotta transition-all flex items-center justify-center gap-2 group shadow-md"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="bg-sage-bg/30 p-stack-sm rounded-lg flex items-center gap-3 border border-deep-forest/5">
                  <ShieldCheck className="w-5 h-5 text-accent-terracotta" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant/80">
                    Secure Ayurvedic heritage checkout guaranteed.
                  </span>
                </div>

                <div className="mt-stack-lg pt-stack-lg border-t border-outline/10">
                  <p className="font-label-sm text-label-sm text-on-surface-variant/70 mb-2 uppercase tracking-widest text-[11px] font-bold">
                    Apply Promo Code
                  </p>
                  <form onSubmit={handlePromoApply} className="flex gap-2">
                    <input
                      className="flex-grow bg-sage-bg/30 border border-outline-variant/30 rounded-lg px-4 py-2 font-label-lg text-label-lg focus:outline-none focus:border-accent-terracotta focus:ring-1 focus:ring-accent-terracotta transition-all text-deep-forest placeholder:text-on-surface-variant/50"
                      placeholder="Try GIFT20"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      type="text"
                    />
                    <button
                      type="submit"
                      className="bg-sage-bg hover:bg-accent-terracotta hover:text-white text-deep-forest px-4 py-2 rounded-lg font-label-lg transition-all border border-deep-forest/10 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage.text && (
                    <p
                      className={`text-xs mt-2 font-semibold ${
                        promoMessage.isError ? "text-red-500" : "text-emerald-600"
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-stack-lg pt-6 border-t border-outline/10 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center">
                  <Leaf className="w-5 h-5 text-accent-terracotta mb-1" />
                  <span className="font-label-sm text-[10px] text-on-surface-variant/70">
                    100% Pure
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <FlaskConical className="w-5 h-5 text-accent-terracotta mb-1" />
                  <span className="font-label-sm text-[10px] text-on-surface-variant/70">
                    Lab Tested
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-5 h-5 text-accent-terracotta mb-1" />
                  <span className="font-label-sm text-[10px] text-on-surface-variant/70">
                    Fast Delivery
                  </span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
