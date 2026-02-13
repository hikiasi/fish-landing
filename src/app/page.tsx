"use client"

import { useRef } from "react"
import { HeroSplitter } from "@/components/sections/HeroSplitter"
import { RetailCatalog } from "@/components/sections/RetailCatalog"
import { WhyUs } from "@/components/sections/WhyUs"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"
import { Testimonials } from "@/components/sections/Testimonials"
import { GuaranteesDelivery } from "@/components/sections/GuaranteesDelivery"
import { FAQ } from "@/components/sections/FAQ"
import { RetailCTA } from "@/components/sections/RetailCTA"
import { B2BHero } from "@/components/sections/B2BHero"
import { B2BEconomy } from "@/components/sections/B2BEconomy"
import { B2BCatalog } from "@/components/sections/B2BCatalog"
import { B2BProcess } from "@/components/sections/B2BProcess"
import { B2BCases } from "@/components/sections/B2BCases"
import { B2BDocuments } from "@/components/sections/B2BDocuments"
import { B2BCTA } from "@/components/sections/B2BCTA"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { StickyFeatures } from "@/components/layout/StickyFeatures"

export default function Home() {
  const retailRef = useRef<HTMLDivElement>(null)
  const b2bRef = useRef<HTMLDivElement>(null)

  const scrollToRetail = () => {
    retailRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToB2B = () => {
    b2bRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      <Header onRetailClick={scrollToRetail} onB2BClick={scrollToB2B} />
      
      <HeroSplitter onSelectRetail={scrollToRetail} onSelectB2B={scrollToB2B} />
      
      {/* Retail sections */}
      <div ref={retailRef} id="retail-section">
        <RetailCatalog />
        <WhyUs />
        <ProcessTimeline />
        <Testimonials />
        <GuaranteesDelivery />
        <FAQ />
        <RetailCTA />
      </div>

      {/* B2B sections */}
      <div ref={b2bRef} id="b2b-section">
        <B2BHero />
        <B2BEconomy />
        <B2BCatalog />
        <B2BProcess />
        <B2BCases />
        <B2BDocuments />
        <B2BCTA />
      </div>

      <Footer />
      <StickyFeatures />
    </main>
  )
}
