"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, ChevronRight, Headphones } from "lucide-react";

export default function OrderDetailContent({ orderId }) {
  const router = useRouter();
  const { orderHistory, isLoaded } = useCart();

  // Find target order
  const order = orderHistory.find((o) => o.id === orderId);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-bg/30">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-terracotta"></div>
          <p className="font-label-lg text-deep-forest">Loading Order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-margin-mobile md:px-gutter py-24 text-center">
          <AlertCircle className="text-red-600 w-16 h-16 mb-4 animate-bounce mx-auto" />
          <h2 className="font-display-lg text-display-lg text-deep-forest mb-2">Order Not Found</h2>
          <p className="font-body-md text-on-surface-variant/80 mb-8">
            The order number <span className="font-mono font-bold">{orderId}</span> is not registered in this account.
          </p>
          <Link
            href="/profile?tab=orders"
            className="bg-deep-forest text-white px-8 py-3 rounded-lg font-label-lg hover:bg-accent-terracotta transition-colors shadow-md"
          >
            Back to Orders
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Calculate pricing breakdown
  const orderSubtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const orderGst = Math.round(orderSubtotal * 0.05);

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg min-h-screen">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 font-label-sm text-label-sm text-on-surface-variant/60">
          <Link href="/" className="hover:text-deep-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/profile" className="hover:text-deep-forest transition-colors">
            Profile
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/profile?tab=orders" className="hover:text-deep-forest transition-colors">
            Orders
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-deep-forest font-semibold truncate font-mono">{order.id}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-outline-variant/15">
          <div>
            <h1 className="font-display-lg text-display-lg text-deep-forest leading-tight mb-2">
              Order Details
            </h1>
            <p className="text-sm text-on-surface-variant/75">
              Placed on <span className="font-semibold text-deep-forest">{order.date}</span> • Invoice ID: <span className="font-mono text-deep-forest font-semibold">{order.id}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-label-sm uppercase tracking-wider ${
                order.status === "Delivered"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : order.status === "Shipped"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Order Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Items and Delivery Address */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Items Table */}
            <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-headline-md text-deep-forest font-bold mb-4">
                Ordered Remedies
              </h3>
              <div className="divide-y divide-outline-variant/15">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Link href={`/shop/${item.id}`} className="w-20 h-20 bg-sage-bg/20 rounded-xl overflow-hidden hover:opacity-90 transition-opacity flex-shrink-0 relative">
                        <Image
                          className="w-full h-full object-cover"
                          alt={item.title}
                          src={item.image}
                          width={80}
                          height={80}
                          unoptimized
                        />
                      </Link>
                      <div>
                        <Link href={`/shop/${item.id}`} className="font-label-lg text-deep-forest font-bold hover:text-accent-terracotta transition-colors text-base font-bold">
                          {item.title}
                        </Link>
                        <p className="text-xs text-on-surface-variant/60 mt-1">
                          ₹{item.price.toLocaleString()} each • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-deep-forest font-label-lg font-bold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address & Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping address info */}
              <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-xs">
                <h3 className="font-headline-md text-deep-forest font-bold mb-3">
                  Shipping Destination
                </h3>
                <div className="text-sm text-on-surface-variant/80 space-y-1">
                  <p className="font-bold text-deep-forest">{order.shippingAddress?.fullname || "Ashutosh Kewat"}</p>
                  <p>{order.shippingAddress?.address || "12, Barakhamba Road, Connaught Place"}</p>
                  <p>
                    {order.shippingAddress?.city || "New Delhi"}, {order.shippingAddress?.state || "Delhi"} - {order.shippingAddress?.pincode || "110001"}
                  </p>
                  {order.shippingAddress?.landmark && (
                    <p className="text-xs text-on-surface-variant/60 italic">Landmark: {order.shippingAddress.landmark}</p>
                  )}
                  <p className="text-xs text-on-surface-variant/60 pt-2">
                    Phone: +91 {order.shippingAddress?.phone || "9876543210"}
                  </p>
                </div>
              </div>

              {/* Payment Details info */}
              <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-xs">
                <h3 className="font-headline-md text-deep-forest font-bold mb-3">
                  Billing Summary
                </h3>
                <div className="text-sm text-on-surface-variant/80 space-y-2">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-semibold text-deep-forest">Cash on Delivery (COD)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{orderSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>GST (5%)</span>
                    <span>₹{orderGst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-outline-variant/15 pt-2 font-bold text-deep-forest font-bold">
                    <span>Paid Sum</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Tracking Progress Stepper */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Progress Stepper Card */}
            <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-headline-md text-deep-forest font-bold mb-6">
                Shipment Tracker
              </h3>
              
              <div className="space-y-6 pl-4 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
                {/* Step 1: Placed */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center z-10 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-deep-forest leading-none">Order Placed</h4>
                    <p className="text-xs text-on-surface-variant/70 mt-1">Confirmed on {order.date}</p>
                  </div>
                </div>

                {/* Step 2: Processing */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center z-10 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-deep-forest leading-none">Formulated &amp; Packed</h4>
                    <p className="text-xs text-on-surface-variant/70 mt-1">Apothecary batch prepared.</p>
                  </div>
                </div>

                {/* Step 3: Dispatched */}
                <div className="flex items-start gap-4 relative">
                  <div
                    className={`w-5 h-5 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-xs ${
                      order.status === "Shipped" || order.status === "Delivered"
                        ? "bg-emerald-500"
                        : "bg-outline-variant"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold leading-none ${
                      order.status === "Shipped" || order.status === "Delivered"
                        ? "text-deep-forest"
                        : "text-on-surface-variant/50"
                    }`}>
                      Dispatched
                    </h4>
                    <p className="text-xs text-on-surface-variant/70 mt-1">Handed over to delivery courier.</p>
                  </div>
                </div>

                {/* Step 4: Delivered */}
                <div className="flex items-start gap-4 relative">
                  <div
                    className={`w-5 h-5 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-xs ${
                      order.status === "Delivered"
                        ? "bg-emerald-500"
                        : "bg-outline-variant"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold leading-none ${
                      order.status === "Delivered"
                        ? "text-deep-forest"
                        : "text-on-surface-variant/50"
                    }`}>
                      Delivered
                    </h4>
                    <p className="text-xs text-on-surface-variant/70 mt-1">Arrived at destination address.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpline card */}
            <div className="bg-sage-bg/30 border border-deep-forest/5 rounded-2xl p-6 text-center">
              <Headphones className="text-accent-terracotta w-8 h-8 mb-2 mx-auto" />
              <h4 className="font-label-lg font-bold text-deep-forest uppercase tracking-wider text-xs font-bold">
                Need Help?
              </h4>
              <p className="text-xs text-on-surface-variant/75 mt-1 mb-4">
                Have questions regarding formulation details or active tracking? Contact our helpdesk.
              </p>
              <a
                href="mailto:support@ayuplanet.com"
                className="text-xs font-bold text-accent-terracotta hover:underline block font-bold"
              >
                support@ayuplanet.com
              </a>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
