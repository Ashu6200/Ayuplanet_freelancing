"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const DEFAULT_ITEMS = [
  {
    id: "paachan",
    title: "Paachan Pro",
    subtitle: "Holistic Digestive Care with Triphala & Ajwain",
    price: 1299,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCluO-dZPOsCf6UHM8xGdZTgRTiVowZhODUU8gW3cvIt5oeZFicgP7ehSy-KKsvNPIk0o8gX46sd-KdCYgVAJBizM0dBzYwDyeCKgxGG2T7ukiOJGHTLLgPhXTckuiNlXDCOxvPLzuLsELUNMAMWolbdFBBMgP-TpKjj6fmy0M1Hs2sPvUsjh-kBHt43VZ8Zx0WDYjBKn8GznNkqd8PTdC_nSS-KQ1i7wP1dDVvquDyPa394mq8J870TCRMC-KCwr44gxImILA5cww",
    tags: ["Gut Health", "Natural Detox"],
  },
  {
    id: "diacurex",
    title: "DiaCurex",
    subtitle: "Clinically Validated Blood Sugar Management",
    price: 1850,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_Bbe7KgFdyK3d36OW9I8WAybCyMfrwpz_R9swvgf2SEkqgKbjgzt9vzYdgq7osNQdy1ROSV73Zy2h47tAwpW1vzCFd9KFMLG3w_zqIkQgg3e1kw1_1K5kY_SN_AUXU9YQhv5ZOopOkcchjlEJDe8InU-uC6QUFBoUKTWOBYlShrX93rxoX7lkA2-zcS6dNfwnvdn2Wxv4QGO2_AP-RKFYc3pLUc2WUKEwGvu8XsueVt_ksAhAkNXInol6mRijbd5wkB1tS-q_mY",
    tags: ["Diabetes Care", "Clinical Formula"],
  },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);

  // Profile data state
  const [userProfile, setUserProfile] = useState({
    fullname: "Ashutosh Kewat",
    email: "ashutosh@example.com",
    phone: "9876543210",
    bio: "Passionate about yoga, natural wellness, and organic lifestyle.",
    joined: "July 2024",
  });

  // Saved Addresses state
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: "addr_1",
      fullname: "Ashutosh Kewat",
      phone: "9876543210",
      pincode: "110001",
      state: "Delhi",
      city: "New Delhi",
      address: "12, Barakhamba Road, Connaught Place",
      landmark: "Near Metro Gate 3",
      isDefault: true,
    },
  ]);

  // Orders History state
  const [orderHistory, setOrderHistory] = useState([
    {
      id: "AP-2026-894721",
      date: "July 08, 2026",
      status: "Delivered",
      items: [
        {
          id: "paachan",
          title: "Paachan Pro",
          quantity: 1,
          price: 1299,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCluO-dZPOsCf6UHM8xGdZTgRTiVowZhODUU8gW3cvIt5oeZFicgP7ehSy-KKsvNPIk0o8gX46sd-KdCYgVAJBizM0dBzYwDyeCKgxGG2T7ukiOJGHTLLgPhXTckuiNlXDCOxvPLzuLsELUNMAMWolbdFBBMgP-TpKjj6fmy0M1Hs2sPvUsjh-kBHt43VZ8Zx0WDYjBKn8GznNkqd8PTdC_nSS-KQ1i7wP1dDVvquDyPa394mq8J870TCRMC-KCwr44gxImILA5cww",
        },
      ],
      total: 1364,
    },
    {
      id: "AP-2026-312908",
      date: "May 12, 2026",
      status: "Shipped",
      items: [
        {
          id: "diacurex",
          title: "DiaCurex",
          quantity: 2,
          price: 1850,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_Bbe7KgFdyK3d36OW9I8WAybCyMfrwpz_R9swvgf2SEkqgKbjgzt9vzYdgq7osNQdy1ROSV73Zy2h47tAwpW1vzCFd9KFMLG3w_zqIkQgg3e1kw1_1K5kY_SN_AUXU9YQhv5ZOopOkcchjlEJDe8InU-uC6QUFBoUKTWOBYlShrX93rxoX7lkA2-zcS6dNfwnvdn2Wxv4QGO2_AP-RKFYc3pLUc2WUKEwGvu8XsueVt_ksAhAkNXInol6mRijbd5wkB1tS-q_mY",
        },
      ],
      total: 3885,
    },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ayuplanet_cart");
    const savedWishlist = localStorage.getItem("ayuplanet_wishlist");
    const savedPromo = localStorage.getItem("ayuplanet_promo");
    const savedDiscount = localStorage.getItem("ayuplanet_discount");
    const savedAddress = localStorage.getItem("ayuplanet_address");
    const savedProfile = localStorage.getItem("ayuplanet_profile");
    const savedAddressesList = localStorage.getItem("ayuplanet_addresses_list");
    const savedOrdersList = localStorage.getItem("ayuplanet_orders_list");

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        setCartItems(DEFAULT_ITEMS);
      }
    } else {
      setCartItems(DEFAULT_ITEMS);
    }

    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {}
    }

    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {}
    }

    if (savedAddressesList) {
      try {
        setSavedAddresses(JSON.parse(savedAddressesList));
      } catch (e) {}
    }

    if (savedOrdersList) {
      try {
        setOrderHistory(JSON.parse(savedOrdersList));
      } catch (e) {}
    }

    if (savedPromo) setPromoCode(savedPromo);
    if (savedDiscount) setDiscountPercent(Number(savedDiscount));
    if (savedAddress) {
      try {
        setShippingAddress(JSON.parse(savedAddress));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when states change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ayuplanet_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ayuplanet_wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ayuplanet_profile", JSON.stringify(userProfile));
    }
  }, [userProfile, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ayuplanet_addresses_list", JSON.stringify(savedAddresses));
    }
  }, [savedAddresses, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ayuplanet_orders_list", JSON.stringify(orderHistory));
    }
  }, [orderHistory, isLoaded]);

  // Save promo code and discount
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ayuplanet_promo", promoCode);
      localStorage.setItem("ayuplanet_discount", String(discountPercent));
    }
  }, [promoCode, discountPercent, isLoaded]);

  // Save address
  useEffect(() => {
    if (isLoaded && shippingAddress) {
      localStorage.setItem("ayuplanet_address", JSON.stringify(shippingAddress));
    }
  }, [shippingAddress, isLoaded]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title.split("|")[0].trim(),
          subtitle: product.subtitle || "Ayurvedic Supplement",
          price: product.price,
          quantity: 1,
          image: product.image,
          tags: product.tags || ["Ayurveda", "Wellness"],
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const applyPromo = (code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "GIFT20") {
      setPromoCode("GIFT20");
      setDiscountPercent(20);
      return { success: true, message: "Promo applied: 20% discount!" };
    }
    return { success: false, message: "Invalid promo code" };
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscountPercent(0);
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("ayuplanet_cart");
    localStorage.removeItem("ayuplanet_promo");
    localStorage.removeItem("ayuplanet_discount");
  };

  const saveAddress = (address) => {
    setShippingAddress(address);
    // If not already in addresses list, add it
    setSavedAddresses((prev) => {
      const exists = prev.find((a) => a.address === address.address && a.city === address.city);
      if (exists) return prev;
      return [...prev, { ...address, id: `addr_${Date.now()}`, isDefault: prev.length === 0 }];
    });
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title.split("|")[0].trim(),
          subtitle: product.subtitle || "Ayurvedic Supplement",
          price: product.price,
          image: product.image,
          tags: product.tags || ["Ayurveda", "Wellness"],
        },
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  // Profile Editor Functions
  const updateProfile = (profileData) => {
    setUserProfile((prev) => ({ ...prev, ...profileData }));
  };

  // Address Manager Functions
  const addAddress = (addr) => {
    setSavedAddresses((prev) => {
      const newAddr = {
        ...addr,
        id: `addr_${Date.now()}`,
        isDefault: prev.length === 0 ? true : addr.isDefault || false,
      };
      if (newAddr.isDefault) {
        return prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr);
      }
      return [...prev, newAddr];
    });
  };

  const deleteAddress = (id) => {
    setSavedAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      // If we deleted default, set first one as default
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id) => {
    setSavedAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  // Orders History Functions
  const addOrder = (order) => {
    setOrderHistory((prev) => [order, ...prev]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const gst = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const shipping = 0; // FREE
  const total = subtotal - discountAmount + gst + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        wishlistItems,
        wishlistCount,
        subtotal,
        discountAmount,
        discountPercent,
        promoCode,
        gst,
        shipping,
        total,
        isLoaded,
        shippingAddress,
        userProfile,
        savedAddresses,
        orderHistory,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyPromo,
        removePromo,
        clearCart,
        saveAddress,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        addOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
