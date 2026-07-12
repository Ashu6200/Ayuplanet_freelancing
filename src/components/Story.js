import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Story() {
  return (
    <section className="py-section-gap">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
          <div className="order-2 lg:order-1">
            <p className="text-accent-terracotta font-label-lg mb-2 uppercase tracking-widest">
              Heritage & Vision
            </p>
            <h2 className="font-display-lg text-display-lg text-deep-forest mb-stack-md">
              Our Story
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body-lg max-w-xl">
              <p>
                At AyuPlanet, our mission is simple: to make clinical-grade Ayurvedic health
                accessible to everyone. Inspired by the age-old wisdom of the cosmos and the
                healing power of the Earth, we’ve combined nature’s finest ingredients with modern
                scientific rigor.
              </p>
              <p>
                Every product is crafted with uncompromising care, ensuring the highest standards of
                botanical purity. For us, it’s not just about supplements—it’s about pioneering a
                sustainable connection between traditional wellness and modern life.
              </p>
              <div className="pt-6">
                <button className="px-8 py-3 bg-deep-forest text-white font-label-lg rounded hover:bg-accent-terracotta transition-all flex items-center gap-2 group shadow-md cursor-pointer">
                  The AyuPlanet Mission
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-10 -right-10 w-full h-full border-2 border-deep-forest/10 rounded-2xl hidden lg:block"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                className="w-full h-auto object-cover"
                alt="AyuPlanet story collage showcasing Ayurvedic roots and modern science."
                src="https://lh3.googleusercontent.com/aida/AP1WRLtIi1B4jb-k3wMR5pUQp-3Y2ywOh7mRV1dYOfn5sTRWmbNKNsD1tTs-r3t42xLZH0Q0lP-mHmh7OsLgttvZ2PBIq_G3H-9157wq8mtPi7T-WU0JXXnLre0_0gfpSd_0fF0OuqNv2QfqpKG255uon_9vP9Sjk0PMQAl5d2GdqBFLfL5nSFheSTSrw5Ba94TxGAcmEgwj1G_PrDNVMh-14M87HHN62YrGyrQiwwJIH-KxIMGGuPlP_DckPo4"
                width={600}
                height={450}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-deep-forest/40 text-center backdrop-blur-[2px]">
                <div className="p-8">
                  <p className="text-white text-5xl md:text-6xl font-display-lg mb-2">20 Lakh+</p>
                  <p className="text-accent-terracotta text-2xl font-headline-md">
                    Botanical Formulas Delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
