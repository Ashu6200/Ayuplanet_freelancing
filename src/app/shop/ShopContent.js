"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Star,
  Heart,
  Check,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = ["Digestive Health", "Diabetes Support", "Joint Care", "Piles Relief"];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  // Filter and sort states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  // Sync with search params on mount / query change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }

    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Toggle category checkbox
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Clear all active filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(5000);
    setSelectedRating(0);
    setSearchQuery("");
  };

  // Add to cart handler
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  // Filtered and sorted products
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
      );
    }

    // Filter by Categories
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by Price
    list = list.filter((p) => p.price <= maxPrice);

    // Filter by Rating
    if (selectedRating > 0) {
      list = list.filter((p) => p.rating >= selectedRating);
    }

    // Sort products
    if (sortOption === "Price: Low to High") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest") {
      // Mock newest by alphabetical/id sorting
      list.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOption === "Popular") {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategories, maxPrice, selectedRating, sortOption, searchQuery]);

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-stack-lg pb-section-gap">
        {/* Page Header */}
        <div className="mb-stack-lg flex flex-col items-center text-center max-w-2xl mx-auto py-8">
          <span className="text-accent-terracotta font-label-lg uppercase mb-2 tracking-widest">
            Heritage Wellness
          </span>
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-deep-forest mb-4">
            The Ayurvedic Apothecary
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant/75">
            Clinically-proven solutions rooted in ancient wisdom. Discover natural restorative care
            crafted for the modern lifestyle with scientific precision.
          </p>
        </div>

        {/* Search bar inside header for small screen */}
        <div className="block sm:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-4 h-4" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-full border border-outline-variant/30 bg-white/50 focus:outline-none focus:ring-1 focus:ring-accent-terracotta text-label-sm"
              placeholder="Search remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
          </div>
        </div>

        {/* Filter & Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Sidebar Filters - Desktop */}
          <aside className="w-full lg:w-64 space-y-stack-lg flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              className="lg:hidden w-full flex items-center justify-between border border-outline-variant/30 p-4 bg-white rounded-lg shadow-sm"
            >
              <span className="font-label-lg flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-deep-forest" /> Filters
              </span>
              {mobileFiltersOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block space-y-8 p-4 lg:p-0 bg-white lg:bg-transparent rounded-lg border lg:border-none border-outline-variant/30 mt-2 lg:mt-0`}>
              {/* Search input in sidebar for desktop */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-4 h-4" />
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-outline-variant/30 bg-white focus:outline-none focus:ring-1 focus:ring-accent-terracotta text-label-sm"
                  placeholder="Search apothecary..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-label-lg text-deep-forest mb-stack-md uppercase tracking-wider font-bold">
                  Health Goals
                </h3>
                <ul className="space-y-3">
                  {CATEGORIES.map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    return (
                      <li key={cat} className="flex items-center justify-between group cursor-pointer">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCategoryToggle(cat)}
                            className="w-4 h-4 border-outline-variant text-deep-forest focus:ring-accent-terracotta rounded"
                          />
                          <span
                            className={`font-body-md transition-colors ${
                              isChecked
                                ? "text-deep-forest font-semibold"
                                : "text-on-surface-variant/80 group-hover:text-deep-forest"
                            }`}
                          >
                            {cat}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-label-lg text-deep-forest mb-stack-md uppercase tracking-wider font-bold">
                  Price Range
                </h3>
                <input
                  className="w-full accent-deep-forest h-1 bg-outline-variant/35 rounded-full appearance-none cursor-pointer"
                  max="5000"
                  min="500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  type="range"
                />
                <div className="flex justify-between mt-stack-sm text-label-sm text-on-surface-variant/70 font-semibold">
                  <span>₹500</span>
                  <span className="text-deep-forest">Up to ₹{maxPrice.toLocaleString()}</span>
                  <span>₹5000+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-label-lg text-deep-forest mb-stack-md uppercase tracking-wider font-bold">
                  Rating
                </h3>
                <ul className="space-y-2">
                  {[4, 4.5].map((ratingVal) => (
                    <li
                      key={ratingVal}
                      onClick={() => setSelectedRating(ratingVal)}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        checked={selectedRating === ratingVal}
                        onChange={() => setSelectedRating(ratingVal)}
                        className="text-deep-forest focus:ring-accent-terracotta"
                      />
                      <div className="flex text-amber-500 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const fillVal = i + 1 <= ratingVal ? "fill" : "";
                          return (
                            <Star
                              key={i}
                              className={`w-4.5 h-4.5 ${
                                fillVal ? "fill-amber-500 text-amber-500" : "text-amber-500/40"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-label-sm text-on-surface-variant/80 font-medium">
                        {ratingVal} &amp; Up
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reset Filters */}
              {(selectedCategories.length > 0 || maxPrice < 5000 || selectedRating > 0 || searchQuery) && (
                <button
                  onClick={handleClearFilters}
                  className="text-label-lg text-red-600 underline underline-offset-4 hover:text-accent-terracotta transition-colors font-bold block cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Product Grid & Controls */}
          <div className="flex-grow">
            {/* Sorting & Count Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg pb-4 border-b border-outline-variant/15 gap-4">
              <p className="font-body-md text-on-surface-variant/80 font-medium">
                Showing <span className="font-bold text-deep-forest">{processedProducts.length}</span>{" "}
                of <span className="font-bold text-deep-forest">{products.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <label className="text-label-sm text-on-surface-variant/70 uppercase" htmlFor="sort">
                  Sort By:
                </label>
                <select
                  className="border-none bg-transparent font-label-lg text-deep-forest font-bold focus:ring-0 cursor-pointer text-sm"
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>

            {/* Main Grid */}
            {processedProducts.length === 0 ? (
              <div className="bg-white border border-outline/10 rounded-xl p-16 text-center flex flex-col items-center justify-center">
                <Search className="text-on-surface-variant/40 w-12 h-12 mb-4" />
                <h3 className="font-headline-lg text-headline-md text-deep-forest mb-2">
                  No remedies match your search
                </h3>
                <p className="font-body-md text-on-surface-variant/70 max-w-sm mb-6">
                  Try adjusting your filters, modifying your search keywords, or clearing filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-deep-forest text-white px-6 py-2.5 rounded-lg font-label-lg hover:bg-accent-terracotta transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {processedProducts.map((product) => {
                  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
                  return (
                    <Link
                      href={`/shop/${product.id}`}
                      key={product.id}
                      className="group relative bg-white border border-outline-variant/15 hover:border-accent-terracotta/40 transition-all duration-500 overflow-hidden flex flex-col h-full rounded-xl shadow-xs"
                    >
                      <div className="aspect-square overflow-hidden relative bg-sage-bg/30">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-deep-forest p-2 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
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
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          alt={product.title}
                          src={product.image}
                          width={280}
                          height={280}
                          unoptimized
                        />
                        {product.badge && (
                          <div className="absolute top-3 left-3 z-10 bg-deep-forest text-white px-3 py-1 font-label-sm uppercase tracking-tighter text-[10px] rounded-sm font-semibold shadow-xs">
                            {product.badge}
                          </div>
                        )}
                      </div>
                      <div className="p-stack-md flex flex-col flex-grow text-center justify-between">
                        <div>
                          <div className="flex justify-center text-amber-500 mb-1 gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const fillStar = i + 1 <= product.rating;
                              return (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    fillStar ? "fill-amber-500 text-amber-500" : "text-amber-500/30"
                                  }`}
                                />
                              );
                            })}
                            <span className="text-label-sm text-on-surface-variant/70 ml-1 text-xs font-semibold">
                              ({product.reviewsCount})
                            </span>
                          </div>
                          <h3 className="font-headline-md text-deep-forest mb-1 text-lg font-bold truncate px-2">
                            {product.title}
                          </h3>
                          <p className="text-label-sm text-on-surface-variant/80 italic mb-4 text-xs font-medium px-2">
                            {product.subtitle}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-xl font-bold text-deep-forest">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-on-surface-variant/60 line-through opacity-70">
                              ₹{product.oldPrice.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-emerald-600">
                              {product.discount}
                            </span>
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`w-full py-3 text-white font-label-lg transition-colors uppercase tracking-widest flex items-center justify-center gap-2 rounded-lg cursor-pointer ${
                              addedId === product.id
                                ? "bg-emerald-600"
                                : "bg-deep-forest hover:bg-accent-terracotta"
                            }`}
                          >
                            {addedId === product.id ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <ShoppingBag className="w-5 h-5 text-white" />
                            )}
                            {addedId === product.id ? "Added!" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {processedProducts.length > 0 && (
              <div className="mt-section-gap flex justify-center items-center gap-2">
                <button className="w-10 h-10 border border-outline-variant/30 rounded flex items-center justify-center text-on-surface-variant/85 hover:border-deep-forest hover:text-deep-forest transition-all cursor-pointer">
                  <ChevronLeft className="w-4 h-4 text-on-surface-variant/80" />
                </button>
                <button className="w-10 h-10 bg-deep-forest text-white rounded flex items-center justify-center font-label-lg font-bold">
                  1
                </button>
                <button className="w-10 h-10 border border-outline-variant/30 rounded flex items-center justify-center text-on-surface-variant/85 hover:border-deep-forest hover:text-deep-forest transition-all cursor-pointer">
                  2
                </button>
                <button className="w-10 h-10 border border-outline-variant/30 rounded flex items-center justify-center text-on-surface-variant/85 hover:border-deep-forest hover:text-deep-forest transition-all cursor-pointer">
                  3
                </button>
                <span className="text-on-surface-variant/50">...</span>
                <button className="w-10 h-10 border border-outline-variant/30 rounded flex items-center justify-center text-on-surface-variant/85 hover:border-deep-forest hover:text-deep-forest transition-all cursor-pointer font-bold">
                  12
                </button>
                <button className="w-10 h-10 border border-outline-variant/30 rounded flex items-center justify-center text-on-surface-variant/85 hover:border-deep-forest hover:text-deep-forest transition-all cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/80" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-white/40 border-t border-outline-variant/10 py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="bg-deep-forest rounded-2xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-stack-lg shadow-md">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(#ea9147 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="font-display-lg text-display-lg text-white mb-4">
                Join Our Heritage Circle
              </h2>
              <p className="font-body-lg text-body-lg text-white/80">
                Subscribe for early access to clinical findings, ancient rituals for modern health,
                and exclusive apothecary offers.
              </p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  className="px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-accent-terracotta rounded-lg min-w-[280px]"
                  placeholder="Your essence (email)"
                  type="email"
                />
                <button
                  type="submit"
                  className="bg-accent-terracotta hover:bg-white hover:text-deep-forest text-white px-10 py-4 font-label-lg uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
              <p className="text-white/40 text-[10px] mt-3 text-center md:text-left">
                By subscribing, you agree to our Privacy Policy. No spam, only wisdom.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
