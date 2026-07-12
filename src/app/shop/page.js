import { Suspense } from "react";
import ShopContent from "./ShopContent";

export const metadata = {
  title: "The Ayurvedic Apothecary | AyuPlanet",
  description: "Browse our clinical collections of natural Ayurvedic supplements. Doctor-formulated remedies for digestion, diabetes support, joint mobility, and piles relief.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-sage-bg/30">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-terracotta"></div>
            <p className="font-label-lg text-deep-forest animate-pulse">Loading Apothecary...</p>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
