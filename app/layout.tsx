import type { Metadata } from "next";
import "./compiled.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Toast } from "@/components/Toast";
import { AtmosphereTuner } from "@/components/AtmosphereTuner";

export const metadata: Metadata = {
  title: "VYQEN LUMINAIRE | Architectural Designer Lamps & Lighting Atelier",
  description:
    "Your space, your story. Discover bespoke mouth-blown amber glass lamps, brushed brass chandeliers, and terracotta luminaires in our warm orange studio.",
  keywords: ["lamps", "designer lighting", "pendant light", "table lamp", "architectural lights", "vyqen atelier"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col warm-mesh selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
          <CheckoutModal />
          <AtmosphereTuner />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
