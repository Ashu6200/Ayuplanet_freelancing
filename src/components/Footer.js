import Image from "next/image";
import { Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-deep-forest text-white pt-section-gap pb-12 overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-lg">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <a className="font-display-lg text-display-lg text-white tracking-tight" href="/">
            Ayu<span className="text-accent-terracotta">Planet</span>
          </a>
          <p className="font-body-md text-white/70 leading-relaxed">
            Pioneering a sustainable connection between ancient Ayurvedic wisdom and modern clinical
            precision for a healthier planet.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent-terracotta hover:border-accent-terracotta transition-all text-white"
              href="#"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent-terracotta hover:border-accent-terracotta transition-all text-white"
              href="#"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent-terracotta hover:border-accent-terracotta transition-all text-white"
              href="#"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        {/* Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-headline-md text-accent-terracotta font-bold">Quick Links</h4>
          <ul className="space-y-2">
            {[
              "About AyuPlanet",
              "Sustainability",
              "Contact Us",
              "Authenticity",
              "Refund Policy",
              "Privacy Policy",
              "Shipping Policy",
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  className="font-label-lg text-white/70 hover:text-accent-terracotta transition-colors"
                  href="#"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact India Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-headline-md text-accent-terracotta font-bold">AyuPlanet India</h4>
          <p className="font-body-md text-white/70">
            Ground Floor, Plot No. 21 & 21A, Sector 142, Noida, Uttar Pradesh 201304
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-white/70">
              <Phone className="w-4 h-4 text-accent-terracotta" />
              <span className="font-label-lg">+91 73039 89992</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Clock className="w-4 h-4 text-accent-terracotta" />
              <span className="font-label-lg">Mon - Sat, 10:00 - 18:00</span>
            </div>
          </div>
        </div>
        {/* Contact USA Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-headline-md text-accent-terracotta font-bold">AyuPlanet USA</h4>
          <p className="font-body-md text-white/70">
            AyuPlanet Intense Healthcare LLC, 16192 Coastal Highway, Lewes, Delaware 19958, County
            of Sussex
          </p>
          <div className="mt-auto pt-4 flex gap-2">
            <Image
              alt="Visa"
              className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWJ3f488_jYknmqaDVdGMDxEllkf88NdYCiZ1B8me4Up4yRtA_47RUKxspAelWC0FcUYBhlWkefmg3ULYyRX8z5Mavc3i159tfXxjwWWj1hXj58S73yFdhir2Yvx1KWBZAjFSDCsodxhARYsuj3o7sbCrIAn-BT4ZDvOcdVDzbdIJYcyXg7P8Zp1Qo_w4CCuof2OEIxH1cb6sCV2MW1UfvWlieJC8A3sZc5jemqS0pwoKZw9CaFXYd1-kGPaUf6XL6mmTF21fLJC4"
              width={40}
              height={24}
            />
            <Image
              alt="Mastercard"
              className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2IHDB25xbhOWb_FrXjvkRHxeCrEkI1i9hoCwiZaizSzprbHWcyrGkGGbqbrh4dE1eTeop_-A0DJ8buoHms8yhkgg4AIG_UG_A2uk7PB9mDeTSDtL6ALDutm6ZTnePv0Besv9xslu9nOERa_xGrny-FtyalqjxkQmFGOyfcfR6RCqor-49iA9rQ-cgOSYR8cLm4TVqP6T3bB4maywjjdIZxuut4Pzprj4hgdIWDgor0lW269Y2FqN4zlNZN7I7qnlsRgF2m0WXla8"
              width={40}
              height={24}
            />
            <Image
              alt="Amex"
              className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALF96QzaTwpkFtDpFnUHXW8jwjm0pNYAlPvBWSwNyp_J3z5X_-XYZ8GWfu3cxz5PsmwVOcImI28OWIfqAhT63nwwZx1nqWPrQFYlxVJtIn0cOt9sAoQ6uFbStbhmRjFgcj02Z0kJSvMET2wob3FS981Xh06YW7OD_7YqlgoSDswLRHFNaNCYrW9yFdHQIfSOdARHzOaEgsVYMkwxaIxrmRtepPz6C21abnPeKrJLPpT_A0eq9szX6iuXlPgP1tuSCzkqrJFgwvJlo"
              width={40}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter mt-section-gap pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
        <p>Copyright © 2026 AyuPlanet India. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-accent-terracotta transition-colors" href="#">
            Terms and Conditions
          </a>
          <a className="hover:text-accent-terracotta transition-colors" href="#">
            Cancellation Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
