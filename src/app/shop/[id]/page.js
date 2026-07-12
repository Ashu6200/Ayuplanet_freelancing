import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailsContent from "./ProductDetailsContent";

// Generate static routes at build time for optimization
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// Dynamic SEO metadata tags
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | AyuPlanet",
    };
  }

  return {
    title: `${product.title} | AyuPlanet - Clinical Ayurveda`,
    description: product.subtitle + ". " + product.description.slice(0, 150) + "...",
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsContent product={product} />;
}
