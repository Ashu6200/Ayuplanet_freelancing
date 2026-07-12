import { Suspense } from "react";
import OrderDetailContent from "./OrderDetailContent";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order Details ${id} | AyuPlanet`,
    description: `Track and view delivery parameters for AyuPlanet order invoice ${id}.`,
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-sage-bg/30">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-terracotta"></div>
            <p className="font-label-lg text-deep-forest animate-pulse">Loading Order Workspace...</p>
          </div>
        </div>
      }
    >
      <OrderDetailContent orderId={id} />
    </Suspense>
  );
}
