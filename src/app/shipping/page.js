"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Truck, CreditCard, MapPin, ArrowLeft, ShieldCheck, Leaf, RefreshCw } from "lucide-react";

export default function ShippingPage() {
  const router = useRouter();
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
    shippingAddress,
    saveAddress,
  } = useCart();

  // Form states
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [saveInfo, setSaveInfo] = useState(true);

  // Focus tracking state
  const [focusedField, setFocusedField] = useState(null);

  // Error states
  const [errors, setErrors] = useState({});

  // Initialize form with saved address if exists
  useEffect(() => {
    if (isLoaded && shippingAddress) {
      setFullname(shippingAddress.fullname || "");
      setPhone(shippingAddress.phone || "");
      setPincode(shippingAddress.pincode || "");
      setState(shippingAddress.state || "");
      setCity(shippingAddress.city || "");
      setAddress(shippingAddress.address || "");
      setLandmark(shippingAddress.landmark || "");
    }
  }, [isLoaded, shippingAddress]);

  // If cart is empty, redirect to home/cart
  useEffect(() => {
    if (isLoaded && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [isLoaded, cartItems, router]);

  const handlePINChange = (e) => {
    const val = e.target.value.replace(/\D/g, ""); // digits only
    if (val.length <= 6) {
      setPincode(val);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = "Full name is required";
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (pincode.trim().length !== 6) {
      newErrors.pincode = "PIN code must be 6 digits";
    }
    if (!state) newErrors.state = "Please select a state";
    if (!city.trim()) newErrors.city = "City is required";
    if (!address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save address details
    const addressData = {
      fullname,
      phone,
      pincode,
      state,
      city,
      address,
      landmark,
    };

    if (saveInfo) {
      saveAddress(addressData);
    }

    // Redirect to Order Success page directly (simulating successful payment/checkout)
    router.push("/checkout/success");
  };

  // Check pin code correctness for UI highlight
  const isPinValid = pincode.length === 6 && /^\d+$/.test(pincode);

  if (!isLoaded || cartItems.length === 0) {
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
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-secondary-container -translate-y-1/2 z-0"></div>
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-accent-terracotta -translate-y-1/2 z-0 transition-all duration-700"></div>

            {/* Step 1: Cart */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Link
                href="/cart"
                className="w-10 h-10 rounded-full bg-accent-terracotta text-white flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-all"
              >
                <Check className="w-5 h-5" />
              </Link>
              <span className="font-label-lg text-label-sm text-deep-forest font-bold">Cart</span>
            </div>

            {/* Step 2: Shipping */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-deep-forest text-white flex items-center justify-center ring-4 ring-sage-bg">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-label-lg text-label-sm text-deep-forest font-bold">Shipping</span>
            </div>

            {/* Step 3: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-label-lg text-label-sm text-on-surface-variant/50">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start">
          {/* Left Side: Shipping Form */}
          <div className="lg:col-span-8">
            <section className="bg-white p-8 rounded-xl border border-deep-forest/10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-deep-forest w-8 h-8" />
                <h1 className="font-headline-lg text-headline-lg text-deep-forest font-semibold">
                  Shipping Details
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label
                      className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                        focusedField === "fullname"
                          ? "text-accent-terracotta font-semibold"
                          : "text-on-surface-variant/70"
                      }`}
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest ${
                        errors.fullname
                          ? "border-red-500 focus:border-red-500"
                          : focusedField === "fullname"
                          ? "border-accent-terracotta"
                          : "border-outline-variant/30"
                      }`}
                      id="fullname"
                      placeholder="Enter your full name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      onFocus={() => setFocusedField("fullname")}
                      onBlur={() => setFocusedField(null)}
                      type="text"
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-xs font-semibold">{errors.fullname}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label
                      className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                        focusedField === "phone"
                          ? "text-accent-terracotta font-semibold"
                          : "text-on-surface-variant/70"
                      }`}
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="px-3 py-3 bg-sage-bg/50 border-b border-outline-variant/30 text-on-surface-variant/80 font-body-md rounded-l">
                        +91
                      </span>
                      <input
                        className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest rounded-r ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : focusedField === "phone"
                            ? "border-accent-terracotta"
                            : "border-outline-variant/30"
                        }`}
                        id="phone"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        type="tel"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
                  {/* PIN Code */}
                  <div className="space-y-1">
                    <label
                      className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                        focusedField === "pincode"
                          ? "text-accent-terracotta font-semibold"
                          : "text-on-surface-variant/70"
                      }`}
                      htmlFor="pincode"
                    >
                      PIN Code
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest ${
                        errors.pincode
                          ? "border-red-500 focus:border-red-500"
                          : isPinValid
                          ? "border-emerald-500 focus:border-emerald-500"
                          : focusedField === "pincode"
                          ? "border-accent-terracotta"
                          : "border-outline-variant/30"
                      }`}
                      id="pincode"
                      placeholder="6-digit PIN"
                      value={pincode}
                      onChange={handlePINChange}
                      onFocus={() => setFocusedField("pincode")}
                      onBlur={() => setFocusedField(null)}
                      type="text"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs font-semibold">{errors.pincode}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label
                      className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                        focusedField === "state"
                          ? "text-accent-terracotta font-semibold"
                          : "text-on-surface-variant/70"
                      }`}
                      htmlFor="state"
                    >
                      State
                    </label>
                    <select
                      className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest appearance-none cursor-pointer ${
                        errors.state
                          ? "border-red-500 focus:border-red-500"
                          : focusedField === "state"
                          ? "border-accent-terracotta"
                          : "border-outline-variant/30"
                      }`}
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      onFocus={() => setFocusedField("state")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option disabled value="">
                        Select State
                      </option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-xs font-semibold">{errors.state}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label
                      className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                        focusedField === "city"
                          ? "text-accent-terracotta font-semibold"
                          : "text-on-surface-variant/70"
                      }`}
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest ${
                        errors.city
                          ? "border-red-500 focus:border-red-500"
                          : focusedField === "city"
                          ? "border-accent-terracotta"
                          : "border-outline-variant/30"
                      }`}
                      id="city"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField(null)}
                      type="text"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs font-semibold">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* House Address */}
                <div className="space-y-1">
                  <label
                    className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                      focusedField === "address"
                        ? "text-accent-terracotta font-semibold"
                        : "text-on-surface-variant/70"
                    }`}
                    htmlFor="address"
                  >
                    House No, Building, Street Area
                  </label>
                  <textarea
                    className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest resize-none ${
                      errors.address
                        ? "border-red-500 focus:border-red-500"
                        : focusedField === "address"
                        ? "border-accent-terracotta"
                        : "border-outline-variant/30"
                    }`}
                    id="address"
                    placeholder="Enter your detailed house address"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-xs font-semibold">{errors.address}</p>
                  )}
                </div>

                {/* Landmark (Optional) */}
                <div className="space-y-1">
                  <label
                    className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors duration-200 block ${
                      focusedField === "landmark"
                        ? "text-accent-terracotta font-semibold"
                        : "text-on-surface-variant/70"
                    }`}
                    htmlFor="landmark"
                  >
                    Landmark (Optional)
                  </label>
                  <input
                    className={`w-full px-4 py-3 bg-sage-bg/25 border-b focus:outline-none transition-all font-body-md text-body-md text-deep-forest ${
                      focusedField === "landmark"
                        ? "border-accent-terracotta"
                        : "border-outline-variant/30"
                    }`}
                    id="landmark"
                    placeholder="E.g. Near City Hospital"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    onFocus={() => setFocusedField("landmark")}
                    onBlur={() => setFocusedField(null)}
                    type="text"
                  />
                </div>

                {/* Save Address Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group mt-4 select-none">
                  <div className="relative flex items-center">
                    <input
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-outline checked:bg-deep-forest checked:border-deep-forest transition-all"
                      type="checkbox"
                    />
                    <Check className="absolute text-white opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant/80 select-none">
                    Save this address for future purchases
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline/10 pt-6">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 font-label-lg text-label-lg text-deep-forest hover:text-accent-terracotta hover:gap-3 transition-all cursor-pointer font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Cart
                  </Link>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-deep-forest text-white px-12 py-4 rounded-lg font-label-lg text-label-lg hover:bg-accent-terracotta transition-all active:scale-95 shadow-md cursor-pointer"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <section className="bg-white p-6 rounded-xl border border-deep-forest/10 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-deep-forest mb-6 border-b border-outline/10 pb-2">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-sage-bg/30 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        className="w-full h-full object-cover"
                        alt={item.title}
                        src={item.image}
                        width={64}
                        height={64}
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-lg text-label-sm text-deep-forest truncate font-bold">
                        {item.title}
                      </p>
                      <p className="font-body-md text-label-sm text-on-surface-variant/70">
                        Qty {item.quantity}
                      </p>
                      <p className="font-label-lg text-label-sm text-accent-terracotta font-semibold mt-0.5">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-outline/10 space-y-3">
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant/80">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-body-md text-body-md text-emerald-600">
                    <span>Discount ({promoCode})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant/80">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant/80">
                  <span>Tax (GST 5%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 font-headline-md text-headline-md text-deep-forest border-t border-outline/10 font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-white border border-deep-forest/5 rounded-xl shadow-xs">
                <ShieldCheck className="text-accent-terracotta w-6 h-6 mb-1" />
                <span className="font-label-sm text-[10px] text-on-surface-variant/70 leading-tight">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white border border-deep-forest/5 rounded-xl shadow-xs">
                <Leaf className="text-accent-terracotta w-6 h-6 mb-1" />
                <span className="font-label-sm text-[10px] text-on-surface-variant/70 leading-tight">
                  100% Organic
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white border border-deep-forest/5 rounded-xl shadow-xs">
                <RefreshCw className="text-accent-terracotta w-6 h-6 mb-1" />
                <span className="font-label-sm text-[10px] text-on-surface-variant/70 leading-tight">
                  Easy Returns
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
