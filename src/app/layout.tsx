import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Калининградская рыба | Свежемороженая рыба и морепродукты",
  description: "Замороженная рыба и морепродукты с доставкой в Калининграде. Прямые поставки с завода, цены от 290₽/кг.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://www.transparenttextures.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
