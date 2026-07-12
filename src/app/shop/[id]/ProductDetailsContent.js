"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  Star,
  ShieldCheck,
  FlaskConical,
  Leaf,
  ShoppingCart,
  Check,
  Heart,
  Zap,
  BookOpen,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";

// Generate realistic mock reviews for all products
const MOCK_REVIEWS = [
  {
    name: "Aarav Sharma",
    rating: 5,
    date: "June 24, 2026",
    verified: true,
    text: "Remarkable results! Within a week, my digestion felt lighter. The bloating has completely vanished. The quality of these herbs is outstanding.",
  },
  {
    name: "Priya Patel",
    rating: 5,
    date: "May 18, 2026",
    verified: true,
    text: "I was skeptical at first, but this formula has worked wonders. Very gentle on the stomach and works naturally. Will definitely purchase again.",
  },
  {
    name: "Rajesh Kumar",
    rating: 4,
    date: "April 05, 2026",
    verified: true,
    text: "Excellent product. It took about 4 days to see noticeable changes, but it's very consistent. Standardized clinical quality is obvious.",
  },
];

export default function ProductDetailsContent({ product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  // State management
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("use");

  // Quantity handlers
  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Add to cart handler
  const handleAddToCart = () => {
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  // Buy it Now handler
  const handleBuyNow = () => {
    // Add to cart and redirect immediately to shipping
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.push("/shipping");
  };

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg animate-fade-in">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 font-label-sm text-label-sm text-on-surface-variant/60">
          <Link href="/" className="hover:text-deep-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-deep-forest transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface-variant/70 truncate max-w-[150px] sm:max-w-none">
            {product.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-deep-forest font-semibold truncate">{product.title}</span>
        </nav>

        {/* Hero Product Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg pb-12 items-start">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white overflow-hidden rounded-xl aspect-square border border-outline-variant/20 shadow-xs group">
              <Image
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                src={imagesList[activeImageIdx]}
                width={500}
                height={500}
                unoptimized
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-accent-terracotta text-white font-label-lg text-[12px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold shadow-xs">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {imagesList.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 flex-shrink-0 border-2 rounded-lg p-1 bg-white cursor-pointer transition-all ${
                      activeImageIdx === idx ? "border-accent-terracotta shadow-xs" : "border-outline-variant/30 hover:border-deep-forest/40"
                    }`}
                  >
                    <Image
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-cover rounded"
                      src={img}
                      width={80}
                      height={80}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Description */}
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fillVal = i + 1 <= product.rating;
                    return (
                      <Star
                        key={i}
                        className={`w-4.5 h-4.5 ${
                          fillVal ? "fill-amber-500 text-amber-500" : "text-amber-500/35"
                        }`}
                      />
                    );
                  })}
                </div>
                <span className="font-label-lg text-on-surface-variant/70 text-sm font-semibold">
                  {product.rating}/5 ({product.reviewsCount} Reviews)
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-deep-forest leading-tight font-bold">
                {product.title}
              </h1>
              <p className="font-headline-md text-headline-md text-on-surface-variant/70 italic -mt-1 text-lg">
                {product.subtitle}
              </p>
            </div>

            <div className="flex items-baseline gap-4 py-2 border-y border-outline-variant/20">
              <span className="font-display-lg text-display-lg text-deep-forest font-bold">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="font-body-lg text-body-lg text-on-surface-variant/50 line-through">
                ₹{product.oldPrice.toLocaleString()}
              </span>
              <span className="font-label-lg text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                {product.discount}
              </span>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-xl leading-relaxed">
              {product.description}
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap gap-6 py-2">
              <div className="flex items-center gap-2 text-on-surface-variant/85">
                <ShieldCheck className="text-accent-terracotta w-5 h-5 font-semibold" />
                <span className="font-label-lg text-label-sm font-bold">Ayush Certified</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant/85">
                <FlaskConical className="text-accent-terracotta w-5 h-5 font-semibold" />
                <span className="font-label-lg text-label-sm font-bold">Heavy Metal Tested</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant/85">
                <Leaf className="text-accent-terracotta w-5 h-5 font-semibold" />
                <span className="font-label-lg text-label-sm font-bold">100% Organic</span>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-deep-forest h-14 rounded-lg overflow-hidden bg-white">
                  <button
                    className="px-4 py-2 hover:bg-sage-bg/30 text-deep-forest transition-colors font-bold text-lg h-full flex items-center cursor-pointer"
                    onClick={() => handleQtyChange(-1)}
                  >
                    -
                  </button>
                  <span className="px-6 font-bold text-deep-forest text-lg select-none">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 hover:bg-sage-bg/30 text-deep-forest transition-colors font-bold text-lg h-full flex items-center cursor-pointer"
                    onClick={() => handleQtyChange(1)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`grow text-white h-14 font-label-lg text-label-lg tracking-widest uppercase transition-all rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                    added
                      ? "bg-emerald-600 active:scale-95"
                      : "bg-deep-forest hover:bg-accent-terracotta active:scale-95 animate-pulse"
                  }`}
                >
                  {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  {added ? "Added!" : "Add to Cart"}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-14 h-14 border border-deep-forest text-deep-forest hover:bg-sage-bg/20 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90 flex-shrink-0"
                  title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isInWishlist
                        ? "fill-accent-terracotta text-accent-terracotta"
                        : "text-deep-forest"
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full border border-deep-forest text-deep-forest h-14 font-label-lg text-label-lg tracking-widest uppercase hover:bg-deep-forest hover:text-white rounded-lg transition-all active:scale-98 cursor-pointer font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Buy it Now
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 px-gutter bg-sage-bg/30 rounded-2xl mb-12 border border-deep-forest/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-deep-forest mb-1 shadow-xs border border-deep-forest/5">
                <Leaf className="w-5 h-5 text-deep-forest" />
              </div>
              <h3 className="font-label-lg text-label-sm uppercase font-bold text-deep-forest">
                100% Vegan
              </h3>
              <p className="text-xs text-on-surface-variant/75 px-2">
                Plant-based, cruelty-free formula for ethical health.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-deep-forest mb-1 shadow-xs border border-deep-forest/5">
                <FlaskConical className="w-5 h-5 text-deep-forest" />
              </div>
              <h3 className="font-label-lg text-label-sm uppercase font-bold text-deep-forest">
                Clinical Grade
              </h3>
              <p className="text-xs text-on-surface-variant/75 px-2">
                Standardized herbal extracts for consistent efficacy.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-deep-forest mb-1 shadow-xs border border-deep-forest/5">
                <ShieldCheck className="w-5 h-5 text-deep-forest" />
              </div>
              <h3 className="font-label-lg text-label-sm uppercase font-bold text-deep-forest">
                Purity Ensured
              </h3>
              <p className="text-xs text-on-surface-variant/75 px-2">
                No chemical fillers, artificial preservatives or binders.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-deep-forest mb-1 shadow-xs border border-deep-forest/5">
                <BookOpen className="w-5 h-5 text-deep-forest" />
              </div>
              <h3 className="font-label-lg text-label-sm uppercase font-bold text-deep-forest">
                Ancient Wisdom
              </h3>
              <p className="text-xs text-on-surface-variant/75 px-2">
                Traditional secrets optimized by modern lab testing.
              </p>
            </div>
          </div>
        </section>

        {/* Botanical Ingredients Grid */}
        {product.ingredients && product.ingredients.length > 0 && (
          <section className="py-12 border-t border-outline-variant/20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-headline-lg text-headline-lg text-deep-forest mb-3 font-bold">
                Potent Roots &amp; Botanical Wonders
              </h2>
              <p className="font-body-md text-on-surface-variant/80">
                A synergistic blend of nature's most powerful active elements, ethically sourced from the Himalayan foothills.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="bg-white p-6 border border-outline-variant/20 hover:border-accent-terracotta/40 rounded-xl transition-all duration-300 shadow-xs flex flex-col justify-between"
                >
                  <div className="mb-4 overflow-hidden rounded-lg aspect-video relative bg-sage-bg/25">
                    <Image
                      alt={ing.name}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-all"
                      src={ing.image}
                      width={250}
                      height={150}
                      unoptimized
                    />
                  </div>
                  <h4 className="font-headline-md text-deep-forest text-lg font-bold mb-1">
                    {ing.name}
                  </h4>
                  <p className="text-sm text-on-surface-variant/80 leading-relaxed">
                    {ing.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tabs Drawers Accordion */}
        <section className="py-12 border-t border-outline-variant/20">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Usage */}
            <div className="border border-outline-variant/35 rounded-xl bg-white overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenAccordion((prev) => (prev === "use" ? "" : "use"))}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-label-lg font-bold text-deep-forest cursor-pointer hover:bg-sage-bg/10"
              >
                <span>HOW TO USE</span>
                {openAccordion === "use" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              {openAccordion === "use" && (
                <div className="px-6 pb-6 pt-2 text-sm text-on-surface-variant/85 leading-relaxed border-t border-outline-variant/10">
                  <p className="mb-2 font-semibold">Dosage Instructions:</p>
                  <p>Consume 1 to 2 capsules/tablets daily, preferably after meals with warm water or as recommended by your physician.</p>
                  <p className="mt-3 text-xs italic text-accent-terracotta">Avoid drinking cold water immediately after consumption to maintain healthy digestive fire (Agni).</p>
                </div>
              )}
            </div>

            {/* Science & Research */}
            <div className="border border-outline-variant/35 rounded-xl bg-white overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenAccordion((prev) => (prev === "science" ? "" : "science"))}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-label-lg font-bold text-deep-forest cursor-pointer hover:bg-sage-bg/10"
              >
                <span>CLINICAL EVIDENCE &amp; SCIENCE</span>
                {openAccordion === "science" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              {openAccordion === "science" && (
                <div className="px-6 pb-6 pt-2 text-sm text-on-surface-variant/85 leading-relaxed border-t border-outline-variant/10">
                  <p>Our formulas undergo rigorous clinical verification to validate safety and potency:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Tested on 500+ participants over 12 weeks.</li>
                    <li>Significant relief and metabolic rate balancing noted in 94% of users.</li>
                    <li>Standardized heavy-metal screening guarantees zero synthetic traces.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* FAQs */}
            {product.faq && product.faq.length > 0 && (
              <div className="border border-outline-variant/35 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenAccordion((prev) => (prev === "faq" ? "" : "faq"))}
                  className="w-full px-6 py-4 flex justify-between items-center text-left font-label-lg font-bold text-deep-forest cursor-pointer hover:bg-sage-bg/10"
                >
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                  {openAccordion === "faq" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                {openAccordion === "faq" && (
                  <div className="px-6 pb-6 pt-2 text-sm text-on-surface-variant/85 leading-relaxed border-t border-outline-variant/10 space-y-3">
                    {product.faq.map((q, i) => (
                      <div key={i} className="space-y-1">
                        <p className="font-semibold text-deep-forest">Q: {q.question}</p>
                        <p className="text-on-surface-variant/80">A: {q.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-12 border-t border-outline-variant/20">
          <h2 className="font-headline-lg text-headline-lg text-deep-forest mb-8 text-center font-bold">
            Customer Reflections &amp; Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Reviews Summary Stats */}
            <div className="lg:col-span-4 bg-white p-6 border border-outline-variant/25 rounded-xl text-center shadow-xs">
              <h3 className="text-5xl font-bold text-deep-forest mb-2">{product.rating}</h3>
              <div className="flex justify-center text-amber-500 mb-2 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const fillStar = i + 1 <= product.rating;
                  return (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        fillStar ? "fill-amber-500 text-amber-500" : "text-amber-500/30"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-sm font-semibold text-on-surface-variant/85">
                Based on {product.reviewsCount} verified reviews
              </p>
              <div className="mt-6 space-y-2">
                {/* 5 Star Progress */}
                <div className="flex items-center text-xs gap-3 font-semibold">
                  <span className="w-12 text-left font-medium">5 Star</span>
                  <div className="flex-grow bg-sage-bg h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[85%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">85%</span>
                </div>
                {/* 4 Star Progress */}
                <div className="flex items-center text-xs gap-3 font-semibold">
                  <span className="w-12 text-left font-medium">4 Star</span>
                  <div className="flex-grow bg-sage-bg h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[10%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">10%</span>
                </div>
                {/* 3 Star Progress */}
                <div className="flex items-center text-xs gap-3 font-semibold">
                  <span className="w-12 text-left font-medium">3 Star</span>
                  <div className="flex-grow bg-sage-bg h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[5%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">5%</span>
                </div>
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="lg:col-span-8 space-y-6">
              {MOCK_REVIEWS.map((rev, i) => (
                <div key={i} className="bg-white p-6 border border-outline-variant/20 rounded-xl shadow-xs">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-semibold text-deep-forest block text-base">
                        {rev.name}
                      </span>
                      <span className="text-[11px] text-on-surface-variant/50">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-500 gap-0.5">
                      {Array.from({ length: 5 }).map((_, starIdx) => {
                        const fill = starIdx + 1 <= rev.rating;
                        return (
                          <Star
                            key={starIdx}
                            className={`w-4 h-4 ${
                              fill ? "fill-amber-500 text-amber-500" : "text-amber-500/30"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-emerald-600 font-label-sm text-[11px] font-bold uppercase tracking-wider mb-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                      Verified Purchase
                    </div>
                  )}
                  <p className="text-sm text-on-surface-variant/85 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
