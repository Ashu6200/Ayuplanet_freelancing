import Image from "next/image";
import { ShieldCheck, Quote, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-deep-forest text-white overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 items-center gap-section-gap py-12 md:py-24">
        <div className="relative z-10 space-y-stack-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent-terracotta/40 text-accent-terracotta font-label-sm bg-accent-terracotta/5">
            <ShieldCheck className="w-4 h-4 fill-accent-terracotta/10 text-accent-terracotta" />
            Science-Backed Clinical Ayurveda
          </div>
          <h1 className="font-display-lg text-display-lg md:text-6xl leading-tight">
            <span className="text-accent-terracotta">Paachan Pro</span> पाचन में उपयोगी है, सभी को आयुर्वेद अपनाना चाहिए।
          </h1>
          <div className="relative p-6 md:p-10 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
            <Quote className="w-10 h-10 text-accent-terracotta/30 absolute top-4 left-4 rotate-180" />
            <p className="font-body-lg text-white/90 leading-relaxed italic mb-6">
              आयुर्वेद केवल रोगों का समाधान नहीं, बल्कि संतुलित जीवन जीने की एक सुंदर परंपरा है। AyuPlanet Paachan Pro की सबसे अच्छी बात इसकी सोच और संरचना है—जो शुद्ध आयुर्वेदिक सिद्धांतों पर आधारित है और आज की जीवनशैली की जरूरतों को भी समझती है।
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-headline-md text-accent-terracotta">देवी जया किशोरी</p>
                <p className="font-label-sm text-white/60">
                  आध्यात्मिक वक्ता, भजन गायिका और कथावाचक।
                </p>
              </div>
              <div className="flex text-accent-terracotta gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent-terracotta text-accent-terracotta"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-accent-terracotta text-white font-label-lg px-8 py-4 rounded hover:bg-white hover:text-deep-forest transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer">
              Shop Collection
            </button>
            <button className="border border-white/30 text-white font-label-lg px-8 py-4 rounded hover:bg-white/10 transition-all cursor-pointer">
              Clinical Research
            </button>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto h-full flex items-center justify-center">
          <Image
            className="w-full h-auto object-contain max-h-[600px] drop-shadow-2xl"
            alt="A premium commercial product photograph of AyuPlanet Paachan Pro powder jar."
            src="https://lh3.googleusercontent.com/aida/AP1WRLueCihaAz4WUCJQNEfVcVi5m1ADEeBxxbBsAZkcpT-IXIMwVOduVuuJh4VXrS68lnBLEi4FJjB4aE8Cewz2grqWocgueEa5LLYUaHkWglAbYIy7vpDXNTlGL97HIsYloui4zSlEvR4FtpYa7D2VonXnMsXanP6Esnd1a8luuSVBmw4wVwaOt4veO9st4sEuo0_L-8Fo_0vy5FL8QPCWVQv2z3acRkDz_B-00NDisuEeVtg0i6HWNd1m65Y"
            width={600}
            height={600}
            priority
          />
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent-terracotta/20 blur-3xl rounded-full"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/40 blur-3xl rounded-full"></div>
        </div>
      </div>
      {/* Wave Overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg
          className="relative block w-full h-12 fill-sage-bg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
