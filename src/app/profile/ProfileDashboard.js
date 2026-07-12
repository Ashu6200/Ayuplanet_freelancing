"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  User,
  Truck,
  BookOpen,
  Heart,
  CheckCircle,
  History,
  Plus,
  Check,
  Trash2,
  HeartOff,
  X,
  ShoppingCart,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function ProfileDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    wishlistItems,
    userProfile,
    savedAddresses,
    orderHistory,
    isLoaded,
    removeFromWishlist,
    moveToCart,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useCart();

  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form States
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  // Address Form States
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrName, setAddrName] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrPin, setAddrPin] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrDetail, setAddrDetail] = useState("");
  const [addrLandmark, setAddrLandmark] = useState("");
  const [addrDefault, setAddrDefault] = useState(false);
  const [addressErrors, setAddressErrors] = useState({});

  // Active track order details modal state
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Sync tab with search parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["profile", "orders", "addresses", "wishlist"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Sync profile form states
  useEffect(() => {
    if (isLoaded && userProfile) {
      setFullname(userProfile.fullname || "");
      setEmail(userProfile.email || "");
      setPhone(userProfile.phone || "");
      setBio(userProfile.bio || "");
    }
  }, [isLoaded, userProfile]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    router.push(`/profile?tab=${tabName}`);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!fullname.trim() || !email.trim()) return;

    updateProfile({ fullname, email, phone, bio });
    setProfileSuccess("Profile updated successfully!");
    setTimeout(() => {
      setProfileSuccess("");
    }, 3000);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // Validate address form
    const errors = {};
    if (!addrName.trim()) errors.name = "Full name is required";
    if (!addrPhone.trim() || !/^\d{10}$/.test(addrPhone.trim()))
      errors.phone = "Valid 10-digit phone number is required";
    if (!addrPin.trim() || addrPin.length !== 6) errors.pincode = "6-digit PIN code is required";
    if (!addrState) errors.state = "State selection is required";
    if (!addrCity.trim()) errors.city = "City is required";
    if (!addrDetail.trim()) errors.address = "Detailed address is required";

    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
      return;
    }

    const newAddr = {
      fullname: addrName,
      phone: addrPhone,
      pincode: addrPin,
      state: addrState,
      city: addrCity,
      address: addrDetail,
      landmark: addrLandmark,
      isDefault: addrDefault,
    };

    addAddress(newAddr);
    setShowAddressForm(false);

    // Clear fields
    setAddrName("");
    setAddrPhone("");
    setAddrPin("");
    setAddrState("");
    setAddrCity("");
    setAddrDetail("");
    setAddrLandmark("");
    setAddrDefault(false);
    setAddressErrors({});
  };

  const isPinValid = addrPin.length === 6 && /^\d+$/.test(addrPin);

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
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg min-h-screen">
        <h1 className="font-display-lg text-display-lg text-deep-forest mb-8 border-b border-outline-variant/10 pb-4 font-bold">
          Apothecary Member Workspace
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Dashboard Tabs Sidebar Navigation */}
          <nav className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 border-b lg:border-none border-outline-variant/10 pb-4 lg:pb-0 scroll-hide">
            {[
              { id: "profile", label: "Profile Info", icon: User },
              { id: "orders", label: "My Orders", icon: Truck },
              { id: "addresses", label: "Address Book", icon: BookOpen },
              { id: "wishlist", label: "Wishlist", icon: Heart },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-label-lg rounded-xl transition-all duration-300 text-left whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-deep-forest text-white shadow-sm font-bold"
                      : "bg-white hover:bg-sage-bg/30 text-on-surface-variant/80 border border-outline-variant/15"
                  }`}
                >
                  <tab.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-white fill-white/10" : "text-on-surface-variant"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Dynamic Content Panel */}
          <div className="lg:col-span-9 bg-white border border-outline/10 rounded-2xl p-6 md:p-8 shadow-sm min-h-[50vh]">
            {/* TAB: PROFILE */}
            {activeTab === "profile" && (
              <section className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-deep-forest font-semibold mb-1">
                    Profile Information
                  </h2>
                  <p className="text-sm text-on-surface-variant/70">
                    Manage your personal details, email configurations, and wellness descriptors.
                  </p>
                </div>

                {profileSuccess && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-lg text-sm font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {profileSuccess}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-sage-bg/15 border border-outline-variant/30 focus:border-accent-terracotta rounded-lg focus:outline-none font-body-md text-deep-forest text-sm"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-sage-bg/15 border border-outline-variant/30 focus:border-accent-terracotta rounded-lg focus:outline-none font-body-md text-deep-forest text-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-sage-bg/15 border border-outline-variant/30 focus:border-accent-terracotta rounded-lg focus:outline-none font-body-md text-deep-forest text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider block">
                      Bio / Wellness Focus
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 bg-sage-bg/15 border border-outline-variant/30 focus:border-accent-terracotta rounded-lg focus:outline-none font-body-md text-deep-forest resize-none text-sm"
                      placeholder="Tell us about your wellness goals..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-deep-forest hover:bg-accent-terracotta text-white px-8 py-3.5 rounded-xl font-label-lg transition-colors cursor-pointer shadow-xs active:scale-95 font-bold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* TAB: MY ORDERS */}
            {activeTab === "orders" && (
              <section className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-deep-forest font-semibold mb-1">
                    My Orders
                  </h2>
                  <p className="text-sm text-on-surface-variant/70">
                    Track shipments, review past invoices, and browse order completion status.
                  </p>
                </div>

                {orderHistory.length === 0 ? (
                  <div className="bg-sage-bg/20 border border-outline-variant/20 rounded-xl p-12 text-center flex flex-col items-center">
                    <History className="w-10 h-10 text-on-surface-variant/40 mb-3" />
                    <p className="font-body-md text-on-surface-variant/85">No orders recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="border border-outline-variant/30 rounded-xl overflow-hidden shadow-xs animate-fade-in"
                      >
                        {/* Order Details Header bar */}
                        <div className="bg-sage-bg/25 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-outline-variant/20">
                          <div>
                            <span className="text-xs text-on-surface-variant/60 uppercase font-bold tracking-widest text-[10px] block">
                              Order Placed
                            </span>
                            <span className="text-sm text-deep-forest font-semibold font-label-lg">
                              {order.date}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-on-surface-variant/60 uppercase font-bold tracking-widest text-[10px] block">
                              Total Cost
                            </span>
                            <span className="text-sm text-deep-forest font-bold font-label-lg">
                              ₹{order.total.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-on-surface-variant/60 uppercase font-bold tracking-widest text-[10px] block">
                              Order ID
                            </span>
                            <span className="text-sm text-deep-forest font-mono font-semibold">
                              {order.id}
                            </span>
                          </div>
                          <div>
                            {/* Dynamic Status Badges */}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold font-label-sm ${
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

                        {/* Order Content */}
                        <div className="p-6 space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center justify-between">
                              <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-sage-bg/20 rounded-lg overflow-hidden flex-shrink-0 relative">
                                  <Image
                                    className="w-full h-full object-cover"
                                    alt={item.title}
                                    src={item.image}
                                    width={64}
                                    height={64}
                                    unoptimized
                                  />
                                </div>
                                <div>
                                  <h4 className="font-label-lg text-deep-forest font-bold">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-on-surface-variant/60">
                                    Qty {item.quantity} • ₹{item.price.toLocaleString()} each
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="pt-4 border-t border-outline-variant/15 flex justify-end">
                            <Link
                              href={`/profile/orders/${order.id}`}
                              className="border border-deep-forest text-deep-forest px-4 py-2 text-xs font-bold rounded-lg hover:bg-deep-forest hover:text-white transition-all cursor-pointer font-label-lg font-bold"
                            >
                              View Order Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* TAB: ADDRESS BOOK */}
            {activeTab === "addresses" && (
              <section className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-deep-forest font-semibold mb-1">
                      Address Book
                    </h2>
                    <p className="text-sm text-on-surface-variant/70">
                      Configure your primary and secondary shipping locations.
                    </p>
                  </div>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="bg-deep-forest hover:bg-accent-terracotta text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs font-bold"
                    >
                      <Plus className="w-4 h-4" />
                      Add Address
                    </button>
                  )}
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <form
                    onSubmit={handleAddressSubmit}
                    className="bg-sage-bg/15 p-6 border border-outline-variant/20 rounded-xl space-y-4 max-w-2xl"
                  >
                    <h3 className="font-headline-md text-deep-forest font-semibold text-lg border-b border-outline-variant/15 pb-2">
                      New Address Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                          Receiver Full Name
                        </label>
                        <input
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:bg-white transition-colors bg-white/70 text-sm ${
                            addressErrors.name
                              ? "border-red-500"
                              : "border-outline-variant/30 focus:border-accent-terracotta"
                          }`}
                          value={addrName}
                          onChange={(e) => setAddrName(e.target.value)}
                        />
                        {addressErrors.name && (
                          <p className="text-red-500 text-[11px] font-semibold">
                            {addressErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="10-digit number"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:bg-white transition-colors bg-white/70 text-sm ${
                            addressErrors.phone
                              ? "border-red-500"
                              : "border-outline-variant/30 focus:border-accent-terracotta"
                          }`}
                          value={addrPhone}
                          onChange={(e) =>
                            setAddrPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                        />
                        {addressErrors.phone && (
                          <p className="text-red-500 text-[11px] font-semibold font-bold">
                            {addressErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* PIN */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          placeholder="6-digits"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:bg-white transition-colors bg-white/70 text-sm ${
                            addressErrors.pincode
                              ? "border-red-500"
                              : isPinValid
                              ? "border-emerald-500 focus:border-emerald-500"
                              : "border-outline-variant/30 focus:border-accent-terracotta"
                          }`}
                          value={addrPin}
                          onChange={(e) => setAddrPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        />
                        {addressErrors.pincode && (
                          <p className="text-red-500 text-[11px] font-semibold">
                            {addressErrors.pincode}
                          </p>
                        )}
                      </div>

                      {/* State */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                          State
                        </label>
                        <select
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:bg-white bg-white/70 text-sm ${
                            addressErrors.state
                              ? "border-red-500"
                              : "border-outline-variant/30 focus:border-accent-terracotta"
                          }`}
                          value={addrState}
                          onChange={(e) => setAddrState(e.target.value)}
                        >
                          <option value="">Select State</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Gujarat">Gujarat</option>
                        </select>
                        {addressErrors.state && (
                          <p className="text-red-500 text-[11px] font-semibold">
                            {addressErrors.state}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                          City
                        </label>
                        <input
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:bg-white transition-colors bg-white/70 text-sm ${
                            addressErrors.city
                              ? "border-red-500"
                              : "border-outline-variant/30 focus:border-accent-terracotta"
                          }`}
                          value={addrCity}
                          onChange={(e) => setAddrCity(e.target.value)}
                        />
                        {addressErrors.city && (
                          <p className="text-red-500 text-[11px] font-semibold font-bold">
                            {addressErrors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Detailed address */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                        House Address details
                      </label>
                      <textarea
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:bg-white transition-colors bg-white/70 text-sm resize-none ${
                          addressErrors.address
                            ? "border-red-500"
                            : "border-outline-variant/30 focus:border-accent-terracotta"
                        }`}
                        placeholder="House no, Street Name, Block..."
                        value={addrDetail}
                        onChange={(e) => setAddrDetail(e.target.value)}
                      ></textarea>
                      {addressErrors.address && (
                        <p className="text-red-500 text-[11px] font-semibold font-bold">
                          {addressErrors.address}
                        </p>
                      )}
                    </div>

                    {/* Landmark */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider block">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-outline-variant/30 focus:border-accent-terracotta rounded-lg focus:outline-none bg-white/70 text-sm"
                        value={addrLandmark}
                        onChange={(e) => setAddrLandmark(e.target.value)}
                      />
                    </div>

                    {/* Default selector */}
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold">
                      <input
                        type="checkbox"
                        checked={addrDefault}
                        onChange={(e) => setAddrDefault(e.target.checked)}
                        className="w-4 h-4 border-outline-variant text-deep-forest focus:ring-accent-terracotta rounded"
                      />
                      <span>Set as primary default address</span>
                    </label>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        className="bg-deep-forest hover:bg-accent-terracotta text-white px-6 py-2.5 rounded-lg text-xs font-bold cursor-pointer font-bold"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setAddressErrors({});
                        }}
                        className="border border-outline-variant/40 text-on-surface-variant hover:bg-sage-bg/30 px-6 py-2.5 rounded-lg text-xs font-bold cursor-pointer font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses List display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-6 border rounded-xl relative shadow-xs flex flex-col justify-between ${
                        addr.isDefault
                          ? "border-accent-terracotta bg-sage-bg/5"
                          : "border-outline-variant/20 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-label-lg font-bold text-deep-forest">
                            {addr.fullname}
                          </span>
                          {addr.isDefault && (
                            <span className="bg-accent-terracotta/10 text-accent-terracotta text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-on-surface-variant/80">{addr.address}</p>
                        <p className="text-sm text-on-surface-variant/80">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs text-on-surface-variant/60 mt-2">
                          Phone: +91 {addr.phone}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-xs text-deep-forest hover:text-accent-terracotta font-semibold underline cursor-pointer"
                          >
                            Set Default
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 select-none font-bold">
                            <Check className="w-3.5 h-3.5" />
                            Primary Address
                          </span>
                        )}

                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-xs text-red-600 hover:underline flex items-center gap-0.5 cursor-pointer font-medium font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === "wishlist" && (
              <section className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-deep-forest font-semibold mb-1">
                    Your Wishlist
                  </h2>
                  <p className="text-sm text-on-surface-variant/70">
                    Review items saved for later and add them directly to your cart.
                  </p>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="bg-sage-bg/15 border border-outline-variant/20 rounded-xl p-16 text-center flex flex-col items-center justify-center">
                    <HeartOff className="w-12 h-12 text-on-surface-variant/30 mb-4" />
                    <h3 className="font-headline-md text-deep-forest mb-2">
                      Wishlist is currently empty
                    </h3>
                    <p className="font-body-md text-on-surface-variant/70 mb-6 max-w-xs">
                      Navigate to our Apothecary Collections and save some remedies!
                    </p>
                    <Link
                      href="/shop"
                      className="bg-deep-forest text-white px-6 py-2.5 rounded-lg font-label-lg hover:bg-accent-terracotta transition-colors shadow-md font-bold"
                    >
                      Explore Shop
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-outline-variant/20 rounded-xl p-4 flex gap-4 hover:border-accent-terracotta/30 transition-all shadow-xs"
                      >
                        <div className="w-24 h-24 bg-sage-bg/30 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image
                            className="w-full h-full object-cover"
                            alt={item.title}
                            src={item.image}
                            width={96}
                            height={96}
                            unoptimized
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-label-lg text-deep-forest font-bold text-base truncate">
                                {item.title}
                              </h4>
                              <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-on-surface-variant/50 hover:text-red-500 cursor-pointer flex items-center justify-center"
                                title="Remove"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-xs text-on-surface-variant/60 truncate">
                              {item.subtitle}
                            </p>
                            <span className="font-bold text-deep-forest text-sm block mt-1">
                              ₹{item.price.toLocaleString()}
                            </span>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => moveToCart(item)}
                              className="bg-deep-forest hover:bg-accent-terracotta text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer font-bold"
                            >
                              <ShoppingCart className="w-3 h-3 text-white" />
                              Move to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>

      {/* TRACKING DRAWER MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-xl border border-deep-forest/10 space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <h3 className="font-headline-md text-deep-forest font-semibold text-lg">
                Track Shipment
              </h3>
              <button
                onClick={() => setTrackingOrder(null)}
                className="text-on-surface-variant/70 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-on-surface-variant/60 uppercase font-bold tracking-widest text-[10px]">
                Tracking Number
              </p>
              <p className="font-mono text-sm font-semibold text-deep-forest">
                {trackingOrder.id.replace("AP", "TRK")}
              </p>
            </div>

            {/* Tracking Path Steps */}
            <div className="space-y-6 pl-4 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
              {/* Step 1: Placed */}
              <div className="flex items-start gap-4 relative">
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center z-10 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-deep-forest leading-none">Order Placed</h4>
                  <p className="text-xs text-on-surface-variant/70 mt-1">
                    Confirmed on {trackingOrder.date}
                  </p>
                </div>
              </div>

              {/* Step 2: Shipped */}
              <div className="flex items-start gap-4 relative">
                <div
                  className={`w-5 h-5 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-xs ${
                    trackingOrder.status === "Shipped" || trackingOrder.status === "Delivered"
                      ? "bg-emerald-500"
                      : "bg-outline-variant"
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold leading-none ${
                      trackingOrder.status === "Shipped" || trackingOrder.status === "Delivered"
                        ? "text-deep-forest"
                        : "text-on-surface-variant/50"
                    }`}
                  >
                    Dispatched from Hub
                  </h4>
                  <p className="text-xs text-on-surface-variant/70 mt-1">
                    In transit via standard courier.
                  </p>
                </div>
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="flex items-start gap-4 relative">
                <div
                  className={`w-5 h-5 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-xs ${
                    trackingOrder.status === "Delivered" ? "bg-emerald-500" : "bg-outline-variant"
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold leading-none ${
                      trackingOrder.status === "Delivered"
                        ? "text-deep-forest"
                        : "text-on-surface-variant/50"
                    }`}
                  >
                    Out for Delivery
                  </h4>
                  <p className="text-xs text-on-surface-variant/70 mt-1">
                    Package in local delivery vehicle.
                  </p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex items-start gap-4 relative">
                <div
                  className={`w-5 h-5 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-xs ${
                    trackingOrder.status === "Delivered" ? "bg-emerald-500" : "bg-outline-variant"
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold leading-none ${
                      trackingOrder.status === "Delivered"
                        ? "text-deep-forest"
                        : "text-on-surface-variant/50"
                    }`}
                  >
                    Delivered
                  </h4>
                  <p className="text-xs text-on-surface-variant/70 mt-1">
                    Handed over directly to consignee.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/10 flex justify-end">
              <button
                onClick={() => setTrackingOrder(null)}
                className="bg-deep-forest hover:bg-accent-terracotta text-white px-6 py-2.5 rounded-lg text-xs font-bold cursor-pointer font-bold"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
