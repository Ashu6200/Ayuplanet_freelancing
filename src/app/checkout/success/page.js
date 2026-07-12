"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const {
    cartItems,
    subtotal,
    discountAmount,
    promoCode,
    gst,
    total,
    isLoaded,
    shippingAddress,
    clearCart,
    addOrder,
  } = useCart();

  const [orderNumber, setOrderNumber] = useState("");
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  // Use a ref to prevent clearCart running multiple times in strict mode
  const clearedRef = useRef(false);

  // Capture final cart data for display, and clear cart
  useEffect(() => {
    if (isLoaded) {
      // If there are no items and we haven't already captured details, redirect to Home
      if (cartItems.length === 0 && purchasedItems.length === 0) {
        router.push("/");
        return;
      }

      // Capture details for receipt
      if (cartItems.length > 0 && purchasedItems.length === 0) {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const orderId = `AP-2026-${randomNum}`;
        setOrderNumber(orderId);

        const currentAddress = shippingAddress || {
          fullname: "Valued Customer",
          phone: "9876543210",
          pincode: "110001",
          state: "Delhi",
          city: "New Delhi",
          address: "12, Barakhamba Road, Connaught Place",
          landmark: "Near Metro Gate 3",
        };

        setPurchasedItems([...cartItems]);
        setDeliveryAddress(currentAddress);
        setOrderSummary({
          subtotal,
          discountAmount,
          promoCode,
          gst,
          total,
        });

        // Add order to profile history
        addOrder({
          id: orderId,
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
          status: "Processing",
          items: cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          total: total,
        });
      }

      // Clear the global cart state
      if (!clearedRef.current && cartItems.length > 0) {
        clearedRef.current = true;
        // Delay clearing slightly to avoid empty render flashes
        setTimeout(() => {
          clearCart();
        }, 100);
      }
    }
  }, [isLoaded, cartItems, shippingAddress, subtotal, discountAmount, promoCode, gst, total, router, purchasedItems.length, clearCart]);

  if (!isLoaded || purchasedItems.length === 0) {
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
      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-stack-lg min-h-screen">
        {/* Checkout Progress Bar */}
        <div className="w-full max-w-3xl mx-auto mb-16 pt-8">
          <div className="flex items-center justify-between relative">
            {/* Line Background */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-accent-terracotta -translate-y-1/2 z-0"></div>

            {/* Step 1: Cart */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent-terracotta text-white flex items-center justify-center shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <span className="font-label-lg text-label-sm text-deep-forest font-bold">Cart</span>
            </div>

            {/* Step 2: Shipping */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent-terracotta text-white flex items-center justify-center shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <span className="font-label-lg text-label-sm text-deep-forest font-bold">Shipping</span>
            </div>

            {/* Step 3: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-deep-forest text-white flex items-center justify-center shadow-sm ring-4 ring-sage-bg">
                <Check className="w-5 h-5" />
              </div>
              <span className="font-label-lg text-label-sm text-deep-forest font-bold">Payment</span>
            </div>
          </div>
        </div>

        {/* Success Card */}
        <div className="max-w-2xl mx-auto bg-white border border-deep-forest/10 rounded-2xl p-8 md:p-12 shadow-md text-center">
          {/* Checkmark Animation Ring */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50 animate-bounce">
            <Check className="text-emerald-600 w-10 h-10 font-bold" />
          </div>

          <h1 className="font-display-lg text-display-lg text-deep-forest mb-2">Order Confirmed!</h1>
          <p className="font-body-md text-body-md text-on-surface-variant/80 max-w-md mx-auto mb-8">
            Thank you for shopping with AyuPlanet. Your order has been placed successfully and is
            being processed.
          </p>

          {/* Details Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-b border-outline/10 py-6 mb-8">
            <div>
              <h4 className="font-label-lg text-label-sm text-on-surface-variant/70 uppercase tracking-widest text-[11px] mb-2">
                Order Information
              </h4>
              <p className="font-body-md text-body-md text-deep-forest font-semibold">
                Order Number: {orderNumber}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant/80 mt-1">
                Estimated Delivery: 3-5 Business Days
              </p>
            </div>
            <div>
              <h4 className="font-label-lg text-label-sm text-on-surface-variant/70 uppercase tracking-widest text-[11px] mb-2">
                Shipping Address
              </h4>
              {deliveryAddress && (
                <>
                  <p className="font-body-md text-body-md text-deep-forest font-semibold">
                    {deliveryAddress.fullname}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant/80 truncate">
                    {deliveryAddress.address}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant/80">
                    {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant/80">
                    Phone: +91 {deliveryAddress.phone}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Summary of Items */}
          <div className="text-left mb-8">
            <h4 className="font-label-lg text-label-sm text-on-surface-variant/70 uppercase tracking-widest text-[11px] mb-4">
              Items Purchased
            </h4>
            <div className="space-y-3">
              {purchasedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sage-bg/30 rounded overflow-hidden flex-shrink-0 relative">
                      <Image
                        className="w-full h-full object-cover"
                        alt={item.title}
                        src={item.image}
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-deep-forest block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-on-surface-variant/70 text-xs">Qty {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-deep-forest">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Summary */}
            {orderSummary.total && (
              <div className="mt-6 pt-4 border-t border-dashed border-outline/10 space-y-2 text-sm">
                <div className="flex justify-between text-on-surface-variant/80">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                </div>
                {orderSummary.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({orderSummary.promoCode})</span>
                    <span>-₹{orderSummary.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant/80">
                  <span>GST (5%)</span>
                  <span>₹{orderSummary.gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant/80">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-deep-forest pt-2 border-t border-outline/10">
                  <span>Total Paid</span>
                  <span>₹{orderSummary.total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-block bg-deep-forest hover:bg-accent-terracotta text-white px-10 py-4 rounded-xl font-label-lg transition-colors shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
