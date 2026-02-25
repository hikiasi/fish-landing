"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ship, ShoppingCart, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { cn } from "@/lib/utils"
import { CheckoutModal } from "@/components/sections/CheckoutModal"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToRetail = () => {
    document.getElementById('retail-section')?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const scrollToB2B = () => {
    document.getElementById('b2b-section')?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: "Каталог", onClick: scrollToRetail },
    { label: "Доставка", onClick: scrollToRetail },
    { label: "Оптовикам", onClick: scrollToB2B },
    { label: "Контакты", onClick: () => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }},
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "container mx-auto max-w-7xl rounded-full transition-all duration-300 px-4 sm:px-6 py-2 flex items-center justify-between",
          isScrolled 
            ? "bg-white/80 backdrop-blur-lg shadow-lg shadow-slate-200/50 border border-slate-200" 
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform">
            <Ship className="w-6 h-6" />
          </div>
          <div className={cn("hidden sm:block font-bold transition-colors", isScrolled ? "text-slate-900" : "text-sky-900")}>
            Океаника
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className={cn(
                "text-sm font-bold transition-colors hover:text-sky-600",
                isScrolled ? "text-slate-600" : "text-slate-900"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a 
            href="tel:+79114864797"
            className={cn(
              "hidden md:flex items-center gap-2 text-sm font-bold hover:text-sky-600 transition-colors",
              isScrolled ? "text-slate-900" : "text-slate-900"
            )}
          >
            <Phone className="w-4 h-4 text-sky-500" />
            +7 (911) 486-47-97
          </a>
          
          <div className="relative">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Открыть корзину"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>

          <Button
            className="hidden lg:flex bg-sky-600 hover:bg-sky-700 rounded-full px-6"
            onClick={() => setIsCallbackOpen(true)}
          >
            Заказать звонок
          </Button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        type="CALLBACK"
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 lg:hidden"
          >
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 font-bold text-slate-900"
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <a href="tel:+79114864797" className="flex items-center gap-3 py-3 px-4 font-bold text-sky-600">
              <Phone className="w-5 h-5" />
              +7 (911) 486-47-97
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
