import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSplitter } from "@/components/sections/HeroSplitter"

// Dynamic imports for heavy or interactive components below the fold
const RetailCatalog = dynamic(() => import("@/components/sections/RetailCatalog").then(mod => mod.RetailCatalog), {
  loading: () => <div className="min-h-[600px] flex items-center justify-center bg-white">Загрузка каталога...</div>,
})

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials))

const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ))

const B2BEconomy = dynamic(() => import("@/components/sections/B2BEconomy").then(mod => mod.B2BEconomy))

const B2BCatalog = dynamic(() => import("@/components/sections/B2BCatalog").then(mod => mod.B2BCatalog))

const B2BCases = dynamic(() => import("@/components/sections/B2BCases").then(mod => mod.B2BCases))

const StickyFeatures = dynamic(() => import("@/components/layout/StickyFeatures").then(mod => mod.StickyFeatures))

const B2BHero = dynamic(() => import("@/components/sections/B2BHero").then(mod => mod.B2BHero))

const B2BProcess = dynamic(() => import("@/components/sections/B2BProcess").then(mod => mod.B2BProcess))

const B2BDocuments = dynamic(() => import("@/components/sections/B2BDocuments").then(mod => mod.B2BDocuments))

const GuaranteesDelivery = dynamic(() => import("@/components/sections/GuaranteesDelivery").then(mod => mod.GuaranteesDelivery))

const RetailCTA = dynamic(() => import("@/components/sections/RetailCTA").then(mod => mod.RetailCTA))

const B2BCTA = dynamic(() => import("@/components/sections/B2BCTA").then(mod => mod.B2BCTA))

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <HeroSplitter />
      
      {/* B2B Section - Main focus now */}
      <div id="b2b-section">
        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BHero />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BEconomy />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <RetailCatalog />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BCatalog />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BProcess />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BCases />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BDocuments />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <GuaranteesDelivery />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <RetailCTA />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BCTA />
        </Suspense>
      </div>

      <Footer />
      <StickyFeatures />
    </main>
  )
}
