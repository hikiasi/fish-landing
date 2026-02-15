import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSplitter } from "@/components/sections/HeroSplitter"
import { WhyUs } from "@/components/sections/WhyUs"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"
import { GuaranteesDelivery } from "@/components/sections/GuaranteesDelivery"
import { RetailCTA } from "@/components/sections/RetailCTA"
import { B2BHero } from "@/components/sections/B2BHero"
import { B2BProcess } from "@/components/sections/B2BProcess"
import { B2BDocuments } from "@/components/sections/B2BDocuments"
import { B2BCTA } from "@/components/sections/B2BCTA"

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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <HeroSplitter />
      
      {/* Retail sections */}
      <div id="retail-section">
        <Suspense fallback={<div>Загрузка...</div>}>
          <RetailCatalog />
        </Suspense>
        <WhyUs />
        <ProcessTimeline />
        <Suspense fallback={<div>Загрузка...</div>}>
          <Testimonials />
        </Suspense>
        <GuaranteesDelivery />
        <Suspense fallback={<div>Загрузка...</div>}>
          <FAQ />
        </Suspense>
        <RetailCTA />
      </div>

      {/* B2B sections */}
      <div id="b2b-section">
        <B2BHero />
        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BEconomy />
        </Suspense>
        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BCatalog />
        </Suspense>
        <B2BProcess />
        <Suspense fallback={<div>Загрузка...</div>}>
          <B2BCases />
        </Suspense>
        <B2BDocuments />
        <B2BCTA />
      </div>

      <Footer />
      <StickyFeatures />
    </main>
  )
}
