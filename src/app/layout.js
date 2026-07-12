import { Geist } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "AyuPlanet | Nature-Forward Ayurvedic Wellness",
  description: "Science-Backed Clinical Ayurveda. AyuPlanet Paachan Pro and other natural supplements for targeted wellness.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
