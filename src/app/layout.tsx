import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

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
        <meta name="yandex-verification" content="3cd204cc54a0710d" />
        <link rel="preconnect" href="https://www.transparenttextures.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        <CartProvider>
          {children}
        </CartProvider>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106838565', 'ym');

            ym(106838565, 'init', {
              ssr:true,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `}
        </Script>
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/106838565" style={{position:'absolute', left:'-9999px'}} alt="" /></div>
        </noscript>
      </body>
    </html>
  );
}
