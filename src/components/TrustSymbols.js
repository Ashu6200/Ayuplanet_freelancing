import { Leaf, FlaskConical, Sparkles, Dna } from "lucide-react";

export default function TrustSymbols() {
  const symbols = [
    { icon: Leaf, label: "100% Pure & Vegan" },
    { icon: FlaskConical, label: "Clinically Tested" },
    { icon: Sparkles, label: "Chemical Free" },
    { icon: Dna, label: "Non-GMO" },
  ];

  return (
    <section className="py-section-gap">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-stack-lg">
          <p className="text-accent-terracotta font-label-lg mb-2 uppercase tracking-widest">
            Quality Assurance
          </p>
          <h2 className="font-headline-lg text-headline-lg text-deep-forest mb-2">
            Certificate of Natural Goodness
          </h2>
          <div className="w-24 h-1 bg-accent-terracotta/30 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          {symbols.map((symbol, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="w-20 h-20 rounded-xl bg-white border border-outline/10 flex items-center justify-center mb-4 group-hover:border-accent-terracotta group-hover:bg-accent-terracotta/5 group-hover:-translate-y-1 transition-all duration-300">
                <symbol.icon className="w-10 h-10 text-deep-forest group-hover:text-accent-terracotta transition-colors" />
              </div>
              <span className="font-label-lg text-deep-forest">{symbol.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
