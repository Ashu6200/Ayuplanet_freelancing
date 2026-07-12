import Image from "next/image";

export default function HealthGoals() {
  const goals = [
    {
      id: 1,
      title: "Managing Sugar",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLt4cQnA3cP2vg-Pk4gRw9vdeTy8YYMwVppKRl-FZ6VtEbmY4jMXH7ogfgRreecOAM1NlOsMcuvocUllCHlfiwjEkXSPvUTIcFs_9D3ql_ifYBK3oSPTz4o5PCf1-jaKGvqRgfcDhfDGHiBPNzym2BJ8oWON6BvS0UKdusEp68nwtDf6oZnvg3_WwDW7Jl4LUOOdud10CQkbHQT5MYPvKm14SqMxjEiU4JiYAEGc_dFuieJiQyKnOmBi7ok",
      alt: "AyuPlanet Diabetes Care Goal."
    },
    {
      id: 2,
      title: "Joint Support",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLs4E5z7YE2iJbSA6hLtA2exXnPXsfbDMZGOfMt6AI9wfRQCm6y5EAMOM4Io6jW2BPxgilQHzlwCr-Yd-ac_18lCwfuehfB5GKcLaXPLqix0TdyxcpAmRfwKQPYy3IcUQxPaW-L8f7MF-en2yiRYDzPeEaRjrwdCn0VNKFRb-w3eB21TOIVUjl2fFF9RwGzrPPyHT9kgltVvjcrj-kpWvtC1GL4U_4C_EVWeUYLAohUj7uKnHTS_srdKsqo",
      alt: "AyuPlanet Joint Support Goal."
    },
    {
      id: 3,
      title: "Healthy Gut",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLueCihaAz4WUCJQNEfVcVi5m1ADEeBxxbBsAZkcpT-IXIMwVOduVuuJh4VXrS68lnBLEi4FJjB4aE8Cewz2grqWocgueEa5LLYUaHkWglAbYIy7vpDXNTlGL97HIsYloui4zSlEvR4FtpYa7D2VonXnMsXanP6Esnd1a8luuSVBmw4wVwaOt4veO9st4sEuo0_L-8Fo_0vy5FL8QPCWVQv2z3acRkDz_B-00NDisuEeVtg0i6HWNd1m65Y",
      alt: "AyuPlanet Healthy Gut Goal."
    },
    {
      id: 4,
      title: "Treating Piles",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLt4cQnA3cP2vg-Pk4gRw9vdeTy8YYMwVppKRl-FZ6VtEbmY4jMXH7ogfgRreecOAM1NlOsMcuvocUllCHlfiwjEkXSPvUTIcFs_9D3ql_ifYBK3oSPTz4o5PCf1-jaKGvqRgfcDhfDGHiBPNzym2BJ8oWON6BvS0UKdusEp68nwtDf6oZnvg3_WwDW7Jl4LUOOdud10CQkbHQT5MYPvKm14SqMxjEiU4JiYAEGc_dFuieJiQyKnOmBi7ok",
      alt: "AyuPlanet Treating Piles Goal."
    }
  ];

  return (
    <section className="py-section-gap">
      <div className="max-w-container-max mx-auto px-gutter text-center">
        <p className="text-accent-terracotta font-label-lg mb-2 uppercase tracking-widest">
          Targeted Wellness
        </p>
        <h2 className="font-display-lg text-display-lg text-deep-forest mb-stack-lg">
          Shop By Health Goals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md md:gap-gutter">
          {goals.map((goal) => (
            <a
              key={goal.id}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer block"
              href="#"
            >
              <Image
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={goal.alt}
                src={goal.image}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-deep-forest/40 group-hover:bg-deep-forest/60 flex flex-col items-center justify-center p-4 transition-all duration-300">
                <h3 className="text-white font-headline-md mb-4 text-base md:text-lg lg:text-xl">
                  {goal.title}
                </h3>
                <span className="px-6 py-2 bg-white text-deep-forest rounded-full font-label-lg group-hover:bg-accent-terracotta group-hover:text-white transition-colors duration-300">
                  Know More
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
