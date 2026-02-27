"use client"

import { motion } from "framer-motion"
import { Home, Building2, Ship, Thermometer, Shield, Box } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSplitter() {
  const scrollToRetail = () => {
    document.getElementById('retail-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToB2B = () => {
    document.getElementById('b2b-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 overflow-hidden px-4 pt-28 pb-12">
      {/* Background Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-sky-300 rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-orange-300 rounded-full blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-20 grayscale" />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo and Tagline */}
        <div
          className="flex flex-col items-center mb-8"
        >
          <div className="flex items-center gap-2 text-2xl font-bold text-sky-600 mb-2">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white">
              <Ship className="w-6 h-6" />
            </div>
            <span>Океаника</span>
          </div>
          <div className="text-sm uppercase tracking-widest text-slate-500 font-medium">
            Оптовые поставки
          </div>
        </div>

        {/* Main Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center text-slate-900 mb-4 leading-tight uppercase"
        >
          СВЕЖЕМОРОЖЕНАЯ РЫБА <br />
          <span className="text-sky-600">И МОРЕПРОДУКТЫ</span>
        </h1>

        <p
          className="text-xl md:text-2xl text-slate-600 mb-12 font-medium"
        >
          Прямые поставки → Ваш стол
        </p>

        {/* Choice Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-xl mb-12">
          {/* Business Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all cursor-pointer"
            onClick={scrollToB2B}
            role="button"
            tabIndex={0}
            aria-label="Перейти к разделу для бизнеса"
            onKeyDown={(e) => e.key === 'Enter' && scrollToB2B()}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Для бизнеса</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              От 1 коробки • Цены ниже конкурентов • Договор поставки
            </p>
            <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6 border-none pointer-events-none">
              Получить прайс
            </Button>
          </motion.div>

          {/* Retail Block - Hidden for now */}
          {/*
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all cursor-pointer"
            onClick={scrollToRetail}
            role="button"
            tabIndex={0}
            aria-label="Перейти к разделу для себя и семьи"
            onKeyDown={(e) => e.key === 'Enter' && scrollToRetail()}
          >
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Home className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Для себя и семьи</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              От 3 кг • Доставка на дом • Готовые наборы
            </p>
            <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-6 pointer-events-none">
              Выбрать рыбу
            </Button>
          </motion.div>
          */}
        </div>

        {/* Mini USPs */}
        <div
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Shield className="w-5 h-5 text-sky-500" />
            <span>Контроль качества</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Thermometer className="w-5 h-5 text-sky-500" />
            <span>-30°C шоковая заморозка</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Box className="w-5 h-5 text-sky-500" />
            <span>Вакуумная упаковка</span>
          </div>
        </div>
      </div>
    </section>
  )
}
