import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      title: "DiaCurex changed my life!",
      author: "Verified Customer",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLuFllYnmzrEr47J5y78ifImFRJ2jsd9Hs1hdfv0U7B9GNzK8WqEgEMN37uWLy3I5OsGIWQMmxlgn-hRuWX0daG43XLUDmYU8gBh6s1Ln3cjNTfaXQDtCdmdvTRmcHa4biQHFe4m7gKRVpTSNFTyq6f7P2ruwxlfp0X1pDEw_21YyM8eWqKXF9uYq5IrUi1QnM4DXx9iDbRhz61zQry_EhGIBeA6N-a-2RFGBD4bXtvQ6_88A03eRdUDIg",
      alt: "AyuPlanet customer testimonial."
    },
    {
      id: 2,
      title: "Natural relief at last.",
      author: "Verified Customer",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLtZpNVtahYiYdUTBfd1Xg2yEve35ARbR44AoRckEros5pBqcrTinx1LGab-QIcWy2c54jFLdGFvf92u6QMWFVuF6r-pMs_bxvD6MVr56rYd4MwWXQRUShDh6zBgS4VqrvW2J5u6GR44wGuQnlF3XR65T3WXjsLQQ4-AM17IBGzCUhlevcBB5kWahNqPUjCBFHMgZlvLUVulNvHFiEKEGlrWi9lSmDGy9O1-siv61OjT_73VkyfhSJKPQss",
      alt: "AyuPlanet customer testimonial banner."
    }
  ];

  return (
    <section className="py-section-gap bg-deep-forest/5">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-deep-forest mb-2">
            Trusted By Thousands
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Real experiences from our planetary community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative group overflow-hidden rounded-2xl shadow-lg bg-white border border-outline/10 h-64"
            >
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={review.alt}
                src={review.image}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/30 to-transparent p-stack-lg flex flex-col justify-end">
                <div className="flex text-accent-terracotta mb-2 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent-terracotta text-accent-terracotta"
                    />
                  ))}
                </div>
                <p className="text-white font-headline-md leading-tight mb-1">{review.title}</p>
                <p className="text-white/70 font-label-sm">{review.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
