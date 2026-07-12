"use client";

import { useState } from "react";
import { Home, Grid, HeartPulse, User } from "lucide-react";

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Products", icon: Grid, href: "/shop" },
    { name: "Goals", icon: HeartPulse, href: "/shop" },
    { name: "Account", icon: User, href: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-around py-3 px-gutter z-50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <a
            key={tab.name}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer ${
              isActive ? "text-deep-forest font-bold" : "text-on-surface-variant"
            }`}
            onClick={() => setActiveTab(tab.name)}
            href={tab.href}
          >
            <tab.icon
              className={`w-5 h-5 transition-colors ${
                isActive ? "text-deep-forest fill-deep-forest/10" : "text-on-surface-variant"
              }`}
            />
            <span className="text-[10px]">
              {tab.name}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
